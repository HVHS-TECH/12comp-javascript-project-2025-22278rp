/*******************************************************/
// Robot Explorer
//Made in P5 Play Java Script
//by 22278RP
//tile map by https://piiixl.itch.io/textures
/*******************************************************/

/*******************************************************/
// Variables
/*******************************************************/
var player;
var score;
const canvasWidth = 300;
const canvasHeight = 300;
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

    //player

    player = new Sprite(robotXPos, robotYPos, 16, 16, 'd');
	player.color = 'orange';
	player.rotationSpeed = 0;

    mountain = new Group();
	mountain.collider = "static";
	mountain.spriteSheet = sheetImg;
	mountain.addAni({w:16, h:16, row:29, col:12});
	mountain.tile = "m";

	cobblestone = new Group();
	cobblestone.collider = "static";
	cobblestone.spriteSheet = sheetImg;
	cobblestone.addAni({w:16, h:16, row:30, col:12});
	cobblestone.tile = "c";

	water = new Group();
	water.collider = "static";
	water.spriteSheet = sheetImg;
	water.addAni({w:16, h:16, row:8, col:0});
	water.tile = "w";
	new Tiles(
		[
			'mmmmm..mmmmmm....',
			'cccccwwcccccc....',
			'cccccwwccccccmm..',
			'cccccccccccccccmm'
		],
		13, 100, //x, y
		16, 16 //w, h
	);

}
/*******************************************************/
// draw loop
/*******************************************************/
function draw() {
    clear();
    robotMovement();
}
