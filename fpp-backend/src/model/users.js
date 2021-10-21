import mongoose from 'mongoose'
import validator from 'validator'
// const bcrypt=require('bcryptjs')
import bcrypt from 'bcryptjs'
// const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true, // required makes that field necessary
        trim: true  // trim will remove extra space of string at beginning or at end
    },
    email: {
        type: String,
        required: true,
        unique:true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Email is invalid')
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length<6)
                throw new Error('Password is too short!')
            if(value.toLowerCase().includes('password'))
                throw new Error('Password cannot contain "password"')
        }
    },
    profile:{
        type:String
    },
    role:{
        type:String
    },
    qualification:{
        type:String
    },
    liked:{
        type:Object,
        default:{}
    },
    skills:{
        type:String
    },
    username:{
        type:String
    },
    required_role:{
        type:String
    }



})

userSchema.statics.findByCredentials = async (email,password) => {

    const user=await User.findOne({email})
    if(!user)
    {
        throw new Error('Unable to login')
    }

    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch)
    {
        throw new Error('Unable to login')
    }
    return user
}

// use of Middleware to hash password
// This is called just before we save user details in DB 
// This will update password with its hashed value just befor save() and after that user will be saved
userSchema.pre('save',async function(next){
    
    const user=this

    // If user is created or password is modified
    if(user.isModified('password'))
    {
        user.password=await bcrypt.hash(user.password, 8)

    }

    // This will call save() after hashing password
    next()
})


const User=mongoose.model('User',userSchema)

export default User