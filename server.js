// import dependencies
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

// set up server
const expressApp = express();
const httpServer = http.createServer(expressApp);
const socketServer = new Server(httpServer);

// static files
expressApp.use(express.static(path.join(__dirname, "public")));

// handle Socket.IO connections
socketServer.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("move", (data) => {
        socket.broadcast.emit("move", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// set port and start Socket.IO server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});