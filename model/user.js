// Importing modules
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating user schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true },
)

// Exporting module to allow it to be imported in other files
const User = mongoose.model('User', userSchema)

module.exports = User
