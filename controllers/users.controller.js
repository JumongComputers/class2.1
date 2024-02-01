import Exception from "../exception.js"
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
    //  This is supposed to be at the top after try
    
     const hashedPassword = await bcrypt.hash(data.password, 10)

     const user = await User.create({ ...data, password: hashedPassword })

    //  
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
// implements findAllUsers, findOneuser
export async function findAllUsers(req, res){
  try {
    const user = await User.find()
    res.send(user)
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function findOneuser(req, res){
  try {
    const id = req.params.id
    const user = await User.findOne({_id : id})
    res.send(user)
  } catch (error) {
    
  }
}
export  function searchForUser(req, res, next){
  try {
    const u = req.query.u
    let user
    if (u.firstName || u.lastName) {
      user = User.find((item)=>{
        return item.firstName == u.firstName && item.lastName == u.lastName
      })
    }
    res.send(user)
  } catch (error) {
    throw new Error(error.message)
  }
}


