const express = require('express');
const http = require('http');
const socketIo = require("socket.io");
const ejs = require('ejs');

const Player = require('./src/model/Player');
const Game = require('./src/model/Game');

const app = express();
// const server = http.createServer(app);
const server = http.Server(app).listen(8080);
const io = socketIo(server);

const clients = {};

app.use(express.static('./public'));
app.use('/vendor',express.static('./node_modules'));

app.set("views", "./public");
app.set("view engine","html");
app.engine("html", ejs.renderFile);

app.get("/", (request, response) =>{
    return response.render("index.html");
});

const games = {}
let unmatched = null; //Próximo Game;

io.on("connection", (socket) => {
  let id = socket.id;
  console.log("New Client Connected. ID => " + id);
  clients[id] = socket;


  socket.on("game.begin",function(data) {
    const game  = join(socket, data);
    if(game.player2){
      console.log("Novo jogo iniciando.",game);
      clients[game.player1.socketId.emit("game.begin", game)];
      clients[game.player1.socketId.emit("game.begin", game)];
    }
  });

  socket.on("disconnect", function(){
    console.log("Client Disconnected. ID => "+ id);
    delete clients[id];
  });
});

const join = (socket, data) => {
   const player  = Player(data.playerName, 'X', socket.id);

   if(unmatched){
      unmatched.player2 = player2;
      games[unmatched.player1.socketId] = unmatched;
      games[unmatched.player2.socketId] = unmatched;
      unmatched = null;
      return games[socket.id];
   }else{
     unmatched = Game(Player);
     return unmatched;
   }
}

// server.listen(8080, () =>{
//   console.log("server up");
// });