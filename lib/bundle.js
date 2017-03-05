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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded", function(){
	  const canvas = document.getElementsByTagName("canvas")[0];
	  const stage = new createjs.Stage(canvas);
	  stage.mouseEventsEnabled = true;
	
	  // SoundJS.FlashPlugin.BASE_PATH = "assets/";
	  // if (!SoundJS.checkPlugin(true)) {
	  //   alert("Error!");
	  //   return;
	  // };
	
	  // const manifest = [
	  //   {src:"./lib/images/catsprites.gif", id:"catsprites"},
	  //   {src:"./lib/images/bg.jpeg", id:"bg"}
	  // ];
	  //
	  // const preloader = new createjs.LoadQueue();
	  // preloader.onProgress = handleProgress;
	  // preloader.onComplete = handleComplete;
	  // preloader.onFileLoad = handleFileLoad;
	  // preloader.loadManifest(manifest);
	
	
	
	
	
	  // Ticker.setFPS(30);
	  // Ticker.addListener(stage);
	
	  let game = new Game(canvas, stage)
	  game.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Cat = __webpack_require__(2);
	const Util = __webpack_require__(3);
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	
	const DEFAULTS = {
		COLOR: "#505050",
		RADIUS: 40,
		SPEED: 100,
	  DMG: 5
	};
	
	const BAD_HOMBRE = {
	  COLOR: "#505050",
	  RADIUS: 40,
	  SPEED: 100,
	  DMG: 10
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
	    framerate: 15
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
	    // let img = new Image ();
	    // img.src = './lib/images/cat.png';
	    //
	    this.bmp = new createjs.Sprite(spriteSheet, "run");
	    this.bmp.x = this.pos[0];
	    this.bmp.y = this.pos[1];
	    this.bmp.gotoAndPlay;
	
	
	    this.setListeners();
	  }
	
	  setListeners(){
	    this.bmp.on("pressmove", function(evt) {
	      debugger
	      evt.target.x = evt.x;
	      evt.target.y = evt.y;
	      this.game.stage.update();
	    });
	    this.bmp.on("pressup", function(evt) {
	      if (isInKitmo([evt.target.x, evt.target.y])){
	        this.game.stage.removeChild(this.bmp);
	      }
	    })
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
	    }
	    this.bmp.x = this.pos[0];
	    this.bmp.y = this.pos[1];
	  }
	
	}
	
	
	
	Cat.sprite = new createjs.Sprite(spriteSheet, "run");
	
	module.exports = Cat;


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map