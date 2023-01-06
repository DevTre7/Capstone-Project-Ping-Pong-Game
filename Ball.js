const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.00001;

export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem;
    this.reset();
  }

  //Setting the x-axis position of the Ball
  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
  }

  set x(value) {
    this.ballElem.style.setProperty("--x", value);
  }

  //Setting the y-axis position of the Ball
  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
  }

  set y(value) {
    this.ballElem.style.setProperty("--y", value);
  }

  rect() {
    return this.ballElem.getBoundingClientRect();
  }

  reset() {
    this.x = 50;
    this.y = 50;
    //This serves as the direction of the Ball
    this.direction = { x: 0.75, y: 0.5 };
    //This while loop makes the direction of the ball to be an up & down motion and side-to-side:
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }

    this.velocity = INITIAL_VELOCITY;
  }

  update(delta, paddleRects) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    //"this.velocity" will make the ball accelerate as time passes, hence the implementation of "* delta" which is the difference of time that's passed since the launch of the game.
    this.velocity += VELOCITY_INCREASE * delta;
    const rect = this.rect();

    // The If statement allows the ball to bounce back from the top or bottom sides of our "rect", hence the "direction.y" (y-axis)
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }

    // The If statement allows the ball to bounce back from the right or left sides of our "rect" hence the "direction.x" (x-axis)
    //The function  loops through all through all the "paddle.rect"s (which is the '.' property of both individual paddle), and 
    //if any individual paddle returns "true" for the collision function, then it will return true for the whole board
    if (paddleRects.some((r) => isCollision(r, rect))) {
      this.direction.x *= -1;
    }
  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

//This function checks for any collision the parameters of both paddles, hence the "."propeties that correspond to each indiviual side of both paddles (rect 1 & rect 2)
function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  );
}
