
	/**************
	TO DO
	Change background on click numbers to bubbles
	highscore server
	highscore / score validation
	******/
	
	// $.jStorage.set(key, value, options)
	
	// Check if "key" exists in the storage	
	var save = $.jStorage.get("save");
	var printNum = 0;

	var truth = true;
	
	var globalid = 0;
	
	//amount owned
	var poorStudent = 0;
	var programmer = 0;
	var vendingMachine = 0;
	var factory = 0;
	
	//our bools
	var numberFloatOnOff = true;
	
	//global pic reference for can
	
	//costs
	var poorStudentCost = 15;
	var programmerCost = 100;
	var vendingMachineCost = 1337;
	var factoryCost = 9001;
	
	var saveFreq = 100;
	var ticker = 0;
	var gameTicker = 100;
	var Timer =setInterval(function(){
		tick();
	},gameTicker);	
	
	
	//messages
	var jjy = "V2h5IGFyZSB5b3Ugc3VjaCBhIGxvc2Vy";
	/*mock1*/var bW9jazE = "WW91ciBjYW5zIGFyZSBtb2NrZWQgYnkgYWxsLg==";
	/*mock2*/var bW9jazI = "WW91ciBmaXJzdCBjYW4gZXhwbG9kZXMgaW4geW91ciBmYWNlLg==";
	/*recognition1*/var cmVjb2duaXRpb24x = "RnJpZW5kcyBzdGFydCBhc2tpbmcgeW91IGZvciBzaXBzIG9mIHlvdXIgYWxlLg==";
	/*recognition2*/var cmVjb2duaXRpb24y = "T3RoZXIgY2xhc3Nyb29tcyBiZWcgZm9yIHlvdXIgU2VhZ3JhbXMu";
	/*recognition3*/var cmVjb2duaXRpb24z = "WW91ciBTZWFncmFtcyBhcmUgdm90ZWQgbW9zdCAibGlrZWx5IHRvIHN1Y2NlZWQi";
	/*wow1*/var d293MQ = "WW91ciBoaXJlZCBmb3IgYnJpbmdpbmcgU2VhZ3JhbXMgdG8gdGhlIGpvYiBpbnRlcnZpZXcu";
	/*wow2*/var d293Mg = "";
	/*wow3*/var d293Mw = "";
	/*wow4*/var d293NA = "";
	/*wow5*/var d293NQ = "";
	/*wow6*/var d293Ng = "";
	/*wow7*/var d293Nw = "";
	/*wow8*/var d293OA = "";
	/*wow9*/var d293OQ = "";
	/*wow10*/var d293MTA = "";
	/*stock1*/var c3RvY2sx = "WW91IG93biAxMCUgb2YgdGhlIHN0b2NrIGluIFNlYWdyYW1zIEdpbmdlciBBbGUu";
	/*stock2*/var c3RvY2sy = "WW91IG93biAyMCUgb2YgdGhlIHN0b2NrIGluIFNlYWdyYW1zIEdpbmdlciBBbGUu";
	/*stock3*/var c3RvY2sz = "WW91IG93biAzMCUgb2YgdGhlIHN0b2NrIGluIFNlYWdyYW1zIEdpbmdlciBBbGUu";
	/*stock4*/var c3RvY2s0 = "WW91IG93biA0MCUgb2YgdGhlIHN0b2NrIGluIFNlYWdyYW1zIEdpbmdlciBBbGUu";
	/*stock5*/var c3RvY2s1 = "WW91IG93biA1MCUgb2YgdGhlIHN0b2NrIGluIFNlYWdyYW1zIEdpbmdlciBBbGUu";
	/*stock6*/var c3RvY2s2 = "WW91IG93biA2MCUgb2YgdGhlIHN0b2NrIGluIFNlYWdyYW1zIEdpbmdlciBBbGUu";
	/*stock7*/var c3RvY2s3 = "WW91IG93biA3MCUgb2YgdGhlIHN0b2NrIGluIFNlYWdyYW1zIEdpbmdlciBBbGUu";
	/*stock8*/var c3RvY2s4 = "WW91IG93biA4MCUgb2YgdGhlIHN0b2NrIGluIFNlYWdyYW1zIEdpbmdlciBBbGUu";
	/*stock9*/var c3RvY2s5 = "WW91IG93biA5MCUgb2YgdGhlIHN0b2NrIGluIFNlYWdyYW1zIEdpbmdlciBBbGUu";
	/*stock10*/var c3RvY2sxMA = "WW91IG93biAxMDAlIG9mIHRoZSBzdG9jayBpbiBTZWFncmFtcyBHaW5nZXIgQWxlLg==";
	
	var blah = [0, 0, 0, 0];
	
	var seagrams = 0;
	var seagrams_minus_one = 0;
	
	var seagramsProduced = 0;
	var seagramsPerClick = 1;
	var clickSinceLastTick = 0;
	//treat as variable
	function seagramsPerSecond() {return seagramsProduced * (1000/gameTicker);}

