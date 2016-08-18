(function() {

var questions = [{
	question: "What is 2*5?",
	choices: [2,5,10,15],
	correctAnswer: 2
}, {
	question: "What is 3*6?",
	choices: [8, 12, 18, 24],
	correctAnswer: 2
}, {
	question: "What is 10*5?",
	choices: [15, 25, 40, 50],
	correctAnswer: 3
}];

var questionCounter = 0; // tracks question number
var selections = []; // array containing answers users selected
var quiz = $('#quiz'); // quiz div object

displayNext();

// click handler for next button
$('#next').on('click', function(e) {
	e.preventDefault();

	// suspend click listener during fade animation
	if(quiz.is(':animated')) {
		return false;
	}
	choose();

	// if no user selection, progress is stopped
	if (isNaN(selections[questionCounter])) {
		alert('Please make a selection before hitting next');
	} else {
		questionCounter++;
		displayNext();
	}
})

//click handler for prev button
$('#prev').on('click', function(e) {
	e.preventDefault();

	if(quiz.is(':animated')) {
		return false;
	}
	choose();
	questionCounter--;
	displayNext();
});

// click handler for the start over button
$('#start').on('click', function(e) {
	e.preventDefault();

	if(quiz.is(':animated')) {
		return false;
	}
	questionCounter = 0;
	selections = [];
	displayNext();
	$('#start').hide();
})

function createQuestionElement(index) {
	var qElement = $('<div>', {
		id: 'question'
	});

	var header = $('<h2>Question ' + (index + 1) + ':</h2');
	qElement.append(header);

	var question = $('<p>').append(questions[index].question);
	qElement.append(question);

	var radioButtons = createRadios(index); // creates all answers with radio buttons
	qElement.append(radioButtons); // appends all answers to div

	return qElement;
}

function createRadios(index) {
	var radioList = $('<ul>');
	var item;
	var input = '';

	// loops through questions and creates radio buttons for each
	for (var i = 0; i < questions[index].choices.length; i++) {
		item = $('<li>');
		input = '<input type="radio" name="answer" value=' + i + ' />';
		input += questions[index].choices[i];
		item.append(input); // appends each answer to a li element
		radioList.append(item);// appends all answers to ul
	}

	return radioList; // returns ul with all answers within it
}

function displayNext() {
	quiz.fadeOut(function() {
		$('#question').remove();

		// checks to make sure there are questions left
		if(questionCounter < questions.length) {
			var nextQuestion = createQuestionElement(questionCounter);
			quiz.append(nextQuestion).fadeIn();
			if (!(isNaN(selections[questionCounter]))) {
				$('input[value='+selections[questionCounter]+']').prop('checked', true);
			}

			// controls the prev button
			if(questionCounter === 1) {
				// shows the previous button if there is a question to go back to
				$('#prev').show();
				$('#start').show();
			} else if(questionCounter === 0) {
				// hides prev button and shows next button to start
				$('#prev').hide();
				$('#start').hide();
				$('#next').show();
			}
		}else {
				var scoreElem = displayScore();
				quiz.append(scoreElem).fadeIn();
				// hides next and prev button and shows start button
				$('#next').hide();
				$('#prev').hide();
			}
	});
}

function choose() {
	selections[questionCounter] = +$('input[name="answer"]:checked').val();
}

function displayScore() {
	var score = $('<p>',{id: 'question'});

	var numCorrect = 0; // starts off at 0
	for (var i = 0; i < selections.length; i++) {
		// adds 1 to numCorrect if the selection and the correctAnswer match
		if (selections[i] === questions[i].correctAnswer) {
			numCorrect++
		}
	}

	score.append('You got ' + numCorrect + ' questions out of ' + questions.length + ' right!');
	return score;
}

}())