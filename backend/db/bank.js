const {Schema,model}=require("mongoose")

const BankSchema = new Schema({
    userId: {type:Schema.Types.ObjectId,ref:"User",required:true},
    balance:{
        type:Number,
        required:true
    }
})
const Bank= model("Bank",BankSchema)
module.exports=Bank