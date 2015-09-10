(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var GraphicsSystem = function(entities) {
	this.entities = entities;
};

GraphicsSystem.prototype.run = function() {
	// Tick the graphics system a few times to see it in action
	for (var i=0; i<5; i++) {
		this.tick();
	}
};

GraphicsSystem.prototype.tick = function() {
	for (var i=0; i<this.entities.length; i++) {
		var entity = this.entities[i];
		if (!'graphics' in entity.components) {
			continue;
		}

		entity.components.graphics.draw(this.context);
	}
};

exports.GraphicsSystem = GraphicsSystem;
},{}]},{},[1]);
