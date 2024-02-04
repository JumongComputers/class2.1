import { Router } from 'express'
import { findAllUsers, findOneuser, login, searchForUser, signUp } from '../controllers/users.controller.js'
import { validateLogin, validateSignup } from '../validations/users.validation.js'
import isLoggedIn from '../middleware/authentication.js'


const users = Router()


const doSomething = async (req, res, next) => {
    console.log('this users wants to do something')
    if(req.body.email === 'john@gamil.com') {
    next()
    }else{
        next(new Error('You are not allowed to do this'))
    }
}


users.post('/',  validateSignup, signUp)
users.post('/login', validateLogin, login)
users.get('/', isLoggedIn, findAllUsers)
users.get('/getAuser', isLoggedIn, findOneuser)
users.get('/search', isLoggedIn, searchForUser)
//  users.get('/', doSomething, getAllUsers)


export default users
