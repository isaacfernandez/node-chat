var io = require('socket.io-client'),
socket = io.connect('localhost', {
    port: 3000
});

	socket.on('connect', function () { 
		console.log("Little Sister is playing on local host, port 3000!");
		socket.emit('register', {message:"Little Sister (bot)"});
		send_message("Would you like to play?");
	});

	socket.on('chat', function  (data) {
	
		
		data.message = data.message.split("says: ")[1];
		
		console.log(data.message);
		if (data.message ===  "play?") {
			console.log("playing");
			send_message("I love playing games! !rtd ~number~ to roll a dice! Defaults to 6 with no parameter.");
		}
		
		if(data.message.indexOf('!rtd') == 0) {
			return send_message(RollTheDice(data.message));
		}
		if(data.message.indexOf('fuck') != -1 || data.message.indexOf('FUCK') != -1 || data.message.indexOf('Fuck') != -1) {
			return send_message(generateShirley());
		}
		if(data.message.indexOf('anal') != -1 || data.message.indexOf('FUCK') != -1 || data.message.indexOf('Fuck') != -1) {
			send_message("ANALGEYSER IS JUAN!");
			}
		if(data.message.indexOf('shooting') != -1 || data.message.indexOf('FUCK') != -1 || data.message.indexOf('Fuck') != -1) {
			send_message("OH MY GOD GUYS! DONT JOKE ABOUT THAT");
				}
	//end if text contains 'says' (and thus is a chat message)
	});
	
function RollTheDice(user){
	user = user.split(' ')[1];
	if (! user) user = 6;
	 return "A " + user + "-sided dice rolled on " + Math.floor((Math.random()*user)+1);
	}
function Choose(arr) {return arr[Math.floor(Math.random()*arr.length)];}
function generateShirley()
{
	//Taken directly from http://orteil.dashnet.org/callmeshirley
	//Truly great coder
	var x = 'Well '+
	Choose(['slap','spank','smack','pinch','rub','mock','squeeze','suck','bite','bite off','chew','lick','flap','stroke','touch','smell','sniff','jizz on','rub one out on','wank to','shit on','piss on','paint','fist','scratch','screw','kiss','finger','jiggle','tickle','hold','grab','blow on','scream at','befriend','write a book about','sue','marry','rape','make love to','pepper','twist','tenderize','spit on','fart on','meet','spend a charming afternoon with','introduce your sister to','sandwich','write fanfic about','blog about','let\'s have a minute of silence for','listen to','google','stick your dick in','prance around in','make your way inside','plunder','swiggity','eat','stuff','hump','humiliate','blow','blow up','fancy','berate','rate','rustle'])+
	' my '+
	Choose(['tits','ass','dick','mouth','face','balls','cock','crotch','face','beard','moustache','buns','boobs','boobies','breasts','chest','butt','buttocks','nips','nipples','vag','snatch','cunt','fanny','skirt','pants','panties','loins','undies','bra','shorts','jimmies','crack','thighs','rump','arse','feet','nuts','cat','horse','goat','dog','parrot','steak','cheese','hose','goatee','sideburns','sandwich','booty','mother','father','grand-parents','neighbor','shiggity','dinner','shizzle','bunny','evil twin','thing','pickle','nutsack'])+
	' and call me '+
	Choose(['Shirley','Sally','Dolly','Pedro','Jose','Juanita','Sharon','Geoffrey','Susan','Mary','Stanley','Bradley','Barney','Brandon','Milford','Robert','Rosie','Steve','Patrick','Jeffrey','Brian','David','Santa','Batman','mommy','daddy','grandpa','grandma','auntie','uncle','pretty','maybe','when you\'re home','when you\'re done','darling','fabulous'])+
	', do you speak to your mother with that mouth?';
	return x;
	}
	
function send_message(text) {
	socket.emit('chat', {message:text});
	}