$(document).ready(function() {
	var $subtractBreak = $('#subtractBreak'),
		$addBreak = $('#addBreak'),
		$subtractSession = $('#subtractSession'),
		$addSession = $('#addSession'),
		$clock = $('.clock'),
		$countdown = $('#countdown'),
		intervalID,
		time = 121,
		formattedTime = '';

	// if you click on the clock face, it sets the interval
	$clock.on('click', function () {
		// every 1000 millisceonds (1 sec), updateCountdown() is called
		intervalID = setInterval(updateCountdown, 1000);
	});

	function updateCountdown() {
		formattedTime = formatTime(time);
		$countdown.html(formattedTime);
		time -= 1;
	}

	// take seconds and format for display (h:mm:ss or m:ss)
	function formatTime(seconds) {
		var hours = 0,
			minutes = 0;

		while ( seconds > 3600 ) {
			hours += 1;
			seconds -= 3600;
		}
		while ( seconds > 60 ) {
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