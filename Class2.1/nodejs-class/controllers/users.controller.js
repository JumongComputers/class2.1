import Exception from "../exception.js"
import Author from "../models/authors.js"
import User from "../models/users.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



export async function signUp(req, res, next) {
   try {
     const data = req.body
     const userExist = await User.findOne({ email: data.email })

     if (userExist) {
       throw new Exception('user already exists', 400)
     }

     const hashedPassword = await bcrypt.hash(data.password, 10)

     const user = await User.create({ ...data, password: hashedPassword })
     if(data.role == 'author')  {
      await Author.create({ user: user._id })
     }
    user.password = null
     res.send(user)
   } catch (error) {
     next(new Exception(error.message, 400))
   }

}


export async function login(req, res, next) {
 try {
     const data = req.body

     const user = await User.findOne({ email: data.email })

     if (!user) {
       throw new Exception('user not found', 400)
     }
     const isPasswordCorrect = await bcrypt.compare(
       data.password,
       user.password
     )
     if (!isPasswordCorrect) {
        throw new Exception('invalid email/password', 400)
       
     }
     const payload = {
      _id: user._id,
      email: user.email,
     }
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24hrs' })

  console.log(accessToken)

     res.send({user, accessToken})
 } catch (error) {
     next(new Exception(error.message, 400))
 }
}

export function searchForUser(req, res, next) {

  try {
    const query = req.query.data
let user
    if (query.firstName || query.lastName) {

    user = User.find({$or: [{firstName: query.firstName}, {lastName: query.lastname}]}) 
    }
    res.send(user)
  } catch (error) {
    next(new Exception(error.message, 400))
  }
}

// implements findAllUsers, findOneuser

