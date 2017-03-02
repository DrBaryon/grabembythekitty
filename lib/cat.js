const Util = require("./util");

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
  constructor(game) {
    this.game = game;
    this.color = DEFAULTS.COLOR;
    this.pos = this.pos || this.game.randomPosition();
    this.radius = DEFAULTS.RADIUS;
    this.vel = this.vel || Util.randomVec(DEFAULTS.SPEED);
		this.dmg = DEFAULTS.DMG;
    this.moving = true;
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
  }

}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = Cat;
