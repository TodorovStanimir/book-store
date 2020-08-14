const path = require('path');
const router = require('../routes/');

module.exports = (app) => {

    app.use('/api/user', router.user);

    app.use('/api/book', router.book);

    app.use('/api/comment', router.comment);

    app.use('/api/message', router.message);

    if (process.env.NODE_ENV === 'production') {
        // Handle React routing, return all requests to React app
        app.use('*', (req, res, next) => {
            res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
        });
    }

    app.use('*', (req, res, next) => res.send('<h1> Something went wrong. Try again. :thumbsup: </h1>'))
};