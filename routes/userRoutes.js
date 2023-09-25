const express= require("express")
const brycpt= require("bcrypt")
const jwt = require("jsonwebtoken")
const User= require("../models/User")
const jwt_secret_key= process.env.jwt_secret_key||"Masai";
require("dotenv").config()
const router= express.Router()

router.post("/signup",async(req,res)=>{
    try {
        const {email,password}= req.body;
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).send({msg:"Email already registered"})
        }

        const hashedPassword= await brycpt.hash(password,10)

        const user= new User({
           email,password:hashedPassword
        })

        await user.save()
        res.status(200).send({msg:"User Registered Successfully"})

        
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:error})
    }
})

router.post("/login",async(req,res)=>{
    try {
        const {email,password}= req.body;
        const existingUser= await User.findOne({email});
        if(!existingUser){
            return res.status(400).send({msg:"Email not registered"})
        }

        const isPasswordValid= await brycpt.compare(password,existingUser.password);
        if(!isPasswordValid){
            return res.status(400).send({msg:"Invalid Password"})
        }
        const token= jwt.sign({userId:existingUser._id},jwt_secret_key)

        
        
        res.status(200).send({msg:"User Login Successfully",token})
        
        
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:error})
    }
})



module.exports=router;