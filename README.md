<h1>Kitty Grabber</h1>
<a href="http://www.chadbergman.pro/kittygrabber/">Play here</a>
<h2>How to Play</h2>
In this game, a swarm of cats is tearing towards your carpet. Use drag and drop to toss them in kitty prison, or they'll be
tearing up your carpet. As time goes on the cats spawn faster and faster, try and last as long as you can!
<h2>Background</h2>
This advanced cat grabbing simulator was inspired by various online defense games as well as some *ahem* "current events."
It was written in JavaScript and uses the CreateJS suite, including EaselJS for 2D rendering and DOM manipulation, TweenJS for
ticker support, and PreloadJS for loading of assets.
<h2>Features</h2>
<h3>Asset loading</h3>
I used PreloadJS to ensure that on opening the game window, a manifest of required assets is preloaded, converted to bitmaps and assigned ids before the game's load function is called.
<h3>Sprites</h3>
Cat sprites were generated using open source spritesheets and EaselJS's SpriteSheet class. This includes a ticker that runs independent of the one which moves the cats. This allows sprite frames to cycle slower than game frames for more realistic running motion. 
<h3>Custom cursor and mouse listeners</h3>
The custom hand cursor is actually a bitmap image which is mapped to cursor position each frame. The actual cursor is invisible. Syncing actual and apparent position was excessively unreliable with fast mouse speeds and low framerates, but that was easily fixed by increasing the framerate. If this game was hard to run at a high framerate a new ticker would likely be needed to track the hand. Clicking on cats moving erratically at high speeds was initially too frustrating, so transparent hitbox containers around each sprite allow for enhanced feline tactility. 



