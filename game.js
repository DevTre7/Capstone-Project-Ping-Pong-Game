//Update Loop
import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const player1Paddle = new Paddle(document.getElementById("player1-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player1-score");
const computerScoreElem = document.getElementById("computer_score");

const playButton = document.querySelector(".playButton");

// the "lastTime" variable starts off initally as a placeholder.Then will gain value as time passes (since the launch of the game)
let lastTime;
//This Function is basically a loop as it calls the "window.requestAnimationFrame()" function which calls the "update" function, pretty working as a Recursive Function
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    //This line of code below is responsible allowing the ball to move:
    ball.update(delta, [player1Paddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);
    //This "const  hue" is referencing the color change from the "style.css"
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );
    //This "setProperty" allows the both paddles to change their "hue" color as time passes, relative to the launch of the game.
    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

    if (isLose()) {
      let winner = handleLose();
      console.log("someone lost");
      ball.reset();
      computerPaddle.reset();
    }
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

//This function is called whenever the ball is reaches out of bounds (or pass the parameter) of the paddles
function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}
//This function is for incrementing either the Player1 or the Computer Score based off when ball passes by either side's paddle (player1's or computer's)
function handleLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
    //The winnerDeclared function is called to display the popUp window dependent on whether player1 wins the game.
    winnerDeclared(playerScoreElem.textContent, computerScoreElem.textContent);
    console.log("player wins");
    return 1;
  } else if (rect.left <= 0) {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
    //The winnerDeclared function is called to display the popUp window dependent on whether the computer wins the game.
    winnerDeclared(playerScoreElem.textContent, computerScoreElem.textContent);

    console.log("computer wins");
    return 0;
  }
}

//This eventListener helps determine the position of paddle within the window (game arena) of the game
document.addEventListener("mousemove", (e) => {
  player1Paddle.position = (e.y / window.innerHeight) * 100;
});

//This "launchGame" function will display the actual game arena, as soon as the "playButton" ('Let's Play') is clicked on, hence the addtion of the "playButton.addEventListener" right outside the function itself.
function launchGame() {
  console.log("Hello");
  let main_menu = document.querySelector(".menu-box-border");
  let table = document.querySelector(".table");
  main_menu.style.display = "none";
  table.style.display = "inline-block";

  window.requestAnimationFrame(update);
}
playButton.addEventListener("click", launchGame);
//^When this "playButton.addEventListener" variable is invoked it will call the "launchGame" by the action of a "click" input

//The player's name that's inputed by the user
let userName;
//Create
let playerFinalScore;
let computerFinalScore;

//This function will display the winner of the game up until a certain score threshold. In this case the score threshold is up to 5 points
function winnerDeclared(playerScore, computerScore) {
  let playerScoreResults = +playerScore;
  let computerScoreResults = +computerScore;
  let highScore = 5;
  if (playerScoreResults >= highScore) {
    userName = prompt("Enter your name?");

    playerFinalScore = parseInt(playerScoreElem.textContent);
    computerFinalScore = parseInt(computerScoreElem.textContent);

    handleAddData(userName, playerFinalScore, computerFinalScore);

    //This is the message that will be displayed in the "alert" popup window if the "player1" user wins
    alert("Player 1 Wins");

    playerScoreElem.textContent = 0;
    computerScoreElem.textContent = 0;
    window.location.href = "./p1-LandingPage.html";
  } else if (computerScoreResults >= highScore) {
    playerFinalScore = parseInt(playerScoreElem.textContent);
    computerFinalScore = parseInt(computerScoreElem.textContent);

    handleAddData("computer", playerFinalScore, computerFinalScore);

    //This is the message that will be displayed in the "alert" popup window if the "computer" user/ paddle wins
    alert("Computer Wins");

    playerScoreElem.textContent = 0;
    computerScoreElem.textContent = 0;
    //This will go straight to the lanfing page, hence the begining the of the webpage
    // window.location.href = "./p1-LandingPage.html";
  } else {
    if (Math.max(playerScoreResults, computerScoreResults) === highScore) {
      //This will go straight to the lanfing page, hence the begining the of the webpage
      window.location.href = "./p1-LandingPage.html";
    } else {
      playButton.click();
    }
  }
}

let handleAddData = (username, playerpoints, computerpoints) => {
  let winby_points = playerpoints - computerpoints;
  console.log("Submit");

  axios
    .post("http://localhost:4000/addpoints", {
      username: username,
      playerpoints: playerpoints,
      computerpoints: computerpoints,
      winby_points: winby_points,
    })
    .catch((error) => console.log(error));
};

// fetch("http://localhost:4000/addpoints", {
//   username: "Micj",
//   playerpoints: 7,
//   computerpoints: 5,
//   winby_points: 2,
// }).catch((error) => console.log(error));
