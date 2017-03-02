const Game = require("./catSwarm")

class View {
  constructor(canvas, stage) {
    this.canvas = canvas;
    this.stage = stage;
  }

  start() {
    let carpet = new createjs.Shape();
    carpet.graphics.beginFill("red").drawRect(0, 0, 100, this.canvas.height);
    this.stage.addChild(carpet);
    let kitmo = new createjs.Shape();
    kitmo.graphics.beginFill("grey").drawRect(this.canvas.width - 200, -200, 200, 200);
    this.stage.addChild(kitmo);
    let game = new Game();
    this.stage.addChild(game.display);
    this.stage.update();
    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  // step(delta){
  //   this.cats.forEach((cat) => {
  //     if (cat.moving){
  //       cat.move(delta);
  //     } else {
  //       this.carpetHealth -= cat.dmg
  //     }
  //   });
  // }

  animate(time) {

    this.game.step(timeDelta);
    // this.game.draw(this.stage);
    this.stage.update();
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = View;
