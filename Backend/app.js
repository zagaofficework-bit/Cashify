const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()

const { stripeWebhook } = require("./controllers/order.controller");

// ⚠️ STRIPE WEBHOOK — must be raw body, registered BEFORE express.json()
app.post(
  "/api/orders/webhook/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhook
);


app.use(express.json())
app.use(cookieParser())

/**
 * - Routes required
 */
const authRouter = require("./routes/auth.routes")
const productRouter = require("./routes/product.routes");
const addressRouter = require("./routes/address.routes");
const orderRouter = require("./routes/order.routes");
const messageRouter = require("./routes/message.routes")

/**
 * - Use Routes
 */

app.use("/api/auth", authRouter)
app.use("/api/products", productRouter);
app.use("/api/address", addressRouter);
app.use("/api/orders", orderRouter);
app.use("/api/messages", messageRouter)

module.exports = app