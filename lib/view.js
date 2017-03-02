class View {
  constructor(stage, game) {
    this.stage = stage;
    this.game = game;
  }

  start() {
    this.stage.addChild(this.game);
    createjs.Ticker.addEventListener("tick", this.animate);
    //start the animation
    // requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {

    this.game.step(timeDelta);
    this.game.draw(this.stage);
    this.stage.update();
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = View;
