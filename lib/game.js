const Cat = require("./cat");
const Util = require("./util");

const bgImg = new Image();
bgImg.src = './lib/images/bg.jpeg';

class Game {

  constructor(canvas, stage) {
    this.canvas = canvas;
    this.stage = stage;
    this.fps = 30;

    this.cats = [];
    this.catRate = .01;
    this.catRateIncrease = .000005;
    // this.hombreRate = .001;
    // this.hombreRateIncrease = .000001;

    this.carpetHealth = new createjs.Text('1000', 'bold 20px Arial', 'black');
    this.score = new createjs.Text('0', 'bold 20px Arial', 'black');

    this.addCat = this.addCat.bind(this);
    this.tick = this.tick.bind(this);
  }

  start() {
    let bg = new createjs.Shape();
    bg.graphics.beginFill("black").drawRect(0, 0, this.canvas.width, this.canvas.height - 200);
    // bg.graphics.drawRect(0, 0, this.canvas.width, this.canvas.height - 200).beginBitmapFill(bgImg);
    let carpet = new createjs.Shape();
    carpet.graphics.beginFill("red").drawRect(0, 0, 100, this.canvas.height - 200);
    let kitmo = new createjs.Shape();
    kitmo.graphics.beginFill("grey").drawRect(this.canvas.width - 200, this.canvas.height - 200, 200, 200);
    this.stage.addChild(bg, carpet, kitmo);

    this.score.x = 0;
    this.score.y = this.canvas.height - 200;
    this.carpetHealth.x = 0;
    this.carpetHealth.y = this.canvas.height - 100;
    this.stage.addChild(this.score, this.carpetHealth);

    createjs.Ticker.setFPS(this.fps)
    createjs.Ticker.addEventListener("tick", this.tick);

    this.stage.update();
  }

  tick(e) {
    if (Math.random() < this.catRate){
      this.addCat();
    }
    this.moveCats(e.delta);
    if (parseInt(this.carpetHealth.text) <= 0) {
      this.carpetHealth.text = 0;
      this.gameOver();
    }
    this.catRate += this.catRateIncrease;
    this.stage.update();
  }

  addCat() {
    let cat = new Cat(this);
    this.cats.push(cat);
    this.stage.addChild(cat.bmp);
  }

  gameOver(){
    createjs.Ticker.removeAllEventListeners("tick");
    let message = new createjs.Text('YOU LOSE! SAD!', 'bold 72px Arial', 'white');
    message.x = 200;
    message.y = this.canvas.height/2 - 100;
    this.stage.addChild(message);
  }

  isOutOfBoundsY(pos) {
    return ((pos[1] < 34) || (pos[1] > this.canvas.height - 234));
  }

  isOutOfBoundsX(pos) {
    return ((pos[0] < 100) || (pos[0] > this.canvas.width));
  }

  isInKitmo(pos) {
    return ((pos[1] < this.canvas.height) ||
    (pos[1] > this.canvas.height - 200) ||
    (pos[0] > this.canvas.width - 200) ||
    (pos[0] < this.canvas.width));
  }

  moveCats(delta) {
    this.cats.forEach((cat) => {
      if (cat.moving){
        this.stage.removeChild(cat.bmp)
        cat.move(delta);
        this.stage.addChild(cat.bmp);
      } else {
        this.carpetHealth.text = parseInt(this.carpetHealth.text) - (cat.dmg * delta/1000);
      }
    });
  }

  randomPosition() {
    return [
      this.canvas.width,
      (this.canvas.height - 200) * Math.random()
    ];
  }

  bounce(pos) {
    return [
      pos[0], Util.bounce(pos[1], this.canvas.height)
    ];
  }

}

module.exports = Game;
