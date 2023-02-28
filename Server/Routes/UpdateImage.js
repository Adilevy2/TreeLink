const {Users}=require('../Models/Users');
const express=require('express');
const router=express.Router();
const cloudinary = require('cloudinary').v2;
const dotenv=require('dotenv')


router.put('/',async(req,res)=>{
    try{
        let user=await Users.findOne({name:req.body.name})
        dotenv.config()
        cloudinary.config({ 
            cloud_name: process.env.CLOUD_NAME, 
            api_key: process.env.API_KEY, 
            api_secret:process.env.API_SECRET,
            secure: true
        });
        cloudinary.uploader.destroy(user.image.public_id);
        //generate img
        const imgUploud = await cloudinary.uploader.upload(req.body.image, {
            folder: "images",
            width: 150,
            crop: "scale",
        });
        user=await Users.findOneAndUpdate({name:req.body.name},{image:imgUploud},{new:true})
        return res.send(user.generateToken()).status(200);
    }
    catch(error){
        return res.send(error)  
  }
});


module.exports=router;