var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clientList = [];
var clientMap = new Map();

app.get('/', function(req, res){
  res.sendFile('static.html', {root:'public'});
});

io.on('connection', function(socket){

  connectedPlayer = socket.id;
  assignToRoom(connectedPlayer, socket);

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    messageAuthor = socket.id;
    roomNum = clientMap.get(messageAuthor);
    io.to('Room' + roomNum).emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('player disconnected');
    disconnectedPlayer = socket.id;
    roomToEmpty = clientMap.get(messageAuthor);
    clientMap.delete(disconnectedPlayer);

    for (var k in clientMap){
    if (clientMap.hasOwnProperty(k)) {
         clientMap.delete(playerId);
    }
    }

    //assignToRoom(playerId);

  });

});

function assignToRoom(playerId, socket) {
  console.log('a player connected');

  numPlayers = clientMap.size;
  if (numPlayers % 2 == 0) {
    numPlayers += 1;
  }
  roomNum = Math.ceil(numPlayers/2);
  
  //connectedPlayer = socket.id;
  clientMap.set(playerId, roomNum);
  socket.join('Room' + roomNum);
  console.log('in room ' + roomNum);
}

http.listen(3000, function(){
  console.log('listening on *:3000');
});
