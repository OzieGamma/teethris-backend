var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clientNumber = 0;
var waitingClients = [];

app.get('/', function(req, res){
  res.sendfile('public/static.html');
});

io.on('connection', function (socket) {
    var localClientNumber = clientNumber;
    clientNumber += 1;


    console.log('['+localClientNumber+'] Connected, Emiting id');
    socket.emit('id', localClientNumber);

    socket.on('msg', function (msg) {
        console.log('['+localClientNumber+'] message: ' + msg);
        socket.broadcast.emit('msg', msg);
    });

    socket.on('ready', function (msg) {
        console.log('['+localClientNumber+'] ready: ' + msg);

        waitingClients.push(localClientNumber);

        //if(waitingClients.length >= 2){
        //  io.emit('ready', 'countdown');
        //  waitingClients = [];
        //}
    });
});

var port = process.env.PORT || 3000;
http.listen(port, function () {
    console.log('listening on *:3000');
});
