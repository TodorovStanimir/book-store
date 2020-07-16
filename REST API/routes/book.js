const controllers = require('../controllers/');
const router = require('express').Router();

const { auth } = require('../utils');
const { bookValidator } = require('../utils/validators');

router.get('/', controllers.book.get);

router.post('/', auth(), bookValidator, controllers.book.post);

router.put('/:id', auth(), bookValidator, controllers.book.put);

router.delete('/:id', auth(), controllers.book.delete);

module.exports = router;