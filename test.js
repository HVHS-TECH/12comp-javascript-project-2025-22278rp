let sprite;
console.log("POOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOP")
function setup() {
	new Canvas(500, 100);
	sprite = new Sprite();
}

function draw() {
	clear();
	sprite.color = 'yellow';
    background("red");
	if (mouse.pressing()) sprite.color = 'red';

	if (sprite.mouse.hovering()) mouse.cursor = 'grab';
	else mouse.cursor = 'default';

	if (sprite.mouse.pressing()) sprite.color = 'green';

	if (sprite.mouse.dragging()) {
		sprite.moveTowards(
			mouse.x + sprite.mouse.x,
			mouse.y + sprite.mouse.y,
			1 // full tracking
		);
	}
}