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
