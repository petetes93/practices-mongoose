const Book = require('../book');
const crud = require('../crud');

describe('Book crud', () => {
	describe('getBookById', () => {
		test('get book by ObjectId', async () => {
			const book = await Book.create({
				title: 'SQL Server 2008 Administration in Action',
				isbn: '1935182307',
				status: 'PUBLISH',
			});
			const match = await crud.getBookById(book.id);

			expect(match.id).toBe(book.id);
		});
	});
	describe('getAllBooks', () => {
		test('get all books in collection', async () => {
			const books = [
				{
					title: 'SQL Server 2008 Administration in Action',
					isbn: '1935182301',
					status: 'PUBLISH',
				},
				{
					title: 'SQL Server 2009 Administration in Action',
					isbn: '1935182302',
					status: 'PUBLISH',
				},
				{
					title: 'SQL Server 2010 Administration in Action',
					isbn: '1935182303',
					status: 'PUBLISH',
				},
			];
			const newBooks = await Book.create(books);
			const matches = await crud.getAllBooks();

			expect(matches).toHaveLength(newBooks.length);
		});
	});
	describe('createBook', () => {
		test('create a book', async () => {
			const bookDetails = {
				title: 'SQL Server 2011 Administration in Action',
				isbn: '1935182304',
				status: 'PUBLISH',
			};
			const { id } = await crud.createBook(bookDetails);
			const match = await Book.findById(id).exec();
			expect(match.id).toBe(id);
		});
	});
	describe('removeBookById', () => {
		test('remove book by id', async () => {
			const { id } = await Book.create({
				title: 'SQL Server 2012 Administration in Action',
				isbn: '1935182304',
				status: 'PUBLISH',
			});
			await crud.removeBookById(id);
			const match = await Book.findById(id).exec();
			expect(match).toBe(null);
		});
	});
	describe('updateBookById', () => {
		test('update book by id', async () => {
			const { id } = await Book.create({
				title: 'SQL Server 2013 Administration in Action',
				isbn: '1935182304',
				status: 'PUBLISH',
			});
			const book = await crud.updateBookById(id, {
				published: false,
			});
			expect(book.id).toBe(id);
			expect(book.published).toBe(false);
		});
	});
});
