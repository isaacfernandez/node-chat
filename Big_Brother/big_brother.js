var io = require('socket.io-client'),
mysql = require("mysql"); 
     
// Create the connection. 
// Data is default to new mysql installation and should be changed according to your configuration. 
var connection = mysql.createConnection({ 
   user: "root", 
   password: "root", 
   database: "testlog"
	});

socket = io.connect('localhost', {
    port: 3000
});

	socket.on('connect', function () { 
		console.log("Big Brother is watching local host, port 3000.");
		socket.emit('register', {message:"Big Brother (bot)"});
		send_message("Big Brother is watching.");
		str = new Date().toString().split(" ");
		str = str[0] + str[1] + str[2] + str[3] + str[4];
		console.log("Starting at " + str);
		connection.query('CREATE TABLE testlog.' +  'testlog' + '(' +
             'id INT NOT NULL AUTO_INCREMENT,' +
             'message TEXT NOT NULL, PRIMARY KEY (  id )' +
             ')' , function(err){console.log(err)});
		
		
	});

	socket.on('chat', function  (data) {
		var string = " " + connection.escape(data.message);
		connection.query('INSERT INTO testlog (' +
										'VALUES ?' , string, function(err){console.log})
		
	});
	
	socket.on('system', function  (data) {
		var string = new Date() +" " + connection.escape(data.message);
		console.log(string);
	});
	
function send_message(text) {
	socket.emit('chat', {message:text});
}
