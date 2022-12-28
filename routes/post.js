const express=require("express")
const bodyparser = require("body-parser");
const router = express.Router();
const bcrypt = require('bcrypt');
// const { body, validationResult } = require("express-validator");
const Blogs = require("../models/blogs");
// const jwt = require("jsonwebtoken");

const secret = "RESTAPI";

router.use(bodyparser.json());

router.post("/post",async(req,res)=>{
    try{
        const posts=await Blogs.create({
            title:req.body.title,
            description:req.body.description,
            authorname:req.body.authorname
        })
        res.status(200).json({
            status:"Success",
            posts
        })

    }catch(e){
        res.status(200).json({
            status:"Failed",
            message:e.message
        })

    }
})

router.post("/post",async(req,res)=>{
    try{
        const posts=await Blogs.createMany(req.body)
        res.status(200).json({
            status:"Success",
            posts
        })

    }catch(e){
        res.status(200).json({
            status:"Failed",
            message:e.message
        })

    }
})

router.get("/post",async(req,res)=>{
    try{
        const posts=await Blogs.find({
            title:req.body.title,
            description:req.body.description,
            authorname:req.body.authorname
        })
        res.status(200).json({
            status:"Success",
            posts
        })

    }catch(e){
        res.status(200).json({
            status:"Failed",
            message:e.message
        })

    }
})


router.get("/post/:id",async(req,res)=>{
    try{
        const posts=await Blogs.find({_id:req.params.id})
        res.status(200).json({
            status:"Success",
            posts
        })

    }catch(e){
        res.status(200).json({
            status:"Failed",
            message:e.message
        })

    }
})
module.exports=router