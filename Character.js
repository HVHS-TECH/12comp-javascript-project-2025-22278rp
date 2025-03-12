/*******************************************************/
// Robot Explorer
//Made in P5 Play Java Script
//by 22278RP
//tile map by https://piiixl.itch.io/textures
//movement code sampled from tackoverflow.com/questions/38194362/jumping-code-in-javascript 
/*******************************************************/

/*******************************************************/
// Variables
/*******************************************************/
var maxSpeed = 10;
const MOVEMENTSPEED = 1;
const JUMPSPEED = 6;
var jumps = 0;




/*******************************************************/
// Functions
/*******************************************************/
function robotMovement() {{
	if (kb.pressing('a')) {
	player.vel.x = -MOVEMENTSPEED;

} else if (kb.pressing('d')) {
	player.vel.x = MOVEMENTSPEED;
} 

 
else if (kb.pressing('s')) {
	player.vel.y = MOVEMENTSPEED;
}

if (kb.presses('w') && player.vel.y == 0) {
	player.vel.y = -JUMPSPEED;
	jumps = jumps + 1
	console.log(jumps);
	} }
    console.log("hello");

	
	
	//right movement
	/*if (kb.pressing ('right')) 
	{
		console.log("right is working");
		//robotXPos = robotXPos + xForce;
		//xForce = xForce + 0.25;
		player.vel.x = 4;
		//if (xForce >= maxSpeed && kb.pressed('right')) {
		 // xForce = maxSpeed;
		//}
	}
	
	//left movement
	 /* if (keyIsPressed && keyCode === ('left')) {
		robotXPos = robotXPos + xForce;
		xForce = xForce - 0.25;
		if (xForce <= -maxSpeed && keyIsPressed) {
		  xForce = -maxSpeed;
		}
	  }

	  if (!keyIsPressed) {
		robotXPos = robotXPos + xForce;
		if (xForce > 0) {
		  xForce = xForce - 0.25;
		} 
		else if (xForce < 0) {
		  xForce = xForce + 0.25;
		}
	  }

    */
   /*if (kb.pressing('left')) {

		// Set sprite's velocity to the left
		player.vel.x = -4;
		//player.vel.x = player.vel.x + maxSpeed;
	
	}
	
	else if (kb.pressing ('right')) 
	{
		// Set sprite's velocity to the right
		player.vel.x = 4;	   
	
	}

	else if (kb.pressing ('up') && player.vel.y == 0) 
		{
			// Set sprite's velocity to the left
			player.vel.y = -jumpSpeed;
			jumpAmmount = jumpAmmount + 1
			console.log(jumpAmmount);   
		
		}
	else if (kb.pressing ('down')) 
		{
			
				player.vel.y = 4;	   
			
		};
	
	if (kb.released('left')) {
	
		// Set sprite's velocity to zero
		player.vel.x = 0;
	
	}
	
	else if (kb.released('right')) 
	{
		// Set sprite's velocity to zero
		player.vel.x = 0;
	}
	else if (kb.released('up')) 
		{
			// Set sprite's velocity to zero
			player.vel.y = 0;
		}
	
	else if (kb.released('down')) 
			{
				// Set sprite's velocity to zero
				player.vel.y = 0;
			};*/
        
}

function robotCollideTile (_mountain,_player) {
	//player.vel.y = 0;
}
