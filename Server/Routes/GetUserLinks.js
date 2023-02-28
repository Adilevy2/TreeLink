const {Users}=require('../Models/Users');
const express=require('express');
const router=express.Router();


router.get('/:name',async(req,res)=>{
    
    const users=await Users.findOne({name:req.params.name}).populate('links');
    if(!users){
        return res.send('invalid name').status(400)
    }
    if(users){
        return res.send(users).status(200)
    }
});




module.exports=router;