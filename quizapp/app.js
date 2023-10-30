var timeLeft = document.querySelector(".time-left");
var quizContainer = document.getElementById("container");
var nextBtn = document.getElementById("next-button");
var countOfQuestion = document.querySelector(".number-of-question");
var displayContainer = document.getElementById("display-container");
var scoreContainer = document.querySelector(".score-container");
var restart = document.getElementById("restart");
var userScore = document.getElementById("user-score");
var startScreen = document.querySelector(".start-screen");
var startButton = document.getElementById("start-button");
var questionCount;
var scoreCount = 0;
var count = 11;
var countdown;


var quizArray = [
  {
    id: "0",
    question: "What is the capital of Canada?",
    options: ["Toronto", "Ottawa", "Montreal", "Vancouver"],
    correct: "Ottawa",
  },
  {
    id: "1",
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"],
    correct: "Carbon Dioxide",
  },
  {
    id: "2",
    question: "What is the largest mammal on Earth?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Gorilla"],
    correct: "Blue Whale",
  },
];


restart.addEventListener("click", function () {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

nextBtn.addEventListener("click", function (displayNext) {
  
  questionCount += 1;

  if (questionCount == quizArray.length) {
    
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    // User score
    userScore.innerHTML =
      "Your score is " + scoreCount + " out of " + questionCount;
  } else {
  
    countOfQuestion.innerHTML =
      questionCount + 1 + " of " + quizArray.length + " Question";
    
    quizDisplay(questionCount);
    count = 11;
    clearInterval(countdown);
    timerDisplay();
  }
});


var timerDisplay = function () {
  countdown = setInterval(function () {
    count--;
    timeLeft.innerHTML = count + "s";
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};


var quizDisplay = function (questionCount) {
  var quizCards = document.querySelectorAll(".container-mid");

  quizCards.forEach(function (card) {
    card.classList.add("hide");
  });
 
  quizCards[questionCount].classList.remove("hide");
};


function quizCreator() {
  
  quizArray.sort(function () {
    return Math.random() - 0.5;
  });
  
  for (var _i = 0; _i < quizArray.length; _i++) {
   
    quizArray[_i].options.sort(function () {
      return Math.random() - 0.5;
    });
    
    var div = document.createElement("div");
    div.classList.add("container-mid", "hide");
  
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
  
    var question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = quizArray[_i].question;
    div.appendChild(question_DIV);
    // Options
    div.innerHTML +=
      '<button class="option-div" onclick="checker(this)">' +
      quizArray[_i].options[0] +
      "</button>" +
      '<button class="option-div" onclick="checker(this)">' +
      quizArray[_i].options[1] +
      "</button>" +
      '<button class="option-div" onclick="checker(this)">' +
      quizArray[_i].options[2] +
      "</button>" +
      '<button class="option-div" onclick="checker(this)">' +
      quizArray[_i].options[3] +
      "</button>";
    quizContainer.appendChild(div);
  }
}


function checker(userOption) {
  var userSolution = userOption.innerText;
  var question = document.getElementsByClassName("container-mid")[questionCount];
  var options = question.querySelectorAll(".option-div");


  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
   
    options.forEach(function (element) {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

 
  clearInterval(countdown);
 
  options.forEach(function (element) {
    element.disabled = true;
  });
}


function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

// When the user clicks the start button
startButton.addEventListener("click", function () {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

window.onload = function () {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
