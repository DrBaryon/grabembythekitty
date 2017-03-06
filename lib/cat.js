const Util = require("./util");

const DEFAULTS = {
	COLOR: "#505050",
	RADIUS: 40,
	SPEED: 200,
  DMG: 50
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
    this.scratching = false;
    // let img = new Image ();
    // img.src = './lib/images/cat.png';
    //
    this.bmp = new createjs.Sprite(spriteSheet, "run");
    this.bmp.x = this.pos[0];
    this.bmp.y = this.pos[1];
    this.bmp.gotoAndPlay;
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
    this.bmp.x = this.pos[0];
    this.bmp.y = this.pos[1];
  }

}



Cat.sprite = new createjs.Sprite(spriteSheet, "run");

module.exports = Cat;
