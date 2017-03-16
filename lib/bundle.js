/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const Util = {
  // Normalize the length of the vector to 1, maintaining direction.
  dir (vec) {
    const norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },
  // Find distance between two points.
  dist (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  // Find the length of the vector.
  norm (vec) {
    return Util.dist([0, 0], vec);
  },
  // Return a randomly oriented vector with the given length.
  randomVec (length) {
    const deg = Math.PI*2/3 * Math.random() + 7*Math.PI/6;
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  bounce (coord, max) {
    if (coord > max) {
      return max - (coord % max);
    } else if (coord < 0) {
      return -coord;
    } else {
      return coord;
    }
  }
};

module.exports = Util;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Cat = __webpack_require__(2);
const Util = __webpack_require__(0);

// const bgImg = new Image();
// bgImg.src = './lib/images/bg.jpeg';
//
// const yugehand = new Image();
// yugehand.src = './lib/images/yugehand.png';



// const carpetImg = new Image();
// carpetImg.src = './lib/images/carpet.jpeg';
//
// const kitmoImg = new Image();
// kitmoImg.src = './lib/images/prison.jpeg';


// carpetMatrix.scale(targetWidth/imageWidth, targetHeight/imageHeight);
// const carpetBmp = new createjs.Bitmap(carpetImg);

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
  "You are the best around, nothing is going to keep you down!"
];

const congrats = new createjs.Text('', 'bold 20px Arial', 'white');

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
    const kitmoLabel = new createjs.Text("Kitty Prison", 'bold 20px Arial', 'black');
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

    newCursor.regX = 12;
    newCursor.regY = 12;
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
        congrats.text = congratulations[Math.floor(congrats.length * Math.random())];
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

    let message = new createjs.Text("Your beautiful, classy red carpet is under attack by a swarm of nasty kitties. Click and drag those bad hombres into kitty jail. Click when ready.", 'bold 24px Arial', 'white');
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

const DEFAULTS = {
	COLOR: "#505050",
	RADIUS: 40,
	SPEED: 200,
  DMG: 20
};

const BAD_HOMBRE = {
  COLOR: "#505050",
  RADIUS: 40,
  SPEED: 400,
  DMG: 40
};

const catSprites = new Image();
catSprites.src = './lib/images/catsprites.gif';
const spriteSheet = new createjs.SpriteSheet({
    // image to use
    images: [catSprites],
    // width, height & registration point of each sprite
    frames: {width: 91, height: 67, regX: 45.5, regY: 33.5},
    animations: {
        walk: [0, 6, "run"]
    },
    framerate: 10
});


class Cat {
  constructor(game, options = DEFAULTS) {
    this.game = game;
    this.color = options.COLOR;
    this.pos = this.pos || this.game.randomPosition();
    this.radius = options.RADIUS;
    this.vel = this.vel || Util.randomVec(options.SPEED);
		this.dmg = options.DMG;
    this.moving = true;
    this.scratching = false;
    this.container = new createjs.Container();
    this.container.x = this.pos[0];
    this.container.y = this.pos[1];

    this.background = new createjs.Shape();
    this.sprite = new createjs.Sprite(spriteSheet, "run");
    this.container.addChild(this.background, this.sprite);
    this.background.graphics.beginFill("white").drawRect(0, 0, 95, 80);
    this.background.alpha = 0;
    this.background.regX = 47.5;
    this.background.regY = 35.5;
    this.sprite.x = 2;
    this.sprite.y = 2;
    this.sprite.gotoAndPlay();
  }



  move(timeDelta) {
    const velocityScale = timeDelta / 1000,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    if (this.game.isOutOfBoundsY(this.pos)) {
      this.pos = this.game.bounce(this.pos);
      this.vel[1] = -(this.vel[1]);
    }
    if (this.game.isOutOfBoundsX(this.pos)) {
      this.moving = false;
      this.scratching = true;
    }
    this.container.x = this.pos[0];
    this.container.y = this.pos[1];
  }

}



Cat.sprite = new createjs.Sprite(spriteSheet, "run");

module.exports = Cat;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementsByTagName("canvas")[0];
  const stage = new createjs.Stage(canvas);
  stage.mouseEventsEnabled = true;
  // stage.canvas.style.cursor = "none";

  const manifest = [
    {src: './lib/images/bg.jpeg', id:'bg'},
    {src: './lib/images/yugehand.png', id:'newCursor'},
    {src: './lib/images/carpet.jpeg', id:'carpet'},
    {src: './lib/images/prison.jpeg', id:'kitmoBG'}
  ];

  const preloader = new PreloadJS();
  preloader.onFileLoad = handleFileLoad;
  preloader.loadManifest(manifest);
  preloader.onComplete = handleLoadComplete;

  function handleFileLoad(event) {
    let img = new Image();
    img.src = event.src;
    window[event.id] = new createjs.Bitmap(img);
  }

  function handleLoadComplete(){
    let game = new Game(canvas, stage);
    game.load();
  }
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map