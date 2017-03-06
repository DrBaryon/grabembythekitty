Bearing some similarity to Space Invaders, Grab Em By The Kitty has you
defend against a swarm of cats rushing towards the White House. Use your small
orange hand to grab the cats before they mess up the Oval Office carpets!

The cats will originate from the right side of the screen and run in a
zigzag towards the "carpet" on the left-hand side. On reaching the carpet they
will begin scratching it, causing it to take damage. Cat speed and damage will
vary, some "bad hombre" or "nasty kitty" cats will be particularly fast and
high damage. You can defend the carpet by using your small orange hand-shaped
cursor to grab the cat, then deposit it in the "Kitmo" basket at the bottom of
the screen. When a wave is complete, you will gain points based on how well you
defended the carpet. Waves will continue to increase in difficulty with more and
more "bad hombres." If the carpet takes too much damage, you lose! Sad!

(Names may be genericized to protect potential HR snowflakes.)

Users will be able to:
  Click, hold, drag and release a cat into Kitmo to remove them from play.
  Keep track of carpet status and the number of cats until the next wave.
  Adjust difficulty and remove/include special cats (e.g bad hombres)
  Pause the game, opening a menu from which one can quit or restart the game.

This project will be implemented with the following technologies:

  Vanilla JavaScript and jQuery for overall structure and game logic,
  Easel.js with HTML5 Canvas for DOM manipulation and rendering,
  Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in
this project:

  board.js: this script will handle the logic for creating and updating the
  necessary Easel.js elements and rendering them to the DOM.

  catSwarm.js: this script will generate our cats and instantiate their behavior.
  A catSwarm will contain an object representing the wave to be created,
  including information such as wave number, difficulty and the presence of
  "special cats", and an array of cat objects representing the cats themselves.

  cat.js: this script will house the constructor and update functions for cat
  objects. Each Cat will have a position and velocity represented by an x, y
  vector, and a damage value representing it's dps to the carpet.

****Implementation Timeline****

  Day 1: Setup all necessary Node modules, including getting webpack up and
  running and Easel.js installed. Create webpack.config.js as well as package.json.
  Begin working on a low graphic version of the game (with blocks instead of cats).

  Day 2: Build a cat object with a given initial position and velocity vector.
  Tweak velocity vector to ensure properly evasive behavior that still keeps cat
  in clickable range. Implement listeners allowing cats to repositioned by click
  and drag.

  Day 3:
  Create the catswarm. Ensure that cat swarms render the right cats with the right
  frequency. Ensure that difficulty increases over time through a time-dependent
  function to generate special cats and determine cat frequency.
  Implement collision detection for "carpet." Prepare "Kitmo", test that a cat
  can be deleted through dragging into Kitmo.

  Day 4: Find graphic assets to improve the quality of cats on the front-end
  (no more square cats). Implement user controls (menu) on the front end.
  Improve cat evasiveness. Polish front end. If time, include special notifications
  for "bad hombres."
