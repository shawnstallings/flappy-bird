(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BirdGraphicsComponent = function(entity) {
	this.entity = entity;
};

var angle = 0;

BirdGraphicsComponent.prototype.draw = function(context) {
		
	function drawBlueCir() {
		context.beginPath(); 
		var radius = 25 + 150 * Math.abs(Math.cos(angle));
		context.arc(225, 225, radius, 0, Math.PI * 2, false);
		context.closePath();

		context.fillStyle = "#006699";
		context.fill();

		angle += Math.PI / 64;
	}

	function drawRedCir() {
		context.beginPath(); 
		var radius = 25 + 50 * Math.abs(Math.cos(angle));
		context.arc(450, 450, radius, 0, Math.PI * 2, false);
		context.closePath();

		context.fillStyle = "#FF0000";
		context.fill();

		angle += Math.PI / 64;
	}

	drawBlueCir();
	drawRedCir();
	
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],2:[function(require,module,exports){
var PipeGraphicsComponent = function(entity) {
	this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function() {
	console.log("Drawing a pipe");
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],3:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/bird");

var Bird = function() {
	console.log("Creating Bird entity");

	var graphics = new graphicsComponent.BirdGraphicsComponent(this);
	this.components = {
		graphics: graphics
	};
};

exports.Bird = Bird;


},{"../components/graphics/bird":1}],4:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/pipe");

var Pipe = function() {
	console.log("Creating Pipe entity");

	var graphics = new graphicsComponent.PipeGraphicsComponent(this);
	this.components = {
		graphics: graphics
	};
};

exports.Pipe = Pipe;

},{"../components/graphics/pipe":2}],5:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

var FlappyBird = function() {
	this.entities = [new bird.Bird(), new pipe.Pipe()];
	this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
};

FlappyBird.prototype.run = function() {
	this.graphics.run();
};

exports.FlappyBird = FlappyBird;
},{"./entities/bird":3,"./entities/pipe":4,"./systems/graphics":7}],6:[function(require,module,exports){
var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
	var app = new flappyBird.FlappyBird();
	app.run();
});
},{"./flappy_bird":5}],7:[function(require,module,exports){
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

	// Rendering goes here
	for (var i=0; i<this.entities.length; i++) {
		var entity = this.entities[i];
		if (!'graphics' in entity.components) {
			continue;
		}

		entity.components.graphics.draw(this.context);
	}

	// Continue the render loop
	window.requestAnimationFrame(this.tick.bind(this));
};

exports.GraphicsSystem = GraphicsSystem;
},{}]},{},[6]);
