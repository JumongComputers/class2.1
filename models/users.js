import mongoose from 'mongoose'
// import bcrypt from 'bcryptjs'

const Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lower: true,
  },

  password: {
    type: String,
    required: [true, 'password is required'],
  },
  address: {
    houseNumber: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
  },

  telephone: {
    type: String,
    unique: true,
    required: [true, 'telephone is required'],
  },

  // role: {
  //   type: String,
  //   enum:['reader', 'author', 'admin'],
  //   required: [true, 'Email is required'],
  // },
})


// Schema.pre('save', async (next) => {
//   if (!this.isModified('password')) return next()
//   // Hash password with a cost of 10
//   this.password = await bcrypt.hash(this.password, 10)
//   return next()
// })

const User = mongoose.model('users', Schema)

export default User
