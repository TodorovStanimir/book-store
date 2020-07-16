const { validationResult } = require('express-validator');

const { User, TokenBlackList } = require('../models');
const { jwt } = require('../utils');
const config = require('../config/config');

module.exports = {
    get: async (req, res, next) => {
        try {
            const users = await User.find().populate('books');
            res.status(200).send(users);
        } catch (error) {
            next(error)
        }
    },

    post: {
        login: async function (req, res, next) {
            const { username, password } = req.body;

            try {
                const user = await User.findOne({ username }).select('-password');
                const match = user ? await user.matchPassword(password) : false;

                if (!match) {
                    res.status(401).send('Invalid password');
                    return;
                };
                const token = jwt.createToken({ id: user._id, username: user.username });

                res.cookie(config.cookieSecret, token, { maxAge: 3600000 }).send(user);
            } catch (err) {
                next(err);
            }
        },

        register: async function (req, res, next) {
            const errors = validationResult(req);

            console.log(errors);

            if (!errors.isEmpty()) {

                return res.status(400).send({ errors: errors.array() });
            }

            const { username, password, email, phone, occupation, imageUrl } = req.body;

            try {
                const user = await User.findOne({ email });

                if (user) {
                    return res.status(400).send({ errors: [{ msg: 'User already exists' }] });
                }
                const createdUser = await User.create({ username, password, email, phone, occupation, imageUrl });
                res.status(201).send(createdUser)
            } catch (err) {
                next(err);
            }
        },

        logout: (req, res, next) => {
            const token = req.cookies[config.cookieSecret];
            console.log('-'.repeat(100));
            console.log(token);
            console.log('-'.repeat(100));
            TokenBlackList.create({ token })
                .then(() => {
                    res.status(200).clearCookie(config.cookieSecret).send({ 'message': 'Logout successfully!' });
                })
                .catch(next);
        },

        put: async (req, res, next) => {
            try {
                const id = req.params.id;
                const { username, phone, occupation, imageUrl } = req.body;
                const updatedUser = await User.update({ _id: id }, { username, phone, occupation, imageUrl });
                res.status(200).send(updatedUser)
            } catch (error) {
                next(error)
            }
        },

        delete: async (req, res, next) => {
            const id = req.params.id;
            try {
                const removedUser = await User.deleteOne({ _id: id });
                res.send(removedUser)
            } catch (error) {
                next(error)
            }
        }
    },
}