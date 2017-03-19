var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
	title : {
		type : String,
		required : true
	},
	auther : {
		type : String
	},
	pageNumber : {
		type : Number
	}
});

var book = mongoose.model('book', bookSchema);

module.exports = book; 