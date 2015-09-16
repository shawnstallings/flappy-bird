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