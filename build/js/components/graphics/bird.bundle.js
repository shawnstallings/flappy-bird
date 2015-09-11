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
},{}]},{},[1]);
