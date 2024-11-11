const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

let currentPage = 1;

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.emit('pageChange', currentPage);
    socket.on('changePage', (page) => {
        currentPage = page;
        io.emit('pageChange', currentPage);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(5050, () => {
    console.log('Server is running on port 5000');
});
