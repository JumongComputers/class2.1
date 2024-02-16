import mongoose from 'mongoose'


const Schema = new mongoose.Schema({
  
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
 
},  { timestamps: true })


// Schema.pre('save', async (next) => {
//   if (!this.isModified('password')) return next()
//   // Hash password with a cost of 10
//   this.password = await bcrypt.hash(this.password, 10)
//   return next()
// })

const Author = mongoose.model('authors', Schema)

export default Author



