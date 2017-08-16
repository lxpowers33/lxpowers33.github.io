
var _counter = 0;
var _rotationx = 0;
var _rotationy = 0;
var _speed = 0.08;
var _scale = 0.5;
var _planets = new Array();
var planet_color= {color:'rgb(100,100,100)'};
var	asteroid_color = {color:'rgb(255,255,255)'};

function initStars(time) {
	console.log("start star animation");
	setupStars();
	makeStars(); //Make the Star Objects and save in _planets array
	animateStars(time);
}

function setupStars() {
	window.onresize = reSize;
	document.onmousemove = getMouseXY;
	
	canvas = document.getElementById("mycanvas");
	canvas.style.position = 'absolute';
	canvas.style.left="0px";
	canvas.style.top="0px";
	canvas.style.zIndex="0";
	canvas.style.width="100%";
	canvas.style.height="100%";
	canvas.width=canvas.offsetWidth;
	canvas.height=canvas.offsetHeight;

	ctx = canvas.getContext("2d");
}

function finishedStars(starttime) {
	ctx.clearRect(0,0,width,height);
	console.log("stop stars animation");
    console.log(Date.now()-starttime);
    animationcontrol(3);
}

function animateStars(time) {
	starttime = Date.now();
	var id = setInterval(frame, 25);
	framenum = 0; 
	fadeto = 100;
	fadeOutDur = 50;
	fadeOutFrame = time/25-fadeOutDur;
	var colornum1;
	var colornum2;
    function frame() {
    //Function to be applied on to draw each frame
        if (Date.now()-starttime > time) {
            clearInterval(id);
            finishedStars(starttime);
        } else {
        	//Update Object Positions
            calculateObjects();

            //Clear the Canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			//Fade in Effect
			if (framenum <= fadeto) {
				colornum1 = Math.round(21+(79*framenum/fadeto));
				planet_color.color = 'rgb('+colornum1+','+colornum1+','+colornum1+')';

				colornum2 = Math.round(21+((255-21)*framenum/fadeto));
				asteroid_color.color = 'rgb('+colornum2+','+colornum2+','+colornum2+')';
			}

			//Fade out effect
			if (framenum > fadeOutFrame) {

				colornum1 = Math.round(100 - 79*(framenum-fadeOutFrame)/fadeOutDur);
				planet_color.color = 'rgb('+colornum1+','+colornum1+','+colornum1+')';

				colornum2 = Math.round(255-234*(framenum-fadeOutFrame)/fadeOutDur);
				asteroid_color.color = 'rgb('+colornum2+','+colornum2+','+colornum2+')';
			}

			//Draw each object
			for(i=0;i<_planets.length;i++) {
				drawObject(_planets[i]);
			}

			//Update the Frame Numbers
			framenum++;
        }
    }
}


function drawObject(v) {
	ctx.fillStyle = v.color.color;
	ctx.beginPath();
	ctx.arc(v.x,v.y,v.radius*_scale*v.scale,0,2*Math.PI);
	ctx.closePath();
	ctx.fill()
	if (v.type == "small planet") {
		ctx.strokeStyle = v.color.color;
		ctx.beginPath();
		ctx.arc(v.parent.x,v.parent.y,(v.distance+v.parent.radius)*_scale,0,2*Math.PI);
		ctx.closePath();
		ctx.stroke();
	}
}

function reSize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.position = 'absolute';
	canvas.style.left="0px";
	canvas.style.top="0px";
}

