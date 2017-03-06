const Game = require('./game.js');

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementsByTagName("canvas")[0];
  const stage = new createjs.Stage(canvas);
  stage.mouseEventsEnabled = true;
  stage.canvas.style.cursor = "none";

  let game = new Game(canvas, stage);
  game.load();
});
