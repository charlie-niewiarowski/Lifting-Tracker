const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function(email, password) {

    // validate
    if (!email || !password) {
        throw Error('Both fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is invalid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough!')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

// static login method
userSchema.statics.login = async function(email, password) {

    // validate
    if (!email || !password) {
        throw Error('Both fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Account with email does not exist')
    }

    const match = await bcrypt.compare(password, user.password)
    
    if (!match) {
        throw Error('Incorrect password')
    }

    return user 
}

module.exports = mongoose.model('User', userSchema )