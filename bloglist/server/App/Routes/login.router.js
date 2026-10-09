const login_controller = require('../Controllers/login.controller');
const router = require('express').Router();

router.post('/', login_controller.post);

module.exports = router;
