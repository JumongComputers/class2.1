
import Joi from 'joi'
import Exception from '../exception.js'

const signUpschema = Joi.object({
  firstName: Joi.string().required().min(3),
  lastName: Joi.string().required().min(3),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  telephone: Joi.string().required().min(11).max(14).trim(),
  role: Joi.string().optional()
})


const loginschema = Joi.object({

  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),

})

export const validateSignup = (
  req,
  res,
  next
) => {
 

   const {error} = signUpschema.validate(req.body)
   if (error) {

     const { details } = error
     const message = details.map((i) => i.message).join(',')
     next(new Exception (message, 400))
   }
   next()
}


export const validateLogin = (req, res, next) => {
  const { error } = loginschema.validate(req.body)
  if (error) {
    const { details } = error
    const message = details.map((i) => i.message).join(',')
    next(new Exception(message, 400))
  }
  next()
}