//tells the page what to do onload
function init(){
	if(!save){
	save = false;
	$.jStorage.set("save", false ); }
	else {
		loadGame(); }
	updateCosts();
	setTimeout( function(){new beginTwoTicksLate()},10000);
}

//the beating heart of the code - it updates per second and gets more green gold	
function tick() {
	ticker++;
	clickSinceLastTick = 0;
	seagrams_minus_one = seagrams;
	automaticProducers();
	updateText();
	if (ticker == saveFreq) {
		updateMessage();
		saveGame();
	}
	ticker = ticker%saveFreq;
	
}

//pretty much loads on onload and clicks the can
function loadGame(){
	playSound("can.ogg");
	//Load current amount of seagrams
	seagrams = $.jStorage.get("seagrams");
	
	//Load all bought items
	poorStudent = $.jStorage.get("poorStudent");
	programmer = $.jStorage.get("programmer", programmer);
	vendingMachine = $.jStorage.get("vendingMachine");
	factory = $.jStorage.get("factory");
	
	//load current costs
	poorStudentCost = $.jStorage.get("poorStudentCost", poorStudentCost);
	programmerCost = $.jStorage.get("programmerCost", programmerCost);
	vendingMachineCost = $.jStorage.get("vendingMachineCost", vendingMachineCost);
	factoryCost = $.jStorage.get("factoryCost", factoryCost);
	
	truth = $.jStorage.get("truth", true);
	
	for (var i = 0; i < poorStudent; i++){
	canvasShow("poorStudentCanvas"); }
	for (var i = 0; i < programmer; i++){
	canvasShow("programmerCanvas");}
	for (var i = 0; i < vendingMachine; i++){
	canvasShow("vendingMachineCanvas");}
	for (var i = 0; i < factory; i++){
	canvasShow("factoryCanvas");}
	
}

//save the game function
function saveGame(){	
	$.jStorage.set("save", true);
	$.jStorage.set("seagrams", seagrams);
	$.jStorage.set("poorStudent", poorStudent);
	$.jStorage.set("programmer", programmer);
	$.jStorage.set("vendingMachine", vendingMachine);
	$.jStorage.set("factory", factory);
	
	$.jStorage.set("poorStudentCost", poorStudentCost);
	$.jStorage.set("programmerCost", programmerCost);
	$.jStorage.set("vendingMachineCost", vendingMachineCost);
	$.jStorage.set("factoryCost", factoryCost);
	$.jStorage.set("truth", truth);

	//$.jStorage.set("save", true);
}

//reset the game - oh no bro!!
function resetGame(){
	$.jStorage.flush();
	location.reload();
}

function handleAnimate(){
	return false;
}
function handleResize(){
	return truth;
}


function updateMessage(){
	if ( handleAnimate() ) {
			 return (this = typeof new false);	
		}	
		else {
			if (!handleResize()){
				achievementProgressBar();	
				updateNews( window.atob(jjy) , handleResize())}}}

var messageLock = true;
//stack all possible clientside messages here

function updateNews( message , lock) {
	if (messageLock)
		$( "#newsReel" ).html( message );
	
	messageLock = lock;
}
	
function achievementProgressBar() {
	$("#seagramMain").css("background-image", 'url(pics/fantagrape.png)' );
}

function updateCosts(){
	
	$( "#poorStudentCost" ).html("Poor Student : " + poorStudent + " <br> -" + poorStudentCost);
	$( "#programmerCost" ).html("Programmer: " + programmer + " <br> -" +programmerCost);
	$( "#vendingMachineCost" ).html("Vending Machine: " + vendingMachine+ " <br> -" + vendingMachineCost);
	$( "#factoryCost" ).html("Factory: " + factory + " <br> -" + factoryCost); 
}

function automaticProducers(){
	seagramsProduced = 0;
	//add in all productors
	seagramsProduced = poorStudents() + programmers() + vendingMachines() + factories();
	seagrams += seagramsProduced;
}

function poorStudents(){
	return (1/10) * poorStudent;
}

function programmers(){
	return (1/2) * programmer;
}

function vendingMachines(){
	return (5) * vendingMachine;
}

function factories(){
	return 20 * factory;
}

function numberWithCommas(x){
	var parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}
	
//change buttons stuff
function toggleNumberFloatOnOff(){
	numberFloatOnOff = !(numberFloatOnOff);
	$("#numberSwitch").prop('value', ( (numberFloatOnOff) ? 'Numbers OFF' : 'Numbers ON' ) );
}
	
