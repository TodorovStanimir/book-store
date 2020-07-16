const { validationResult } = require('express-validator');

const { Book, User } = require('../models');

module.exports = {
    get: async (req, res, next) => {
        try {
            const books = await Book.find().populate('creator');
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
        const { title, author, description, genres, year, publisher, price, imageUrl } = req.body;
        try {
            const updatedBook = await Book.updateOne({ _id: id }, { title, author, description, genres, year, publisher, price, imageUrl });
            res.status(200).send(updatedBook)
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        const id = req.params.id;

        try {
            const removedBoook = await Book.deleteOne({ _id: id });
            res.status(204).send(removedBoook);
        } catch (error) {
            next(error)
        }
    }
};