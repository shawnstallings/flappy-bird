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


},{"../components/graphics/bird":1,"../components/physics/physics":2}]},{},[3]);
