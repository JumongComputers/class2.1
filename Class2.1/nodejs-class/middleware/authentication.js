import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

export default function isLoggedIn(req, res, next) {
  try {
    if (req.headers.authorization) {
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
