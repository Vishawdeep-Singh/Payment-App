const express = require("express");
const { default: mongoose } = require("mongoose");
const { object } = require("zod");
const Bank = require("../db/bank");
const authMiddleware = require("./middleware");
const router = express.Router();


router.get("/balance",authMiddleware,async(req,res)=>{
const userId = req.user_id;
 try{
   const account = await Bank.findOne({
    userId:userId
})
res.json({
    balance:account.balance
}) 
 }
 catch(err){
    res.json({
        message:"error in retreiving balance"
    })
 }

})






router.post("/transfer",authMiddleware,async(req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();

    const userId =  req.user_id;
    const {to,amount}=req.body;

    const account = await Bank.findOne({ userId: userId}).session(session);
    

    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.json({
            message: "Insufficient balance"
        });
    }
    
    
    const toaccount=await Bank.findOne({ userId: to}).session(session);
    console.log(toaccount)
    if (!toaccount) {
        await session.abortTransaction();
        return res.json({
            message: "Invalid account"
        });
    }
    await Bank.updateOne({ userId: userId }, { $inc: { balance: -amount } }).session(session);
    await Bank.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    res.status(200).json({
        message: "Transfer successful"

    })
})

module.exports=router