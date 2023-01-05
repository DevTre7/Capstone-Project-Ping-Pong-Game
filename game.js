//Update Loop
import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const player1Paddle = new Paddle(document.getElementById("player1-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));

let lastTime;
//This Function is basically a loop as it calls the "window.requestAnimationFrame()" function which calls the "update" function, pretty working as a Recursive Function
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta);
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

//This eventListener helps determine the position of paddle within the window (game arena) of the game
document.addEventListener("mousemove", e => {
  player1Paddle.position = (e.y / window.innerHeight) * 100;
});

window.requestAnimationFrame(update);
