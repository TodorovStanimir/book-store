const { validationResult } = require('express-validator');

const { Book, User } = require('../models');

module.exports = {
    get: async (req, res, next) => {
        try {
            const books = await Book.find().populate({ path: 'creator comments', select: '-password' }).lean();
            res.send(books)
        } catch (error) {
            next(error)
        }
    },

    post: async (req, res, next) => {
        const errors = validationResult(req);

        console.log(errors);

        if (!errors.isEmpty()) {

            return res.status(400).send({ errors: errors.array() });
        }

        const { title, author, description, genres, year, publisher, price, imageUrl } = req.body;
        const { _id } = req.user;

        try {
            const createdBook = await Book.create({ title, author, description, genres, year, publisher, price, imageUrl, creator: _id });
            const updatedUser = await User.updateOne({ _id }, { $push: { books: createdBook } });

            res.status(201).send(createdBook);
        } catch (error) {
            next(error);
        }
    },

    put: async (req, res, next) => {
        const errors = validationResult(req);

        console.log(errors);

        if (!errors.isEmpty()) {

            return res.status(400).send({ errors: errors.array() });
        }
        const id = req.params.id;
        const { title, author, description, genres, year, publisher, price, imageUrl, likes, dislikes } = req.body;
        try {
            const updatedBook = await Book.updateOne({ _id: id }, { title, author, description, genres, year, publisher, price, imageUrl, likes, dislikes });
            res.status(200).send(updatedBook)
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
            res.status(204).send(removedBook);
        } catch (error) {
            next(error)
        }
    }
};