const user = require("../model/userSchema");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const createError = require("../Helpers/errorHelper");
const sendResponse = require("../Helpers/dataHelper");

async function signUp(req, res, next) {
    try {
        const { firstName, lastName, email, password } = req.body

        if (!firstName || !lastName || !email || !password) {
        return next(createError(400, "All fields are required"))
        }
        
       let userExit = await user.findOne({email: email});
       console.log(userExit)
       
        if(userExit){
        return next(createError(400, "User Already Exits"))
        }

        const salt = 10;
        const hash = await bcrypt.hash(password, salt);
        console.log(hash);

        const singupUser =  await user.create({
           firstName,
           lastName,
           email,
           password: hash  
            })

        console.log(singupUser);
            

        res.json(sendResponse(201, "user created successful", singupUser))
    } 
    
    catch (error) {
    next(error)
    }
}

async function login(req, res, next) {
    try {
        const {email, password} = req.body

        if(!email || !password){

        next(createError(400, "All fields are required"))
        return
        }

         const myUser =  await user.findOne({email: email})
         console.log(myUser)

         if(!myUser){
         next(createError(400, "Email not found"))
         return
         }

         const passwordMatch = await bcrypt.compare(password, myUser.password);
         if(!passwordMatch){
         return next(createError(400, "Invalid Candidate"))
         }

         const token = JWT.sign({id: myUser._id, email: myUser.email}, process.env.SCRT)
       
         res.json(sendResponse(200, "Loggedin Successfull", undefined, token ))
    } 
    
    catch (error) {
        console.log(error);
    }
}

module.exports = {signUp, login}