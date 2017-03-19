var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
	name : {
		type : String,
		required : true
	},
	director : {
		type : String
	},
	rate : {
		type : Number
	}
});

var movie = mongoose.model('movie', movieSchema);

module.exports = movie; 