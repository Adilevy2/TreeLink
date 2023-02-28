const mongoose=require('mongoose')
const Joi=require('joi');

const schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    numberOfClicks:{
        type:Number,
        default:0
    },
    DateOfClicks:{
        type:[String],
        
    },
    nameUser:{
        type:String,
        required:true
    },


    
    
});

const Links=mongoose.model('links',schema);

function vaidateLink(link){
    const schema=Joi.object({
        name:Joi.string().required(),
        nameUser:Joi.string().required(),
        link:Joi.string().required(),
        description:Joi.string(),
    });
    return schema.validate(link)
};

module.exports={Links,vaidateLink}