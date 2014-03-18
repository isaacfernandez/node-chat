$(document).ready(function () {

var serverPacket;
var allowInjection = true;

	function parseText(string) {
		if (string.indexOf('~') != -1  &&  string.indexOf('~')+1 != '/') {
			console.log("parsing");
			var startAt = string.indexOf('~');
			console.log(startAt);
			var endAt = string.indexOf('~', startAt+1);
			if (endAt == -1)return string;
			console.log(endAt);
			string = string.split("");
			string.splice(endAt, 1, '</i>');
			string.splice(startAt, 1, '<i>');
			string = string.join("");	
				string = parseText(string);
		} else if (string.indexOf('*') != -1 &&  string.indexOf('*')+1 != '/' ) {
			console.log("parsing");
			var startAt = string.indexOf('*');
			console.log(startAt);
			var endAt = string.indexOf('*', startAt+1);
			if (endAt == -1) return string;
			console.log(endAt);
			string = string.split("");
			string.splice(endAt, 1, '</b>');
			string.splice(startAt, 1, '<b>');
			string = string.join("");
			string = parseText(string);
		}
		//handle scripts, with a simple escape.
		if (string.indexOf("<script>") != -1 && string.indexOf("<script>")-1 != '*') {
			log_chat_message('error, script attempted by user below', 'error');
			string = string.split(" ");
			return string[0];
		}
		
		string = string.autoLink({ target: "_blank", rel: "nofollow", id: "1" });
		
		return string;
	}




	var log_chat_message = function  (message, type, color) {
		message = parseText(message);
		if (allowInjection) {
		var li = $('<li />').html(message);
		} else { var li = $('<li />').text(message); }
		if (type === 'system') {
			li.css({'font-weight': 'bold'});
		} else if (type === 'leave' || type === 'error') {
			li.css({'font-weight': 'bold', 'color': '#F00'});
		}
		else if (type === 'command') {
			li.css({'font-weight': 'bold', 'font-style': 'italic'});
		} 
		else {
			li.css({'color': color});
		}
		$('#chat_log').append(li);		
	};

	var socket = io.connect('http://10.185.195.111:3000/');

//Received
	
	socket.on('entrance', function  (data) {
		log_chat_message(data.message, 'system');
	});

	socket.on('system', function  (data) {
		log_chat_message(data.message, 'system');
	});
	
	socket.on('exit', function  (data) {
		log_chat_message(data.message, 'leave');
	});

	socket.on('chat', function  (data) {
		log_chat_message(data.message, 'normal', data.color);
	});

	socket.on('error', function  (data) {
		log_chat_message(data.message, 'error');
	});

	
	$('#chat_box').keypress(function (event) {
		if (event.which == 13) {
		
		var userInput = $('#chat_box').val();
		if (userInput.charAt(0) === "/") {
			command_handler(userInput); //Route the input to separate function
		} else {
			socket.emit('chat', {message:userInput});
			$('#chat_box').val('');
			}
			
		$('#chat_box').val('');
		} //Close 
	});


	function command_handler(input) {
		if (input.indexOf('help') != -1) {
			help();
		}
	else if(input.indexOf('name') != -1) {
			var username = input.split(" ")[1];
				socket.emit('register', {message:username});
		}
	else if(input.indexOf('color') != -1) {
			var color = input.split(" ")[1];
				socket.emit('color', {message:color});
		}
		
		else 
			log_chat_message( "Invalid command. Type in /help for a list of commands. ", "command" );
	}

	function help() {
		log_chat_message("You asked for help?", "system"); 
		log_chat_message("Wrap text in * to make it bold, and in ~ to make it italic", "system"); 
		log_chat_message("/help for help", "system"); 
		log_chat_message("/name yourname to change your display name", "system"); 
		log_chat_message("/color css_color_value to change your display color. Other users will see this.", "system"); 
		log_chat_message(" Thank you. ", "system"); 
	}

});