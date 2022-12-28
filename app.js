const express= require('express')
const app=express();

const bodyparser=require("body-parser")
app.use(bodyparser.json())

// const userRoutes=require("./routes/user");
const loginRoutes=require("./routes/login")
const postRoutes=require("./routes/post")
const connect=require("./database/db")
app.get ("/",(req,res)=>{
    res.send("ok")
})



// app.use("/api/v1",userRoutes);
app.use("/api/v1/users",loginRoutes);
app.use("/api/v1",postRoutes);
app.listen(5000,()=>console.log("server is up at port 5000"))