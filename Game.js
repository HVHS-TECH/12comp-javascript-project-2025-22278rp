/*******************************************************/
// Library Labyrinth
//Made in P5 Play Java Script
//by 22278RP
//tile map by https://piiixl.itch.io/textures
//Library assets and background by https://manu-art.itch.io/library-asset-pack 
//Robot player by https://edusilvart.itch.io/robot-platform-pack
//Other textures- books, HP, back and restart button made by me in Piskel
//Chat gpt helped with refresh and with the book array screen code
//Some code help from Caleb
/*******************************************************/
/*
tasks:
- Robot animations
/*******************************************************/
// Variables
/*******************************************************/
//game state varaible to determine whether the game is playing, won or lost
var gameState = "play";

//Score and health trackers
var score = 0;
var health = 5;

//Tracking Books collected in the game
var booksFound = 0;
let collectedTypes = []; // Will store the books as strings: "Book", "Comic", "Dictionary"

//Canvas and player spawn positions
const CANVAS_WIDTH = 450;
const CANVAS_HEIGHT = 300;
const PLAYER_XPOS = 60;
const PLAYER_YPOS = 150;

//Maximum ammount of books you can collect
const MAX_BOOKS = 12;

//variables for ground tiles
let sheetImg;
let wood, bookBoxes, planks, lava, bookShelf;

//Special blocks
var finishLine;
var restartButton;

//player variables

let player;
let playerAni;

//Images

function preload() {
	sheetImg = loadImage("images/Textures-16.png");
	buttonImg = loadImage("images/restartButton.png");
	backImg = loadImage("images/backButton.png")
	bookImg = loadImage("images/books.png");
	flagImg = loadImage("images/flag.png");
	bgImg = loadImage("images/Background.png");
	hpImg = loadImage("images/HP.png");
	playerAni = loadImage("images/playerSpritesheet.png");
	librarySheetImg = loadImage("images/libraryTileset.png");
}

