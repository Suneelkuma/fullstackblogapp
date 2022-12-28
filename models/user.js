const mongoose=require("mongoose")

const Schema=mongoose.Schema;

const userschema=new Schema({
    email:{type:String, required:true},
    password:{type:String, required:true},
    confirmpassword:{type:String, required:true}
},{timestamps:true})


const userModel=mongoose.model("User",userschema)

module.exports=userModel