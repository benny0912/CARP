const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

// Sign Up Route
router.post('/signup', UserController.user_sign_up);

// DELETE User Route
router.delete('/:userId', checkAuth, UserController.user_delete_user);

// Login Route
router.post('/login', UserController.user_log_in);

module.exports = router;