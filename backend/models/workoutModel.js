const mongoose = require('mongoose')
const Exercise = require('/models/ExerciseModel')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    exercises: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exercise'
        },
    ],   
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)
