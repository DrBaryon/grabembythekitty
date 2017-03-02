// const Game = require('./game.js');
const View = require('./view.js');

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementsByTagName("canvas")[0];
  const stage = new createjs.Stage(canvas);
  stage.mouseEventsEnabled = true;
  new View(canvas, stage).start();
});
