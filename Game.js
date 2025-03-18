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
var score = 0;
const canvasWidth = 660;
const canvasHeight = 310;
var robotXPos = 100;
var robotYPos = 0;

//ground variables
let sheetImg;
let mountain, water, cobblestone;
function preload() {
    sheetImg = loadImage("Textures-16.png");
}

/*******************************************************/
// setup
/*******************************************************/
function setup() {
    cnv = new Canvas(canvasWidth, canvasHeight, "Pixelated x4");
    world.gravity.y = 10;
	score = 0;

    //player

    player = new Sprite(robotXPos, robotYPos, 16, 16, 'd');
	player.color = 'orange';
	player.rotationSpeed = 0;

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

	//collectables - tile key goes from b in alphabetical order
	books = new Group()
	books.width = 16;
	books.height = 16;
	books.collider = "static";
	books.tile = "b";

	comic = new Group()
	comic.width = 16;
	comic.height = 16;
	comic.collider = "static";
	comic.tile = "c";

	dictionary = new Group()
	dictionary.width = 16;
	dictionary.height = 16;
	dictionary.collider = "static";
	dictionary.tile = "d";


	new Tiles(
		[
			'........b..b..........',
			'......................',
			'mmmmm..mmmmmm.........',
			'ssssswwssssss.........',
			'ssssswwssssssmm....d..',
			'sssssssssssssssmmmmmmm'
		],
		13, 100, //x, y
		16, 16 //w, h
	);
	keyPressed();
	if (books.collides(player, playerCollectBook)) {
		playerCollectBook();
	}

	if (dictionary.collides(player, playerCollectDictionary)) {
		playerCollectDictionary();
	}

	if (comic.collides(player, playerCollectComic)) {
		playerCollectComic();
	}
}
/*******************************************************/
// draw loop
/*******************************************************/
function draw() {
	if (gameState == "play") {
        runGame();
    }
    else if (gameState == "lose") {
        end();
    }

}

/*******************************************************/
// Functions
/*******************************************************/

function keyPressed () {
	console.log(keyCode)
}

function start () {

}

function runGame () {
	clear();
    robotMovement();
	background('grey');
	displayScore();
	console.log (movementSpeed)
}

function end () {
	
}

function displayScore () {
    textSize(10);
    text("Score: "+ score, 0, 15);
}

function playerCollectBook(b) {
	// Delete the book when the player touches it
	b.remove();
	score = score + 100
   
}	
function playerCollectDictionary(d) {
	// Delete the dictionary when the player touches it
	d.remove();
	score = score + 500
   
}	

function playerCollectComic(c) {
	// Deletes the comic when the player touches it
	c.remove();
	score = score + 50
   
}	