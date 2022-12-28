const express=require("express")
const router=express.Router();
const bodyparser=require("body-parser")
router.use(bodyparser.json())
const User=require("../models/user")


// read the data

router.get("/", async(req,res)=>{

   
    try {
        const users=await User.find();
        res.status(200).json({
            status:"success",
            users
        })
        
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            message:error.message
        })
        
    }


})

//post
router.post("/", async(req,res)=>{

   
    try {
        const users=await User.create(req.body);
        res.status(200).json({
            status:"success",
            users
        })
        
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            message:error.message
        })
        
    }


})


module.exports=router;