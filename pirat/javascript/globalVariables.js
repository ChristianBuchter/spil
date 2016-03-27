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
var answer = "";

var ZERO = 48, ONE = 49, TWO = 50, THREE = 51, FOUR = 52,
	FIVE = 53, SIX = 54, SEVEN = 55, EIGHT = 56, NINE = 57,
	FIRE = 13, SPACE = 8, CLEARANSWER = 8;

// Player
var CannonY = 5/6; // *gameheight
var GAMEOVER = false;


// Enemies
var Enemies = {};

var shipWidth;
var shipHeight;