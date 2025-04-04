/*******************************************************/
// Library Labyrinth
//Made in P5 Play Java Script
//by 22278RP
//tile map by https://piiixl.itch.io/textures
//Library assets by https://manu-art.itch.io/library-asset-pack 
//Robot player by https://edusilvart.itch.io/robot-platform-pack
//Other textures- books and restart button made by me in Piskel
//Chat gpt helped with refresh screen code
/*******************************************************/
/*
tasks:
- Robot animations
- books found array
- level design
- Health sprite
- add return functions
- lava physics
/*******************************************************/
// Variables
/*******************************************************/
var gameState = "play";

var score = 0;
var health = 5;
var booksFound = 0;
var booksFoundGroup;
const CANVAS_WIDTH = 768;
const CANVAS_HEIGHT = 450;
var robotXPos = 50;
var robotYPos = 0;

//ground variables
let sheetImg;
let wood, bookBoxes, planks, lava;

//Special blocks
var issueDesk;
var restartButton;

//player

let player;
let playerAni;

//let playerAni
function preload() {
	sheetImg = loadImage("images/Textures-16.png");
	buttonImg = loadImage("images/restartButton.png");
	bookImg = loadImage("images/books.png");
	bgImg = loadImage("images/Background.png");
	hpImg = loadImage("images/HP.png");
	playerAni = loadImage("images/playerSpritesheet.png")

}

/*******************************************************/
// setup
/*******************************************************/
function setup() {
	cnv = new Canvas(CANVAS_WIDTH, CANVAS_HEIGHT, 'pixelated x2');
	world.gravity.y = 10;
	score = 0;
	booksFoundGroup = new Group ();
	hpBlocks = new Group();

	//player

	player = new Sprite(robotXPos, robotYPos, 32, 32, 'd');
	player.spriteSheet = playerAni;
	player.anis.offset.x = 2;
	player.anis.frameDelay = 8;
	player.rotationSpeed = 0;
	player.scale.x = 1;
	player.scale.y = 1;

	player.addAnis({
		stand: { row: 0, frames: 5 },
		run: { row: 0, col: 6, frames: 3 },
		jump: {row: 1, col: 4, frames: 5},
		fall: {row: 2, frames: 3},
		damaged: {row: 4, col: 4, frames: 2},
		destroyed: {row: 4, col: 4, frames: 5}
	});
	player.changeAni('stand');

	//Finish line

	issueDesk = new Sprite(651, 220, 32, 64), 'd';
	issueDesk.collider = "static";

	//Tiles - tile key goes from a in alphabetical order

	wood = new Group()
	wood.collider = "static";
	wood.spriteSheet = sheetImg;
	wood.addAni({ w: 16, h: 16, row: 14, col: 0 });
	wood.tile = "a";

	planks = new Group()
	planks.collider = "static";
	planks.spriteSheet = sheetImg;
	planks.addAni({ w: 16, h: 16, row: 13, col: 4 });
	planks.tile = "b";

	bookBoxes = new Group()
	bookBoxes.collider = "static";
	bookBoxes.spriteSheet = sheetImg;
	bookBoxes.addAni({ w: 16, h: 16, row: 14, col: 2 });
	bookBoxes.tile = "c";

	lava = new Group()
	lava.collider = "static";
	lava.spriteSheet = sheetImg;
	lava.addAni({ w: 16, h: 16, row: 9, col: 0 });
	lava.tile = "d";

	books = new Group()
	books.collider = "none";
	books.spriteSheet = bookImg;
	books.addAni({ w: 16, h: 16, row: 0, col: 1, });
	books.tile = "e";

	comic = new Group()
	comic.spriteSheet = bookImg;
	comic.addAni({ w: 16, h: 16, row: 1, col: 1, });
	comic.collider = "none";
	comic.tile = "f";

	dictionary = new Group()
	dictionary.spriteSheet = bookImg;
	dictionary.addAni({ w: 16, h: 16, row: 1, col: 0, });
	dictionary.collider = "none";
	dictionary.tile = "g";


	new Tiles(
		[
			'a.......................................................b',
			'a.......................................................b',
			'a.......................................................b',
			'a.......................................................b',
			'a.........f...e.........................................b',
			'aaaaaaa...cc..cc..aaaa..................................b',
			'abbbbbb...cc..cc..bbbb..................................b',
			'abbbbbb...cc..cc..bbbb..................................b',
			'abbbbbb...cc..cc..bbbb...aaa............................b',
			'abbbbbbdddbbddbb..bbbb..................................b',
			'abbbbbbbbbbbbbbb..bbbb..................................b',
			'abbbbbbbbbbbbbbb..bbbb........aaa.......................b',
			'abbbbbbbbbbbbbbb..bbbb..................................b',
			'abb.....................................................b',
			'abb.....................................................b',
			'abb...............bbbb..................................b',
			'abb..aaa.....aaa..bbbb..................................b',
			'abb...............bbbb..................................b',
			'abbdddddd.g.ddddddbbbb..................................b',
			'abbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
		],
		0, 0, //x, y
		16, 16 //w, h
	);
	keyPressed();

}
/*******************************************************/
// draw doop
/*******************************************************/
function draw() {
	if (gameState == "play") {
		runGame();
	}
	if (gameState == "win") {
		win();
	}
	if (gameState == "lose") {
		lose();
	}
}

