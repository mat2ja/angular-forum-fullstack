const express = require('express');
const router = express.Router();

router.use(require('../modules/auth/routes.js'));
router.use('/users', require('../modules/users/routes.js'));
router.use('/posts', require('../modules/posts/routes.js'));

module.exports = router;
