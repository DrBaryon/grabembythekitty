const Cat = require("./cat");
const Util = require("./util");

const bgImg = new Image();
bgImg.src = './lib/images/desert_BG.png';

const yugehand = new Image();
yugehand.src = './lib/images/yugehand.png';
const newCursor = new createjs.Bitmap(yugehand);
newCursor.regX = 10;
newCursor.regY = 10;

const KITMO = {};
KITMO.WIDTH = 200;
KITMO.HEIGHT = 200;

const CARPET = {};
CARPET.WIDTH = 100;

class Game {

  constructor(canvas, stage) {
    this.canvas = canvas;
    this.stage = stage;
    this.fps = 30;
    this.newCursor = newCursor;


    this.cats = [];
    this.catRate = .01;
    this.catRateIncrease = this.catRate/(this.fps*60);
    // this.hombreRate = .001;
    // this.hombreRateIncrease = .000001;

    this.carpetHealth = 1000;
    this.healthDisplay = new createjs.Text(`${this.carpetHealth}`, 'bold 20px Arial', 'black');
    this.score = new createjs.Text('0', 'bold 20px Arial', 'black');

    this.addCat = this.addCat.bind(this);
    this.tick = this.tick.bind(this);

    bgImg.width = this.canvas.width;
    bgImg.height = this.canvas.height - KITMO.HEIGHT;
  }

  load() {
    let bg = new createjs.Shape();
    bg.graphics.beginFill("black").drawRect(0, 0, this.canvas.width, this.canvas.height - KITMO.HEIGHT);
    // bg.graphics.beginBitmapFill(bgImg, 'no-repeat').drawRect(0, 0, this.canvas.width, this.canvas.height - KITMO.HEIGHT);
    let carpet = new createjs.Shape();
    carpet.graphics.beginFill("red").drawRect(0, 0, CARPET.WIDTH, this.canvas.height - KITMO.HEIGHT);
    let kitmo = new createjs.Shape();
    kitmo.graphics.beginFill("grey").drawRect(0, this.canvas.height - KITMO.HEIGHT, KITMO.WIDTH, KITMO.HEIGHT);
    this.stage.addChild(bg, carpet, kitmo);

    this.score.x = 0;
    this.score.y = this.canvas.height - KITMO.HEIGHT;
    this.healthDisplay.x = 0;
    this.healthDisplay.y = this.canvas.height - 100;
    this.newCursor.x = this.stage.mouseX;
    this.newCursor.y = this.stage.mouseY;
    this.stage.addChild(this.score, this.healthDisplay, this.newCursor);
    this.showInstructionsScreen();
    this.stage.update();
    // let instructionContainer
    // let instructionText = new createjs.Text('INSTRUCTIONS', 'bold 20px Arial', 'black');

  }

  start(){
    createjs.Ticker.setFPS(this.fps)
    createjs.Ticker.addEventListener("tick", this.tick);
  }

  tick(e) {
    this.newCursor.x = this.stage.mouseX;
    this.newCursor.y = this.stage.mouseY;
    if (Math.random() < this.catRate){
      this.addCat();
    }
    this.moveCats(e.delta);
    if (this.carpetHealth <= 0) {
      this.healthDisplay.text = 0;
      this.gameOver();
    }
    this.catRate += this.catRateIncrease;
    this.stage.update();
  }

  addCat() {
    let cat = new Cat(this);
    this.cats.push(cat);
    this.stage.addChild(cat.bmp);
    cat.bmp.on("pressmove", function(evt) {
      cat.moving = false;
      evt.target.stop();
      evt.target.x = evt.stageX;
      evt.target.y = evt.stageY;
    });
    cat.bmp.on("pressup", (evt) => {
      cat.moving = true;
      evt.target.play();
      if (this.isInKitmo([evt.stageX, evt.stageY])){
        this.stage.removeChild(cat.bmp);
        this.cats.splice(this.cats.indexOf(cat), 1);
      }
    })
  }

  gameOver(){
    createjs.Ticker.removeAllEventListeners("tick");
    this.showLoseScreen();
  }

  isOutOfBoundsY(pos) {
    return ((pos[1] < 34) || (pos[1] > this.canvas.height - 234));
  }

  isOutOfBoundsX(pos) {
    return ((pos[0] < 100) || (pos[0] > this.canvas.width));
  }

  isInKitmo(pos) {
    return ((pos[1] < this.canvas.height) &&
    (pos[1] > this.canvas.height - KITMO.HEIGHT) &&
    (pos[0] > 0) && (pos[0] < KITMO.WIDTH));
  }

  showInstructionsScreen(){
    let container = new createjs.Shape();
    container.graphics.beginFill("black").drawRect(0, 0, this.canvas.width, this.canvas.height);
    container.alpha = 0.5;
    container.x = 0;
    container.y = 0;

    let message = new createjs.Text("Your beautiful, classy red carpet is under attack by a swarm of nasty kitties. Thanks Obama! Use your tremendous and not at all undersized hands to click and drag those bad hombres into our high-security feline detention facility (codename Kitmo). Click when ready.", 'bold 24px Arial', 'white');
    message.lineWidth = this.canvas.width -100;
    message.x = 50;
    message.y = 50;

    this.stage.addChild(container);
    this.stage.addChild(message);

    container.addEventListener("click", e => {
      this.stage.removeChild(container);
      this.stage.removeChild(message);
      this.stage.update();
      this.start();
    });
  }

  showLoseScreen(){
    let container = new createjs.Shape();
    container.graphics.beginFill("black").drawRect(0, 0, this.canvas.width, this.canvas.height);
    container.alpha = 0.5;
    container.x = 0;
    container.y = 0;

    let message = new createjs.Text("YOU LOSE! SAD!", 'bold 72px Arial', 'white');
    message.lineWidth = this.canvas.width/2;
    message.x = this.canvas.width/4;
    message.y = this.canvas.height/2 - 100;

    this.stage.addChild(container);
    this.stage.addChild(message);
  }

  moveCats(delta) {
    this.cats.forEach((cat) => {
      if (cat.moving){
        this.stage.removeChild(cat.bmp)
        cat.move(delta);
        this.stage.addChild(cat.bmp);
      } else if (cat.scratching) {
        this.carpetHealth = this.carpetHealth - (cat.dmg * delta/1000);
        this.healthDisplay.text = `${Math.floor(this.carpetHealth)}`;
      }
    });
  }

  randomPosition() {
    return [
      this.canvas.width,
      (this.canvas.height - 268) * Math.random() + 34
    ];
  }

  bounce(pos) {
    return [
      pos[0], Util.bounce(pos[1], this.canvas.height)
    ];
  }

}

module.exports = Game;
