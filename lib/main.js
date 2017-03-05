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

  // manifest = [
  //   {src:"./lib/images/cat.png", id:"cat"},
  //   {src:"./lib/images/bg.jpeg", id:"bg"}
  // ];
  //
  // const preloader = new PreloadJS();
  // // preloader.installPlugin(SoundJS);
  // // preloader.onProgress = handleProgress;
  // // preloader.onComplete = handleComplete;
  // // preloader.onFileLoad = handleFileLoad;
  // preloader.loadManifest(manifest);



  // Ticker.setFPS(30);
  // Ticker.addListener(stage);

  let game = new Game(canvas, stage)
  game.start();
});

function loadImages(){

};
