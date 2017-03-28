const Cat = require("./cat");
const Util = require("./util");

const KITMO = {};
KITMO.WIDTH = 200;
KITMO.HEIGHT = 200;

const CARPET = {};
CARPET.WIDTH = 100;

const congratulations = [
  "Tremendous, everyone agrees.",
  "Bigly fantastic!",
  "Yuge performance!",
  "Fantastic, believe me!",
  "Like a boss.",
  "You are the best! Aroooound!"
];

const congrats = new createjs.Text('', 'bold 40px Acme', 'white');

const transformBM = function(bm, x, y, targetWidth, targetHeight){
  bm.setTransform(0, 0, targetWidth/(bm.getBounds().width),
    targetHeight/(bm.getBounds().height));
};

class Game {

  constructor(canvas, stage) {
    this.canvas = canvas;
    this.stage = stage;
    this.fps = 60;
    this.cats = [];
    this.addCat = this.addCat.bind(this);
    this.tick = this.tick.bind(this);

  }

  load() {
    this.catRate = 0.005;
    this.catRateIncrease = this.catRate/(this.fps*120);
    transformBM(bg, 0, 0, this.canvas.width, this.canvas.height - KITMO.HEIGHT);
    transformBM(carpet, 0, 0, 100, (this.canvas.height - KITMO.HEIGHT));

    const kitmo = new createjs.Container();
    kitmo.x = 0;
    kitmo.y = this.canvas.height - KITMO.HEIGHT;
    transformBM(kitmoBG, 0, 0, KITMO.WIDTH, KITMO.HEIGHT);
    // const kitmoLabel = new createjs.Text("Kitty Prison", 'bold 20px Arial', 'orange');
    // kitmoLabel.x = 20;
    // kitmoLabel.y = 20;
    kitmo.addChild(kitmoBG);

    const panel = new createjs.Container();
    panel.x = KITMO.WIDTH;
    panel.y = this.canvas.height - KITMO.HEIGHT;
    const panelBG = new createjs.Shape();
    panelBG.graphics.beginFill("black").drawRect(0, 0, this.canvas.width - KITMO.WIDTH, KITMO.HEIGHT);
    this.score = 0;
    this.scoreDisplay = new createjs.Text('Score: 0', 'bold 30px Acme', 'white');
    this.scoreDisplay.x = 20;
    this.scoreDisplay.y = 20;
    this.carpetHealth = 1000;
    this.healthDisplay = new createjs.Text(`Carpet Left: ${this.carpetHealth}`, 'bold 30px Acme', 'white');
    this.healthDisplay.x = 220;
    this.healthDisplay.y = 20;
    panel.addChild(panelBG, this.scoreDisplay, this.healthDisplay);

    newCursor.regX = 12;
    newCursor.regY = 12;
    newCursor.x = this.stage.mouseX;
    newCursor.y = this.stage.mouseY;

    congrats.text = '';

    this.stage.addChild(bg, carpet, kitmo, panel, newCursor, congrats);
    this.showInstructionsScreen();
    this.stage.update();

  }

  start(){
    createjs.Ticker.setFPS(this.fps);
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
    this.stage.update(e);
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
        this.stage.removeChild(congrats);
        congrats.text = congratulations[Math.floor(congratulations.length * Math.random())];
        let textWidth = congrats.getBounds().width;
        congrats.x = 500 - textWidth/2;
        congrats.y = 50;
        this.stage.addChild(congrats);
      }
    });
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

    let message = new createjs.Text("Your beautiful, classy red carpet is under attack by a swarm of nasty kitties. Click and drag them into kitty jail! Click when ready.", 'normal 40px Acme', 'white');
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
        this.stage.removeChild(cat.container);
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

  resizeBitmap(){

  }

}

module.exports = Game;
