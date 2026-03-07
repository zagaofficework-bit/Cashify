const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const messageController = require("../controller/message.controller");
const { productUpload, validateProductFiles } = require("../middleware/multer.middleware");


router.post("/send", authMiddleware.authMiddleware,productUpload, validateProductFiles, messageController.sendMessage);
router.get("/", authMiddleware.authMiddleware, messageController.getMessages);

router.get("/chats", authMiddleware.authMiddleware, messageController.getChats);

router.delete("/chat", authMiddleware.authMiddleware, messageController.deleteChat);

module.exports = router;