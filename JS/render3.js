/*
General Animation Approach 

Parameterize the animation
Make an overall call function

initGraph
*/
 
var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

function initGraph(time) {
    console.log("start graph animation");
    // Main
    setupGraph();
    drawGraph();
    addListeners();
    animateGraph(time); 
}

function finishedGraph(starttime) {
    console.log("stop graph animation");
    console.log(Date.now()-starttime);
    animationcontrol(1);
}

function animateGraph(time) {
        starttime = Date.now();

        var id = setInterval(frame, 5);

        function frame() {
            if (target.x > width + 200) {
                clearInterval(id);
                finishedGraph(starttime);
            } else {
                target.x = target.x + (width+200)*5/time;
                //console.log(target.x);
                drawGraph();
            }
        }
}

function setupGraph() {
    width = window.innerWidth;
    height = window.innerHeight;
    //console.log(width);
    //console.log(height);
    //target = {x: width/2, y: height/2};
    target = {x: 0, y: 0};

    canvas = document.getElementById('mycanvas');
    
    canvas.style.position = 'absolute';
    canvas.style.left="0px";
    canvas.style.top="0px";
    canvas.style.zIndex="0";
    canvas.style.width="100%";
    canvas.style.height="100%";
    canvas.width = width;
    canvas.height = height;

    ctx = canvas.getContext('2d');

    // create points
    points = [];
    for(var x = 0; x < width; x = x + width/16) {
        for(var y = 0; y < height; y = y + height/16) {
            var px = x + Math.random()*width/16;
            var py = y + Math.random()*height/16;
            var p = {x: px, originX: px, y: py, originY: py };
            points.push(p);
        }
    }

    // for each point find the 5 closest points
    for(var i = 0; i < points.length; i++) {
        var closest = [];
        var p1 = points[i];
        for(var j = 0; j < points.length; j++) {
            var p2 = points[j]
            if(!(p1 == p2)) {
                var placed = false;
                for(var k = 0; k < 5; k++) {
                    if(!placed) {
                        if(closest[k] == undefined) {
                            closest[k] = p2;
                            placed = true;
                        }
                    }
                }

                for(var k = 0; k < 5; k++) {
                    if(!placed) {
                        if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                            closest[k] = p2;
                            placed = true;
                        }
                    }
                }
            }
        }
        p1.closest = closest;
    }

    // assign a circle to each point
    for(var i in points) {
        var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
        points[i].circle = c;
    }
}

    // Event handling
    function addListeners() {
        /*if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }*/
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    

    function drawGraph() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);

            borderx = 0.2*width;
            widthgap = $('#left').height()+$('#right').height()+30;
            bordery = 0.1*width;
            heightgap = $('#titlecontainer').height();
            fade = 50;

            for(var i in points) {
                // detect points in range
                x = points[i].x;
                y = points[i].y;
                dist = Math.pow(x - target.x, 2);
                
                if(dist < 4000) {
                    points[i].active = 0.2;
                    points[i].circle.active = 0.6;  
                    /*
                    if (x > (borderx-fade) && x < (borderx+widthgap+fade)) {
                        if (y > (bordery-fade) && y < (bordery+heightgap+fade)) {
                            points[i].active = 0.05;
                            points[i].circle.active = 0.3;  
                        } 
                    }*/

                } else if(dist < 20000) {
                    points[i].active = 0.05;
                    points[i].circle.active = 0.3;
                } else if(dist < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }
                
                //ctx.rect(borderx,bordery,widthgap,heightgap);
                //ctx.stroke();
                
                
                /*
                if (x > borderx && x < (borderx+widthgap)) {
                    if (y > bordery && y < (bordery+heightgap)) {
                        points[i].active = 0;
                        points[i].circle.active = 0;
                
                    } 
                } */

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }});
    }

    // Canvas manipulation
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(217,217,230,'+ p.active+')';
            //'rgba(156,217,249,'+ p.active+')  217,217,230';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(217,217,230,'+ _this.active+')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }


    