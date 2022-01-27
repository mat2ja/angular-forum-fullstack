const express = require('express');
const router = express.Router();

router.use(require('../models/auth/routes.js'));
router.use('/users', require('../models/users/routes.js'));
router.use('/posts', require('../models/posts/routes.js'));

module.exports = router;
