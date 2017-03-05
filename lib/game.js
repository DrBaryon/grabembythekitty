const Cat = require("./cat");
const Util = require("./util");

class Game {

  constructor(canvas, stage) {
    this.canvas = canvas;
    this.stage = stage;
    this.fps = 5;

    this.cats = [];
    this.catRate = .1;
    this.catRateIncrease = .00005;

    this.carpetHealth = 1000;
    this.score = 0;

    this.addCat = this.addCat.bind(this);
    this.tick = this.tick.bind(this);
  }

  start() {
    let bg = new createjs.Shape();
    bg.graphics.beginFill("black").drawRect(0, 0, this.canvas.width, this.canvas.height - 200);
    this.stage.addChild(bg);
    let carpet = new createjs.Shape();
    carpet.graphics.beginFill("red").drawRect(0, 0, 100, this.canvas.height - 200);
    this.stage.addChild(carpet);
    let kitmo = new createjs.Shape();
    debugger
    kitmo.graphics.beginFill("grey").drawRect(this.canvas.width - 200, this.canvas.height - 200, 200, 200);
    this.stage.addChild(kitmo);

    createjs.Ticker.setFPS(this.fps)
    createjs.Ticker.addEventListener("tick", this.tick);

    this.stage.update();
  }

  tick(e) {
    if (Math.random() < this.catRate){
      this.addCat();
    }
    this.moveCats(e.delta);
    if (this.carpetHealth <= 0) {
      this.gameOver
    }
    this.catRate += this.catRateIncrease;
    console.log("Ticker running!")
    this.stage.update();
  }

  addCat() {
    let cat = new Cat(this);
    this.cats.push(cat);
    this.stage.addChild(cat.bmp);
    this.stage.update();
  }

  isOutOfBoundsY(pos) {
    return ((pos[1] < 0) || (pos[1] > this.canvas.height - 200));
  }

  isOutOfBoundsX(pos) {
    return ((pos[0] < 100) || (pos[0] > this.canvas.width));
  }

  moveCats(delta) {
    this.cats.forEach((cat) => {
      if (cat.moving){
        this.stage.removeChild(cat.bmp)
        cat.move(delta);
        this.stage.addChild(cat.bmp);
      } else {
        this.carpetHealth -= cat.dmg
        debugger
      }
    });
  }

  randomPosition() {
    return [
      this.canvas.width,
      this.canvas.height * Math.random()
    ];
  }

  bounce(pos) {
    return [
      pos[0], Util.bounce(pos[1], this.canvas.height)
    ];
  }

}

module.exports = Game;
