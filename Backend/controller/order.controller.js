const mongoose = require("mongoose");
const stripe   = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Order   = require("../models/order.model");
const Product = require("../models/product.model");
const Address = require("../models/address.model");
const ProductService = require("../service/product.service");

// ─── HELPER ───────────────────────────────────────────────────────
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// ─── PLACE ORDER (COD) ────────────────────────────────────────────
exports.placeCODOrder = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const { productId, addressId } = req.body;

    if (!productId || !addressId) {
      return res.status(400).json({ message: "productId and addressId are required" });
    }

    if (!isValidObjectId(productId) || !isValidObjectId(addressId)) {
      return res.status(400).json({ message: "Invalid productId or addressId" });
    }

    // Fetch product & address in parallel
    const [product, address] = await Promise.all([
      Product.findById(productId),
      Address.findOne({ _id: addressId, userId: buyerId }),
    ]);

    if (!product)      return res.status(404).json({ message: "Product not found" });
    if (!product.inStock) return res.status(400).json({ message: "Product is no longer available" });
    if (!address)      return res.status(404).json({ message: "Address not found" });

    // Mark product as out of stock
    await ProductService.updateProduct(productId, { inStock: false });

    const order = await Order.create({
      buyer:   buyerId,
      product: product._id,

      productSnapshot: {
        title:       product.title,
        price:       product.price,
        condition:   product.condition,
        storage:     product.storage,
        color:       product.color,
        category:    product.category,
        subcategory: product.subcategory,
        image:       product.images?.[0] || null,
      },

      amount:        product.price,
      paymentMethod: "COD",
      paymentStatus: "Pending",   // paid on delivery

      shippingAddress: {
        addressId: address._id,
        street:    address.street,
        city:      address.city,
        state:     address.state,
        zipcode:   address.zipcode,
        country:   address.country,
        phone:     address.phone,
        email:     address.email,
      },
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully (Cash on Delivery)",
      data:    order,
    });
  } catch (error) {
    console.error("placeCODOrder error:", error);
    res.status(500).json({ message: "Failed to place order. Please try again" });
  }
};

// ─── CREATE STRIPE PAYMENT INTENT ────────────────────────────────
// Step 1 of Stripe flow — frontend calls this to get clientSecret
exports.createStripePaymentIntent = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const { productId, addressId } = req.body;

    if (!productId || !addressId) {
      return res.status(400).json({ message: "productId and addressId are required" });
    }

    if (!isValidObjectId(productId) || !isValidObjectId(addressId)) {
      return res.status(400).json({ message: "Invalid productId or addressId" });
    }

    const [product, address] = await Promise.all([
      Product.findById(productId),
      Address.findOne({ _id: addressId, userId: buyerId }),
    ]);

    if (!product)         return res.status(404).json({ message: "Product not found" });
    if (!product.inStock) return res.status(400).json({ message: "Product is no longer available" });
    if (!address)         return res.status(404).json({ message: "Address not found" });

    // Create Stripe PaymentIntent
    // Amount must be in smallest currency unit — paise for INR
    const paymentIntent = await stripe.paymentIntents.create({
      amount:   product.price * 100,   // e.g. ₹50,000 → 5000000 paise
      currency: "inr",
      metadata: {
        buyerId:   buyerId.toString(),
        productId: product._id.toString(),
        addressId: address._id.toString(),
      },
      description: `Cashify Order — ${product.title}`,
    });

    // Create order in DB with Pending status right away
    // So we can track even if user abandons after this step
    const order = await Order.create({
      buyer:   buyerId,
      product: product._id,

      productSnapshot: {
        title:       product.title,
        price:       product.price,
        condition:   product.condition,
        storage:     product.storage,
        color:       product.color,
        category:    product.category,
        subcategory: product.subcategory,
        image:       product.images?.[0] || null,
      },

      amount:        product.price,
      paymentMethod: "Stripe",
      paymentStatus: "Pending",

      stripePaymentIntentId:           paymentIntent.id,
      stripePaymentIntentClientSecret: paymentIntent.client_secret,

      shippingAddress: {
        addressId: address._id,
        street:    address.street,
        city:      address.city,
        state:     address.state,
        zipcode:   address.zipcode,
        country:   address.country,
        phone:     address.phone,
        email:     address.email,
      },
    });

    res.status(201).json({
      success: true,
      message: "Payment intent created",
      clientSecret: paymentIntent.client_secret,   // sent to frontend for Stripe.js
      orderId:      order._id,
    });
  } catch (error) {
    console.error("createStripePaymentIntent error:", error);
    res.status(500).json({ message: "Failed to initiate payment. Please try again" });
  }
};

