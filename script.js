$(document).ready(function() {
	var $subtractBreak = $('#subtractBreak'),
		$addBreak = $('#addBreak'),
		$subtractSession = $('#subtractSession'),
		$addSession = $('#addSession'),
		$clock = $('.clock'),
		$countdown = $('#countdown'),
		intervalID,
		time = 1500, // 25 minute default, 25 * 60 = 1500
		formattedTime = '';


	// add time to session on click
	$addSession.on('click', function () {
		time += 60;
		displayTime();
	});

	// subtract time from session on click
	$subtractSession.on('click', function () {
		time -= 60;
		displayTime();
	});

	// if you click on the clock face, it sets the interval
	$clock.on('click', function () {
		if (!intervalID) {
			// every 1000 milliseconds (1 sec), updateCountdown() is called
			intervalID = setInterval(updateCountdown, 1000);
		// pause the timer if it's clicked while running
		} else {
			clearInterval(intervalID);
			intervalID = 0;
		}
	});

	function updateCountdown() {
		if (time <= 0) {
			clearInterval(intervalID);
		}
		time -= 1;
		displayTime();
	}

	function displayTime() {
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