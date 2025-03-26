/*******************************************************/
// Library Labyrinth
//Made in P5 Play Java Script
//by 22278RP
//tile map by https://piiixl.itch.io/textures
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
	bookImg = loadImage("books.png");
}

/*******************************************************/
// setup
/*******************************************************/
function setup() {
    cnv = new Canvas(CANVAS_WIDTH, CANVAS_HEIGHT, "Pixelated x3");
    world.gravity.y = 10;
	score = 0;

    //player

    player = new Sprite(robotXPos, robotYPos, 10, 10, 'd');
	player.color = 'orange';
	player.rotationSpeed = 0;

	//Finish line

	issueDesk = new Sprite (600, 40, 32, 64), 'd';
	issueDesk.collider = "static";

	//Tiles

	mountain = new Group()
	mountain.collider = "static";
	mountain.spriteSheet = sheetImg;
	mountain.addAni({w:16, h:16, row:13, col:7});
	mountain.tile = "m";

	cobblestone = new Group()
	cobblestone.collider = "static";
	cobblestone.spriteSheet = sheetImg;
	cobblestone.addAni({w:16, h:16, row:13, col:2});
	cobblestone.tile = "s";

	water = new Group()
	water.collider = "static";
	water.spriteSheet = sheetImg;
	water.addAni({w:16, h:16, row:14, col:1});
	water.tile = "w";

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
			'............................................',
			'.................................c..........',
			'........b..b....................ww..........',
			'mmmmm..mmmmmm................c..ww..........',
			'sssssmmssssss............c..ww..ww..........',
			'sssssssssssssmm....d....ww..ww..ww..........',
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

function runGame () {
	clear();
    robotMovement();
	background('grey');
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

	//Winning screen

	camera.x = CANVAS_WIDTH/2;
	camera.y = CANVAS_HEIGHT/2;

	background("yellow");
	textSize(20)
	textAlign(CENTER, CENTER);
	text("YOU WON!!", CANVAS_WIDTH/2, 50);
	text("Score: "+ score, CANVAS_WIDTH/2, 100);
	text("Books issued: " + booksFound + "/6", CANVAS_WIDTH/2, 150)

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
	textAlign(CENTER, CENTER);
	text("YOU LOST", CANVAS_WIDTH/2, 50);
	text("Score: "+ score, CANVAS_WIDTH/2, 100);
	text("Books issued: " + booksFound + "/6", CANVAS_WIDTH/2, 150)

	restart();

}

function displayScore () {
    textSize(20);
    text("Score: "+ score, 0, 15);
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