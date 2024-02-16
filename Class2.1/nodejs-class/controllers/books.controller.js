import { bookStore } from '../database.js'
import Exception from '../exception.js'
import Author from '../models/authors.js'
import { Book } from '../models/books.js'
import BorrowedBook from '../models/borrowed-books.js'
import User from '../models/users.js'

export function homepage(req, res) {
  res.send('Welcome to AYZ BookStore')
}

export async function getAllBooks(req, res, next) {
  const books = await Book.find()
  res.send(books)
}

export async function findABook(bookId) {
  const book = await Book.findOne({ _id: bookId })
  if (!book) {
    throw new Exception('book not found')
  }
  return book
}

export async function getOneBook(req, res) {
  try {
    const id = req.params.id
    const book = await findABook(id)
    res.send(book)
  } catch (error) {
    next(new Exception(error.message, error.status))
  }
}

export function searchForBooks(req, res) {
  try {
    const q = req.query
    let book
    if (q.title) {
      console.log('1111', q.title)
      book = bookStore.find((item) => {
        return item.title == q.title
      })
    }
    if (q.author) {
      book = bookStore.find((item) => {
        return item.author == q.author
      })
    }
    if (q.author && q.title) {
      book = bookStore.find((item) => {
        return item.title == q.title && item.author == q.author
      })
    }

    console.log(q, 'query object')
    res.send(book)
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function postABook(req, res, next) {
  try {
    /* Here, req.user._id is typically the unique identifier of the currently 
    authenticated user making the request. */
    const author = await Author.findOne({ user: req.user._id }).populate({
      path: 'user',
    })
    console.log(author, 'djhdhdh')
    if (!author) {
      throw new Exception('author not found', 400)
    }
    const data = req.body
    if (!data.isbn) {
      throw new Error('isbn is required')
    }
  

    if (data.isbn.length < 6) {
      throw new Error('isbn cannot be less than 6 characters')
    }
    if (!typeof data.yearPublised == 'number') {
      throw new Error('yearPublised should be a number')
    }
    const book = await Book.create({ ...data, author: author._id })
    res.send(book)
  } catch (error) {
    next(new Exception(error.message, 400))
  }
}
export async function borrowABook(req, res, next) {
  try {
    const payload = req.body
    //get the user whose is currently looged in from req.user
    // Q2 Are we gainig access to the logged in user via the middleware of Islogin
    const userId = req.user._id

    const borrower = await User.findOne({ _id: userId })
    if (!borrower) {
      throw new Exception('user not found', 400)
    }

    //find the requested book

    // Q1 Does this mean that there is a key value pair named bookId
    const book = await findABook(payload.bookId)   
    if (book.isAvaialable == false) {
      throw new Exception('book is not available currently', 400)
    }

    //create  the borrowed book record
    const data = {
      borrower: borrower._id,
      dateToBeReturned: payload.dateToBeReturned,
      book: book._id,
    }
    const bookBorrowed = await BorrowedBook.create({ ...data })

    res.send(bookBorrowed)
  } catch (error) {
    next(new Exception(error.message, 400))
  }
}

// Asignment
export function updateABook(req, res) {}

export function deleteABook(req, res) {}

