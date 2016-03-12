var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// The view engine to generate dynamic pages
app.set('view engine', 'ejs');

var lonelyPeople = [];
var clientMap = new Map();

app.get('/', function(req, res){
  res.render('static', {
    clientCount: clientMap.size
  })
  //res.sendFile('static.html', {root:'public'});
});

io.on('connection', function(socket){

  connectedPlayer = socket.id;
  console.log('a player connected');
  roomNum = 0;

  var playerNumber = 1;

  if (lonelyPeople.length > 0) {
    roomNum = lonelyPeople.pop();
    playerNumber = 2;
  }
  else {
    numPlayers = clientMap.size;
    if (numPlayers % 2 == 0) {
      numPlayers += 1;
    }
    roomNum = Math.ceil(numPlayers/2);
  }

  clientMap.set(connectedPlayer, roomNum);
  socket.join('Room' + roomNum);
  console.log('in room ' + roomNum);

  io.to(socket.id).emit("playernumber:" + playerNumber);

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    messageAuthor = socket.id;
    roomToEmit = clientMap.get(messageAuthor);
    socket.broadcast.to('Room' + roomToEmit).emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('player disconnected');
    disconnectedPlayer = socket.id;
    roomToEmpty = clientMap.get(disconnectedPlayer);
    lonelyPeople.push(roomToEmpty);
    clientMap.delete(disconnectedPlayer);

  });

});

var port = process.env.PORT || 3001;
http.listen(port, function(){
  console.log('listening on *:3000');
});