// ─── STRIPE WEBHOOK ───────────────────────────────────────────────
// Step 2 — Stripe calls this after payment succeeds/fails
// IMPORTANT: Must use express.raw() for this route (see routes file)
exports.stripeWebhook = async (req, res) => {
  const sig    = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).json({ message: `Webhook Error: ${err.message}` });
  }

  try {
    switch (event.type) {

      case "payment_intent.succeeded": {
        const intent = event.data.object;

        const order = await Order.findOne({
          stripePaymentIntentId: intent.id,
        });

        if (order) {
          order.paymentStatus = "Paid";
          order.orderStatus   = "Confirmed";
          await order.save();

          // Mark product as sold (out of stock) only on successful payment
          await ProductService.updateProduct(
            order.product.toString(),
            { inStock: false }
          );
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const intent = event.data.object;

        const order = await Order.findOne({
          stripePaymentIntentId: intent.id,
        });

        if (order) {
          order.paymentStatus = "Failed";
          await order.save();
          // Product stays inStock: true — user can retry or someone else can buy
        }
        break;
      }

      default:
        // Ignore other event types
        break;
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("stripeWebhook handler error:", error);
    res.status(500).json({ message: "Webhook handler failed" });
  }
};

// ─── GET MY ORDERS (Buyer) ────────────────────────────────────────
exports.getMyOrders = async (req, res) => {
  try {
    const buyerId = req.user._id;

    const orders = await Order.find({ buyer: buyerId })
      .populate("product", "title images price condition")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data:  orders,
    });
  } catch (error) {
    console.error("getMyOrders error:", error);
    res.status(500).json({ message: "Failed to fetch orders. Please try again" });
  }
};

// ─── GET ORDER BY ID ──────────────────────────────────────────────
exports.getOrderById = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(id)
      .populate("product", "title images price condition storage color")
      .populate("buyer",   "firstname lastname mobile email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only the buyer can view their order
    if (order.buyer._id.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("getOrderById error:", error);
    res.status(500).json({ message: "Failed to fetch order. Please try again" });
  }
};

// ─── CANCEL ORDER ─────────────────────────────────────────────────
exports.cancelOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { reason } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.buyer.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!["Placed", "Confirmed"].includes(order.orderStatus)) {
      return res.status(400).json({
        message: `Order cannot be cancelled at ${order.orderStatus} stage`,
      });
    }

    // If paid via Stripe — issue refund
    if (order.paymentMethod === "Stripe" && order.paymentStatus === "Paid") {
      await stripe.refunds.create({
        payment_intent: order.stripePaymentIntentId,
      });
      order.paymentStatus = "Refunded";
    }

    order.orderStatus       = "Cancelled";
    order.cancelledBy       = "Buyer";
    order.cancellationReason = reason || null;
    await order.save();

    // Put product back in stock
    await ProductService.updateProduct(
      order.product.toString(),
      { inStock: true }
    );

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data:    order,
    });
  } catch (error) {
    console.error("cancelOrder error:", error);
    res.status(500).json({ message: "Failed to cancel order. Please try again" });
  }
};

// ─── UPDATE ORDER STATUS (Admin) ──────────────────────────────────
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id }          = req.params;
    const { orderStatus } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const validTransitions = {
      Placed:    ["Confirmed", "Cancelled"],
      Confirmed: ["Shipped",   "Cancelled"],
      Shipped:   ["Delivered"],
    };

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const allowed = validTransitions[order.orderStatus];
    if (!allowed || !allowed.includes(orderStatus)) {
      return res.status(400).json({
        message: `Cannot transition from ${order.orderStatus} to ${orderStatus}`,
      });
    }

    // If COD order is marked Delivered — auto mark as Paid
    if (orderStatus === "Delivered" && order.paymentMethod === "COD") {
      order.paymentStatus = "Paid";
    }

    // If admin cancels — refund if Stripe + Paid
    if (orderStatus === "Cancelled") {
      if (order.paymentMethod === "Stripe" && order.paymentStatus === "Paid") {
        await stripe.refunds.create({
          payment_intent: order.stripePaymentIntentId,
        });
        order.paymentStatus = "Refunded";
      }
      order.cancelledBy = "Admin";

      // Put product back in stock
      await ProductService.updateProduct(
        order.product.toString(),
        { inStock: true }
      );
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.status(200).json({
      success: true,
      message: `Order status updated to ${orderStatus}`,
      data:    order,
    });
  } catch (error) {
    console.error("updateOrderStatus error:", error);
    res.status(500).json({ message: "Failed to update order status. Please try again" });
  }
};