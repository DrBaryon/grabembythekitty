const Game = require('./javascripts/game.js');

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementsByTagName("canvas")[0];
  const stage = new createjs.Stage(canvas);
  stage.mouseEventsEnabled = true;
  stage.canvas.style.cursor = "none";

  const manifest = [
    {src: './lib/images/bg.jpeg', id:'bg'},
    {src: './lib/images/yugehand.png', id:'newCursor'},
    {src: './lib/images/carpet.jpeg', id:'carpet'},
    {src: './lib/images/kittyprison.jpg', id:'kitmoBG'}
  ];

  const preloader = new PreloadJS();
  preloader.onFileLoad = handleFileLoad;
  preloader.loadManifest(manifest);
  preloader.onComplete = handleLoadComplete;

  function handleFileLoad(event) {
    let img = new Image();
    img.src = event.src;
    window[event.id] = new createjs.Bitmap(img);
  }

  function handleLoadComplete(){
    let game = new Game(canvas, stage);
    game.load();
  }
});
