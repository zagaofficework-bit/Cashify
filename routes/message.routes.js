const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const messageController = require("../controller/message.controller");
const upload = require("../middleware/multer");


router.post("/send", authMiddleware.authMiddleware, upload.single("image"), messageController.sendMessage);

router.get("/", authMiddleware.authMiddleware, messageController.getMessages);

router.get("/chats", authMiddleware.authMiddleware, messageController.getChats);

router.delete("/chat", authMiddleware.authMiddleware, messageController.deleteChat);

module.exports = router;