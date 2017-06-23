
var canvas;
var ctx;
var _counter = 0;
var _rotationx = 0;
var _rotationy = 0;
var _speed = 0.08;
var _scale = 0.5;
var _planets = new Array();


function init() {

	window.onresize = reSize;
	document.onmousemove = getMouseXY;
	
	canvas = document.getElementById("canvas");
	canvas.style.position = 'absolute';
	canvas.style.left="0px";
	canvas.style.top="0px";
	canvas.style.zIndex="0";
	canvas.style.width="100%";
	canvas.style.height="100%";
	canvas.width=canvas.offsetWidth;
	canvas.height=canvas.offsetHeight;

	ctx = canvas.getContext("2d");
	eventOEF();
	setInterval(eventOEF, 25);
}

function reSize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.position = 'absolute';
	canvas.style.left="0px";
	canvas.style.top="0px";
}

_planets.push({
	type:"sun",
	x:0,
	y:0,
	z:0,
	parent:null,
	scale:1,
	radius:70,
	color:"#881024",
	rotationx:0,
	rotationy:0,
	id:_counter++});


	_planets.push({
		type:"small planet", x:0, y:0, z:0, parent:_planets[0], scale:1, rotationx:Math.PI*2*Math.random(),rotationy:0,
		color:"#199FAF",distance:200, radius:20, speedx:0.25,
		speedy: 0,
		id:_counter++});


	_planets.push({
		type:"small planet", x:0, y:0, z:0, parent:_planets[0], scale:1, rotationx:Math.PI*2*Math.random(),rotationy:0,
		color:"#880D85",distance:400, radius:40, speedx:0.15,
		speedy: 0,
		id:_counter++});

	_planets.push({
		type:"small planet", x:0, y:0, z:0, parent:_planets[2], scale:1, rotationx:Math.PI*2*Math.random(),rotationy:0,
		color:"#ffffff",distance:30, radius:10, speedx:0.5,
		speedy: 0,
		id:_counter++});

for(i=0; i<300; i++) {
	var rnd = Math.random();
	_planets.push({
		type:"small planet",
		x:0,
		y:0,
		z:0,
		parent:_planets[0],
		scale:1,
		radius:0.5+(1-rnd)*1.5,
		color:"#ffffff",
		distance:40+800*rnd,
		rotationx:Math.PI*2*Math.random(),
		rotationy:Math.random()*0.4,
		speedx:0.05 + 0.2-0.2*rnd,
		speedy: 0,
		id:_counter++});
}


function eventOEF() {
	calculateObjects();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(i=0;i<_planets.length;i++) {
		drawObject(_planets[i]);
	}
}

function drawObject(v) {
	ctx.fillStyle = v.color;
	ctx.beginPath();
	ctx.arc(v.x,v.y,v.radius*_scale*v.scale,0,2*Math.PI);
	ctx.closePath();
	ctx.fill()
}


function calculateObjects() {


	var diffx = (mouseY / 60 - _rotationy);
	var diffy = (mouseX / 60 - _rotationx);

	_rotationy += diffx/10;
	_rotationx += diffy/10;

	_planets.sort(sortOnId);
	_planets[0].x = window.innerWidth/2 + diffx;
	_planets[0].y = window.innerHeight/2 + diffy;

	for(i=0;i<_planets.length;i++) {
		if(_planets[i].type !="sun") {
			_planets[i].rotationx += _planets[i].speedx * _speed;
			_planets[i].rotationy+= _planets[i].speedy * _speed;

			_planets[i].z = _planets[i].parent.z - Math.sin(_rotationy + _planets[i].rotationy)*_planets[i].distance * Math.sin(_rotationx + _planets[i].rotationx + Math.PI/2) * _scale;
			_planets[i].scale = 1 + (_planets[i].z/450);
			if(_planets[i].scale <0.1) {
				_planets[i].scale = 0.1;
			}

			_planets[i].x  = _planets[i].parent.x + Math.sin(_rotationx + _planets[i].rotationx)
							*(_planets[i].distance+_planets[i].parent.radius)
							*_scale;
			_planets[i].y  = _planets[i].parent.y + Math.cos(_rotationx + _planets[i].rotationx)
							*(_planets[i].distance+_planets[i].parent.radius)
							*_scale 
							* Math.cos(_rotationy+_planets[i].rotationy);
		}
	}

	_planets.sort(sortOnZ);
}
	
var mouseX = 0;
var mouseY = 0;


function getMouseXY(e) {

	tempX = e.pageX;
	tempY = e.pageY;

	if (tempX < 0){tempX = 0;}
	if (tempY < 0){tempY = 0;}  

	mouseX = tempX;
	mouseY = tempY;

}

function sortOnZ(a,b)
{
	return a.z-b.z;
}

function sortOnId(a,b)
{
	return a.id - b.id;
}
