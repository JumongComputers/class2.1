import { Router } from 'express'
import { login, signUp } from '../controllers/users.controller.js'
import { validateLogin, validateSignup } from '../validations/users.validation.js'


const users = Router()


users.post('/',  validateSignup, signUp)
users.post('/login', validateLogin, login)
//  users.get('/', doSomething, getAllUsers)


export default users
