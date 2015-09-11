(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1]);
