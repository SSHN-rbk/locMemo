var Book = require('./bookModel.js');
//check routes.js to see what other functions need to be implemented. hint:"you are missing one"
module.exports = {
	//get all the books controller
	getAllBooks: function (req, res) {
		Book.find({}, function (err, AllBooks) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(AllBooks)
			}
		})
	},
	//insert books controller
	insertBooks: function (req, res) {
		for (var i = 0; i < req.body.length; i++) {
			Book.create(req.body[i], function (err, dataInserted) {
				if (err) {
					res.status(500).send(err);
				}
			})
		}
		res.status(300).json({ok:"ok"});
	},
	getByName: function (req, res) {
		Book.find({ title: req.params.name }, function (err, Book) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(Book)
			}
		})
	}
}
