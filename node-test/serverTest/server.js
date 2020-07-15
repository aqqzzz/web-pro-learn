const net = require('net');

const socket = net.createServer((socket) => {
    socket.on('data', (buffer) => {
        console.log(buffer, buffer.toString());
    })
});

socket.listen(4000);