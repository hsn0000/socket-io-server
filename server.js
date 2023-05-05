const express = require('express');
const app = express();
const http = require("http");

const redis = require('redis');
const PubSub = require('node-redis-pubsub');

/* MODEL */
const fs = require('fs');
const app_env = require("./env");
const gamePort = app_env.GAME_PORT;
const serverSocket = app_env.serverSocket;

const httpServer = http.createServer(app, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h2>SERVER IS UP</h2>');
});

/* REDIS setup */ 
const appEnv = app_env.APP_ENV;
const configRedis = app_env.redisMaster;
const redisClientPubSub = redis.createClient(configRedis);

var redisPub = redisClientPubSub;
var redisSub = redisClientPubSub;

var config = {
  emitter: redisPub,                      
  receiver: redisSub,                     
}

var redisPubSub = new PubSub(config); 
const socketIoRedis = require('socket.io-redis');

const io = require('socket.io')(httpServer, {
  transports: ["polling", "websocket"],
  cors: {
    // origin: [serverSocket,'http://alabasta.com:9000','http://localhost:9000','http://localhost:3000'],
    methods: ['GET', 'POST']
}
});

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

io.adapter(socketIoRedis(configRedis));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat_message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat_message', msg);
  });

});

/* REDIS SUB */
redisPubSub.on(`${appEnv}:ticket`, function(data){
  console.log(appEnv);
  console.log(data);
  // io.emit("ticket", data)
});



httpServer.listen(gamePort, function () {
  const host = this.address().address;
  const port = this.address().port;
  console.log(`listening at PORT: ${host}:${port}`);
  // console.log({gamePort});
});

/*POST REQUEST ARRAY/OBJECT*/
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post(`/ticket-not-print/${appEnv}`, (req, res) => {
    res.send("POST Request Called")
    const data = JSON.stringify(req.body)
    io.emit(`TicketNotPrint/${appEnv}`, data)
})

// http.listen(3000, () => {
//   console.log('listening on *:3000');
// });
