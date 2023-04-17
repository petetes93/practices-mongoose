const Book = require('../book');

describe('Book model', () => {
	test('title must be required', async () => {
		expect.assertions(1);

		try {
			await Book.create({
				isbn: '1935182307',
				status: 'PUBLISH',
			});
		} catch (e) {
			expect(e).toBeTruthy();
		}
	});

	test('isbn must be required', async () => {
		expect.assertions(1);

		try {
			await Book.create({
				title: 'SQL Server 2008 Administration in Action',
				status: 'PENDING',
			});
		} catch (e) {
			expect(e).toBeTruthy();
		}
	});

	test('status must be required', async () => {
		expect.assertions(1);

		try {
			await Book.create({
				title: 'Secrets of the JavaScript Ninja',
				isbn: '193398869X',
			});
		} catch (e) {
			expect(e).toBeTruthy();
		}
	});

	test('isbn must be unique', async () => {
		expect.assertions(1);

		try {
			await Book.init(); // wait for index to build
			await Book.create([
				{
					title: 'Secrets of the JavaScript Ninja',
					isbn: '193398869X',
					status: 'PUBLISH',
				},
				{
					title: 'Microsoft Office Essentials',
					isbn: '193398869X',
					status: 'PUBLISH',
				},
			]);
		} catch (e) {
			expect(e).toBeTruthy();
		}
	});

	test('published should default to true', async () => {
		const book = await Book.create({
			title: 'Microsoft Office Essentials',
			isbn: '523398869X',
			status: 'PUBLISH',
		});

		expect(book.published).toBe(true);
	});

	test('should have correct fields', async () => {
		const now = Date.now();
		const { _id, __v, ...book } = (
			await Book.create({
				title: 'Hello World!',
				isbn: '1933988495',
				pageCount: 432,
				publishedDate: now,
				thumbnailUrl:
					'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/sande.jpg',
				description: {
					shortDescription:
						'Hello World! provides a gentle but thorough introduction to the world of computer programming.',
					longDescription:
						"Your computer won't respond when you yell at it. Why not learn to talk to your computer in its own language  Whether you want to write games, start a business, or you're just curious, learning to program is a great place to start. Plus, programming is fun!    Hello World! provides a gentle but thorough introduction to the world of computer programming. It's written in language a 12-year-old can follow, but anyone who wants to learn how to program a computer can use it. Even adults. Written by Warren Sande and his son, Carter, and reviewed by professional educators, this book is kid-tested and parent-approved.    You don't need to know anything about programming to use the book. But you should know the basics of using a computer--e-mail, surfing the web, listening to music, and so forth. If you can start a program and save a file, you should have no trouble using this book.",
				},
				status: 'PUBLISH',
				authors: ['Warren D. Sande', 'Carter Sande'],
				categories: ['Programming', 'Python'],
			})
		).toObject();

		expect(book).toEqual({
			title: 'Hello World!',
			isbn: '1933988495',
			pageCount: 432,
			publishedDate: new Date(now),
			published: true,
			thumbnailUrl:
				'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/sande.jpg',
			description: {
				shortDescription:
					'Hello World! provides a gentle but thorough introduction to the world of computer programming.',
				longDescription:
					"Your computer won't respond when you yell at it. Why not learn to talk to your computer in its own language  Whether you want to write games, start a business, or you're just curious, learning to program is a great place to start. Plus, programming is fun!    Hello World! provides a gentle but thorough introduction to the world of computer programming. It's written in language a 12-year-old can follow, but anyone who wants to learn how to program a computer can use it. Even adults. Written by Warren Sande and his son, Carter, and reviewed by professional educators, this book is kid-tested and parent-approved.    You don't need to know anything about programming to use the book. But you should know the basics of using a computer--e-mail, surfing the web, listening to music, and so forth. If you can start a program and save a file, you should have no trouble using this book.",
			},
			status: 'PUBLISH',
			authors: ['Warren D. Sande', 'Carter Sande'],
			categories: ['Programming', 'Python'],
		});
	});
});
