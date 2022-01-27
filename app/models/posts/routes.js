const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// eslint-disable-next-line no-unused-vars
const Controllers = require('./controllers.js');

router.get('/', Controllers.getAllPosts);
router.post('/', auth, Controllers.addNewPost);
router.patch('/', auth, Controllers.editPost);
router.delete('/:postId', auth, Controllers.deletePost);

module.exports = router;