function makeStars() {

	_planets = []; 

	_planets.push({
		type:"sun",
		x:0,
		y:0,
		z:0,
		parent:null,
		scale:1,
		radius:100,
		color: planet_color,
		rotationx:0,
		rotationy:0,
		id:_counter++});

	//planet 1
	_planets.push({
		type:"small planet", x:0, y:0, z:0, parent:_planets[0], scale:1, rotationx:Math.PI*2,rotationy:0,
		color:planet_color,distance:200, radius:20, speedx:0.13,
		speedy: 0,
		id:_counter++});

	//planet 2
	_planets.push({
		type:"small planet", x:0, y:0, z:0, parent:_planets[0], scale:1, rotationx:Math.PI*2,rotationy:0,
		color:planet_color,distance:400, radius:40, speedx:0.1,
		speedy: 0,
		id:_counter++});

	//planet 3
	_planets.push({
		type:"moon", x:0, y:0, z:0, parent:_planets[2], scale:1, rotationx:Math.PI*2,rotationy:0,
		color:planet_color,distance:30, radius:10, speedx:0.2,
		speedy: 0,
		id:_counter++});

	//planet 4
	_planets.push({
		type:"small planet", x:0, y:0, z:0, parent:_planets[0], scale:1, rotationx:Math.PI*2,rotationy:0,
		color:planet_color,distance:1200, radius:80, speedx:0.07,
		speedy: 0,
		id:_counter++});

	//planet 5
	_planets.push({
		type:"small planet", x:0, y:0, z:0, parent:_planets[0], scale:1, rotationx:Math.PI*2*1.1,rotationy:0,
		color:planet_color,distance:1800, radius:80, speedx:0.03,
		speedy: 0,
		id:_counter++});

	//planet 6
	_planets.push({
		type:"small planet", x:0, y:0, z:0, parent:_planets[5], scale:1, rotationx:Math.PI*2,rotationy:0,
		color:planet_color,distance:200, radius:30, speedx:0.2,
		speedy: 0,
		id:_counter++});

	for(i=0; i<30; i++) {
		var rnd = Math.random();
		_planets.push({
			type:"asteroid",
			x:0,
			y:0,
			z:0,
			parent:_planets[0],
			scale:1,
			radius:0.2+(1-rnd)*7,
			color:planet_color,
			distance:150,
			rotationx:Math.PI*2*Math.random(),
			rotationy:Math.random()*0.4,
			speedx:0.1 + 0.1-0.2*rnd,
			speedy: 0,
			id:_counter++});
	}


	for(i=0; i<300; i++) {
		var rnd = Math.random();
		_planets.push({
			type:"asteroid",
			x:0,
			y:0,
			z:0,
			parent:_planets[0],
			scale:1,
			radius:1.5,
			color:asteroid_color,
			distance:500+300*rnd,
			rotationx:Math.PI*2*Math.random(),
			rotationy:Math.random()*0.4,
			speedx:0.05 + 0.03-0.03*rnd,
			speedy: 0,
			id:_counter++});
	}

	for(i=0; i<40; i++) {
		var rnd = Math.random();
		_planets.push({
			type:"asteroid",
			x:0,
			y:0,
			z:0,
			parent:_planets[5],
			scale:1,
			radius:1.5,
			color:asteroid_color,
			distance:300+200*rnd,
			rotationx:Math.PI*2*Math.random(),
			rotationy:Math.random()*0.4,
			speedx:0.05 + 0.03-0.03*rnd,
			speedy: 0,
			id:_counter++});
	}
}



function calculateObjects() {


	var diffx = (mouseY / 60 - _rotationy);
	var diffy = (mouseX / 60 - _rotationx);

	_rotationy += diffx/10;
	_rotationx += diffy/10;

	_planets.sort(sortOnId);
	_planets[0].x = 20;
	_planets[0].y = 20;

	for(i=0;i<_planets.length;i++) {
		if(_planets[i].type !="sun") {
			_planets[i].rotationx += _planets[i].speedx * _speed;
			_planets[i].rotationy+= _planets[i].speedy * _speed;

			_planets[i].x  = _planets[i].parent.x + Math.sin(_rotationx + _planets[i].rotationx)
							*(_planets[i].distance+_planets[i].parent.radius)
							*_scale;
			_planets[i].y  = _planets[i].parent.y + Math.cos(_rotationx + _planets[i].rotationx)
							*(_planets[i].distance+_planets[i].parent.radius)
							*_scale 
							* Math.cos(_rotationy+_planets[i].rotationy);
		}
	}

}
	
var mouseX = 0;
var mouseY = 0;


function getMouseXY(e) {

	tempX = e.pageX;
	tempY = e.pageY;

	if (tempX < 0){tempX = 0;}
	if (tempY < 0){tempY = 0;}  

	mouseX = 0;
	mouseY = 0;

}

function sortOnZ(a,b)
{
	return a.z-b.z;
}

function sortOnId(a,b)
{
	return a.id - b.id;
}
