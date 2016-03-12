var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// The view engine to generate dynamic pages
app.set('view engine', 'ejs');

var lonelyPeople = [];
var clientMap = {};
var numberRooms = 1;

app.get('/', function(req, res){
  res.render('static', {
    clientCount: Object.keys(clientMap).length
  })
});

app.get('/disconnectAll', function(req, res){
  for (var i = 0; i < Object.keys(clientMap).length; i++){
    var socketId = (Object.keys(clientMap))[i];

    ((clientMap[socketId])[0]).disconnect();
  }

  console.log("Disconnect!");

  res.send("yolo");
});

io.on('connection', function(socket){

  console.log('a player connected');

  assignToRoom(socket);

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    roomToEmit = (clientMap['' + socket.id])[1];
    socket.broadcast.to('Room' + roomToEmit).emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('player disconnected');
    var c1 = socket;
    var c2;

    //console.log(clientMap);
    console.log(Object.keys(clientMap).length);

    // Only if he is not disconnected yet
    if(clientMap['' + c1.id]){
      roomToEmpty = (clientMap['' + c1.id])[1];
      delete clientMap['' + c1.id];

      console.log(Object.keys(clientMap).length);

      for (var i = 0; i < Object.keys(clientMap).length; i++){
        var socketId = (Object.keys(clientMap))[i];
        console.log('hello');
        console.log(socketId);
        //console.log(clientMap[socketId]);
        if ((clientMap[socketId])[1] == roomToEmpty) {
          console.log('widow');
          assignToRoom((clientMap[socketId])[0]);
        }
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
    c1.broadcast.to('Room' + numberRooms).emit('chat message', 'player:player1');
    c2.broadcast.to('Room' + numberRooms).emit('chat message', 'player:player2');

    console.log('joined room: ' + numberRooms);

    clientMap['' + c1.id] = [c1, numberRooms];
    clientMap['' + c2.id] = [c2, numberRooms];

    numberRooms++;
  }
}

var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('listening on *:3000');
});
