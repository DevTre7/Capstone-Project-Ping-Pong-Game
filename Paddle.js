//Overall speed of the computer paddle
const SPEED = 0.02;

export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
    this.reset()
  }

  //Player 1 Paddle
  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue("--position")
    );
  }

  //
  set position(value) {
    this.paddleElem.style.setProperty("--position", value);
  }

  rect(){
    return this.paddleElem.getBoundingClientRect()
  }

//This "reset" function is used to reset the Paddles 
reset(){
  this.position = 50
}

  //Movement Pattern for Computer Paddle
  update(delta, ballHeight) {
    this.position += SPEED * delta * (ballHeight - this.position)
  }
}
