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