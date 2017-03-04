// const Game = require('./game.js');
const View = require('./view.js');

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementsByTagName("canvas")[0];
  const stage = new createjs.Stage(canvas);
  stage.mouseEventsEnabled = true;

  SoundJS.FlashPlugin.BASE_PATH = "assets/";
  if (!SoundJS.checkPlugin(true)) {
    alert("Error!");
    return;
  };

  const preloader = new PreloadJS();
  preloader.installPlugin(SoundJS);
  preloader.onProgress = handleProgress;
  preloader.onComplete = handleComplete;
  preloader.onFileLoad = handleFileLoad;
  preloader.loadManifest(manifest);
  manifest = [ {src:"cat.png", id:"cat"} ];

  Ticker.setFPS(30);
  Ticker.addListener(stage);

  new View(canvas, stage).start();
});
