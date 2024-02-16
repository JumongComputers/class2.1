import mongoose, {Schema, model} from 'mongoose'


const BookSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'authors',
    required: true,
  },

  title: String,
  yearPublished: Number,

 image: String,

  isbn: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },

  isAvaialable: {
    type: Boolean,
  },
})


export const Book = model('books',BookSchema)




