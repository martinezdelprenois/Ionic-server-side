var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
	title: String,
	description: String,
	createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('review', ReviewSchema);