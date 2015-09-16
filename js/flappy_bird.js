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