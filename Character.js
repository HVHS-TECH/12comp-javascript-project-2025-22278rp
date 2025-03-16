/*******************************************************/
// Robot Explorer
//Made in P5 Play Java Script
//by 22278RP
//tile map by https://piiixl.itch.io/textures
/*******************************************************/

/*******************************************************/
// Variables
/*******************************************************/
var maxSpeed = 3;
var friction = 0.25;
var MOVEMENTSPEED = 0;
const JUMPSPEED = 4;
var acceleration = 0.5;




/*******************************************************/
// Functions
/*******************************************************/
function robotMovement() {
	player.rotation = 0;

	if (MOVEMENTSPEED > friction) {
		MOVEMENTSPEED = MOVEMENTSPEED - friction;

	}
	else if (MOVEMENTSPEED < -friction) {
		MOVEMENTSPEED = MOVEMENTSPEED + friction;
	}
	else {
		MOVEMENTSPEED = 0;
	}



	if (kb.pressing('a')) {
		var tempSpeed = MOVEMENTSPEED;
		tempSpeed = tempSpeed - acceleration;
		if (tempSpeed <= -maxSpeed ) {
			MOVEMENTSPEED = -maxSpeed;
		}
		else {
			MOVEMENTSPEED = tempSpeed;
		}
		player.vel.x = MOVEMENTSPEED;

	} 
	else if (kb.pressing('d')) 
	{
		var tempSpeed = MOVEMENTSPEED;
		tempSpeed = tempSpeed + acceleration;
		if (tempSpeed >= maxSpeed ) {
			MOVEMENTSPEED = maxSpeed;
		}
		else {
			MOVEMENTSPEED = tempSpeed;
		}
		player.vel.x = MOVEMENTSPEED;
	} 

	if (kb.presses('w') && player.vel.y == 0) 
	{
		player.vel.y = -JUMPSPEED;
	}

}
