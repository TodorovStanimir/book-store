const { validationResult } = require('express-validator');

const { Comment, User, Book } = require('../models');

module.exports = {

    get: async (req, res, next) => {
        const search = req.params.id && { _id: req.params.id }
        try {
            const comments = await Comment.find(search ? { book: search } : {})
                .populate({ path: 'creator', select: '-password' })
                .populate({ path: 'book' }).lean();
            res.json(comments)
        } catch (error) {
            next(error)
        }
    },

    post: async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(200).json({ errors: errors.array() });
        }

        const { subject, bookId } = req.body;
        const { _id } = req.user;

        try {
            const createdComment = await Comment.create({ subject, book: bookId, creator: _id });
            const updatedBook = await Book.updateOne({ _id: bookId }, { $push: { comments: createdComment } });

            res.status(201).json(createdComment);
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
        const { subject } = req.body;
        try {
            const updatedComment = await Comment.updateOne({ _id: id }, { subject });
            res.status(200).json(updatedComment)
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        const id = req.params.id;

        try {
            const comment = await Comment.findById(id).populate('book creator');
            const { _id } = comment.creator;
            const bookId = comment.book._id;
            const removedComment = await Comment.deleteOne({ _id: id });
            const updatedBook = await Book.updateOne({ _id: bookId }, { $pull: { comments: id } })
            res.status(204).json(removedComment);
        } catch (error) {
            next(error)
        }
    }
};