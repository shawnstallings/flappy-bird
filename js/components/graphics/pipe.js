var PipeGraphicsComponent = function(entity) {
	this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
	console.log("Drawing a pipe");

	var position = this.entity.components.physics.position;

	context.save();
	context.translate(position.x, position.y);
	context.fillStyle = "#FF0000";
	context.fillRect(0.8, 0, .2, .2);
	context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;