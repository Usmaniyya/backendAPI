// Importing Modules
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const AuthRoute = require('./routes/auth')

// Initializing Express app
const app = express()
// Using bodyparser to parse json data
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Database connection
const url = 'mongodb://localhost:27017/usersdb'
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Connected')
  })
  .catch((err) => {
    console.log(err)
  })

// Setting up server
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})

app.use('/api', AuthRoute)
