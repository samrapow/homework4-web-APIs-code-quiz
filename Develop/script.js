// variables to keep track of quiz state
var activeQuiz = false;
var shuffledQuestions;
var currentQuestionIndex;
var button;
var secondsLeft = 60;
var endGame;
var missedQuestion;
var saveScore;
var saveInitials;
var highscoreList = {};
var stopGame = false;
var memScores;
var questions = [
  {
    question:"Commonly used data types DO NOT include:" ,
    answers: [
      {text: "strings"},
      {text: "booleans"},
      {text: "alerts"},
      {text: "numbers"}
    ],
    correct:"alerts"
  },
  {
    question:"The condition in an if / else statement is enclosed within ____." ,
    answers: [
      {text: "quotes"},
      {text: "curly brackets"},
      {text: "parentheses"},
      {text: "square brackets"}
    ],
    correct: "parentheses"
  },
  {
    question:"Arrays in JavaScript can be used to store ____." ,
    answers: [
      {text: "numbers and strings"},
      {text: "other arrays"},
      {text: "booleans"},
      {text: "all of the above"}
    ],
    correct: "all of the above"
  },
  {
    question:"String values must be enclosed within ____ when being assigned to variables." ,
    answers: [
      {text: "commas"},
      {text: "curly brackets"},
      {text: "quotes"},
      {text: "parentheses"}
    ],
    correct: "quotes"
  },
  {
    question:"A very useful tool used during development and debugging for printing content to the debugger is:" ,
    answers: [
      {text: "Javascript"},
      {text: "terminal / bash"},
      {text: "for loops"},
      {text: "console.log"}
    ],
    correct: "console.log"
  }
]

// variables to reference DOM elements
var startButton = document.querySelector("#start-button");
var intro = document.querySelector("#intro");
var questionAnswer = document.querySelector("#question-answer");
var questionText = document.querySelector("#question");
var answers = document.querySelector("#answers");
var answerButton = document.querySelectorAll(".answer-button");
var feedback = document.querySelector("#feedback");
var conclusion = document.querySelector("#conclusion");
var timeLeft = document.querySelector("#time-counter");
var finalScore = document.querySelector("#score");
var submitScore = document.querySelector("#submit");
var highscoresPage = document.querySelector("#highscores");
var listHighScores = document.querySelector("#highscores-list");
var initials = document.querySelector("#initials");
var printInitials = document.querySelector("#print-initials");
var goBack = document.querySelector("#go-back");
var clearScores = document.querySelector("#clear-highscores");
var jumpToHighScores = document.querySelector("#view-highscores");



// Timer
function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeLeft.textContent = "Time: " + secondsLeft;

    // Take off 10 seconds if a question is missed
    if (missedQuestion === false) {
      secondsLeft-= 10;
      missedQuestion = true;
    } 

    // If the questions end or there are 0 seconds left, stop the timer and go to the conclusion page
    if (secondsLeft === 0 || endGame === true) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      gameOver();
      // Calls function to create and append image
    }

    // Stop execution if 'view highscores' is clicked
    if (stopGame) {
      stopGame = false;
      clearInterval(timerInterval);
      secondsLeft = 60;
      timeLeft.textContent = "Time: " + secondsLeft;
      feedback.textContent = "";
    }

  }, 1000);
}


//Event listeners for all buttons

submitScore.addEventListener('click', showHighscores);

startButton.addEventListener('click', startQuiz);

answers.addEventListener('click', function (event) {
  var event = event.target;
  evaluateAnswer(event.textContent.trim());
  setNextQuestion();
});

goBack.addEventListener('click', restart);

clearScores.addEventListener('click', clearMemory)

jumpToHighScores.addEventListener('click', highScoreLink);


// When someone clicks on 'view highscores'
function highScoreLink () {
  stopGame = true;
  conclusion.classList.add("hide");
  intro.classList.add("hide");
  questionAnswer.classList.add("hide");
  highscoresPage.classList.remove("hide");

}

// When someone clicks 'Go Back'
function restart () {
  highscoresPage.classList.add("hide");
  intro.classList.remove("hide");
  timeLeft.textContent = "Time: 60";
  secondsLeft = 60;
  feedback.textContent = "";
}

// When someone clicks 'Clear Highscores'
function clearMemory () {
  localStorage.clear();
  highscoreList = [];
  listHighScores.textContent = "";
}



// To start the quiz
function startQuiz() {
  stopGame = false;
  setTime();
  console.log('Started');
  intro.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionAnswer.classList.remove('hide');
  setNextQuestion();
  endGame = false;
}

// log when there's input in the initials box and grab initials
window.onload = function() {
  initials.addEventListener("input", function () {
    console.log(initials.value);
    saveInitials = initials.value;
  }); 
}

// Once someone submits their initials
function showHighscores() {
  createHighScoreList();
  conclusion.classList.add("hide");
  highscoresPage.classList.remove("hide");
  memScores = JSON.parse(localStorage.getItem("score"));
  displayHighScores(memScores);
}

// Display scores from memory
function displayHighScores (score) {
  listHighScores.textContent = "";
  for (i=0; i < score.length; i++ ) {
    listScore = document.createElement('h2');
    listScore.innerText = score[i].Initials + " : " + score[i].Score;
    listHighScores.appendChild(listScore);
  };
}

// Check if there are existing high scores
function createHighScoreList() {
  if (Object.keys(highscoreList).length === 0) {
    console.log("Empty");
    highscoreList = [
      {     
        "Score": saveScore,
        "Initials": saveInitials
      }
    ];
    localStorage.setItem("score", JSON.stringify(highscoreList));
  } else {
    console.log("Not Empty");
    highscoreList.push({"Score" : saveScore, "Initials" : saveInitials});
    localStorage.setItem("score", JSON.stringify(highscoreList));
  }
}

// To put the score into local memory
function saveScores () {
  localStorage.setItem("score", JSON.stringify(highscoreList));
}

// To move from one question to the next
function setNextQuestion () {
  clearQuestions();
  showQuestion(questions[currentQuestionIndex]);
}

// To get the question buttons created and populated
function showQuestion(question) {
  questionText.innerText = question.question;
  question.answers.forEach(answer => {
    button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('button', 'answer-button');
    answers.appendChild(button);
  })
}

// Determine if answer is correct or incorrect
function evaluateAnswer (event) {
  // if the string that you click on is equal to 
  if (currentQuestionIndex === (questions.length - 1) && event === questions[currentQuestionIndex].correct) {
    endGame = true;
    gameOver();
  } else if (currentQuestionIndex === (questions.length - 1) && event !== questions[currentQuestionIndex].correct) {
    missedQuestion = false;
    endGame = true;
    gameOver();
  }
  else if (event === questions[currentQuestionIndex].correct) {
    console.log("You got it right!");
    console.log(currentQuestionIndex);
    feedback.innerHTML = "Correct!";
    currentQuestionIndex++;
  } else {
    console.log("you got it wrong!");
    console.log(currentQuestionIndex);
    feedback.innerHTML = "Wrroonnnggg!";
    missedQuestion = false;
    currentQuestionIndex++;
  }
}

// Once the game ends
function gameOver() {
  questionAnswer.classList.add('hide');
  conclusion.classList.remove('hide');
  timeLeft.textContent = "Time: " + secondsLeft
  finalScore.textContent = "Final score: " + secondsLeft;
  saveScore = secondsLeft;
}

// Remove existing questions
function clearQuestions() {
  while (answers.firstChild) {
    answers.removeChild(answers.firstChild)
  }
}