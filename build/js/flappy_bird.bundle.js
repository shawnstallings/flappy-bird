(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BirdGraphicsComponent = function(entity) {
	this.entity = entity;
};

var angle = 0;

BirdGraphicsComponent.prototype.draw = function(context) {
		
	var position = this.entity.components.physics.position;

	context.save();
	context.translate(position.x, position.y);
	context.beginPath();
	context.arc(0, 0, 0.02, 0, 2 * Math.PI);
	context.fill();
	context.closePath();
	context.restore();	
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],2:[function(require,module,exports){
var PipeGraphicsComponent = function(entity) {
	this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
	console.log("Drawing a pipe");

	var position = this.entity.components.physics.position;
	
	context.fillStyle = "#FF0000";
	
	context.save();
	context.translate(position.x, position.y);
	context.fillRect(0.8, 0.6, .15, 1);
	context.fillRect(0.8, 0, .15, .4);	
	context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],3:[function(require,module,exports){
var PhysicsComponent = function(entity) {
	this.entity = entity;

	this.position = {
		x: 0,
		y: 0
	};
	this.velocity = {
		x: 0,
		y: 0
	};
	this.acceleration = {
		x: 0,
		y: 0
	};
};

PhysicsComponent.prototype.update = function(delta) {
	this.velocity.x += this.acceleration.x * delta;
	this.velocity.y += this.acceleration.y * delta;

	this.position.x += this.velocity.x * delta;
	this.position.y += this.velocity.y * delta;
};

exports.PhysicsComponent = PhysicsComponent;
},{}],4:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");

var Bird = function() {
	console.log("Creating Bird entity");
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.y = 0.5;
	physics.acceleration.y = -2;  //Gravity strength setting

	var graphics = new graphicsComponent.BirdGraphicsComponent(this);
	
	this.components = {
		physics: physics,
		graphics: graphics
	};
};

exports.Bird = Bird;


},{"../components/graphics/bird":1,"../components/physics/physics":3}],5:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");

var Pipe = function() {
	console.log("Creating Pipe entity");
	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = 0.5;
	physics.velocity.x = -0.5;  //move speed setting

	var graphics = new graphicsComponent.PipeGraphicsComponent(this);
	this.components = {
		graphics: graphics,
		physics: physics
	};
};

exports.Pipe = Pipe;

},{"../components/graphics/pipe":2,"../components/physics/physics":3}],6:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipesSystem = require('./systems/pipes');

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

var FlappyBird = function() {
	this.entities = [new bird.Bird()];
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
	this.physics = new physicsSystem.PhysicsSystem(this.entities);
	this.input = new inputSystem.InputSystem(this.entities);
	this.pipes = new pipesSystem.PipesSystem(this.entities);
};

FlappyBird.prototype.run = function() {
	this.graphics.run();
	this.physics.run();
	this.input.run();
	this.pipes.run();
};

FlappyBird.prototype.pause = function() {
	this.graphics.pause();
	this.physics.pause();
	this.input.pause();
	this.pipes.pause();
};

exports.FlappyBird = FlappyBird;
},{"./entities/bird":4,"./entities/pipe":5,"./systems/graphics":7,"./systems/input":8,"./systems/physics":9,"./systems/pipes":10}],7:[function(require,module,exports){
var GraphicsSystem = function(entities) {
	this.entities = entities;
	// Canvas is where we draw
	this.canvas = document.getElementById('main-canvas');
	// Context is what we draw to
	this.context = this.canvas.getContext('2d');
};

GraphicsSystem.prototype.run = function() {
	// Run the render loop
	window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.tick = function() {
	// Set the canvas to the correct size if the window is resized
	if (this.canvas.width != this.canvas.offsetWidth ||
		this.canvas.height != this.canvas.offsetHeight) {
		this.canvas.width = this.canvas.offsetWidth;
		this.canvas.height = this.canvas.offsetHeight;
	}

	// Clear the canvas
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

	// Save State
	this.context.save();
	this.context.translate(this.canvas.width / 2, this.canvas.height);
	this.context.scale(this.canvas.height, -this.canvas.height);

	// Rendering goes here
	for (var i=0; i<this.entities.length; i++) {
		var entity = this.entities[i];
		if (!'graphics' in entity.components) {
			continue;
		}

		entity.components.graphics.draw(this.context);
	}

	// Restore State
	this.context.restore();

	// Continue the render loop
	window.requestAnimationFrame(this.tick.bind(this));
};

exports.GraphicsSystem = GraphicsSystem;
},{}],8:[function(require,module,exports){
var InputSystem = function(entities) {
	this.entities = entities;

	// Canvas is where we get input from
	this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function() {
	this.canvas.addEventListener('click', this.onClick.bind(this));
	this.canvas.addEventListener('touchstart', this.onClick.bind(this));
};

InputSystem.prototype.onClick = function() {
	var bird = this.entities[0];
	bird.components.physics.velocity.y = 0.6;
};

exports.InputSystem = InputSystem;
},{}],9:[function(require,module,exports){
var PhysicsSystem = function(entities) {
	this.entities = entities;
};

PhysicsSystem.prototype.run = function() {
	//Run the update loop
	window.setInterval(this.tick.bind(this), 1000 / 60);
};

PhysicsSystem.prototype.tick = function() {
	for (var i=0; i<this.entities.length; i++) {
		var entity = this.entities[i];
		if (!'physics' in entity.components) {
			continue;
		}

		entity.components.physics.update(1/60);
	}
};

exports.PhysicsSystem = PhysicsSystem;

},{}],10:[function(require,module,exports){
var pipe = require('../entities/pipe');

var PipesSystem = function(entities) {
	this.entities = entities;
	this.canvas = document.getElementById('mainicanvas');
	this.interval = null;
};

PipesSystem.prototype.run = function() {
	// Run the pipe creation interval
	this.interval = window.setInterval(this.tick.bind(this), 1000 * 2);
};

PipesSystem.prototype.pause = function() {
	// Stop the pipe creation interval
	window.clearInterval(this.interval);
	this.interval = null;
};

PipesSystem.prototype.tick = function() {
	
	this.entities.push(new pipe.Pipe());

	//Need to setup varied pipe set position

}

exports.PipesSystem = PipesSystem;
},{"../entities/pipe":5}]},{},[6]);
