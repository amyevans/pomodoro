$(document).ready(function() {
	var $subtractBreak = $('#subtractBreak'),
		$addBreak = $('#addBreak'),
		$subtractSession = $('#subtractSession'),
		$addSession = $('#addSession'),
		$clock = $('.clock'),
		$countdown = $('#countdown'),
		intervalID,
		sessionTime = 1500, // 25 minute default, 25 * 60 = 1500
		inSession = 1,
		formattedTime = '';


	// add time to session on click
	$addSession.on('click', function () {
		sessionTime += 60;
		displayTime(sessionTime);
	});

	// subtract time from session on click
	$subtractSession.on('click', function () {
		sessionTime -= 60;
		if (sessionTime < 0) { sessionTime = 0; }
		displayTime(sessionTime);
	});

	// if you click on the clock face, it sets the interval
	$clock.on('click', function () {
		// first check to see if in a Session or a Break
		if (inSession) {
			if (!intervalID) {
				// every 1000 milliseconds (1 sec), updateCountdown() is called
				intervalID = setInterval(updateCountdown, 1000);
			// pause the timer if it's clicked while running
			} else {
				clearInterval(intervalID);
				intervalID = 0;
			}
		} else {
			console.log('Currently in Break');
		}
	});

	function updateCountdown() {
		sessionTime -= 1;

		if (sessionTime <= 0) {
			sessionTime = 0;
			clearInterval(intervalID);
			// TO DO: switch to break here
			// maybe something like runBreak();
		}
		
		displayTime(sessionTime);
	}

	function displayTime(time) {
		formattedTime = formatTime(time);
		$countdown.html(formattedTime);
	}

	// take seconds and format for display (h:mm:ss or m:ss)
	function formatTime(seconds) {
		var hours = 0,
			minutes = 0;

		while ( seconds >= 3600 ) {
			hours += 1;
			seconds -= 3600;
		}
		while ( seconds >= 60 ) {
			minutes += 1;
			seconds -= 60;
		}

		var formattedMin = (minutes > 9) ? minutes : '0' + minutes;
		var formattedSec = (seconds > 9) ? seconds : '0' + seconds;

		if (hours) {
			formattedTime = hours + ':' + formattedMin + ':' + formattedSec;
		} else if (minutes) {
			formattedTime = minutes + ':' + formattedSec;
		} else {
			formattedTime = '0:' + formattedSec;
		}

		return formattedTime;
	}


});