/*******************************************************/
// setup
/*******************************************************/
function setup() {
	//Setting variable preamter
	cnv = new Canvas(CANVAS_WIDTH, CANVAS_HEIGHT, 'pixelated x3');
	world.gravity.y = 10;
	score = 0;

	hpBlocks = new Group();

	//player

	player = new Sprite(PLAYER_XPOS, PLAYER_YPOS, 32, 32, 'd');
	player.spriteSheet = playerAni;
	player.anis.offset.x = 1;
	player.anis.offset.y = -5;
	player.anis.frameDelay = 8;
	player.scale.x = 1;
	player.scale.y = 1;
	player.h = 20;
	player.anis.h = 32;
	player.w = 17;
	player.anis.w = 32;

	player.addAnis({
		stand: { row: 0, frames: 5 },
		run: { row: 0, col: 6, frames: 4 },
		jump: { row: 1, col: 1, frames: 10 },
		fall: { row: 1, col: 6, frames: 4 },
		damaged: { row: 4, col: 4, frames: 2 },
		destroyed: { row: 4, col: 4, frames: 5 }
	});

	//Finish line

	finishLine = new Group()
	finishLine.collider = "none";
	finishLine.spriteSheet = flagImg;
	finishLine.addAni({ w: 16, h: 16, row: 0, col: 0 });
	finishLine.scale = 2;
	finishLine.tile = "w"

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
	lava.addAni({ w: 16, h: 16, row: 9, col: 16 });
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

	bookShelf = new Group()
	bookShelf.collider = "static";
	bookShelf.spriteSheet = librarySheetImg;
	bookShelf.addAni({ w: 16, h: 16, row: 6, col: 3 });
	bookShelf.tile = "h";

	new Tiles(
		[
			'.....................................................e................................................b',
			'........................................g............cc...............................................b',
			'.......................................aaa............................................................b',
			'......................................................................................................b',
			'..............................................aaaa....................................................b',
			'..a...........................................hhhh....................................................b',
			'..a.................................dbb...c...hhhh....................................................b',
			'..a.................................hhh.......hhhh....................................................b',
			'..a..............................e..hhh.......hhhh....................................................b',
			'..a...........................e..h..hhh.......hhhh....................................................b',
			'..a...........................h..h............hhhh....................................................b',
			'..a.........f...e...f.........h..h............hhhh.................................................w..b',
			'..aaaaaaaa..cc..cc..cc..aaaaaaaaaaaaaaadddd...aaaa......aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab',
			'..abbbbbbb..cc..cc..cc..bbbbbbbbbbbbbbbbbbb...........................................................b',
			'..abbbbbbb..cc..cc..cc..bbbbbbbbbbbbbbbbbbb...........................................................b',
			'..abbbbbbb..cc..cc..cc..bbbbbbbbbbbbbbbbbbb....f......................................................b',
			'..abbbbbbbddbbddbbddbbddbbbbbbbbbbbbbbbbbbb...hhh.....................................................b',
			'..abbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb...........................................................b',
			'..abbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.............f.............................................b',
			'..abbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.............hhd...........................................b',
			'..bbb..........................................f......................................................b',
			'...............................................hhh....................................................b',
			'.................................................h....................................................b',
			'......................................................................................................b',
			'.......aaa.....aaa.....aaa..........e....e.............cc.............................................b',
			'..bbb.........................c.....c....c......c......cc.............................................b',
			'bbbbbdddddd.g.ddddd.g.bdddddddddddddddddddddddddddddddddddb...........................................b',
			'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
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

function runGame() {
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
	}
	else if (kb.pressing('w')) {
		player.changeAni('jump');
	}
	else { // If neither 'd' nor 'a' are pressed
		player.changeAni('stand');
	}

	if (player.collides(lava)) {
		player.changeAni('damaged');
		player.vel.y = -5;
		health = (health - 1);
		console.log(health)
	}

	if (health <= 0 || player.y >= 1000) {
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

	if (finishLine.overlaps(player, levelCompleted)) {
		levelCompleted();
	}
}


function win() {
	console.log("WINNING")
	mouseInteractRestartButton();
	mouseInteractBackButton();
}

function levelCompleted() {
	console.log("I collided")
	gameState = "win";
	score = score + 150

	//Clearing out the screen
	player.remove();
	wood.removeAll();
	bookBoxes.removeAll();
	planks.removeAll();
	finishLine.remove();
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
	text("Books issued: " + booksFound + "/" + MAX_BOOKS, CANVAS_WIDTH / 2, 150)

	restart();
	back();
	booksCollectedUI();
}


function lose() {
	console.log("I LOST :(");
	mouseInteractRestartButton();
	mouseInteractBackButton();
}

function levelLost() {
	gameState = "lose";

	player.remove();
	wood.remove();
	bookBoxes.removeAll();
	lava.removeAll();
	planks.removeAll();
	finishLine.remove();
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
	text("Books issued: " + booksFound + "/" + MAX_BOOKS, CANVAS_WIDTH / 2, 150)

	restart();
	back();
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
	collectedTypes.push("Book"); // Track the type
}
function playerCollectDictionary(d) {
	// Delete the dictionary when the player touches it
	d.remove();
	score = score + 500
	booksFound++
	collectedTypes.push("Dictionary");
}

function playerCollectComic(c) {
	// Deletes the comic when the player touches it
	c.remove();
	score = score + 50
	booksFound++
	collectedTypes.push("Comic");
}

function restart() {
	restartButton = new Sprite(CANVAS_WIDTH / 2 + 60, 200);
	restartButton.spriteSheet = buttonImg;
	restartButton.addAni({ w: 16, h: 16, row: 0, col: 0, });
	restartButton.collider = "static";
	restartButton.scale = 2;
}

function mouseInteractRestartButton() {
	if (!restartButton) return;

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

function back() {
	backButton = new Sprite(CANVAS_WIDTH / 2 - 60, 200);
	backButton.spriteSheet = backImg;
	backButton.addAni({ w: 16, h: 16, row: 1, col: 0, });
	backButton.collider = "static";
	backButton.scale = 2;
}

function mouseInteractBackButton() {
	if (backButton.mouse.hovering()) {
		backButton.addAni({ w: 16, h: 16, row: 1, col: 0, });
	}
	else {
		backButton.addAni({ w: 16, h: 16, row: 0, col: 0, });
	}
	if (backButton.mouse.pressing()) {
		window.location.href = "index.html";
	}
}

function booksCollectedUI() {
	for (var i = 0; i < collectedTypes.length; i++) {
		let bookType = collectedTypes[i];
		let bookSprite = new Sprite(50 + 30 * i, 250, 50, 50);
		bookSprite.collider = "static";
		bookSprite.spriteSheet = bookImg;

		// Select sprite frame based on type
		if (bookType === "Book") {
			bookSprite.addAni({ w: 16, h: 16, row: 0, col: 1 }); // Book frame
		} else if (bookType === "Comic") {
			bookSprite.addAni({ w: 16, h: 16, row: 1, col: 1 }); // Comic frame
		} else if (bookType === "Dictionary") {
			bookSprite.addAni({ w: 16, h: 16, row: 1, col: 0 }); // Dictionary frame
		}
	}
}

function healthbar() {
	hpBlocks.removeAll();
	fill(255);
	textSize(20);
	text("HP:", 150, 20);
	for (var i = 0; i < health; i++) {

		let block = new Sprite(200 + 30 * i, 15, 20, 20);
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
