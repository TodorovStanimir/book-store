const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const bookSchema = new Schema({

    title: {
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    genres: {
        type: String,
        required: true
    },

    year: {
        type: Number,
        required: true
    },

    publisher: {
        type: String,
        required: true
    },


    price: {
        type: Number,
        required: true
    },


    imageUrl: {
        type: String,
        required: true
    },

    creator: { type: ObjectId, ref: "User" },

    comments: [{ type: ObjectId, ref: "Comment" }]
});

module.exports = new Model('Book', bookSchema);