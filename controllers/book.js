const { validationResult } = require('express-validator');

const { Book, User } = require('../models');

module.exports = {
    get: async (req, res, next) => {
        try {
            const page = Number(req.query.page) || null;
            const booksPerPage = Number(req.query.perPage) || 3;
            const search = req.params.id ? { _id: req.params.id } : {};
            const books = await Book.find(search).populate({ path: 'creator comments', populate: { path: 'creator' }, select: '-password' }).lean();
            const booksForSending = page ? {
                'page': page,
                'per_page': booksPerPage,
                'total': books.length,
                'total-pages': Math.ceil(books.length / booksPerPage),
                'data': books.slice((page - 1) * booksPerPage, (page * booksPerPage))
            } : books
            res.status(200).json(req.params && req.params.id ? booksForSending[0] : booksForSending);
        } catch (error) {
            next(error)
        }
    },

    post: async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(200).json({ errors: errors.array() });
        }

        const { title, author, description, genres, year, publisher, price, imageUrl } = req.body;
        const { _id } = req.user;

        try {
            const createdBook = await Book.create({ title, author, description, genres, year, publisher, price, imageUrl, creator: _id });
            const updatedUser = await User.updateOne({ _id }, { $push: { books: createdBook } });

            res.status(201).json(createdBook);
        } catch (error) {
            next(error);
        }
    },

    put: async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(200).json({ errors: errors.array() });
        }
        const id = req.params.id;
        const { title, author, description, genres, year, publisher, price, imageUrl, likes, dislikes } = req.body;
        try {
            const updatedBook = await Book.updateOne({ _id: id }, { title, author, description, genres, year, publisher, price, imageUrl, likes, dislikes });
            res.status(200).json(updatedBook)
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        const id = req.params.id;

        try {
            const book = await Book.findById(id).populate('creator');
            const { _id } = book.creator;
            const removedBook = await Book.deleteOne({ _id: id });
            const updatedUser = await User.updateOne({ _id }, { $pull: { books: id } })
            res.status(200).json(removedBook);
        } catch (error) {
            next(error)
        }
    }
};