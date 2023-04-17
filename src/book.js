const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: String,
	isbn: String,
	status: String,
	pageCount: String,
	published: Boolean,
	thumbnailUrl: String,
	publishedDate: Date,
	shortDescription: String,
	longDescription: String,
	authors: [{ type: String }],
	categories: { type: String },
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
