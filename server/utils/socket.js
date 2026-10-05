module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Join event room for live features
    socket.on('join_event', (eventId) => {
      socket.join(eventId);
      console.log(`Socket ${socket.id} joined event ${eventId}`);
    });

    // Chat room for networking
    socket.on('join_chat', (chatId) => {
      socket.join(chatId);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
