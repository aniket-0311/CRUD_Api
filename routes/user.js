const express = require("express");
const router = express.Router();
const users = require('../controllers/user.js')
const CatchAsync = require('../utils/CatchAsync.js')
const checkAuth = require('../middleware.js')

router.post('/register', CatchAsync(users.newUser));
router.post('/login', CatchAsync(users.loginUser));
router.put('/changepass/:id',checkAuth, CatchAsync(users.updatePass))
router.delete('/delete/:id',checkAuth, CatchAsync(users.deleteUser))


module.exports = router;