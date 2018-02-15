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

window.onload = function () {
  document.getElementById("start-btn").addEventListener("click", quiz.startQuiz);
};


var correctAnswers = 0;
var incorrectAnswers = 0;
var totalQuestions = 13;
var timeRemaining = 121;
var unansweredQuestions;
var quizTimeout
var quizInterval;

// quiz object
var quiz = {

  fadeOut: function (p1) {
    $(p1).css("animation", "fadeout 1s");
    $(p1).css("opacity", "0");
    setTimeout(function () {
      $(p1).css("display", "none");
    }, 1000);
  }

  , fadeIn: function (p1) {
    setTimeout(function () {
      $(p1).css("animation", "fadein 1s");
      $(p1).css("opacity", "1");
      $(p1).css("display", "block");
    }, 1000);
  }

  , tallyAnswers: function () {
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

  , startQuiz: function () {
    $("#time-count").html(timeRemaining);
    quizInterval = setInterval(quiz.count, 1000);
    quiz.fadeOut("#start-btn");
    quiz.fadeIn("#quiz-container");
    quiz.fadeIn("#time-remaining");
    document.getElementById("done-btn").addEventListener("click", quiz.stopQuiz);
    quizTimeout = setTimeout(function () {
      quiz.tallyAnswers();
      $("#quiz-over").html("Time's Up!");
      quiz.pushStats();
      clearInterval(quizInterval);
    }, 1000 * 120);
  }

  , stopQuiz: function () {
    quiz.tallyAnswers();
    clearInterval(quizInterval);
    clearTimeout(quizTimeout);
    $("#quiz-over").css("display", "none");
    quiz.pushStats();
  }

  , reset: function () {
    correctAnswers = 0;
    incorrectAnswers = 0;
    unansweredQuestions = 0;
  }

  , pushStats: function () {
    quiz.fadeOut("#quiz-container");
    quiz.fadeOut("#time-remaining");
    $("#correct-answers").html("Correct Answers: " + correctAnswers);
    $("#incorrect-answers").html("Incorrect Answers: " + incorrectAnswers);
    $("#unanswered").html("Unanswered: " + unansweredQuestions);
    quiz.fadeIn("#stat-container");
  }

  , count: function () {
    timeRemaining--;
    console.log(timeRemaining);
    $("#time-count").html(timeRemaining);
  }
}
