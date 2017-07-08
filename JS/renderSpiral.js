
var canvas;
var ctx;
var _counter = 0;
var _rotationx = 0;
var _rotationy = 0;
var _speed = 0.08;
var _scale = 0.5;
var _dots = new Array();
var pointWidth = 5;
var animatetimer = 0; 
var numpoints = 7000;

function initSpiral() {

	window.onresize = reSize;
	
	canvas = document.getElementById("spiralCanvas");
	canvas.style.position = 'absolute';
	canvas.style.left="0px";
	canvas.style.top="0px";
	canvas.style.zIndex="0";
	canvas.style.width= "1000px"; //actual width
	canvas.style.height="250px"; //actual height 
	ctx = canvas.getContext("2d");
	CalculateLayout();
	setInterval(animate, 5);
}

function reSize() {
	canvas.style.position = 'absolute';
	canvas.style.left="0px";
	canvas.style.top="0px";
	animate();
}


for (i=0; i<numpoints; i++) {
	_dots.push({x:10+1000*Math.random(), y:10+800*Math.random(), id:_counter++});
}


// animation settings
const duration = 1500;
const ease = d3.easeCubic;
var timer;

// animate the points to a given layout 
function animate() {
  animatetimer++;
  // get destination x and y position on each point
  
  draw();

}

function CalculateLayout() { 

	phyllotaxisLayout(_dots, pointWidth);
}

function phyllotaxisLayout(points, pointWidth, xOffset = 200, yOffset = 200, iOffset = 0) {
  // theta determines the spiral of the layout
  const theta = Math.PI * (3 - Math.sqrt(5));

  const pointRadius = pointWidth / 1.2;

  points.forEach((point, i) => {
    const index = (i + iOffset) % points.length;
    const phylloX = pointRadius * Math.sqrt(index) * Math.cos(index * theta);
    const phylloY = pointRadius * Math.sqrt(index) * Math.sin(index * theta);

    point.x = xOffset + phylloX - pointRadius;
    point.y = yOffset + phylloY - pointRadius;
  });
}

//draw the overall layout
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(i=0;i<_dots.length;i++) {
		if (i < animatetimer) { 
			if (i%5 === 0) {
				drawObject(_dots[i], "#151515");
			} else {
				ratio = 8 / (100/(1+0.001*numpoints));
				color = ratio*100/(1+0.001*i);
				drawObject(_dots[i], "hsl(0, 0%, "+color+"%)");
			}
		} else {
			drawObject(_dots[i], "#151515");
		}
		
	}
}

//draw individual points
function drawObject(v, color) {
	ctx.fillStyle = color;
	ctx.fillRect(v.x, v.y, pointWidth, pointWidth);
}




function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
