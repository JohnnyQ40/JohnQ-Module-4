//Construct variables. const for non changing variables, let for variables that will be updated.
const startBtn = document.getElementById("startBtn");
const quiz = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const endScreen = document.getElementById("endScreen");
const finalScoreElement = document.getElementById("finalScore");
const initialsInput = document.getElementById("initials");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const timerElement = document.getElementById("timer");
const highScoresList = document.getElementById("highScoresList");
let highScores = [];

const questions = [
{ question: "Javascript is an ______ language?",
   choices: ["A. Object-Oriented", "B. Object-Based", "C. Procedural", "D. None of the Above"],
    answer: "A. Object-Oriented" 
    },
{ question: "Which of the following keywords is used to define a variable in Javascript??",
    choices: ["A. var", "B. let", "C. Both A and B", "D. Neither of the above"],
     answer: "C. Both A and B" 
     },
{ question: "Which one of the following also known as Conditional Expression?",
     choices: ["A. Alternative to if-else", "B. Switch Statement", "C. If-then-else statement", "D. Immediate if"],
      answer: "D. Immediate if" 
      },
{ question: "Arrays in JavaScript are defined by which of the following statements?",
      choices: ["A. It is an ordered list of values", "B. It is an ordered list of objects", "C. It is an ordered list of string", "D. It is an ordered list of functions"],
       answer: "A. It is an ordered list of values" 
       },
{ question: "Which of the following is not javascript data types?",
   choices: ["A. Null type", "B. Undefined type", "C. Number type", "D. All of the mentioned"],
    answer: "D. All of the mentioned" 
    },
{ question: "Which of the following scoping type does JavaScript use?",
     choices: ["A. Sequential", "B. Segmental", "C. Lexical", "D. Literal"],
      answer: "C. Lexical" 
      },
{ question: "What is the basic difference between JavaScript and Java?",
   choices: ["A. Functions are considered as fields", "B. Functions are values, and there is no hard distinction between methods and fields", "C. Variables are specific", "D. There is no difference"],
    answer: "B. Functions are values, and there is no hard distinction between methods and fields" 
    },
{ question: "Which of the following methods/operation does javascript use instead of "==" and "!="?",
   choices: ["A. JavaScript uses equalto()", "B. JavaScript uses equals() and notequals() instead", "C. JavaScript uses bitwise checking", "D. JavaScript uses === and !== instead"],
    answer: "D. JavaScript uses === and !== instead" 
    },
{ question: "Why event handlers is needed in JS?",
   choices: ["A. Allows JavaScript code to alter the behaviour of windows", "B. Adds innerHTML page to the code", "C. Change the server location", "D. Performs handling of exceptions and occurrences"],
    answer: "A. Allows JavaScript code to alter the behaviour of windows" 
    },
];
//resetting score and time to starting values
let currentQuestionIndex = 0;
let timeRemaining = 60;
let timer;
let score = 0;
//function to begin quiz
function startQuiz() {
  startBtn.style.display = "none";
  quiz.style.display = "block";
  timer = setInterval(updateTime, 1000);
  displayQuestion();
}
//function to update time
function updateTime() {
    timeRemaining--;
    timerElement.textContent = `Time Remaining: ${timeRemaining}`;
    if (timeRemaining <= 0) {
      gameOver();
    }
  }

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.innerText = question.question;
  choicesElement.innerHTML = "";

  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.innerText = `${index + 1}. ${choice}`;
    button.addEventListener("click", () => handleAnswer(choice));
    choicesElement.appendChild(button);
  });
}
//checks answers
function handleAnswer(choice) {
  const correctAnswer = questions[currentQuestionIndex].answer;
  if (choice === correctAnswer) {
    score++;
  } else {
    timeRemaining -= 10;
  }
//checks to see if there are more questions, otherwise end the game
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    gameOver();
  }
}
//ends game
function gameOver() {
  clearInterval(timer);
  quiz.style.display = "none";
  endScreen.style.display = "block";
  finalScoreElement.innerText = score;
}
startBtn.addEventListener("click", startQuiz);

function saveScore() {
    const initials = initialsInput.value.toUpperCase();
    const newScore = { initials, score };
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    displayHighScores();
  }
  
  function displayHighScores() {
    highScoresList.innerHTML = '';
    highScores.forEach((highScore) => {
      const li = document.createElement('li');
      li.textContent = `${highScore.initials}: ${highScore.score}`;
      highScoresList.appendChild(li);
    });
  }
  saveScoreBtn.addEventListener("click", saveScoreAndReset);
  //on game end, saves score and resets quiz
  function saveScoreAndReset() {
    saveScore();
    resetQuiz();
    displayFirstScreen();
  }
  //sets quiz back to start
  function resetQuiz() {
    currentQuestionIndex = 0;
    timeRemaining = 60;
    score = 0;
    timerElement.textContent = `Time Remaining: ${timeRemaining}`;
  }
  //displays initial quiz screen
  function displayFirstScreen() {
    endScreen.style.display = "none";
    startBtn.style.display = "block";
  }