const { validationResult } = require('express-validator');

const { Message } = require('../models');


module.exports = {

    post: {
        create: async function (req, res, next) {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {

                return res.status(200).json({ errors: errors.array() });
            }

            const { username, email, phone, message } = req.body;

            try {
                const createMessage = await Message.create({ username, email, phone, message });

                res.status(201).json(createMessage);
            } catch (err) {
                next(err);
            }
        }
    }
}