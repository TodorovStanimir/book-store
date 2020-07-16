const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, ObjectId } = Schema.Types;

const commentSchema = new Schema({

    subject: {
        type: String,
        required: true
    },

    book: {
        type: ObjectId,
        ref: "Book"
    },

    creator: {
        type: ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = new Model('Comment', commentSchema);