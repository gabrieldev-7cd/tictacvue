const express = require('express');
const http = require('http');
const socketIo = require("socket.io");
const ejs = require('ejs');

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

io.on("connection", (socket) => {
  let id = socket.id;
  console.log("New Client Connected. ID => " + id);
  clients[id] = socket;

  socket.on("disconnect", function(){
    console.log("Client Disconnected. ID => "+ id);
    delete clients[id];
  });
});

// server.listen(8080, () =>{
//   console.log("server up");
// });
