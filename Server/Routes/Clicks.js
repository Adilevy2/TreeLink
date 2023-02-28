const {Links}=require('../Models/Links');
const express=require('express');
const router=express.Router();


router.put('/',async(req,res)=>{
    try{
        const link=await Links.findById(req.body.id)
        if(link.numberOfClicks==0){
            let DateOfClicks=link.DateOfClicks
            DateOfClicks=[...DateOfClicks,req.body.date]
            const update=await Links.findOneAndReplace({_id:req.body.id},{_id:req.body.id,name:link.name,link:link.link,description:link.description,nameUser:link.nameUser,DateOfClicks:DateOfClicks,numberOfClicks:1},{new:true})
            return res.send(update) 
        }
        else{
            let DateOfClicks=link.DateOfClicks
            DateOfClicks=[...DateOfClicks,req.body.date]
            const update=await Links.findOneAndReplace({_id:req.body.id},{_id:req.body.id,name:link.name,link:link.link,description:link.description,nameUser:link.nameUser,DateOfClicks:DateOfClicks,numberOfClicks:link.numberOfClicks+1},{new:true})
            return res.send(update) 
        }
      
    }
    catch(error){
        return res.send(error)  
  }
});

module.exports=router;