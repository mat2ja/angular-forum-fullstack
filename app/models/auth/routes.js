const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Controllers = require('./controllers.js');

router.post('/login', Controllers.login);
router.post('/register', Controllers.register);
router.post('/logout', auth, Controllers.logout);

module.exports = router;
