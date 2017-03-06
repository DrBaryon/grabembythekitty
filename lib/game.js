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

const trumpisms = [
  "Really tremendous!",
  "You're, like, a smart person!",
  "Bigly!",
  "Just fantastic!",
  "Yuge performance!",
  "The greatest, believe me!",
  "Such a nasty kitty.",
  "Lock him up!"
];

const congrats = new createjs.Text('', 'bold 20px Arial', 'white');

class Game {

  constructor(canvas, stage) {
    this.canvas = canvas;
    this.stage = stage;
    this.fps = 30;
    this.cats = [];
    this.catRate = .01;
    this.catRateIncrease = this.catRate/(this.fps*3600);
    // this.hombreRate = .001;
    // this.hombreRateIncrease = .000001;




    this.addCat = this.addCat.bind(this);
    this.tick = this.tick.bind(this);

  }

  load() {
    const bg = new createjs.Shape();
    bg.graphics.beginFill("black").drawRect(0, 0, this.canvas.width, this.canvas.height - KITMO.HEIGHT);
    const carpet = new createjs.Shape();
    carpet.graphics.beginFill("red").drawRect(0, 0, CARPET.WIDTH, this.canvas.height - KITMO.HEIGHT);

    const kitmo = new createjs.Container();
    kitmo.x = 0;
    kitmo.y = this.canvas.height - KITMO.HEIGHT;
    const kitmoBG = new createjs.Shape();
    kitmoBG.graphics.beginFill("grey").drawRect(0, 0, KITMO.WIDTH, KITMO.HEIGHT);
    const kitmoLabel = new createjs.Text("Kitmo", 'bold 20px Arial', 'black');
    kitmoLabel.x = 20;
    kitmoLabel.y = 20;
    kitmo.addChild(kitmoBG, kitmoLabel);

    const panel = new createjs.Container();
    panel.x = KITMO.WIDTH;
    panel.y = this.canvas.height - KITMO.HEIGHT;
    const panelBG = new createjs.Shape();
    panelBG.graphics.beginFill("black").drawRect(0, 0, this.canvas.width - KITMO.WIDTH, KITMO.HEIGHT);
    this.score = 0;
    this.scoreDisplay = new createjs.Text('Score: 0', 'bold 20px Arial', 'white');
    this.scoreDisplay.x = 20;
    this.scoreDisplay.y = 20;
    this.carpetHealth = 1000;
    this.healthDisplay = new createjs.Text(`Carpet Left: ${this.carpetHealth}`, 'bold 20px Arial', 'white');
    this.healthDisplay.x = 220;
    this.healthDisplay.y = 20;
    panel.addChild(panelBG, this.scoreDisplay, this.healthDisplay);

    newCursor.x = this.stage.mouseX;
    newCursor.y = this.stage.mouseY;

    congrats.text = '';
    congrats.x = this.canvas.width/2 - 50;
    congrats.y = 50;

    this.stage.addChild(bg, carpet, kitmo, panel, newCursor, congrats);
    this.showInstructionsScreen();
    this.stage.update();

  }

  start(){
    createjs.Ticker.setFPS(this.fps)
    createjs.Ticker.addEventListener("tick", this.tick);
  }

  tick(e) {
    newCursor.x = this.stage.mouseX;
    newCursor.y = this.stage.mouseY;
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
    this.stage.addChild(cat.container);
    cat.container.on("pressmove", function(evt) {
      cat.moving = false;
      cat.sprite.stop();
      cat.container.x = evt.stageX;
      cat.container.y = evt.stageY;
    });
    cat.container.on("pressup", (evt) => {
      cat.moving = true;
      cat.sprite.play();
      if (this.isInKitmo([evt.stageX, evt.stageY])){
        this.stage.removeChild(cat.container);
        this.cats.splice(this.cats.indexOf(cat), 1);
        this.score += 100;
        this.scoreDisplay.text = `Score: ${this.score}`;
        congrats.text = trumpisms[Math.floor(trumpisms.length * Math.random())];
      }
    })
  }

  gameOver(){
    createjs.Ticker.removeAllEventListeners("tick");
    this.showLoseScreen();
  }

  isOutOfBoundsY(pos) {
    return ((pos[1] < 34) || (pos[1] > this.canvas.height - KITMO.HEIGHT - 34));
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

    let message = new createjs.Text("YOU LOSE! SAD!\nClick to try again.", 'bold 72px Arial', 'white');
    message.lineWidth = this.canvas.width/2;
    message.x = this.canvas.width/4;
    message.y = this.canvas.height/2 - 200;

    this.stage.addChild(container);
    this.stage.addChild(message);
    container.addEventListener("click", e => {
      this.cats = [];
      this.stage.removeAllChildren();
      this.load();
    });
  }

  moveCats(delta) {
    this.cats.forEach((cat) => {
      if (cat.moving){
        this.stage.removeChild(cat.container)
        cat.move(delta);
        this.stage.addChild(cat.container);
      } else if (cat.scratching) {
        this.carpetHealth = this.carpetHealth - (cat.dmg * delta/1000);
        this.healthDisplay.text = `Carpet Left: ${Math.floor(this.carpetHealth)}`;
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
