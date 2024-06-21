const mongoose=require("mongoose");




const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minlength:3,
        maxlength:50
    },
firstName: {
    type:String,
    required:true,
    trim:true,
    maxlength:50

},
lastName: {
    type:String,
    required:true,
    trim:true,
    maxlength:50
},
password: {
    type:String,
    required:true,
    minlength:6
}
})
const User = mongoose.model("User",userSchema)

module.exports=User;