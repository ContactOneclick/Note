const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Note = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('notes', Note);