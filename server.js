var net = require('net');
var moment = require('moment');

var HOST = '127.0.0.1';
var PORT = 6969;

// 创建一个TCP服务器实例，调用listen函数开始监听指定端口
// 传入net.createServer()的回调函数将作为”connection“事件的处理函数
// 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
net.createServer(function(sock) {

    var remoteAddress = sock.remoteAddress;
    var remotePort    = sock.remotePort;

    // 我们获得一个连接 - 该连接自动关联一个socket对象
    console.log('CONNECTED: ' + remoteAddress + ':' + remotePort);

    // 为这个socket实例添加一个"data"事件处理函数
    sock.on('data', function(data) {
        console.log(moment().format() + ', ' + remoteAddress + ': ' +  remotePort + ' : ' + data);

        // 过若干时间后回发该数据，客户端将收到来自服务端的数据
        setTimeout(function(){
            sock.write('Data : "' + data + '"');
        }, 50);
    });

    // 为这个socket实例添加一个"close"事件处理函数
    sock.on('close', function(data) {
        console.log('CLOSED: ' +
            remoteAddress + ' ' + remotePort);
    });

    sock.on('error', function(error){
        console.log('Error occured.');
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);