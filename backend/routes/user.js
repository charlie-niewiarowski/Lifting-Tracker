const express = require('express')
const { signupUser, loginUser } = require('../controllers/userController')
const router = express.Router()

// sign up route
router.post('/signup', signupUser)

// login route
router.post('/login', loginUser)

module.exports = router