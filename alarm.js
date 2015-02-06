var minutesInMilli;
var alarmGoesOff;
var timeLeft;

var clockSpeed = 1000; // in milliseconds
var sound = "sound/babyrattle.wav";

$(document).ready(function(){

	$('#btn_alarm_start').click(function(){
		
		var minutes = $('#minutes').val();
		var specific_time = $('#specific_time').val();

		if (minutes.length > specific_time.length){
			minutesInMilli = minutes * 60 * 1000;
			countDown('minutes');
		}
/*		else{
			console.log(specific_time);
			countDown();			
		}
*/
	});

	loadAudio(sound);

});

function countDown(mode){
	var timestamp = new Date();

	whenStarted = timestamp.getTime(); // is the ms since 1970

	if (mode == 'minutes'){
		alarmGoesOff = whenStarted + minutesInMilli;		
	}
/*	else{
		alarmGoesOff = ''; //placeholder for the alarm going off at specific time
	}
*/

	intervalHandle = setInterval(function(){

		var newTimestamp = new Date();
		
		var now = newTimestamp.getTime()

		if ( alarmGoesOff > now){
			timeLeft = alarmGoesOff - now;
	
			var formattedTime =
				pad2(Math.floor(timeLeft/60/60/1000)) + ':' +   // hours
				pad2(( Math.floor(timeLeft/60/1000)%60 )) + ':' + // minutes
				pad2(( Math.floor(timeLeft/1000)%60 ));			   // seconds
		
			display = document.getElementById('alarm_display');
			display.innerHTML = formattedTime;
		}
		else{
			//document.getElementById("sound").innerHTML="<embed src='"+sound+"' hidden=true autostart=true loop=false>";
			document.getElementById("sound").innerHTML="<audio autoplay='autoplay'><source src='"+sound+"' type='audio/wav'></audio>";
			clearInterval(intervalHandle);
			display.innerHTML = "00:00:00";
			return;
		}
		
	}, clockSpeed);
	
}

function loadAudio(sound){
    var audio = new Audio();
    audio.addEventListener('canplaythrough', isAppLoaded, false); // It works!!
    audio.src = sound;
    return audio;
}
function isAppLoaded(){
    filesLoaded++;
    if (filesLoaded >= filesToLoad) main();
}
