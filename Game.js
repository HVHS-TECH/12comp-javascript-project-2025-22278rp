/*******************************************************/
// Robot Explorer
//Made in P5 Play Java Script
//by 22278RP
//tile map by https://piiixl.itch.io/textures
/*******************************************************/

/*******************************************************/
// Variables
/*******************************************************/
var gameState = "play";
var player;
var issueDesk;
var restartButton;
let button;
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
	books.width = 10;
	books.height = 20;
	books.collider = "static";
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

camera.x = CENTER;
camera. y = CENTER;

background("yellow");
textSize(20)
textAlign(CENTER, CENTER);
text("YOU WON!!", CANVAS_WIDTH/2, 50);
text("Score: "+ score, CANVAS_WIDTH/2, 100);
text("Books collected: " + booksFound + "/3", CANVAS_WIDTH/2, 150)

restartButton = new Sprite (400, 400);
restartButton.spriteSheet = buttonImg;
restartButton.addAni ({w:160, h:160, row:0, col:0,}); 
restartButton.collider = "static";
}

function lose () {
	
}

function displayScore () {
    textSize(10);
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