(function() {

function Question(question, a1, a2, a3, a4, correctAnswer) {
	this.question = question;
	this.a1 = a1;
	this.a2 = a2;
	this.a3 = a3;
	this.a4 = a4;
	this.correctAnswer = correctAnswer
}

var q1 = new Question('What year was I born?', '1990', '1991', '1992', '1993', '1992')
var q2 = new Question('What year did I graduate?', '2000', '2010', '2011', '2012', '2011');

var newArray = [q1, q2];

document.getElementById("displayQuestions").innerHTML = newArray[0].question;


}())