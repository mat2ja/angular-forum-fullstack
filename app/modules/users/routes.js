const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// eslint-disable-next-line no-unused-vars
const Controllers = require('./controllers.js');

router.get('/me', auth, Controllers.getCurrentUser);

module.exports = router;
