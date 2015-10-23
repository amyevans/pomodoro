$(document).ready(function() {
	var $subtractBreak = $('#subtractBreak'),
		$addBreak = $('#addBreak'),
		$subtractSession = $('#subtractSession'),
		$addSession = $('#addSession'),
		$clock = $('.clock'),
		$countdown = $('#countdown'),
		sessionID,
		originalSession = +$('#sessionMin').html(),
		currentSession = originalSession * 60, // convert to seconds
		breakID,
		originalBreak = +$('#breakMin').html(),
		currentBreak = originalBreak * 60, // convert to seconds
		formattedTime = '',
		audio = new Audio('chime.mp3');

	// add time to session on click
	$addSession.on('click', function () {
		originalSession += 1;
		$('#sessionMin').html(originalSession);
		currentSession = originalSession * 60;
		displayTime(currentSession);
	});

	// subtract time from session on click
	$subtractSession.on('click', function () {
		// doesn't make sense to allow 0 time or negative time
		if (originalSession > 1) {
		originalSession -= 1;
		}
		$('#sessionMin').html(originalSession);
		currentSession = originalSession * 60;
		displayTime(currentSession);
	});

	// add time to break on click
	$addBreak.on('click', function () {
		originalBreak += 1;
		$('#breakMin').html(originalBreak);
		currentBreak = originalBreak * 60;
		if ($('#clockTitle').html() === 'Break!') {
			displayTime(currentBreak);
		}
	});

	// subtract time from break on click
	$subtractBreak.on('click', function () {
		// doesn't make sense to allow 0 time or negative time
		if (originalBreak > 1) {
			originalBreak -= 1;
		}
		$('#breakMin').html(originalBreak);
		currentBreak = originalBreak * 60;
		if ($('#clockTitle').html() === 'Break!') {
			displayTime(currentBreak);
		}
	});

	// if you click on the clock face, it sets the interval
	$clock.on('click', function () {
		// first check to see if in a Session or a Break
		if ($('#clockTitle').html() === 'Session') {
			if (!sessionID) {
				runSession();
			// pause the timer if it's clicked while running
			} else {
				clearInterval(sessionID);
				sessionID = 0;
			}
		} else { // ie, in Break
			if (!breakID) {
				runBreak();
			// pause the timer if it's clicked while running
			} else {
				clearInterval(breakID);
				breakID = 0;
			}
		}
	});

	function runSession() {
		$('#clockTitle').html('Session');
		displayTime(currentSession);
		// every 1000 milliseconds (1 sec), updateSession() is called
		sessionID = setInterval(updateSession, 1000);
	}

	function updateSession() {
		if (currentSession === 0) {
			resetTimer();
			runBreak();
		} else {
			currentSession -= 1;
			displayTime(currentSession);
		}
	}

	function runBreak() {
		$('#clockTitle').html('Break!');
		displayTime(currentBreak);
		// every 1000 milliseconds (1 sec), updateBreak() is called
		breakID = setInterval(updateBreak, 1000);
	}

	function updateBreak() {
		if (currentBreak === 0) {
			resetTimer();
			runSession();
		} else {
			currentBreak -= 1;
			displayTime(currentBreak);
		}
	}

	function resetTimer() {
		audio.play();
		clearInterval(sessionID);
		sessionID = 0;
		clearInterval(breakID);
		breakID = 0;
		currentSession = originalSession * 60;
		currentBreak = originalBreak * 60;
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