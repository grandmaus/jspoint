const io = require('socket.io')();

io.on('connection', function(socket) {
  socket.on('message', function(message) {
    console.log('[WS] - PROCESSING NEW MESSAGE', message);
    io.sockets.emit(message.type, message.data);
    io.sockets.emit('message', message.data);
  });
});

const port = 5678;
io.listen(port);
console.log(' -- Successfully started server --');
console.log(' -- Waiting for broadcasts... --');
