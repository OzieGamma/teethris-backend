var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clientNumber = 0;

io.on('connection', function (socket) {
    var localClientNumber = clientNumber;
    var roomNumber = Math.floor(localClientNumber/2);
    
    clientNumber += 1;
    
    socket.join('room$' + roomNumber);
    
    console.log('['+localClientNumber+'] Connected, Emiting id');
    socket.emit('id', localClientNumber);

    socket.on('msg', function (msg) {
        console.log('['+localClientNumber+'] message: ' + msg);
        socket.broadcast.to('room$' + roomNumber).emit('msg', msg);
    });

    socket.on('disconnect', function () {
        console.log('['+localClientNumber+'] disconnected');
        socket.broadcast.to('room$' + roomNumber).emit('msg', 'ESC');
    });
});

var port = process.env.PORT || 3000;
http.listen(port, function () {
    console.log('listening on *:3000');
});