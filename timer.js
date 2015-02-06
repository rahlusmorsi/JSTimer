// initialize variables

var whenStarted = 0;
var intervalHandle;
var display;
var lapTime;

$(document).ready(function(e) {

	$("#btn_start").click(function() {
		if (whenStarted == 0){
			startClock();
		}
	});

	$("#btn_stop").click(function() {
	  stopClock();
	});

	$("#btn_lap").click(function() {
		if (whenStarted > 0){
			recordLap();
		}
	});

	$("#btn_reset").click(function() {
	  resetClock();
	});

});


function startClock() {
	var timestamp = new Date();

	whenStarted = timestamp.getTime(); // is the ms since 1970

	intervalHandle = setInterval(updateStuff, 183); // about 5 
}

function updateStuff() {
	var timestamp = new Date();

	var elapsed = timestamp.getTime() - whenStarted; // ms since the startClock was fired

	var formattedTime =
	pad2(Math.floor(elapsed/60/60/1000)) + ':' +   // hours
	pad2(( Math.floor(elapsed/60/1000)%60 )) + ':' + // minutes
	pad2(( Math.floor(elapsed/1000)%60 )) + ':' +    // seconds
	pad2(( Math.floor(elapsed/10)%100 ));            // hundreth seconds

	display = document.getElementById('display');
	display.innerHTML = formattedTime;

	lapTime = formattedTime;

}

function stopClock() {
	//updateStuff();
	whenStarted = 0;
	clearInterval(intervalHandle);
}

function recordLap(){

	var lapArea = document.getElementById('laps');
	var newLap = document.createElement('div');
	newLap.innerHTML = lapTime + '<br>';

	while (newLap.firstChild) {
        laps.appendChild(newLap.firstChild);
    }
}

function resetClock(){
	stopClock();
	
	display = document.getElementById('display');
	display.innerHTML = '00:00:00:00';
	
	lapTime = document.getElementById('laps');
	lapTime.innerHTML = '';
}

function pad2(number) {
     return (number < 10 ? '0' : '') + number  
}