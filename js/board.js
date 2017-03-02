const Cat = require("./cat");
const Util = require("./util");

class Board {

  constructor() {
    this.cats = [];
    this.catRate = .01;
    this.catRateIncrease = .000005;
    this.carpetHealth = 1000;
  }

  add(object) {
    if (object instanceof Cat) {
      this.cats.push(object);
  } else {
      throw "unknown type of object";
    }
  }

  addCat() {
    this.add(new Cat(this));
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Board.DIM_X, Board.DIM_Y);
    ctx.fillStyle = Board.BG_COLOR;
    ctx.fillRect(0, 0, Board.DIM_X, Board.DIM_Y);

    this.cats.forEach((object) => {
      object.draw(ctx);
    });
  }

  isOutOfBoundsY(pos) {
    return ((pos[1] < 0) || (pos[1] > Board.DIM_Y));
  }

  isOutOfBoundsX(pos) {
    return ((pos[0] < 0) || (pos[0] > Board.DIM_X));
  }

  moveCats(delta) {
    this.cats.forEach((cat) => {
      if (cat.moving){
        cat.move(delta);
      } else {
        this.carpetHealth -= cat.dmg
      }
    });
  }

  randomPosition() {
    return [
      Board.DIM_X,
      Board.DIM_Y * Math.random()
    ];
  }

  step(delta) {
    if (Math.random() < this.catRate){
      this.addCat();
    }
    this.moveCats(delta);
    if (this.carpetHealth <= 0) {
      this.gameOver
    }
    this.catRate += this.catRateIncrease;
  }

  remove(object) {
    if (object instanceof Cat) {
      this.cats.splice(this.cats.indexOf(object), 1);
    } else {
      throw "unknown type of object";
    }
  }

  bounce(pos) {
    return [
      pos[0], Util.bounce(pos[1], Board.DIM_Y)
    ];
  }

}

Board.BG_COLOR = "#000000";
Board.DIM_X = 1000;
Board.DIM_Y = 600;
Board.FPS = 32;

module.exports = Board;
