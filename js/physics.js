var DAMPING = .999;
var clicks = 0;

function clickME() {
  clicks+=1;
  document.getElementById("counter").innerHTML = clicks;
  particles.push(new Particle(Math.random() * width, Math.random() * height, 0,0, Math.floor(Math.random()*3)));
}
function Particle(x, y, dvx, dvy, im) {
  this.x = this.oldX = x;
  this.y = this.oldY = y;
  this.dvx = 0;
  this.dvy = 0;
  this.im = im;
}
Particle.prototype.integrate = function() {
  var velocityX = (this.x - this.oldX) * DAMPING;
  var velocityY = (this.y - this.oldY) * DAMPING;
  this.oldX = this.x;
  this.oldY = this.y;
  this.x += velocityX + .5*this.dvx;
  this.y += velocityY + .5*this.dvy;
};
Particle.prototype.PBC = function() {
  var velocityX = (this.x - this.oldX) * DAMPING;
  var velocityY = (this.y - this.oldY) * DAMPING;
  if (Math.abs(this.x - width/2) > width/2) {
    this.x = (this.x + width) % width;
  };
  if (Math.abs(this.y - height/2) > height/2) {
    this.y = (this.y + height) % height;
  };
};
Particle.prototype.mouseattract = function(x, y, dvx, dvy) {
  var dx = x - this.x;
  var dy = y - this.y;
  var d = Math.sqrt(dx * dx + dy * dy);
  var angle = Math.abs(Math.atan(dy/dx));
  var force = Math.pow(100/d,1)-Math.pow(100/d,3);
  this.dvx += Math.cos(angle)*(dx/Math.abs(dx))*force;
  this.dvy += Math.sin(angle)*(dy/Math.abs(dy))*force;  
};
Particle.prototype.attract = function(x, y, dvx, dvy) {
  var dx = x - this.x;
  var dy = y - this.y;
  var d = Math.sqrt(dx * dx + dy * dy);
  var angle = Math.abs(Math.atan(dy/dx));
  var force = 10/Math.pow(d,1);
  this.dvx += Math.cos(angle)*(dx/Math.abs(dx))*force;
  this.dvy += Math.sin(angle)*(dy/Math.abs(dy))*force;  
};
Particle.prototype.draw = function(n) {
  var im0 = document.getElementById("david");
  var im1 = document.getElementById("david1");
  var im2 = document.getElementById("david2");
  var imgArray = new Array(im0,im1,im2);
  ctx.globalAlpha = .5;
  ctx.drawImage(imgArray[n], this.x, this.y, 25, 30);
};

var display = document.querySelector('canvas');
var ctx = display.getContext('2d');
var particles = [];
var width = display.width = window.innerWidth;
var height = display.height = window.innerHeight;
var mouse = { x: width * 0.1, y: height * 0.1 };

display.addEventListener('mousemove', onMousemove);
function onMousemove() {
  mouse.x = event.pageX;
  mouse.y = event.pageY-this.offsetTop;
  document.getElementById("xPos").innerHTML = mouse.x;
  document.getElementById("yPos").innerHTML = mouse.y;
}

requestAnimationFrame(frame);
function frame() {
  requestAnimationFrame(frame);
  ctx.clearRect(0, 0, width, height);
  for (var i = 0; i < particles.length; i++) {
    particles[i].mouseattract(mouse.x, mouse.y, particles[i].dvx,particles[i].dvy);
    for (var j = 0; j < particles.length; j++) {
      if (j!=i) {
        particles[i].attract(particles[j].x, particles[j].y, particles[i].dvx,particles[i].dvy);
      };
    };
    particles[i].integrate();
    particles[i].PBC();
    particles[i].draw(particles[i].im);
    particles[i].dvx=0;
    particles[i].dvy=0;
  }
}

