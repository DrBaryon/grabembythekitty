const Game = require("./game")

class View {
  constructor(canvas, stage) {
    this.canvas = canvas;
    this.stage = stage;
    this.fps = 30;
    this.game = new Game();

    this.tick = this.tick.bind(this);
    this.loadAll = this.loadAll.bind(this);
  }

  loadAll(){

  }

  start() {
    this.loadAll();
    let carpet = new createjs.Shape();
    carpet.graphics.beginFill("red").drawRect(0, 0, 100, this.canvas.height);
    this.stage.addChild(carpet);
    let kitmo = new createjs.Shape();
    kitmo.graphics.beginFill("grey").drawRect(this.canvas.width - 200, -200, 200, 200);
    this.stage.addChild(kitmo);
    debugger
    this.stage.addChild(this.game.cats);
    createjs.Ticker.setFPS(this.fps)
    createjs.Ticker.addEventListener("tick", this.tick);
    this.stage.update();
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

  tick(e) {
    this.game.step(e.delta);
    this.stage.update();
  }
}

module.exports = View;
