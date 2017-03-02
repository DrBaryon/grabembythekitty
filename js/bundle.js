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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Cat = __webpack_require__(4);
const Util = __webpack_require__(3);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
const GameView = __webpack_require__(5);

$(function () {
  const rootEl = $('.catgrabber-game');
  new GameView(rootEl);
});


/***/ }),
/* 2 */,
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(3);

const DEFAULTS = {
	COLOR: "#505050",
	RADIUS: 40,
	SPEED: 2,
  DMG: 3
};

const BAD_HOMBRE = {
  COLOR: "#505050",
  RADIUS: 40,
  SPEED: 4,
  DMG: 6
};


class Cat {
  constructor(board) {
    this.board = board;
    this.color = DEFAULTS.COLOR;
    this.pos = this.pos || this.board.randomPosition();
    this.radius = DEFAULTS.RADIUS;
    this.vel = this.vel || Util.randomVec(DEFAULTS.SPEED);
		this.dmg = DEFAULTS.DMG;
    this.moving = true;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (this.board.isOutOfBoundsY(this.pos)) {
      this.pos = this.board.bounce(this.pos);
      this.vel[1] = -(this.vel[1]);
    }
    if (this.board.isOutOfBoundsX(this.pos)) {
      this.moving = false;
    }
  }

}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = Cat;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

class View {
  constructor($el) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    this.lastTime = 0;
    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map