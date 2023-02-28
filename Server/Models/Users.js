const mongoose=require('mongoose')
const Joi=require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);
const jwt=require('jsonwebtoken')


const schema=mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    links:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'links',
    },
    pageColor:{
        type:String,
        default:'rgb(64 64 64)'
    },
    image:{
        type:Object,
        required:true

    }
    
    
});

schema.methods.generateToken=function(){
    const token=jwt.sign({email:this.email, name:this.name, password:this.password,pageColor:this.pageColor,image:this.image},'tokenWord')
    return token;
}
const Users=mongoose.model('users',schema);

function vaidateUser(user){
    const schema=Joi.object({
        name:Joi.string().required(),
        image:Joi.string().required(),
        password:joiPassword.string()
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .required(),
    });
    return schema.validate(user)
};

module.exports={Users,vaidateUser}