function updateText(){
	$(".sodaCounter").html(numberWithCommas(Math.floor(seagrams))  + " seagrams+<br>per second: "+ numberWithCommas(Math.floor(seagramsPerSecond()))  );
	
	//update text in hover divs
	$("#poorStudent ul li span").html("[ owned : " + poorStudent + " ]");
	$("#programmer ul li span").html("[ owned : " + programmer + " ]");
	$("#vendingMachine ul li span").html("[ owned : " + vendingMachine + " ]");
	$("#factory ul li span").html("[ owned : " + factory + " ]");
	
	//update text in stats
	var statsStuff = 
		"<b style = 'line-height:150%; font-size: 13px;'>"+
		"Seagrams in the vault : <span style='color:white;'>"+numberWithCommas(Math.floor(seagrams))+"</span><br>"+
		"Total Seagrams conquered (this game) : <span style='color:white;'>"+seagramsProduced+"</span><br>"+
		"Total Seagrams conquered (all time) : <span style='color:white;'>"+"</span><br>"+
		"Game Started : <span style='color:white;'>"+"</span><br>"+
		"Things owned : <span style='color:white;'>"+"</span><br>"+
		"Seagrams per Second (sps) : <span style='color:white;'>"+"</span><br>"+
		"Seagrams per click : <span style='color:white;'>"+"</span><br>"+
		"Hand made Cans : <span style='color:white;'>"+"</span><br>"
	;
	$(".stats #statsStuff1").html(statsStuff);
	
	document.title = numberWithCommas(Math.floor(seagrams))+ " sodas - All hail Seagrams!";
	
	if (seagrams<poorStudentCost){
		$( "#poorStudent" ).css("background-color", "grey" );	
	} else { $( "#poorStudent" ).css("background-color", "#f1f1f1" ); }
	
	if (seagrams<programmerCost){
		$( "#programmer" ).css("background-color", "grey" );
	} else { $( "#programmer" ).css("background-color", "#f1f1f1"); }
	
	if (seagrams<vendingMachineCost){
		$( "#vendingMachine" ).css("background-color", "grey");	
	} else { $( "#vendingMachine" ).css("background-color", "#f1f1f1"); }
	
	if (seagrams<factoryCost){
		$( "#factory" ).css("background-color", "grey");	
	} else { $( "#factory" ).css("background-color", "#f1f1f1"); }
 }
 
 function updateCanvas(selector){
		//check without click canvas drawing
	if(poorStudent>0){
		canvasShow("poorStudentCanvas", poorStudent, 0);
	}
	if(programmer>0){
		canvasShow("programmerCanvas", programmer, 1);
	}
	if(vendingMachine>0){
		canvasShow("vendingMachineCanvas", vendingMachine, 2);
	}
	if(factory>0){
		canvasShow("factoryCanvas", factory, 3);
	}
 }

	var Buildings = new Object();
	function visualUpdate(){
	$("#visualBoard").html("");
	//poorStudent visualization for templating
	}

//the can click on load
 function playSound(soundfile) {
	document.getElementById("dummy").innerHTML=
	"<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\"/>";
 }

function AngerOfTheGods( you ){
	if ( you ) will();
	else carryOn();
}

function carryOn(){}

function will(){
	truth = false;
}

 //our number spawner function to print +1, +2, etc.
function sparklyNumber(number){
	var id = globalid++;
	var opa = 1;
	$("#seagramMain").append(" <div id= sparkly" + id +  ">"+ "+"+numberWithCommas(number)+ " </div>");
	var disdiv = document.getElementById("sparkly"+id);
	var position = $("#seagramMain").offset();
	var left = Math.floor((Math.random()*120)+20);
	var tops = Math.floor((Math.random()*50)+10);
	$("#sparkly"+id+"").css(position);
	$("#sparkly"+id+"").css("width", "20px");
	$("#sparkly"+id+"").css("height", "20px");
	$("#sparkly"+id+"").css("color", "#fff8d3");
	$("#sparkly"+id+"").css("font-size", "28px");
	$("#sparkly"+id+"").css("font-family",  'Kavoon');
	$("#sparkly"+id+"").css("opacity",  'opa');
	$("#sparkly"+id+"").css("position",  'fixed');
	$("#sparkly"+id+"").css("margin-left", left+"px" );
	$("#sparkly"+id+"").animate({top:'400px',
								opacity:"0"
	}, 1000, false);
	setTimeout(function(){ //Destroys the previous made div
		disdiv.parentNode.removeChild(disdiv);
	},1000);
	disdiv = null;
}

//Isaac, what the??
function clickAnimation(){}
	
//makes the numbers come out smooth, yo	
function setTimeoutForNumbers(){
	if(numberFloatOnOff){
		setTimeout(sparklyNumber(seagramsPerClick), 100);
	}
}

