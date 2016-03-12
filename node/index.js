var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var lonelyPeople = [];
var clientMap = {};
var numberRooms = 1;

app.get('/', function(req, res){
  res.sendFile('static.html', {root:'public'});
});

io.on('connection', function(socket){

  console.log('a player connected');

  assignToRoom(socket);

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    roomToEmit = clientMap.get(socket.id)[1];
    socket.broadcast.to('Room' + roomToEmit).emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('player disconnected');
    var c1 = socket;
    var c2;

    //console.log(clientMap);
    console.log(clientMap.size);

    roomToEmpty = clientMap.get(c1.id)[1];
    delete clientMap.get(c1.id);

    console.log(clientMap.size);

    for (var i = 0; i < clientMap.size; i++){
      var socketId = clientMap.get(clientMap.keys[i]);
      console.log('hello');
      console.log(clientMap.get(socketId));
      //console.log(clientMap[socketId]);
      if (clientMap.get(socketId)[1] == roomToEmpty) {
        console.log('widow');
        assignToRoom(clientMap.get(socketId)[0]);
      }
    }
  

  });
});

function assignToRoom(socket) {
  lonelyPeople.push(socket);

  console.log('#lonelyPeople: ' + lonelyPeople.length);

  if (lonelyPeople.length >= 2) {
    var c1 = lonelyPeople.pop();
    var c2 = lonelyPeople.pop();

    c1.join('Room' + numberRooms);
    c2.join('Room' + numberRooms);

    console.log('joined room: ' + numberRooms);

    clientMap.set(c1.id, [c1, numberRooms]);
    clientMap.set(c2.id, [c2, numberRooms]);

    numberRooms++;
  }
}

http.listen(3000, function(){
  console.log('listening on *:3000');
});
