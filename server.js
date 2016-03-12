var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clientNumber = 0;

io.on('connection', function (socket) {
    var localClientNumber = clientNumber;
    clientNumber += 1;
      
    
    console.log('['+localClientNumber+'] Connected, Emiting id');
    socket.emit('id', localClientNumber);

    socket.on('msg', function (msg) {
        console.log('['+localClientNumber+'] message: ' + msg);
        socket.broadcast.emit('msg', msg);
    });

    socket.on('disconnect', function () {
        console.log('['+localClientNumber+'] disconnected');
        socket.broadcast.emit('disconnect', 'BLABLA');
    });
});

var port = process.env.PORT || 3000;
http.listen(port, function () {
    console.log('listening on *:3000');
});