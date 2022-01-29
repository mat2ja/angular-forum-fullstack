const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Controllers = require('./controllers.js');

router.get('/', Controllers.getAllUsers);
router.get('/me', auth, Controllers.getCurrentUser);
router.get('/me/posts', auth, Controllers.getCurrentUserPosts);

module.exports = router;
