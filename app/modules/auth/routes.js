const express = require('express');
const router = express.Router();

const Controllers = require('./controllers.js');

router.post('/login', Controllers.login);
router.post('/register', Controllers.register);
router.post('/logout', Controllers.logout);


module.exports = router;
