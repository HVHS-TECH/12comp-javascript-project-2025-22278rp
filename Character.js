/*******************************************************/
// Robot Explorer
//Made in P5 Play Java Script
//by 22278RP
//tile map by https://piiixl.itch.io/textures
/*******************************************************/

/*******************************************************/
// Variables
/*******************************************************/
var maxSpeed = 2;
var friction = 0.125;
var movementSpeed = 0;
const JUMPSPEED = 4;
var acceleration = 0.25;




/*******************************************************/
// Functions
/*******************************************************/
function robotMovement() {
	player.rotationLock = true;

	if (movementSpeed > friction) {
		movementSpeed = movementSpeed - friction;

	}
	else if (movementSpeed < -friction) {
		movementSpeed = movementSpeed + friction;
	}
	else {
		movementSpeed = 0;
	}



	if (kb.pressing('a')) {
		var tempSpeed = movementSpeed;
		tempSpeed = tempSpeed - acceleration;
		if (tempSpeed <= -maxSpeed ) {
			movementSpeed = -maxSpeed;
		}
		else {
			movementSpeed = tempSpeed;
		}
		player.vel.x = movementSpeed;

	} 
	else if (kb.pressing('d')) 
	{
		var tempSpeed = movementSpeed;
		tempSpeed = tempSpeed + acceleration;
		if (tempSpeed >= maxSpeed ) {
			movementSpeed = maxSpeed;
		}
		else {
			movementSpeed = tempSpeed;
		}
		player.vel.x = movementSpeed;
	} 

	if (kb.presses('w') && player.vel.y == 0) 
	{
		player.vel.y = -JUMPSPEED;
	}

}
