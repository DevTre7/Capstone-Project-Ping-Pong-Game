//Update Loop
import Ball from "./Ball.js";

const ball = new Ball(document.getElementById("ball"));

//This Function is basically a loop as it calls the "window.requestAnimationFrame()" function which calls the "update" function, pretty working as a Recursive Function

let lastTime;
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta);
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
