// variables to keep track of quiz state
var activeQuiz = false;
var shuffledQuestions;
var currentQuestionIndex;
var button;
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
// var questions1 = ["Commonly used data types DO NOT include:", "The condition in an if / else statement is enclosed within ____.", "Arrays in JavaScript can be used to store ____.", "String values must be enclosed within ____ when being assigned to variables.", "A very useful tool used during development and debugging for printing content to the debugger is:"];
// var answerChoices = ["strings", "booleans", "alerts", "numbers", "quotes", "curly brackets", "parentheses", "square brackets", "numbers and strings", "other arrays", "booleans", "all of the above", "commas", "curly brackets", "quotes", "parentheses", "Javascript", "terminal / bash", "for loops", "console.log"];
// var correctAnswers = ["alerts", "parentheses", "all of the above", "quotes", "console.log"];

// variables to reference DOM elements
var startButton = document.querySelector("#start-button");
var intro = document.querySelector("#intro");
var questionAnswer = document.querySelector("#question-answer");
var questionText = document.querySelector("#question");
var answers = document.querySelector("#answers");
var answerButton = document.querySelectorAll(".answer-button");
// var nextButton = document.querySelector("#next-button");

//function to get the quiz going

startButton.addEventListener('click', startQuiz);
answers.addEventListener('click', function (event) {
  var event = event.target;
  evaluateAnswer(event.textContent.trim());
});

function startQuiz() {
  console.log('Started');
  intro.classList.add('hide');
  // shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionAnswer.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion () {
  clearQuestions();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionText.innerText = question.question;
  question.answers.forEach(answer => {
    button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('button', 'answer-button');
    answers.appendChild(button);
    // button.addEventListener('click', selectAnswer);
  })
  // currentQuestionIndex++;
  // setNextQuestion();
}

function evaluateAnswer (event) {
  // if the string that you click on is equal to 
  if (event === questions[currentQuestionIndex].correct) {
    console.log("You got it right!")
  } else {
    console.log("you got it wrong!")
  }
}

function clearQuestions() {
  // nextButton.classList.add('hide');
  while (answers.firstChild) {
    answers.removeChild(answers.firstChild)
  }
}

// function selectAnswer(i) {
//   var selectedButton = i.target;
//   var correct = selectedButton.dataset.correct;
//   setStatusClass(document.body, correct);
//   Array.from(answers.children).forEach(button => {
//     setStatusClass(button, button.dataset.correct);
//   })
// }

// function setStatusClass(element, correct) {
//   clearStatusClass(element)
//   if (correct) {
//     element.classList.add('correct');
//   } else {
//     element.classList.add('wrong');
//   }
// }

// function clearStatusClass(element) {
//   element.classList.remove('correct');
//   element.classList.remove('wrong');
// }

//function to pull each question
    //current question from questions
    //updated DOM elements to reflect the new question
    //clear old question choices
    //loop over answer choices (TIP: ForEach ;) ) 
    //create new button for each choice
    //event listener for each choice
    //display on the page

//function for the questionclick 
  //did the user guess right or wrong
  //wrong guess decreases time
  //display new time on the page
  //move to the next question
  //check if there are any questions left/you've run out

//function to end the quiz
  //stops timer
  //shows end screen
  //shows final score
  //hides questions section

 //function for the clock 
  //updates time
  //checks if user ran out of time 

//function to save the high score
  //get value of input box
  //make sure value isnt empty
  //get saved scores from localstorage, or if not any, set to empty array
  //format new score object for current user 
  //save to localstorage
  //redirect to next page




// user clicks button to submit initials


// user clicks button to start quiz
