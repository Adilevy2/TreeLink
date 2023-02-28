const {Links,vaidateLink}=require('../Models/Links');
const {Users}=require('../Models/Users');
const express=require('express');
const router=express.Router();



//Add Link
router.post('/',async(req,res)=>{
    const {error}=vaidateLink(req.body)
    if(error)
    return res.send(error.details[0].message).status(400)
    try{
    let link=await new Links(req.body);
        link=await link.save();
        let links= await Links.find({nameUser:req.body.nameUser});
        links= links.map(ev=>ev=ev._id);
        let user= await Users.findOneAndUpdate({name:req.body.nameUser},{links:links},{new:true})
        return res.send(user).status(200);
    }
    catch(error){
        return res.send(error)  
  }
});

//delete Link
router.delete('/:id',async(req,res)=>{
    try{
    let link=await Links.findByIdAndRemove(req.params.id);
        return res.send('success').status(200);
    }
    catch(error){
        return res.send(error)  
  }
});
module.exports=router;