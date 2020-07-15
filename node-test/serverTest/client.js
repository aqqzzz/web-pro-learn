const net = require('net');

// 创建socket对象
const socket = net.Socket({});

// socket对象连接本地4000端口
socket.connect({
    host: '127.0.0.1',
    port: 4000,
})

// 向对应socket流写数据
socket.write('hello')
