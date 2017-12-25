var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
	title: String,
	description: String,
	rating: Number,
});

module.exports = mongoose.model('review', ReviewSchema);