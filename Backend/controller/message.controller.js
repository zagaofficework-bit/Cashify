const Message = require("../models/message.model");
const Product = require("../models/product.model");
const cloudinary = require("../config/cloudinary");
const User = require("../models/user.model");

async function sendMessage(req, res) {
  try {
    const { productId, receiverId, message } = req.body;
    const senderId = req.user._id;

     /* get sender and receiver */
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    /* ROLE VALIDATION */
    if (sender.role === "user" && receiver.role === "user") {
      return res.status(403).json({
        success: false,
        message: "Users can only chat with admin",
      });
    }

    let imageUrl = "";

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "cashify_chat",
      });

      imageUrl = upload.secure_url;
    }

    const newMessage = await Message.create({
      from: senderId,
      to: receiverId,
      product: productId,
      message,
      image: imageUrl,
      messageType: imageUrl ? "image" : "text",
    });

    /* deterministic room id */
    const users = [senderId.toString(), receiverId.toString()].sort();
    const roomId = `${productId}_${users[0]}_${users[1]}`;

    const io = req.app.get("io");

    io.to(roomId).emit("newMessage", newMessage);

    res.status(201).json({
      success: true,
      message: "Message sent",
      data: newMessage,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
}

async function getMessages(req, res) {
  try {
    const { productId, receiverId } = req.query;
    const currentUserId = req.user._id;

    if (!productId || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "productId and receiverId are required",
      });
    }

    const currentUser = await User.findById(currentUserId);
    const receiver = await User.findById(receiverId);

    if (!currentUser || !receiver) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    /* enforce role restriction */
    if (currentUser.role === "user" && receiver.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Users can only fetch messages with admin",
      });
    }

    if (currentUser.role === "admin" && receiver.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Admin can only fetch messages with users",
      });
    }

    /* check product exists */
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const messages = await Message.find({
      product: productId,
      $or: [
        { from: currentUserId, to: receiverId },
        { from: receiverId, to: currentUserId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("from", "firstname lastname role")
      .populate("to", "firstname lastname role");

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching messages",
    });
  }
}


async function getChats(req, res) {
  try {
    const userId = req.user._id;

    const chats = await Message.aggregate([
      {
        $match: {
          $or: [{ from: userId }, { to: userId }],
        },
      },
      { $sort: { createdAt: -1 } },

      {
        $group: {
          _id: {
            product: "$product",
            user: {
              $cond: [
                { $eq: ["$from", userId] },
                "$to",
                "$from",
              ],
            },
          },
          latestMessage: { $first: "$$ROOT" },
        },
      },

      {
        $replaceRoot: { newRoot: "$latestMessage" },
      },
    ]);

    res.json({
      success: true,
      chats,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching chats",
    });
  }
};

async function deleteChat(req, res) {
  try {
    const { productId, receiverId } = req.body;
    const currentUserId = req.user._id;

    if (!productId || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "productId and receiverId are required",
      });
    }

    const deletedMessages = await Message.deleteMany({
      product: productId,
      $or: [
        { from: currentUserId, to: receiverId },
        { from: receiverId, to: currentUserId },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
      deletedCount: deletedMessages.deletedCount,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error deleting chat",
    });
  }
}

module.exports = {
  sendMessage,
  getMessages,
  getChats,
  deleteChat,
};