function socketHandler(io) {

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    /* Join chat room */
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    /* typing indicator */
    socket.on("typing", (roomId) => {
      socket.to(roomId).emit("typing");
    });

    socket.on("stopTyping", (roomId) => {
      socket.to(roomId).emit("stopTyping");
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

  });

}

module.exports = socketHandler;