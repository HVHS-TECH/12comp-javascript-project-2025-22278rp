/*******************************************************/
// Robot Explorer
//Made in P5 Play Java Script
//by 22278RP
//tile map by https://piiixl.itch.io/textures
/*******************************************************/

/*******************************************************/
// Variables
/*******************************************************/

/*******************************************************/
// Functions
/*******************************************************/
function robotMovement() {
    console.log("hello");
    if (kb.pressing('left')) {

		// Set sprite's velocity to the left
		player.vel.x = -4;
	
	}
	
	else if (kb.pressing ('right')) 
	{
		// Set sprite's velocity to the right
		player.vel.x = 4;	   
	
	}
	else if (kb.pressing ('up')) 
		{
			// Set sprite's velocity to the left
			player.vel.y = -4;	   
		
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
			};
        
}
