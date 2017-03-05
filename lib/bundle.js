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

	const Game = __webpack_require__(2);
	
	document.addEventListener("DOMContentLoaded", function(){
	  const canvas = document.getElementsByTagName("canvas")[0];
	  const stage = new createjs.Stage(canvas);
	  stage.mouseEventsEnabled = true;
	
	  // SoundJS.FlashPlugin.BASE_PATH = "assets/";
	  // if (!SoundJS.checkPlugin(true)) {
	  //   alert("Error!");
	  //   return;
	  // };
	
	  // manifest = [
	  //   {src:"./lib/images/cat.png", id:"cat"},
	  //   {src:"./lib/images/bg.jpeg", id:"bg"}
	  // ];
	  //
	  // const preloader = new PreloadJS();
	  // // preloader.installPlugin(SoundJS);
	  // // preloader.onProgress = handleProgress;
	  // // preloader.onComplete = handleComplete;
	  // // preloader.onFileLoad = handleFileLoad;
	  // preloader.loadManifest(manifest);
	
	
	
	  // Ticker.setFPS(30);
	  // Ticker.addListener(stage);
	
	  let game = new Game(canvas, stage)
	  game.start();
	});
	
	function loadImages(){
	
	};


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Cat = __webpack_require__(3);
	const Util = __webpack_require__(4);
	
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	
	const DEFAULTS = {
		COLOR: "#505050",
		RADIUS: 40,
		SPEED: 2,
	  DMG: 10
	};
	
	const BAD_HOMBRE = {
	  COLOR: "#505050",
	  RADIUS: 40,
	  SPEED: 4,
	  DMG: 20
	};
	
	
	class Cat {
	  constructor(game) {
	    this.game = game;
	    this.color = DEFAULTS.COLOR;
	    this.pos = this.pos || this.game.randomPosition();
	    this.radius = DEFAULTS.RADIUS;
	    this.vel = this.vel || Util.randomVec(DEFAULTS.SPEED);
			this.dmg = DEFAULTS.DMG;
	    this.moving = true;
	    let img = new Image ();
	    img.src = './lib/images/cat.png';
	
	    // this.bmp = new createjs.Bitmap(img);
	    // this.bmp.x = this.pos[0];
	    // this.bmp.y = this.pos[1];
	    let graphics = new createjs.Graphics().beginFill("white").drawRect(this.pos[0], this.pos[1], 100, 100);
	    this.bmp = new createjs.Shape(graphics);
	    this.setListeners();
	  }
	
	  setListeners(){
	    this.bmp.on("pressmove", function(evt) {
	      evt.target.x = evt.stageX;
	      evt.target.y = evt.stageY;
	    });
	    this.bmp.on("pressup", function(evt) {
	    })
	  }
	
	  move(timeDelta) {
	    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
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
	
	const NORMAL_FRAME_TIME_DELTA = 1000/60;
	
	module.exports = Cat;


/***/ },
/* 4 */
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