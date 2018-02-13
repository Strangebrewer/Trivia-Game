// click start to start the game...
// starts the counter ticking down...
// When the timer hits zero, it displays "All Done!"
// below that, it displays:
// Correct Answers: 0
// Incorrect Answers: 5
// Unanswered: 8

// The game is a series of trivia questions with multiple choice answwers
// Each possible answer has a radio button
// You can only choose one radio button, so changing your answer should unclick the previous one. = ** handled in the HTML instead of in js **

// There should be a Done button at the bottom of the questions that does the same thing the timer does:
// When the timer hits zero, it displays "All Done!"
// below that, it displays:
// Correct Answers: 0
// Incorrect Answers: 5
// Unanswered: 8

var correctAnswers = 0;
var incorrectAnswers = 0;
var totalQuestions = 13;
var unansweredQuestions;
var clickDoneFlag = false;
var timerFlag = false;

function fadeOut(p1) {
  $(p1).css("animation", "fadeout 1.2s");
  $(p1).css("opacity", "0");
  setTimeout(function () {
    $(p1).css("display", "none");
  }, 1200)
}

function fadeIn(p1) {
  $(p1).css("animation", "fadein 1.4s");
  $(p1).css("opacity", "1");
  $(p1).css("display", "unset");
}

function tallyAnswers() {
  var radios = document.getElementsByClassName("radio-btn");
  for (i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      if (radios[i].value === "true") {
        correctAnswers++;
      }
      if (radios[i].value === "false") {
        incorrectAnswers++;
      }
    }
  }
  unansweredQuestions = totalQuestions - (correctAnswers + incorrectAnswers);
}

function reset() {
  correctAnswers = 0;
  incorrectAnswers = 0;
  unansweredQuestions = 0;
  clickDoneFlag = false;
}

function pushStats() {
  fadeOut("#q-container");
  $("#correct-answers").html(correctAnswers);
  $("#incorrect-answers").html(incorrectAnswers);
  $("#unanswered").html(unansweredQuestions);
  fadeIn("#stat-container");
}

document.getElementById("start-btn").addEventListener("click", function () {
  fadeOut("#start-btn");

  fadeIn("#q-container");

  document.getElementById("done-btn").addEventListener("click", function () {
    if (timerFlag === false) {
      clickDoneFlag = true;
      tallyAnswers();
      pushStats();
    }
  });

  setTimeout(function () {
    if (clickDoneFlag ===   false) {
      tallyAnswers();
      timerFlag = true;
    }
  }, 1000 * 5);

});