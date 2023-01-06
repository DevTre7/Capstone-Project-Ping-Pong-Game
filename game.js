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

    if (isLose()) handleLose();
    console.log("lose");
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
    console.log("player wins");
  } else if (rect.left <= 0) {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
    console.log("computer wins");
  }
  ball.reset();
  computerPaddle.reset();
}

//This eventListener helps determine the position of paddle within the window (game arena) of the game
document.addEventListener("mousemove", (e) => {
  player1Paddle.position = (e.y / window.innerHeight) * 100;
});

function launchGame() {
  console.log("Hello");
  let main_menu = document.querySelector(".menu-box-border");
  let table = document.querySelector(".table");
  main_menu.style.display = "none";
  table.style.display = "inline-block";

  window.requestAnimationFrame(update);
}

playButton.addEventListener("click", launchGame);
