var io = require('socket.io'),
  connect = require('connect'),
  chatter = require('chatter');

 var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
 var ipadd = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

var app = connect().use(connect.static(__dirname + '/public')).listen(ipadd, port);
var chat_room = io.listen(app);

chatter.set_sockets(chat_room.sockets);

chat_room.sockets.on('connection', function (socket) {
  chatter.connect_chatter({
    socket: socket,
    username: socket.id,
  });
});