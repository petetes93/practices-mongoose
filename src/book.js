const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: {type: String, required: true },
	isbn: {type: String, required: true , unique: true},
	status: {type: String, required: true },
	pageCount: {type: Number},
	published: {type: Boolean, default: true },
	thumbnailUrl:  {type: String},
	publishedDate:  Date,
	description: {
			shortDescription: {type: String},
			longDescription: {type: String},
		},
	

	authors: [{ type: String }],
	categories: [{ type: String }],
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
