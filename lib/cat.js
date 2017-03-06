const Util = require("./util");

const DEFAULTS = {
	COLOR: "#505050",
	RADIUS: 40,
	SPEED: 300,
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
    this.container = new createjs.Container();
    this.container.x = this.pos[0];
    this.container.y = this.pos[1];

    this.background = new createjs.Shape();
    this.sprite = new createjs.Sprite(spriteSheet, "run");
    this.container.addChild(this.background, this.sprite);
    this.background.graphics.beginFill("white").drawRect(0, 0, 95, 71);
    this.background.alpha = .5;
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
