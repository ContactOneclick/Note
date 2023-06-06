const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
const noteRouter = require('./routes/notes.route')
const PORT = 4000

app.use(cors())
app.use(bodyParser.json())
app.use('/notes', noteRouter)

mongoose.connect('mongodb://127.0.0.1:27017/notes', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
})