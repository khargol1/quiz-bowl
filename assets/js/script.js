//Variables
var score = 0;
var startButtonEl = document.querySelector("#start"); //selecting id
var buttons = document.querySelectorAll(".btn"); //array of answer buttons gotten by class
var startScreen = document.querySelector(".start-screen");
var quizScreen = document.querySelector(".quiz-screen");

const TIME_LIMIT = 30;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
var seconds = 0;



var questions =[{  q: "What does scope refer to?",
                  a1: "My mouthwash.",
                  a2: "The current function.",
                  a3: "The space a variable is valid.",
                  a4: "Where code is written in a function.",
                  correct: 3},
                  {  q: "Which of the following is NOT a primitive variable?",
                  a1: "Boolean",
                  a2: "String",
                  a3: "Undefined",
                  a4: "Array",
                  correct: 4},
                  {  q: "Which of these is undefined.",
                  a1: "'String' + 'String'",
                  a2: "'Int' + 'Float'",
                  a3: "'Int' + 'String'",
                  a4: "'String' + 'Int'",
                  correct: 3},
                  {  q: "What is the wrong way to use comments?",
                  a1: "To express our rage.",
                  a2: "To document or explain sections of code.",
                  a3: "To add color to VS Code.",
                  a4: "To prove you wrote the code.",
                  correct: 2},
                  {  q: "When should a switch statement be used?",
                  a1: "When the alternative is many if statements.",
                  a2: "Always use switch instead of if statment.",
                  a3: "Only to replace an if {...} else then {...} statement.",
                  a4: "When trying to impress your boss.",
                  correct: 1}];



//Action Listeners
buttons.forEach((btn)=>{btn.addEventListener('click', answerClick)}); //adds event listners for array
startButtonEl.addEventListener('click', gameStart); //event listener for only start button

//Functions

function startTimer() {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      document.getElementById("time").innerHTML = formatTime(
        timeLeft
      );
      //setCircleDasharray();
      //setRemainingPathColor(timeLeft);
  
      if (timeLeft === 0) {
        gameOver();
      }
    }, 1000);
  }

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}  

//this function is only called after the first question is loaded.
function answerClick(event){
    if(questions.length == 0){
      gameOver();
      return;
    }

    let source = event.target.getAttribute('id');
    let correctAnswer = questions[0].correct;
    let wasCorrect = false;

    //determines if answer was correct
    if(source == 'answer1' && correctAnswer == 1){
      score += 10;
      wasCorrect = true;
    }
    if(source == 'answer2' && correctAnswer == 2){
      score += 10;
      wasCorrect = true;;
    }
    if(source == 'answer3' && correctAnswer == 3){
      score += 10;
      wasCorrect = true;
    }
    if(source == 'answer4' && correctAnswer == 4){
      score += 10;
      wasCorrect = true;
    }


    //displays correct or not
    if(wasCorrect){
      document.getElementById("correct-area").textContent = "Correct. Well Done!";
      document.getElementById("correct-area").style.display = "block";
    }else{
      document.getElementById("correct-area").textContent = "Sorry thats incorrect." ;
      document.getElementById("correct-area").style.display = "block";
      seconds -= 4;
      timePassed += 4;
      document.getElementById("time").innerHTML = '0:'+seconds;
    }
    questions.shift(); //shortens the questions
    loadQuestion(questions); //loads next question

}

function gameOver(){

    clearInterval(timerInterval);
    score = score + timeLeft; //bonus points for time left.
    localStorage.setItem("score", score);
    localStorage.setItem("new", "yes");
    window.location.href = "scores.html"; //works!
}
//loads question into buttons
function loadQuestion(questionsArray){
    //check to see array is empty
    if(questionsArray.length == 0){
      gameOver();
      return;
    }

    //Load question
    document.getElementById("question-area").innerHTML = questionsArray[0].q;
    buttons[0].innerHTML = questionsArray[0].a1;
    buttons[1].innerHTML = questionsArray[0].a2;
    buttons[2].innerHTML = questionsArray[0].a3;
    buttons[3].innerHTML = questionsArray[0].a4;

}

//called on game start button click
function gameStart(event){
    let source=event.target;
    console.log(source);

    //remove display of start page and display quiz screen
    document.getElementById("start-area").style.display = "none";
    document.getElementById("quiz-area").style.display = "block";
    document.getElementById("timer").style.display = "block";
    startTimer();
    loadQuestion(questions);   
}

//Pre-game sets all values and preps game.

//game start load questions, adjust css to make questions appear, start timer track score
//Use event listner to get button and validate answer. use object, 4 strings, correct choice boolean.

//while game not done, timer counts down, at quiz end or timer end finish game
//show stats screen, make text dialog box, save score and initials