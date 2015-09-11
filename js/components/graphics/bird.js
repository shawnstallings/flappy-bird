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