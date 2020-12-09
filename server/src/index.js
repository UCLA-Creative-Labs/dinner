const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const logger = require('./logger');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: [ 'GET', 'POST' ],
    credentials: true,
  },
});

const rooms = {};

io.on('connection', (socket) => {
  socket.emit('handshake', 'Recieved connection.');
  logger.info('Received connection');

  let curRoom = null;

  socket.on('joinRoom', data => {
    const { room } = data;

    if (!rooms[room]) {
      rooms[room] = {
        name: room,
        occupants: {},
      };
    }

    const joinedTime = Date.now();
    rooms[room].occupants[socket.id] = joinedTime;
    curRoom = room;

    logger.info(`${socket.id} joined room ${room}`);
    socket.join(room);

    socket.emit('connectSuccess', { joinedTime });
    const occupants = rooms[room].occupants;
    io.in(curRoom).emit('occupantsChanged', { occupants });
  });

  socket.on('send', data => {
    io.to(data.to).emit('send', data);
  });

  socket.on('broadcast', data => {
    socket.to(curRoom).broadcast.emit('broadcast', data);
  });

  socket.on('disconnect', () => {
    if (rooms[curRoom]) {
      logger.info(`${socket.id} disconnected from ${curRoom}`);

      delete rooms[curRoom].occupants[socket.id];
      const occupants = rooms[curRoom].occupants;
      socket.to(curRoom).broadcast.emit('occupantsChanged', { occupants });

      if (occupants == {}) {
        logger.info('Everyone left');
        delete rooms[curRoom];
      }
    }
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => logger.info(`Listening on port ${port}`));

