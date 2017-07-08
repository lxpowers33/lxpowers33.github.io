var r;
var timer;
var lastX;
var lastY;
var lastDripX;
var lastDripY;

function initPollock() {

	r = new Rune({
	  container: "#pollock",
	  width: 1500,
	  height: 250,
	});

	//r.on('mousemove', function(mouse){
	//	newpoint(mouse);	
	//});

	r.play(); 
}

function newpoint(mouse) {
	var point1 = new Rune.Vector(lastDripX, lastDripY);
		var point2 = new Rune.Vector(mouse.x, mouse.y);
		var distance = point2.sub(point1).length();

		if(distance > 200) { //large stroke, make randomCircles
			var numDrips = Rune.random(5);
			randomCircles(mouse.x, mouse.y, numDrips,2,10,10,30);
			lastDripX = mouse.x;
			lastDripY = mouse.y;
		}

		var dx = Math.abs(mouse.x - lastX);
		var dy = Math.abs(mouse.y - lastY);

		var point3 = new Rune.Vector(mouse.x, mouse.y);
		var point4 = new Rune.Vector(lastX, lastY);
		var distance2 = Math.abs(point4.sub(point3).length());

		var line = r.line(mouse.x, mouse.y, point4.x, point4.y)
			.strokeCap("round")
			.strokeJoin("round")
			.stroke(230, 230, 230)

		if ((dx == 0) && (dy == 0)) {
			line.strokeWidth(1)
			lastX = mouse.x;
			lastY = mouse.y;
		}
		else if (distance2 < 2) {
			line.strokeWidth(15)
			lastX = mouse.x;
			lastY = mouse.y;
			
		}
		else {
			line.strokeWidth(150/ (dx+dy+15))
			
			timer = 0;
			lastX = mouse.x;
			lastY = mouse.y;

			if (timer > 15) {
			r.ellipse(mouse.x, mouse.y,50,50)
			.fill(0)
			timer = Rune.random(-50,15);
			}
		}
}


function randomCircles(x, y, numCircles, minSize, maxSize, minDist, maxDist)
{
	for (var i = 0; i < numCircles; i++)
	{
		var radius = minSize + Rune.random(maxSize-minSize);
		var offsetX = minDist + Rune.random(maxDist - minDist);
		var offsetY = minDist + Rune.random(maxDist - minDist);
		var flipX = Rune.random(1);
		
		if (flipX > 0.5) offsetX *= -1;

		var flipY = Rune.random(1);
		
		if (flipY > 0.5) offsetY *= -1;

		r.ellipse(x + offsetX, y + offsetY, radius, radius)
		 .fill(230, 230, 230)
		 .stroke(false)
	}
}
