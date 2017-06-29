
var canvas;
var ctx;
var _counter = 0;
var _rotationx = 0;
var _rotationy = 0;
var _speed = 0.08;
var _scale = 0.5;
var _dots = new Array();


function initDynamicPoints() {

	window.onresize = reSize;
	
	canvas = document.getElementById("DynamicPointsCanvas");
	canvas.style.position = 'absolute';
	canvas.style.left="0px";
	canvas.style.top="0px";
	canvas.style.zIndex="0";
	canvas.style.width= "1000px"; //actual width
	canvas.style.height="250px"; //actual height 
	//canvas.width = "1000px";
	//canvas.height = "250px";
	ctx = canvas.getContext("2d");
	animate();
	//setInterval(eventOEF, 200);
}

function reSize() {
	canvas.style.position = 'absolute';
	canvas.style.left="0px";
	canvas.style.top="0px";
}


for (i=0; i<30; i++) {
	_dots.push({x:10+1000*Math.random(), y:10+300*Math.random(), id:_counter++, make: Math.random(), cutoff: Math.random()});
}


// animation settings
const duration = 1500;
const ease = d3.easeCubic;
var timer;

// animate the points to a given layout 
function animate() {
  // store the source position
  _dots.forEach(function(point) {
    point.sx = point.x;
    point.sy = point.y;
  });

  // get destination x and y position on each point
  CalculateLayout();

  // store the destination position
   _dots.forEach(function(point) {
    point.tx = point.x;
    point.ty = point.y;
  });

  timer = d3.timer(function(elapsed) {
    // compute how far through the animation we are (0 to 1)
    const t = Math.min(1, ease(elapsed / duration));

    // update point positions (interpolate between source and target)
    _dots.forEach(function(point) {
    	point.x = point.sx * (1 - t) + point.tx * t;
      	point.y = point.sy * (1 - t) + point.ty * t;
    });

    // update what is drawn on screen
    draw();

    // if this animation is over
    if (t === 1) {
      // stop this timer for this layout and start a new one
      timer.stop();

      // start animation for next layout
      animate();
    }
  });
}

function CalculateLayout() { 

	for (i=0; i<4; i++) {
		select = getRandomInt(0, _dots.length-1);

		_dots[select].x = 1000*Math.random()-25;
		_dots[select].y = 300*Math.random()-25;
	}
}

//draw the overall layout
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(i=0;i<_dots.length;i++) {
		drawObject(_dots[i]);
	}
}

//draw individual points
function drawObject(v) {
	ctx.fillStyle = "#ffffff";
	ctx.beginPath();
	ctx.arc(v.x,v.y,2,0,2*Math.PI);
	ctx.closePath();
	ctx.fill();
	ctx.strokeStyle = "#7E7E7E";
 	ctx.lineWidth = 0.3;

	for (t=0; t<_dots.length; t++) {
		if (v.make > v.cutoff + 0.5) {
			ctx.beginPath();
			ctx.moveTo(v.x,v.y);
			other = _dots[t];
			ctx.lineTo(other.x,other.y);
			ctx.stroke();
		}
	} 
}




function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
