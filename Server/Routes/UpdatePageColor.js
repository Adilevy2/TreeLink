const {Users}=require('../Models/Users');
const express=require('express');
const router=express.Router();


router.put('/',async(req,res)=>{
    try{
        let users=await Users.findOneAndUpdate({name:req.body.name},{pageColor:req.body.pageColor},{new:true});       
            return res.send(users.generateToken()).status(201)
        
    }

catch(error){
    return res.sendStatus(error)
}
});




module.exports=router;