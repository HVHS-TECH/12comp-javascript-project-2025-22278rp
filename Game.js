/*******************************************************/
// Robot Explorer
//Made in P5 Play Java Script
//by 22278RP
//tile map by https://piiixl.itch.io/textures
/*******************************************************/

/*******************************************************/
// Variables
/*******************************************************/
var gameState = "win";
var player;
var issueDesk;
var restartButton;
var score = 0;
var booksFound = 0;
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 310;
var robotXPos = 100;
var robotYPos = 0;

//ground variables
let sheetImg;
let mountain, water, cobblestone;
function preload() {
    sheetImg = loadImage("Textures-16.png");
	buttonImg = loadImage("restartButton.png");
}

/*******************************************************/
// setup
/*******************************************************/
function setup() {
    cnv = new Canvas(CANVAS_WIDTH, CANVAS_HEIGHT, "Pixelated x4");
    world.gravity.y = 10;
	score = 0;

    //player

    player = new Sprite(robotXPos, robotYPos, 16, 16, 'd');
	player.color = 'orange';
	player.rotationSpeed = 0;

	//Finish line

	issueDesk = new Sprite (600, 40, 32, 64), 'd';
	issueDesk.collider = "static";

	//Tiles

	mountain = new Group()
	mountain.collider = "static";
	mountain.spriteSheet = sheetImg;
	mountain.addAni({w:16, h:16, row:29, col:12});
	mountain.tile = "m";

	cobblestone = new Group()
	cobblestone.collider = "static";
	cobblestone.spriteSheet = sheetImg;
	cobblestone.addAni({w:16, h:16, row:30, col:12});
	cobblestone.tile = "s";

	water = new Group()
	water.collider = "static";
	water.spriteSheet = sheetImg;
	water.addAni({w:16, h:16, row:8, col:0});
	water.tile = "w";

	//book collectables - tile key goes from b in alphabetical order
	books = new Group()
	books.width = 32;
	books.height = 32 ;
	books.collider = "static";
	books.spriteSheet = buttonImg;
	books.addAni ({w:16, h:16, row:0, col:0,}); 
	books.tile = "b";

	comic = new Group()
	comic.width = 10;
	comic.height = 20;
	comic.collider = "static";
	comic.tile = "c";

	dictionary = new Group()
	dictionary.width = 15;
	dictionary.height = 20;
	dictionary.collider = "static";
	dictionary.tile = "d";


	new Tiles(
		[
			'........b..b..........',
			'......................',
			'mmmmm..mmmmmm.........',
			'ssssswwssssss.........',
			'ssssswwssssssmm....d........................',
			'sssssssssssssssmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
		],
		13, 0, //x, y
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

function keyPressed () {
	console.log(keyCode)
}

function runGame () {
	clear();
    robotMovement();
	background('grey');
	displayScore();
	//console.log (movementSpeed)

	camera.x = player.x
	camera.y = player.y
	console.log(player.y);

	if (player.y >= 300) {
	console.log ("I LOST :(");
	gameState = "lose";
	}

	if (books.collides(player, playerCollectBook)) {
		playerCollectBook();
	}

	if (dictionary.collides(player, playerCollectDictionary)) {
		playerCollectDictionary();
	}

	if (comic.collides(player, playerCollectComic)) {
		playerCollectComic();
	}

	if (issueDesk.collides(player, levelCompleted)) {
		levelCompleted();
	}
}

function levelCompleted () {
	console.log("I collided")
	gameState = "win";
	score = score + 150
	//Will change the game to the win screen
}

function win () {
console.log("WINNING")

//Clearing out the screen
clear();
player.remove();
mountain.remove();
water.remove();
cobblestone.remove();
issueDesk.remove();
books.remove();
comic.remove();
dictionary.remove();

//Winning screen

mouseInteractRestartButton ()

camera.x = CENTER;
camera.y = CENTER;

background("yellow");
textSize(20)
textAlign(CENTER, CENTER);
text("YOU WON!!", CANVAS_WIDTH/2, 50);
text("Score: "+ score, CANVAS_WIDTH/2, 100);
text("Books issued: " + booksFound + "/3", CANVAS_WIDTH/2, 150)

restartButton = new Sprite (50, 200);
restartButton.spriteSheet = buttonImg;
restartButton.addAni ({w:16, h:16, row:0, col:0,}); 
restartButton.collider = "static";
//Problem the restart button only appears when the initial data for game state = win not when I reach the finish line

}

function lose () {
	clear();
	player.remove();
	mountain.remove();
	water.remove();
	cobblestone.remove();
	issueDesk.remove();
	books.remove();
	comic.remove();
	dictionary.remove();

	//losing screen

	camera.x = CENTER;
	camera. y = CENTER;

	background("red");
	textSize(20)
	textAlign(CENTER, CENTER);
	text("YOU LOST....", CANVAS_WIDTH/2, 50);
	text("Score: "+ score, CANVAS_WIDTH/2, 100);
	text("Books issued: " + booksFound + "/3", CANVAS_WIDTH/2, 150)

	restartButton = new Sprite (400, 400);
	restartButton.spriteSheet = buttonImg;
	restartButton.addAni ({w:16, h:16, row:0, col:0,}); 
	restartButton.collider = "static";


}

function displayScore () {
    textSize(20);
    text("Score: "+ score, 0, 15);
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

}

function mouseInteractRestartButton () {
	//not working it says mouse isn't defined
	if (restartButton.mouse.hovering()) {
		restartButton.addAni ({w:16, h:16, row:1, col:0,}); 
	}
	else {
		restartButton.addAni ({w:16, h:16, row:0, col:0,}); 	
	}
	if (restartButton.mouse.pressing()) {
		gameState = "play";
	}
}