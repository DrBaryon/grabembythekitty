const Game = require("./game");
const GameView = require("./game-view");

$(function () {
  const rootEl = $('.kittygrabber-game');
  new GameView(rootEl);
});
