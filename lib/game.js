const Cat = require("./cat");
const Util = require("./util");

class Game {

  constructor() {
    this.cats = new createjs.Container();
    this.catRate = .01;
    this.catRateIncrease = .000005;

    this.carpetHealth = 1000;
    this.score = 0;

    this.addCat = this.addCat.bind(this);

  }

  addCat() {
    let cat = new Cat(this);
    debugger
    this.cats.addChild(cat);
  }

  isOutOfBoundsY(pos) {
    return ((pos[1] < 0) || (pos[1] > Game.DIM_Y));
  }

  isOutOfBoundsX(pos) {
    return ((pos[0] < 0) || (pos[0] > Game.DIM_X));
  }

  moveCats(delta) {
    this.cats.children.forEach((cat) => {
      if (cat.moving){
        cat.move(delta);
      } else {
        this.carpetHealth -= cat.dmg
      }
    });
  }

  randomPosition() {
    return [
      Game.DIM_X,
      Game.DIM_Y * Math.random()
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

  bounce(pos) {
    return [
      pos[0], Util.bounce(pos[1], Game.DIM_Y)
    ];
  }

}

Game.BG_COLOR = "black";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;

module.exports = Game;
