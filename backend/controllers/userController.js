const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({_id: id}, process.env.SECRET, { expiresIn: '3d' })
}

// sign up user
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)

        const token = createToken(user._id)
        
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        const token = createToken(user._id)
        
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    signupUser,
    loginUser
}