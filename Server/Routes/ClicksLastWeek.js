const express=require('express');
const { Links } = require('../Models/Links');
const router=express.Router();


router.get('/:name',async(req,res)=>{
    try{

        const submit={sun:0,mon:0,tue:0,wed:0,thu:0,fri:0,sat:0}
        let dateNow=new Date()
        const users=await Links.find({nameUser:req.params.name});
        if(!users){
            return res.send('invalid name').status(400)
        }
        if(users){
        for(let i=0;i<users.length;i++){
            if(users[i].numberOfClicks>0){
            for(let y=0;y<users[i].DateOfClicks.length;y++){
                let date =new Date(users[i].DateOfClicks[y])
                if(date.getDate()>=dateNow.getDate()-7) {

                 if(date.getDay()==0){
                    submit['sun']++
                }
                else if(date.getDay()==1){
                    submit['mon']++
                }
                else if(date.getDay()==2){
                    submit['tue']++
                }
                else if(date.getDay()==3){
                    submit['wed']++
                }
                else if(date.getDay()==4){
                    submit['thu']++
                }
                else if(date.getDay()==5){
                    submit['fri']++
                }
                else if(date.getDay()==6){
                    submit['sat']++
                }
            }
            }
        }}
        
        return res.send(submit).status(200)
    }
}
catch(error){
    return res.sendStatus(error)
}
});




module.exports=router;