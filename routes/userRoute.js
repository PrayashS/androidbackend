const express = require("express");
const router = express.Router();
const User = require('../models/userModel');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')


router.post('/user/insert', [
    check('fname', "Fullname is required.").not().isEmpty(),
    check('email', "Invalid email").isEmail(),
    check('email', "Email is required.").not().isEmpty(),
    // check('username', "Username is required").not().isEmpty(),
    // check('password', "Password is required.").not().isEmpty(),
    // check('password', "Password must be at least 6 characters long").not().isEmpty()
],

function(req, res) {
    const errors = validationResult(req);
    //res.send(errors.array())
    if (errors.isEmpty()) {
        const fname = req.body.fname;
        const lname = req.body.lname;
        const username = req.body.username;
        const email = req.body.email;
        const phoneno = req.body.phoneno;
        const age = req.body.age;
        const password = req.body.password;
        const userType = req.body.userType;

        bcryptjs.hash(password, 10, function(err,hash) {
            const data = new User({
                fname: fname,
                lname: lname,
                username: username,
                email: email,
                phoneno: phoneno,
                age: age,
                password: hash,
                userType: userType
            })
            data.save()
                .then(function(result){
                    //success msg with status code
                    res.status(201).json({success:true,msg:"Registered!"})
                }).catch(function (err) {
                    res.status(500).json({ error : err,succes:false})
                })
               
                
            })
            
            
 
        } else {
            //Invalid data from client
            res.status(400).json(errors.array());
        }
 
    })
    //lets create a login system
    router.post('/user/login', function(req,res){
      const username = req.body.username;
      const password = req.body.password;
      console.log(username)
      console.log(password)
      User.findOne({username : username}).then(function(accData){
          if (accData===null){
              //email not found.....
             return res.status(201).json({succes:false,message : "Invalid Credentials!"})
          }
          //lets now compare the password
          bcryptjs.compare(password, accData.password, function(err,result){
            if (result===false){
                //username correct/password incorrect
                return res.status(401).json({success:false,message:"Invalid Password!"})
            }
            //now lets generate token
            const token=jwt.sign({accData:accData._id}, 'secretkey');
            res.status(200).json({token:token,msg:"Wow Successful!",success:true})
        })
        })
        .catch(function (e) {
            res.status(500).json({error : e})
            
        })
        })
        
        
        module.exports = router;
