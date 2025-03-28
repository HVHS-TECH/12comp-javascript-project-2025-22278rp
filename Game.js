/*******************************************************/
// Library Labyrinth
//Made in P5 Play Java Script
//by 22278RP
//tile map by https://piiixl.itch.io/textures
//Library assets by https://manu-art.itch.io/library-asset-pack 
//Other textures- books and restart button made by me in Piskel
//Chat gpt helped with refresh screen code
/*******************************************************/

//Things I need to fix
//- collision with books
//-What happens after restart
/*******************************************************/
// Variables
/*******************************************************/
var gameState = "play";
var player;
var issueDesk;
var restartButton;
var score = 0;
var booksFound = 0;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 320;
var robotXPos = 50;
var robotYPos = 0;

//ground variables
let sheetImg;
let mountain, water, cobblestone, lava;
function preload() {
    sheetImg = loadImage("images/Textures-16.png");
	buttonImg = loadImage("images/restartButton.png");
	bookImg = loadImage("images/books.png");
	bgImg = loadImage("images/Background.png");
}

/*******************************************************/
// setup
/*******************************************************/
function setup() {
    cnv = new Canvas(CANVAS_WIDTH, CANVAS_HEIGHT, 'pixelated x2');
    world.gravity.y = 10;
	score = 0;

    //player

    player = new Sprite(robotXPos, robotYPos, 10, 10, 'd');
	player.color = 'orange';
	player.rotationSpeed = 0;

	//Finish line

	issueDesk = new Sprite (651, 220, 32, 64), 'd';
	issueDesk.collider = "static";

	//Tiles

	mountain = new Group()
	mountain.collider = "static";
	mountain.spriteSheet = sheetImg;
	mountain.addAni({w:16, h:16, row:14, col:0});
	mountain.tile = "m";

	cobblestone = new Group()
	cobblestone.collider = "static";
	cobblestone.spriteSheet = sheetImg;
	cobblestone.addAni({w:16, h:16, row:13, col:4});
	cobblestone.tile = "s";

	water = new Group()
	water.collider = "static";
	water.spriteSheet = sheetImg;
	water.addAni({w:16, h:16, row:14, col:2});
	water.tile = "w";

	lava = new Group()
	lava.collider = "static";
	lava.spriteSheet = sheetImg;
	lava.addAni({w:16, h:16, row:9, col:0});
	lava.tile = "l";

	//book collectables - tile key goes from b in alphabetical order
	books = new Group()
	books.collider = "none";
	books.spriteSheet = bookImg;
	books.addAni ({w:16, h:16, row:0, col:1,}); 
	books.tile = "b";

	comic = new Group()
	comic.spriteSheet = bookImg;
	comic.addAni ({w:16, h:16, row:1, col:1,}); 
	comic.collider = "none";
	comic.tile = "c";

	dictionary = new Group()
	dictionary.spriteSheet = bookImg;
	dictionary.addAni ({w:16, h:16, row:1, col:0,}); 
	dictionary.collider = "none";
	dictionary.tile = "d";


	new Tiles(
		[
			'm............................................s',
			'm............................................s',
			'm............................................s',
			'm............................................s',
			'm.........c...b..............................s',
			'mmmmmmm...ww..ww..mmmm.......................s',
			'mssssss...ww..ww..ssss.......................s',
			'mssssss...ww..ww..ssss.......................s',
			'mssssss...ww..ww..ssss...mmm.................s',
			'msssssslllssllss..ssss.......................s',
			'msssssssssssssss..ssss.......................s',
			'msssssssssssssss..ssss........mmm............s',
			'msssssssssssssss..ssss.......................s',
			'mss..........................................s',
			'mss..........................................s',
			'mss...............ssss.......................s',
			'mss..mmm.....mmm..ssss.......................s',
			'mss...............ssss.......................s',
			'mssllllll.d.llllllssss.......................s',
			'msssssssssssssssssssssssssssssssssssssssssssss'
		],
		0, 0, //x, y
		16, 16 //w, h
	);
	keyPressed();
	
}
/*******************************************************/
// draw loop
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

function runGame () {
	clear();
    robotMovement();
	console.log (player.x);
	background(bgImg);
	displayScore();

	camera.x = player.x
	camera.y = player.y

	if (player.y >= 300) {
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

	if (lava.collides(player, levelLost)) {
		levelLost();
	}
	
}

function win () {
console.log("WINNING")
	mouseInteractRestartButton();
	

}

function levelCompleted () {
	console.log("I collided")
	gameState = "win";
	score = score + 150
	//Will change the game to the win screen

	//Clearing out the screen
	player.remove();
	mountain.removeAll();
	water.removeAll();
	cobblestone.removeAll();
	issueDesk.remove();
	books.removeAll();
	comic.removeAll();
	dictionary.removeAll();
	lava.removeAll();

	//Winning screen

	camera.x = CANVAS_WIDTH/2;
	camera.y = CANVAS_HEIGHT/2;

	background("yellow");
	textSize(20)
	fill("black");
	textAlign(CENTER, CENTER);
	text("YOU WON!!", CANVAS_WIDTH/2, 50);
	text("Score: "+ score, CANVAS_WIDTH/2, 100);
	text("Books issued: " + booksFound + "/3", CANVAS_WIDTH/2, 150)

	restart();
}


function lose () {
	console.log ("I LOST :(");
	mouseInteractRestartButton();

}

function levelLost () {
	gameState = "lose";

	player.remove();
	mountain.remove();
	water.removeAll();
	lava.removeAll();
	cobblestone.removeAll();
	issueDesk.remove();
	books.removeAll();
	comic.removeAll();
	dictionary.removeAll();

	//losing screen

	camera.x = CANVAS_WIDTH/2;
	camera.y = CANVAS_HEIGHT/2;

	background("red");
	textSize(20)
	fill("black");
	textAlign(CENTER, CENTER);
	text("YOU LOST", CANVAS_WIDTH/2, 50);
	text("Score: "+ score, CANVAS_WIDTH/2, 100);
	text("Books issued: " + booksFound + "/3", CANVAS_WIDTH/2, 150)

	restart();

}

function displayScore () {
    textSize(20);
    text("Score: "+ score, 0, 20);
	fill("white");
}

function keyPressed () {
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
	restartButton = new Sprite (CANVAS_WIDTH/2, 200);
	restartButton.spriteSheet = buttonImg;
	restartButton.addAni ({w:16, h:16, row:0, col:0,}); 
	restartButton.collider = "static";
}

function mouseInteractRestartButton () {
	if (restartButton.mouse.hovering()) {
		restartButton.addAni ({w:16, h:16, row:1, col:0,}); 
	}
	else {
		restartButton.addAni ({w:16, h:16, row:0, col:0,}); 	
	}
	if (restartButton.mouse.pressing()) {
		window.location.href = "Game.html";
	}
}