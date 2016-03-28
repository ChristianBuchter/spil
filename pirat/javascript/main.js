// Game Field

document.ontouchmove = function(e){
     e.preventDefault(); 
};

var CannonClass = function(){
	_this = this;
	
	this.image = Cannon;
	this.Targets = [];
	this.rotation = 0;
	this.rotSpeed = (2*Math.PI)/180; // to grader pr. frame
	this.balls;
	this.checkTarget = function(){
		if (answer == ""){return false;}
		if (Enemies[answer] == undefined){
			// DET HER FÅR EN PUNISHMENT FUNKTION
			alert("du svarede forkert og burde få en straf.");
			// SÅDAN ER DET JO.
			answer = "";
		} else{
			// DET HER FÅR EN SINK FUNKTION
			Enemies[answer].sink();
			this.Targets.push(answer); // JEG VED IKKE HVORFOR _this ikke virker her
			// SÅDAN ER DET JO.
			answer = "";
		}
	};
	this.fire = function(){
		//impliment here
		delete Enemies[this.Targets.shift()];
		console.log(this.Targets);
		console.log("BANG!!");
	};
	window.addEventListener('keydown', function(key){
		if (!GAMEOVER){
		switch (key.keyCode) {
			case ONE: answer = answer + "1"; break;
			case TWO: answer = answer + "2"; break;
			case THREE: answer = answer + "3"; break;
			case FOUR: answer = answer + "4"; break;
			case FIVE: answer = answer + "5"; break;
			case SIX: answer = answer + "6"; break;
			case SEVEN: answer = answer + "7"; break;
			case EIGHT: answer = answer + "8"; break;
			case NINE: answer = answer + "9"; break;
			case ZERO: answer = answer + "0"; break;
			case CLEARANSWER: answer = ""; break;
			case FIRE: cannon.checkTarget(); break;
			// LIGE EN MIDLERTIDIG KNAP
			case SPACE: cannon.checkTarget(); break;
			// SÅDAN ER DET JO
			
			}
		}
	});
};

var Enemy = function(){
	_this = this;
	
	this.image = Ship1; 
	this.y = 0;
	this.GoalDist = FRAMERATE*10;
	this.Dist = 0;
	this.Lane = Math.floor(Math.random() * LANES) // måske argument 
	
	this.question = generateAlgebra();
	this.sink = function(){
		_this.hit = true;
		//impliment here
	};
		
	this.hit = false;
	this.sinkingAnimation = function(){
		/*if (index < _this.image.length){
			_this.image[index++]
		} else {
			delete _this; //det kan man ikke rigtigt.
			};
		*/
		//impliment here
	}
	
};

function spawnEnemy(){
// if(freeLane && Object.keys(Enemies).length < MAX_SHIPS){
	var tempEnemy = new Enemy();
	while (!(Enemies[tempEnemy.question[1]] == undefined)){
		tempEnemy = new Enemy();
	}
	Enemies[tempEnemy.question[1]] = tempEnemy;
//}	
};

function angleTo(Target){
	var a = -(shipWidth * Target.Lane + shipWidth/2) + 2*shipWidth;
	var b = gameHeight*CannonY + shipHeight/2 - Target.y ;
	
	// DET HER SKAL VÆRE PÆNERE..
	if (b < 0){
		return Math.PI/2 * Math.sign(-a);
	}
	return Math.acos(a/Math.sqrt(Math.pow(a,2) + Math.pow(b,2))) - Math.PI/2;
	
};

