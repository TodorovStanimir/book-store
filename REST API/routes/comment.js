const controllers = require('../controllers/');
const router = require('express').Router();

const { auth } = require('../utils');
const { commentValidator } = require('../utils/validators');

router.get('/', controllers.comment.get);

router.post('/', auth(), commentValidator, controllers.comment.post);

router.put('/:id', auth(), commentValidator, controllers.comment.put);

router.delete('/:id', auth(), controllers.comment.delete);

module.exports = router;