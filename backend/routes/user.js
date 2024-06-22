const express = require("express");
const router = express.Router();
const {z}=require("zod");
const User = require("../db/user");
var jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");
const authMiddleware = require("./middleware");
const Bank = require("../db/bank");

const UserSignUpValidationSchema = z.object({
username: z.string().email(),
firstName:z.string().max(50),
lastName: z.string().max(50),
password: z.string().min(6)


})
const UserSignInValidationSchema= UserSignUpValidationSchema.pick({
    username:true,
    password:true
})
const UserUpdateValidationSchema=UserSignUpValidationSchema.pick({
    firstName:true,
    lastName:true,
    password:true
})

const isValidSignUpData=(req,res,next)=>{
let data =  req.body;
let response=UserSignUpValidationSchema.safeParse(data);
if(response.success){
    next();
}
else{
    console.log(response.error.issues)
    res.json({
        message:response.error.issues
    })
}
}


const isValidSignInData=(req,res,next)=>{
let data =  req.body;
let response=UserSignInValidationSchema.safeParse(data);
if(response.success){
    next();
}
else{
    console.log(response.error.issues)
    res.json({
        message:response.error.issues
    })
}
}

const isValidUpdationData=(req,res,next)=>{
    let data =  req.body;
    let response=UserUpdateValidationSchema.safeParse(data);
    if(response.success){
      
        next();
    }
    else{
        res.status(411).json({
            message:response.error.issues
        })
    }
}

const isUserExist = async (req,res,next)=>{
 const username=req.body.username;
 try{
   const result= await User.findOne({
        username:username
    })
    if(!result){

        next()
       
    }
    else{
        res.json({
            msg: "Email already taken"
        })
    }
 }
 catch(err){
    res.status(411).json({
        msg:"Error in finding User",
        err:err
    })
 console.log("Error in finding User"+err)
 }
}

router.post("/signup",isValidSignUpData,isUserExist,async (req,res)=>{
    try{
        const user = await User.create({
            username:req.body.username,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:req.body.password
        })
        const userId=user._id

        const account= await Bank.create({
            userId:userId,
            balance: Math.floor(Math.random() * 1000) + 1
        })
        
    
    var token = jwt.sign({userId},JWT_SECRET)
    res.json({
        msg:"User Created Successfully",
        token:token
    })
    }
    catch(err){
        console.log("Error in creating User or giving bank balance"+err)
    }
    
})

router.get("/info",authMiddleware,async(req,res)=>{
    try{
      let userId=req.user_id;
    let response=await User.findById(userId)
    res.json(response)   
    }
    catch(err){
        res.json({
            message:"Error finding info"
        })
    }
   
})


router.post("/signin",isValidSignInData,async (req,res)=>{
    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            message:"Logged In Successfully",
            token: token
        })
        return;
    }
    else{
        res.json({
            message: "User does not exist"
        })
    }
})



router.put("/",isValidUpdationData,authMiddleware,async(req,res)=>{
    try{
 let userId=req.user_id;

    let response= await User.findByIdAndUpdate(userId,req.body)
    if(response){
        res.status(200).json({
            message:"User Updated Successfully"
        })
    }
    }
    catch(err){
        res.status(411).json({
            message:"Error while updating information"
        })
    }
   
})


router.get("/bulk",async (req,res)=>{
    let filter=req.query.filter || ""

    try{
        const users = await User.find({
            $or: [
                { firstName: { "$regex": filter } },
                { lastName: { "$regex": filter } }
            ]
        });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
    }
    catch(err){
        res.status(411).json({
            message:err.message
        })
    }
})




module.exports=router