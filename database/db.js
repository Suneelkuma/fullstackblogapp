const mongoose=require("mongoose")

// mongoose.connect('mongodb+srv://SunilGupta:Sunil12345@cluster0.vha2owx.mongodb.net/blogapp?retryWrites=true&w=majority')
// .then(console.log("connection successfull"))
mongoose.connect('mongodb://localhost:27017/blogapp')
.then(console.log("connection successfull"))
.catch(console.error);