const express = require('express');
const { register, login,deleteuser } = require('../controllers/authController');
const router = express.Router();

// Register Route
router.post('/register', register);

// Login Route
router.post('/login', login);

router.delete('/deleteuser',deleteuser);

module.exports = router;
