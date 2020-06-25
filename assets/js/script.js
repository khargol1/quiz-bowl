//Variables
var score = 0;
var startButtonEl = document.querySelector("#start"); //selecting id
var buttons = document.querySelectorAll(".btn"); //array of answer buttons gotten by class
var startScreen = document.querySelector(".start-screen");
var quizScreen = document.querySelector(".quiz-screen");

const TIME_LIMIT = 10;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

//need to load an array w/ questions after working
var questionObj ={
    q: "sample question",
    a1: "sample answer 1",
    a2: "sample answer 2",
    a3: "sample answer 3",
    a4: "sample answer 4",
    correct: 0
};

console.log(startScreen)
console.log(quizScreen);
console.log(startButtonEl);
console.log(buttons);

//Action Listeners
buttons.forEach((btn)=>{btn.addEventListener('click', testThis)}); //adds event listners for array
startButtonEl.addEventListener('click', gameStart);

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
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}  

function testThis(event){
    let source = event.target;
    console.log(source);
   
}

function gameOver(){
    clearInterval(timerInterval);
}
//loads question into buttons
function loadQuestion(questionObject){
    document.getElementById("question-area").innerHTML = questionObject.q;
    buttons[0].innerHTML = questionObject.a1;
    buttons[1].innerHTML = questionObject.a2;
    buttons[2].innerHTML = questionObject.a3;
    buttons[3].innerHTML = questionObject.a4;
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
    
    
    loadQuestion(questionObj);
    

    
    //start timer
    
    //on timer end or game end go to scoreboard
}

//Pre-game sets all values and preps game.

//game start load questions, adjust css to make questions appear, start timer track score
//Use event listner to get button and validate answer. use object, 4 strings, correct choice boolean.

//while game not done, timer counts down, at quiz end or timer end finish game
//show stats screen, make text dialog box, save score and initials