function drawRotatedImage(image, x, y, angle) { 
 
	// save the current co-ordinate system 
	// before we screw with it
	context.save(); 
 
	// move to the middle of where we want to draw our image
	context.translate(x, y);
 
	// rotate around that point, converting our 
	// angle from degrees to radians 
	context.rotate(angle);
 
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
	
	if (newWidthToHeight > ASPECT_RATIO){
		newWidth = newHeight * ASPECT_RATIO;
	}else {
		newHeight = newWidth / ASPECT_RATIO;
	}	
	gameField.style.width = newWidth+'px';
	gameField.style.height = newHeight+'px';
}
/*
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

	
    gameWidth = canvas.width = newWidth;
    gameHeight = canvas.height = newHeight;
	
	
	/*
	* Skip. skal hentes først, før det her virker. ellers skal det hackes
	* /
	shipWidth = gameWidth/LANES;
	shipHeight = shipWidth * (Ship1.height / Ship1.width);
	
	context.font = shipHeight/5 + "px Verdana";
	context.textAlign = "center";
	// RØD TEKST
	context.fillStyle = "#FF0000";
	//
};
*/
function initGame(){
	canvas = document.getElementById("gameField");
	context = canvas.getContext("2d");
	Beach = new Image();
	Beach.src = "Graphics/Beach2.png";
	Cannon = new Image();
	Cannon.src = "Graphics/Cannon.png";
	cannon = new CannonClass();
	Ship1 = new Image();
	Ship1.onload = function(){
			shipWidth = gameWidth/LANES;
	shipHeight = shipWidth * (Ship1.height / Ship1.width);
	
	context.font = shipHeight/5 + "px Verdana";
	context.textAlign = "center";
	// RØD TEKST
	context.fillStyle = "#FF0000";
	};
	Ship1.src = "Graphics/Ship1.png";
	
	resizeGame();
	setInterval(function(){
	gameloop();
	}, SEC/FRAMERATE);
};


window.addEventListener("resize", resizeGame, false);
window.addEventListener("orientationchange", resizeGame, false);

// Controls. skift evt. til f.mat controls
 /*
window.addEventListener("keydown", function(key){
	keys[key.keyCode] = true;
} );

window.addEventListener("keyup", function(key){
	delete keys[key.keyCode];
} );
*/
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

// Gameloop

function takeAim(target){
	cannon.rotation = cannon.rotation + Math.sign(angleTo(target)-cannon.rotation) * Math.min(cannon.rotSpeed, Math.abs(angleTo(target) - cannon.rotation));
	if(cannon.rotation == angleTo(target)){
		cannon.fire(); // canon fire skal nok kopiere nogle oplysninger fra målskibet til en cannon.balls liste.
	}
}

function gameloop(){
	update();
	render();
};

function update(){
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
	ship.y = (ship.Dist/ship.GoalDist)*gameHeight;
	};
	/* 
	få cannon.rotation tættere på cannon.Targets[0].angle;
	*/
	if(cannon.Targets.length > 0){
		takeAim(Enemies[cannon.Targets[0]]) // canon fire skal nok kopiere nogle oplysninger fra målskibet til en cannon.balls liste.
	}else if(cannon.rotation != 0) {
		cannon.rotation = cannon.rotation - Math.sign(cannon.rotation) * Math.min(cannon.rotSpeed, Math.abs(cannon.rotation));
	};
	
	// kanon sjov:
		//cannon.rotation = (cannon.rotation + cannon.rotSpeed)%360; //snurrer rundt
		//cannon.rotation = cannon.rotation + cannon.rotSpeed;
		//if (Math.abs(cannon.rotation) > 90){cannon.rotSpeed = -cannon.rotSpeed; };
		//cannon.rotation = angleTo(Enemies[Object.keys(Enemies)[0]]);
	
 };

function render(){
	context.clearRect(0,0, gameWidth, gameHeight);
	// skal laves om til en foreach enemy agtig ting
	context.drawImage(Beach, 0, gameHeight - gameHeight/5, gameWidth, gameHeight/5);
	for (var key in Enemies) {
		let ship = Enemies[key];
		context.drawImage(ship.image, shipWidth*ship.Lane, ship.y -shipHeight, shipWidth, shipHeight);
		context.fillText(ship.question[0],(shipWidth/2)+shipWidth*ship.Lane,ship.y -shipHeight*0.5,shipWidth);
	};
	//lav en Scale Funktion. kannonen scalerer ikke.
	drawRotatedImage(cannon.image, gameWidth/2, gameHeight*CannonY, cannon.rotation);
	// Gør teksten sej
	context.fillText(answer,gameWidth/2, CannonY*gameHeight);
};