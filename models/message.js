const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String } = Schema.Types;

const message = new Schema({

    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },

    message: {
        type: String,
        required: true,
    }

});

module.exports = new Model('Message', message);