const controllers = require('../controllers/');
const router = require('express').Router();

const { messageValidator } = require('../utils/validators');

router.post('/create', messageValidator, controllers.message.post.create);

module.exports = router;