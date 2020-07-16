const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/config')

const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const userSchema = new Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        require: true
    },

    phone: {
        type: String,
        require: true
    },

    occupation: {
        type: String,
        require: true
    },

    phone: {
        type: String,
        require: true
    },

    books: [{ type: ObjectId, ref: "Book" }]

});

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }

};

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(config.saltRounds, (err, salt) => {
            if (err) { next(err); return }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) { next(err); return }
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
});

module.exports = new Model('User', userSchema);