/*******************************************************/
// Functions
/*******************************************************/

function runGame() 
{
	clear();
	robotMovement();
	background(bgImg);
	displayScore();
	healthbar();

	camera.x = player.x
	camera.y = player.y

	if (kb.pressing('d')) {
		player.changeAni('run');
		player.scale.x = 1; // Make sure sprite faces right (not flipped)
	} else if (kb.pressing('a')) {
		player.changeAni('run');
		player.scale.x = -1; // Flip sprite to face left
	} else { // If neither 'd' nor 'a' are pressed
		player.changeAni('stand');
	}

	if (player.collides (lava) ) {
		player.vel.y = -5; 
		//player.vel.x = 0; 
		health = (health - 1);
		console.log(health)
	}

	if (player.y >= 300 || (health <= 0)) 
	{
		levelLost();
	}
	
	if (books.overlaps(player, playerCollectBook)) {
		playerCollectBook();
	}

	if (dictionary.overlaps(player, playerCollectDictionary)) {
		playerCollectDictionary();
	}

	if (comic.overlaps(player, playerCollectComic)) {
		playerCollectComic();
	}

	if (issueDesk.collides(player, levelCompleted)) {
		levelCompleted();
	}

}

function win() {
	console.log("WINNING")
	mouseInteractRestartButton();


}

function levelCompleted() {
	console.log("I collided")
	gameState = "win";
	score = score + 150
	//Will change the game to the win screen

	//Clearing out the screen
	player.remove();
	wood.removeAll();
	bookBoxes.removeAll();
	planks.removeAll();
	issueDesk.remove();
	books.removeAll();
	comic.removeAll();
	dictionary.removeAll();
	lava.removeAll();
	hpBlocks.removeAll();

	//Winning screen

	camera.x = CANVAS_WIDTH / 2;
	camera.y = CANVAS_HEIGHT / 2;

	background("yellow");
	textSize(20)
	fill("black");
	textAlign(CENTER, CENTER);
	text("YOU WON!!", CANVAS_WIDTH / 2, 50);
	text("Score: " + score, CANVAS_WIDTH / 2, 100);
	text("Books issued: " + booksFound + "/3", CANVAS_WIDTH / 2, 150)

	restart();
	booksCollectedUI();
	
}


function lose() {
	console.log("I LOST :(");
	mouseInteractRestartButton();

}

function levelLost() {
	gameState = "lose";

	player.remove();
	wood.remove();
	bookBoxes.removeAll();
	lava.removeAll();
	planks.removeAll();
	issueDesk.remove();
	books.removeAll();
	comic.removeAll();
	dictionary.removeAll();
	hpBlocks.removeAll();

	//losing screen

	camera.x = CANVAS_WIDTH / 2;
	camera.y = CANVAS_HEIGHT / 2;

	background("red");
	textSize(20)
	fill("black");
	textAlign(CENTER, CENTER);
	text("YOU LOST", CANVAS_WIDTH / 2, 50);
	text("Score: " + score, CANVAS_WIDTH / 2, 100);
	text("Books issued: " + booksFound + "/3", CANVAS_WIDTH / 2, 150)

	restart();
	booksCollectedUI();
}

function displayScore() {
	textSize(20);
	text("Score: " + score, 0, 20);
	fill("white");
}

function keyPressed() {
	console.log(keyCode)
}

function playerCollectBook(b) {
	// Delete the book when the player touches it
	b.remove();
	score = score + 100
	booksFound++

}
function playerCollectDictionary(d) {
	// Delete the dictionary when the player touches it
	d.remove();
	score = score + 500
	booksFound++

}

function playerCollectComic(c) {
	// Deletes the comic when the player touches it
	c.remove();
	score = score + 50
	booksFound++
}

function restart() {
	restartButton = new Sprite(CANVAS_WIDTH / 2, 200);
	restartButton.spriteSheet = buttonImg;
	restartButton.addAni({ w: 16, h: 16, row: 0, col: 0, });
	restartButton.collider = "static";
}

function mouseInteractRestartButton() {
	if (restartButton.mouse.hovering()) {
		restartButton.addAni({ w: 16, h: 16, row: 1, col: 0, });
	}
	else {
		restartButton.addAni({ w: 16, h: 16, row: 0, col: 0, });
	}
	if (restartButton.mouse.pressing()) {
		window.location.href = "Game.html";
	}
}

function booksCollectedUI() {
	for (var i = 0; i < booksFound; i++) {
		bookFoundSprite = new Sprite(50+30*i, 250, 50, 50);
		bookFoundSprite.collider = "static";
		bookFoundSprite.spriteSheet = bookImg;
		bookFoundSprite.addAni({ w: 16, h: 16, row: 0, col: 0, });
	  }
}

function healthbar() {
	hpBlocks.removeAll();
	fill(255); 
	textSize(20); 
	text("HP:", 150, 20);
	for (var i = 0; i < health; i++) 
	{
		
		let block = new Sprite (200 + 30 * i, 15, 20, 20); 
		block.colour = ("red");
		block.spriteSheet = hpImg;
		block.addAni({ w: 32, h: 32, row: 0, col: 0 });
		noStroke();
		block.collider = "none";
		hpBlocks.add(block);
		
		
	}
	// Update and draw the health blocks in the group
  	hpBlocks.draw();
}

