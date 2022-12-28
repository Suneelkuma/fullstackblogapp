const mongoose=require("mongoose")

const Schema=mongoose.Schema;

const blogsSchema=new Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    authorname:{type:String, required:true}
},{timestamps:true})


const blogModel=mongoose.model("Blogs",blogsSchema)

module.exports=blogModel