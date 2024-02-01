import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()


// This functon is used to verify if the user is logged in by verifying the user token
export default function isLoggedIn(req, res, next) {
  try {
    if (req.headers.authorization) {

      // This is because in the header the auth string looks like 'bearer token' so we intend to splito out the token 
      const token = req.headers.authorization.split(' ')[1]
      
      const decode = jwt.verify(token, process.env.JWT_SECRET)
console.log(decode)

      req.user = decode
      
      next()
    } else {
      return res.status(400).json({ message: 'you are not logged in' })
    }
  } catch (err) {
    return res.status(400).json({ message: 'unauthorized' })
  }
  return null
}
