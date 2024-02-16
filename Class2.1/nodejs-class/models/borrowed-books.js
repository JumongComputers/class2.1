import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  dateBorrowed: {
    type: Date,
    default: Date.now,
  },

  dateToBeReturned: {
    type: Date,
    required: true,
  },

  returnedDate: {
    type: Date,
    required: false
  },

  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'books',
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})


const BorrowedBook = mongoose.model('borrowed_books', Schema)

export default BorrowedBook


