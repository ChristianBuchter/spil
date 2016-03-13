// Game Field

document.ontouchmove = function(e){
     e.preventDefault(); 
};

// ememyKlassen er ikke implementeret endnu. Det overtager ship objektet.
var CannonClass = function(){
	_this = this;
	
	this.image = Cannon;
	this.Targets = [];
	this.rotation = 0;
	this.rotSpeed = 2;
	this.balls;
	this.fire = function(){
		
	};
	
}

var Enemy = function(){
	_this = this;
	
	this.image = Ship1; 
	this.y = 0;
	this.GoalDist = FRAMERATE*10;
	this.Dist = 0;
	this.Lane = Math.floor(Math.random() * LANES) // måske argument 
	
	this.question = generateAlgebra();
	
	this.hit = false;
	this.sinkingAnimation = function(){
		//impliment here
	}
	
};

function spawnEnemy(){
// if(freeLane){
	var tempEnemy = new Enemy();
	/* while (!(Object.keys(Enemies)[tempEnemy.question[1]] == undefined)){
	//	tempEnemy = new Enemy();
	}*/
	Enemies[tempEnemy.question[1]] = tempEnemy;
//}	
};

var TO_RADIANS = Math.PI/180; 
function drawRotatedImage(image, x, y, angle) { 
 
	// save the current co-ordinate system 
	// before we screw with it
	context.save(); 
 
	// move to the middle of where we want to draw our image
	context.translate(x, y);
 
	// rotate around that point, converting our 
	// angle from degrees to radians 
	context.rotate(angle * TO_RADIANS);
 
	// draw it up and to the left by half the width
	// and height of the image 
	context.drawImage(image, -(image.width/2), -(image.height/2));
 
	// and restore the co-ords to how they were when we began
	context.restore(); 
};

function resizeGame() {
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;
    
    if (newWidthToHeight > ASPECT_RATIO) {
        newWidth = newHeight * ASPECT_RATIO;
        gameScaler.style.height = newHeight + 'px';
        gameScaler.style.width = newWidth + 'px';
    } else {
        newHeight = newWidth / ASPECT_RATIO;
        gameScaler.style.width = newWidth + 'px';
        gameScaler.style.height = newHeight + 'px';
    }
    
    gameScaler.style.marginTop = (-newHeight / 2) + 'px';
    gameScaler.style.marginLeft = (-newWidth / 2) + 'px';

    canvas.width = newWidth;
    canvas.height = newHeight;
};

function initGame(){
	canvas = document.getElementById("gameField");
	context = canvas.getContext("2d");
	resizeGame();
	
	Beach = new Image();
	Beach.src = "Graphics/Beach2.png";
	Cannon = new Image();
	Cannon.src = "Graphics/Cannon.png";
	cannon = new CannonClass();
	Ship1 = new Image();
	Ship1.src = "Graphics/Ship1.png";
	setInterval(function(){
	gameloop();
	}, SEC/FRAMERATE);
};


window.addEventListener("resize", resizeGame, false);
window.addEventListener("orientationchange", resizeGame, false);

// Controls. skift evt. til f.mat controls

window.addEventListener("keydown", function(key){
	keys[key.keyCode] = true;
} );

window.addEventListener("keyup", function(key){
	delete keys[key.keyCode];
} );

// Gameloop

function gameloop(){
	update();
	render();
};

function update(){
	/* key handelsers
		disse skal nok være i en anden funktion for at undgå at den tester 30 gange/sek.
		Få inspiration fra F.mat.
		
	if(keys[SKUDKNAP]){
		if (svaret == id på en enemy){
			tilføj skib og vinkel mod skib til cannon.Targets listen
		} else {
			straf?
		}
	clearAnswer();
	};
	
	if(keys[CLEARKNAP]){
		clearAnswer();
	}
		
		
	*/
	if (Object.keys(Enemies).length == 0){
		spawnEnemy();
	};
	for (var key in Enemies) {
		let ship = Enemies[key];
		ship.Dist++;
		if(ship.Dist == ship.GoalDist){
			ship.Dist = 0;
			ship.Lane = Math.floor(Math.random() * LANES);
		};
	ship.y = (ship.Dist/ship.GoalDist)*canvas.height;
	};
	/* 
	få cannon.rotation tættere på cannon.Targets[0].angle;
	
	if(cannon.rotation == cannon.Targets[0].angle){
		cannon.fire(); // canon fire skal nok kopiere nogle oplysninger fra målskibet til en cannon.balls liste.
	};
	*/
	
	// kanon sjov:
		//cannon.rotation = (cannon.rotation + cannon.rotSpeed)%360; //snurrer rundt
		cannon.rotation = cannon.rotation + cannon.rotSpeed;
		if (Math.abs(cannon.rotation) > 90){cannon.rotSpeed = -cannon.rotSpeed; };

	
 };

function render(){
	context.clearRect(0,0, canvas.width, canvas.height);
	// skal laves om til en foreach enemy agtig ting
	context.drawImage(Beach, 0, canvas.height - canvas.height/5, canvas.width, canvas.height/5);
	for (var key in Enemies) {
		let ship = Enemies[key];
		context.drawImage(ship.image, canvas.width/LANES*ship.Lane, ship.y -(canvas.width/LANES * ship.image.height / ship.image.width), canvas.width/LANES, canvas.width/LANES * ship.image.height / ship.image.width);
	};
	//lav en Scale Funktion. kannonen scalerer ikke.
	drawRotatedImage(cannon.image, canvas.width/2, canvas.height*CannonY, cannon.rotation);
};