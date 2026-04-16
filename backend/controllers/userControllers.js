import userModel from "../models/userModels.js"
import bcrypt from "bcrypt"
import validator from "validator"
import jwt from "jsonwebtoken"

const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY)
}

const loginUser = async (req, res) => {
   try {
    const {email, password} = req.body
     if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields required"
        })
    } 

    const user = await userModel.findOne({email})
    if(!user) {
        return res.status(400).json({
            success: false,
            message: "User not found"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)

   
    if(isMatch) {
       const token = createToken(user._id);
       return res.status(200).json({
        success: true,
        message: `Welcome back ${user.name}`,          
        token
       })
    }
    else {
         return res.status(400).json ({
                success: false,
                message: "Incorrect password"
            })
    }

   }
   catch (error){
    console.log(error)
    res.status(500).json({
        success: false,
        message: error.message
    })
   }
}

const registerUser = async (req, res) => {
  try {
  const {name, email, password} = req.body


    if(!name || !email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields required"
        })
    } 
    
    const exists = await userModel.findOne({email})

    console.log(exists)

    if(exists) {
         return res.status(400).json({
                success: false,
                message: " Email already exists"
            })
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({
            success: false,
            message: "Invalid email address"
        })
    }

    if(password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be 6 length long"
            })
          }
    
   
    const hashedPassword = await bcrypt.hash(password,10)
     
     const user = await userModel.create({
            name,
            email,
            password: hashedPassword
          })
          const token = createToken(user._id)

          return res.status(201).json({
            success: true,
            message: "Account created successfully"
          })



    // const user = await newuser.save();

   

  }
  catch(error) {
    console.log(error)
    res.status(500).json({
        success: false,
        message: error.message
    })
  }
}

export {loginUser, registerUser}