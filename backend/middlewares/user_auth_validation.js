const joi = require("joi");

const userValidation = (req,res,next) =>{
    const schema = joi.object({
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).min(4).max(300).required(),
        password:joi.string().min(4).max(50).required()
    }).unknown(true);

    //.unknown(true); this is use to skip the other data

    const {error} = schema.validate(req.body);

    if(error){
        return res.status(400).json({message:"Bad Rquest",error})
    }
    next();
}

module.exports = {userValidation}