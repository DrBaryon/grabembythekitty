const Util = require("./util");

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
