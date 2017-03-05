const Game = require('./game.js');

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementsByTagName("canvas")[0];
  const stage = new createjs.Stage(canvas);
  stage.mouseEventsEnabled = true;

  // SoundJS.FlashPlugin.BASE_PATH = "assets/";
  // if (!SoundJS.checkPlugin(true)) {
  //   alert("Error!");
  //   return;
  // };

  // const manifest = [
  //   {src:"./lib/images/catsprites.gif", id:"catsprites"},
  //   {src:"./lib/images/bg.jpeg", id:"bg"}
  // ];
  //
  // const preloader = new createjs.LoadQueue();
  // preloader.onProgress = handleProgress;
  // preloader.onComplete = handleComplete;
  // preloader.onFileLoad = handleFileLoad;
  // preloader.loadManifest(manifest);





  // Ticker.setFPS(30);
  // Ticker.addListener(stage);

  let game = new Game(canvas, stage)
  game.start();
});
