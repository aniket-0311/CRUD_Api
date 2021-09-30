const express = require("express");
const router = express.Router();
const admin = require('../controllers/admin.js')
const CatchAsync = require('../utils/CatchAsync.js')
const checkAuth = require('../middleware.js')

router.post('/registeradmin', CatchAsync(admin.newAdmin));
router.post('/loginadmin', CatchAsync(admin.loginAdmin))
router.put('/changepassadmin/:id',checkAuth, CatchAsync(admin.updatePass))
router.delete('/deleteUser/:id',checkAuth,CatchAsync(admin.delete))

module.exports = router;