const {Users,vaidateUser}=require('../Models/Users');
const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const cloudinary = require('cloudinary').v2;
const dotenv=require('dotenv')

//sighUp
router.post('/',async(req,res)=>{
    const {error}=vaidateUser(req.body)
    if(error)
    return res.send(error.details[0].message).status(400)
    try{
        
        let users=await Users.findOne({name:req.body.name});
        if(users){
            return res.send('name allready taken').status(400)
        }
        users=await new Users(req.body);
        dotenv.config()
        cloudinary.config({ 
            cloud_name: process.env.CLOUD_NAME, 
            api_key: process.env.API_KEY, 
            api_secret:process.env.API_SECRET,
            secure: true
        });
        
        //generate img
        const imgUploud = await cloudinary.uploader.upload(req.body.image, {
            folder: "images",
            width: 150,
            crop: "scale",
        });
        const salt =await bcrypt.genSalt(10);
        users.password=await bcrypt.hash(users.password,salt);
        users['image']=imgUploud;
        users=await users.save();
        return res.send(users.generateToken()).status(200);
    }
    catch(error){
        return res.send(error)  
  }
});


module.exports=router;