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

