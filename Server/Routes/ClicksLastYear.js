const express=require('express');
const { Links } = require('../Models/Links');
const router=express.Router();


router.get('/:name',async(req,res)=>{
    try{

        const submit={jan:0,feb:0,mer:0,apr:0,may:0,jun:0,jul:0,aug:0,sep:0,oct:0,nov:0,dec:0}
        const users=await Links.find({nameUser:req.params.name});
        if(!users){
            return res.send('invalid name').status(400)
        }
        if(users){
        for(let i=0;i<users.length;i++){
            if(users[i].numberOfClicks>0){
            for(let y=0;y<users[i].DateOfClicks.length;y++){
                let date =new Date(users[i].DateOfClicks[y])
                let dateNow=new Date()
                if(date.getFullYear()==dateNow.getFullYear()) {     
                 if(date.getMonth()==0){
                    submit['jan']++
                }
                else if( date.getMonth()==1){
                    submit['feb']++
                }
                else if(date.getMonth()==2){
                    submit['mar']++
                }
                else if( date.getMonth()==3){
                    submit['apr']++
                }
                else if(date.getMonth()==4){
                    submit['may']++
                }
                else if(date.getMonth()==5){
                    submit['jun']++
                }
                else if(date.getMonth()==6){
                    submit['jul']++
                }
                else if( date.getMonth()==7){
                    submit['aug']++
                }
                else if(date.getMonth()==8){
                    submit['sep']++
                }
                else if(date.getMonth()==9){
                    submit['oct']++
                }
                else if(date.getMonth()==10){
                    submit['nov']++
                }
                else if( date.getMonth()==11){
                    submit['dec']++
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