const jwt = require("jsonwebtoken");
const sellerModel = require("../models/seller");

const checkIdforDel = async (req,res,next) => {
    if(!req.params.id){
        const authHeader = req.headers['authorization'];
        console.log(authHeader);
        if (!authHeader) return res.status(401).json({ message: 'Token is required',success:false });
        const token = authHeader.split(' ')[1];
        console.log(token);
        const decoded = jwt.verify(token,process.env.KEY);
        console.log(decoded);
        res.status(401).json({message:"Invalid Product Data",success:false});
    }else{
        next();
    }
}

module.exports = {checkIdforDel}