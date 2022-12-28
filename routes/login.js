const express = require("express");

const bodyparser = require("body-parser");

const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const secret = "RESTAPI";

router.use(bodyparser.json());

router.post(
  "/registers",
  body("email").isEmail,
  body("password").isLength({ min: 6, max: 10 }),
  body("confirmpassword").isLength({ min: 6, max: 10 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      const { email, password, confirmpassword } = req.body;
      let user = await User.findOne({ email });

      if (user) {
        return res.status(401).json({
          status: "failed",
          message: "email already exist",
        });
      }
      bcrypt.hash(password, 10,async function(err, hash) {
        // Store hash in your password DB.
        if(err){
            return res.status(400).json({
                status:"failed",
                message:err.message
            })
        }
        const user = await User.create({
            email,
            password:hash,
            confirmpassword,
          });
          return res.json({
            status: "Succcess",
            message: "registerd successfully",
          })
    });
     
    } catch (e) {
      res.status(400).json({
        status: "Failed",
        message: e.message,
      })
    }
  }
);
router.post("/login",body("email").isEmail(),body("password"),async(req,res)=>{
try {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      const { email, password } = req.body;
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          status: "failed",
          message: "User does not exist",
        });
      }
      bcrypt.compare(password, user.password, function(err, result) {
        // result == true
    if(err){
        return res.status(500).json({
            status:"failed",
            message:err.message
        })
    }
    if(result){
        const token=jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: user._id
          }, secret);
          res.status(200).json({
            status:"Success",
            message:"Login successfull",
            token
          })
    }
    else{
        res.status(401).json({
            status:"Failed",
            message:"Invalid credentials",
            
          })
    }
    });
    
} catch (error) {
    res.status(401).json({
        status:"Failed",
        message:error.message,
        
      })
}
})

module.exports = router;
