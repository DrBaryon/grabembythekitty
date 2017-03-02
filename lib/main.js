const Game = require('./game.js');
const View = require('./view.js');

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementsByTagName("canvas")[0];
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;
  const stage = new createjs.Stage(canvas);
  stage.mouseEventsEnabled = true;

  // createjs.Ticker.setFPS(30);
  // createjs.Ticker.addListener(stage);

  // const ctx = canvas.getContext("2d");
  const game = new Game();
  new View(stage, game).start();
});