//determine canvas show
function canvasShow(selectionCanvas){
	$("#"+selectionCanvas).show();
	var x =2;
	//Math.floor((Math.random()*50)+10);
	var y =10+(Math.floor(Math.random()*20));
	var element = document.createElement("img");
	element.setAttribute("src", "pics/"+selectionCanvas+".png");
	element.setAttribute("height", "90");
	element.setAttribute("width", "45");
	element.setAttribute("top", "10");
	
	document.getElementById(selectionCanvas).appendChild(element);
	//blah[index]++;
	
}

function beginTwoTicksLate() {
	setInterval(function(){
		if (truth) {
		if (
			seagrams >
			((
			seagrams_minus_one + seagramsProduced)
			+
			(clickSinceLastTick * seagramsPerClick)
			)
		) AngerOfTheGods(truth);
		}
	},gameTicker*.75);	
}

//click mousedown function
function shopClick(selection){
	
	setTimeout(function(){
		$(selection).css("border-color",  'darkgrey');
	},100);
		$(selection).css("border-color",  'lightgrey');
}

/*
function hoverStatsOn(x){
setTimeout(function(){
	$(x).find("#stats").fadeIn();//css("display","block");
	x.onmouseout=function(){
		$(x).find("#stats").fadeOut();//css("display","block");
	};
	},100);
}*/

//checks it all the time - you mad?
$(document).ready(function(){
	//seagram click function
	$( "#seagramMain" ).click(function() {
		seagrams+=seagramsPerClick;
		clickSinceLastTick++;
		updateText();
		setTimeoutForNumbers();
	});	

	$("#statstag").mouseover(function(){
   		$("#statstag").animate({
        	height:'24px',
      		width:'80px'
    	}, 100);
	});

	$("#statstag").mouseout(function(){
   		$("#statstag").animate({
        	height:'24px',
      		width:'64px'
    	}, 100);
	});
	
	$("#menutag").mouseover(function(){
   		$("#menutag").animate({
        	height:'24px',
      		width:'80px'
    	}, 100);
	});

	$("#menutag").mouseout(function(){
   		$("#menutag").animate({
        	height:'24px',
      		width:'64px'
    	}, 100);
	});

	
	$("#seagramMain").mousedown(function(){
   		$("#seagramMain").animate({
        	height:'300px',
      		width:'200px'
    	}, 1);
	});	
	
	$("#seagramMain").mouseup(function(){
	 	$("#seagramMain").animate({
        	height:'315px',
      		width:'220px'
    	}, 1);
	});
	
	$("#seagramMain").mouseout(function(){
   		$("#seagramMain").animate({
        	height:'300px',
      		width:'200px'
    	}, 1);
	});	
	
	$("#seagramMain").mouseover(function(){
	 	$("#seagramMain").animate({
        	height:'315px',
      		width:'220px'
    	}, 1);
	});		
	//changing menus
	 $("#menutag").click(function(){
    	$(".stats").hide();
    	$(".visualize").hide();
    	$(".menu").show();
  	});
	$("#statstag").click(function(){
    	$(".menu").hide();
    	$(".visualize").hide();
    	$(".stats").show();
  	});
  				 
  	$(".stats #xtag").click(function(){
    	$(".menu").hide();
    	$(".stats").hide();
    	$(".visualize").show();
  	});
	
	$(".menu #xtag").click(function(){
    	$(".menu").hide();
    	$(".stats").hide();
    	$(".visualize").show();
  	});
	
	//buying functions
	$( "#poorStudent" ).click(function() {
	if (seagrams >= poorStudentCost) { seagrams -= poorStudentCost;
		poorStudent++;
		shopClick(this);
		canvasShow("poorStudentCanvas");
		poorStudentCost += Math.floor(0.28*poorStudentCost);
		updateCosts();  } //substract cost and add one, then increase the cost
	});	
	$( "#programmer" ).click(function() {
	if (seagrams >= programmerCost) { seagrams -= programmerCost;
		programmer++;
		shopClick(this);
		canvasShow("programmerCanvas");
		programmerCost += Math.floor(0.45*programmerCost);
		updateCosts(); } //substract cost and add one, then increase the cost
	});	
	$( "#vendingMachine").click(function() {
	if (seagrams >= vendingMachineCost) { seagrams -= vendingMachineCost;
		vendingMachine++;
		shopClick(this);
		canvasShow("vendingMachineCanvas");
		vendingMachineCost += Math.floor(0.533*vendingMachineCost);
		updateCosts(); } //substract cost and add one, then increase the cost
	});	
	$( "#factory" ).click(function() {
	if (seagrams >= factoryCost) { seagrams -= factoryCost;
		factory++;
		shopClick(this);
		canvasShow("factoryCanvas");
		factoryCost+=Math.floor(.85*factoryCost);
		updateCosts(); } //substract cost and add one, then increase the cost
	});		
});