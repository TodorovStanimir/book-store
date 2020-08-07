const { validationResult } = require('express-validator');

const { User, TokenBlackList } = require('../models');
const { jwt, sendWelcomeEmail, sendCancelationEmail } = require('../utils');
const config = require('../config/config');

module.exports = {
    get: async (req, res, next) => {
        try {
            const search = req.params.id ? { _id: req.params.id } : {}

            const users = await User.find(search).populate('books').select('-password').lean();
            res.status(200).json(req.params && req.params.id ? users[0] : users);
        } catch (error) {
            next(error)
        }
    },

    post: {
        login: async function (req, res, next) {
            const { email, password } = req.body;

            try {
                const user = await User.findOne({ email });
                const match = user ? await user.matchPassword(password) : false;

                if (!match) {
                    res.status(200).json({ errors: [{ msg: 'Invalid user e-mail or password! Please try again!' }] });
                    return;
                };
                const token = jwt.createToken({ id: user._id, username: user.username });

                const userForSend = user.toObject();
                delete userForSend.password;
                res.header("Authorization", token).json(userForSend);
            } catch (err) {
                next(err);
            }
        },

        register: async function (req, res, next) {
            const errors = validationResult(req);

            console.log(errors);

            if (!errors.isEmpty()) {

                return res.status(200).json({ errors: errors.array() });
            }

            const { username, password, email, phone, occupation, imageUrl } = req.body;

            try {
                const user = await User.findOne({ email }).lean();

                if (user) {
                    return res.status(200).json({ errors: [{ msg: `User e-mail ${email} already exists` }] });
                }
                const createdUser = await User.create({ username, password, email, phone, occupation, imageUrl });
                const token = jwt.createToken({ id: createdUser._id, username: createdUser.username });

                const userForSend = createdUser.toObject();
                delete userForSend.password;
                sendWelcomeEmail(email, username);
                res.status(201).header("Authorization", token).json(userForSend);
            } catch (err) {
                next(err);
            }
        },

        logout: (req, res, next) => {
            const token = req.header('Authorization').split(' ')[1];
            console.log('-'.repeat(100));
            console.log(token);
            console.log('-'.repeat(100));
            TokenBlackList.create({ token })
                .then(() => {
                    
                    res.status(200).json({ 'message': 'Logout successfully!' });
                })
                .catch(next);
        },

        verifyLogin: async (req, res, next) => {
            try {
                const token = req.header('Authorization').split(' ')[1] || '';
                const decodetToken = jwt.verifyToken(token);
                const blacklistedToken = await TokenBlackList.findOne({ token });

                if (blacklistedToken) {
                    throw new Error('blacklisted token');
                }

                const user = await User.findById(decodetToken.id).select('-password').lean();
                res.json({ status: true, user });
            } catch (error) {
                res.json({ status: false });
            }
        }

    },
    put: async (req, res, next) => {
        const errors = validationResult(req);
        errors.errors = errors.errors.filter(err => err.param !== 'password');

        if (!errors.isEmpty()) {

            return res.status(200).json({ errors: errors.array() });
        }
        try {
            const id = req.params.id;
            const { username, phone, occupation, imageUrl } = req.body;
            const updatedUser = await User.updateOne({ _id: id }, { username, phone, occupation, imageUrl });
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
    },

    delete: async (req, res, next) => {
        const id = req.params.id;
        const user = req.user;
        try {
            const removedUser = await User.deleteOne({ _id: id }).lean();
            sendCancelationEmail(user.email, user.username)
            res.json(removedUser)
        } catch (error) {
            next(error)
        }
    }
}