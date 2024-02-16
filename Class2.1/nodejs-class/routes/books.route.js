import { Router } from 'express'

import {
  borrowABook,
  deleteABook,
  getAllBooks,
  getOneBook,
  postABook,
  searchForBooks,
  updateABook,
} from '../controllers/books.controller.js'
import isLoggedIn from '../middleware/authentication.js'


const books = Router()



books.post('/', isLoggedIn,  postABook)

books.post('/borrow', isLoggedIn, borrowABook)
books.get('/', getAllBooks)
books.get('/search/?', searchForBooks)
books.get('/:id', getOneBook)

books.patch('/:id', isLoggedIn, updateABook)
books.delete('/:id', isLoggedIn, deleteABook)

export default books

