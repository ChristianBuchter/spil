//temp
var algebra = ["ADDITION", "SUBSTRACTION", "MULTIPLICATION", "DIVISION", "SQUAREROOT"];


// Gamefield

var ASPECT_RATIO = 9/16;
var canvas, context;
var gameWidth, gameHeight; // canvas.height og width
var FRAMERATE = 30;
var SEC = 1000;
var LANES = 4;

// Graphics
var Ship1;

var Beach;
var Cannon;

// Controls
var keys = []; //tal = keyCode-48, enter: 13 space=32

// Player
var CannonY = 5/6 // *gameheight


// Enemies
var Enemies = {};

var shipWidth;
var shipHeight;