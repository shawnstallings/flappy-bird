(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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

},{"../components/graphics/pipe":1,"../components/physics/physics":2}],4:[function(require,module,exports){
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
},{"../entities/pipe":3}]},{},[4]);
