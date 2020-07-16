const controllers = require('../controllers/');
const router = require('express').Router();

const { userValidator, auth } = require('../utils');

router.get('/', controllers.user.get);

router.get('/:id', controllers.user.get);

router.post('/register', userValidator, controllers.user.post.register);

router.post('/login', userValidator, controllers.user.post.login);

router.post('/logout', auth(), controllers.user.post.logout);

router.put('/:id', auth(), userValidator, controllers.user.put);

router.delete('/:id', auth(), controllers.user.delete);

module.exports = router;