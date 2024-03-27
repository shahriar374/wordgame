let currentWord, currentPoint = 0;
let typeWordBox = document.getElementById("typeWordBox");

function generateWord() {
	let idx = Math.floor(Math.random() * words.length);
	document.getElementById("displayWordBox").innerHTML = words[idx];
	currentWord = words[idx];
}

function pointUpdate(x) {
	if (x != 0) {
		document.getElementById("pnt").innerHTML = "Point: <i class='point'>" + x + "</i><p id='pnt-updt-inc'>+1</p>";
	} else {
		document.getElementById("pnt").innerHTML = "Point: " + x;
	}

	// Removing the point update indicator
	setTimeout(function(){
        document.getElementById("pnt-updt-inc").remove();
    },500);
}

function validation(x) {
	if (x == currentWord) {
		currentPoint++;
		pointUpdate(currentPoint);
		generateWord();
		// Clearing the input field
		typeWordBox.value = '';
	}
}


let totalGameTime = 60;	// In seconds

let timer;

function startGame(x) {
	// Setting totalGametime variable from user input
	var customTimerWrapper = document. getElementById('custom-timer-wrapper');
	var customTimerField = document. getElementById('custom-timer-input');
	if (customTimerField.value <= 0) {
		totalGameTime = 0;
	} else {
		totalGameTime = customTimerField.value;
	}

	// Hiding Custom timer box on game start
	customTimerWrapper.style.display = "none";

	gameTimer();
	timer = setInterval(gameTimer, 1000);
	typeWordBox.style.display = "block";
	typeWordBox.focus();

	var btn;

	// Generating the word
	generateWord();

	// If x is 1, that means game is restarting, if 0, it's initial game
	if (x == 1) {
		btn = document.getElementById("rst");
		currentPoint = 0;
		pointUpdate(0);
		typeWordBox.value = '';
	} else if (x == 0) {
		btn = document.getElementById("str");
	}
	btn.remove(); 
}


// Timing calculation
let t = 0;

function gameTimer() {
  t++;
  document.getElementById("countdown").innerHTML = "Time: " +  t;
  if (t == totalGameTime) {
  	t = 0;
  	clearInterval(timer);
  	document.getElementById("countdown").innerHTML = "<p style='color: #33186B;'>Times up!</p>";
	typeWordBox.style.display = "none";

  	// Reset Button
  	document.getElementById("countdown").insertAdjacentHTML("afterend", "<button id='rst' onclick='startGame(1)'>Reset</button>");

	// Reappear the custom timer input
	var customTimerWrapper = document. getElementById('custom-timer-wrapper');
	customTimerWrapper.style.display = "block";
  }
}