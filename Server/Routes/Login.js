const {Users}=require('../Models/Users');
const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');


router.post('/',async(req,res)=>{
    try{

        const users=await Users.findOne({name:req.body.name});
        if(!users){
            return res.send('invalid name or password').status(400)
    }
    if(users){
        const compare=await bcrypt.compare(req.body.password,users.password)
        if(!compare)
        return res.send('invalid password').status(400)
        else{
            return res.send(users.generateToken()).status(201)
        }
    }
}
catch(error){
    res.sendStatus(error)
}
});




module.exports=router;