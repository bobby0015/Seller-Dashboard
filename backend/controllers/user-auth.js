const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const profile = async (req,res) =>{
    const id = req.params.id;
    const user = await userModel.findOne({_id:id});

    if(user){
        res.status(200).json({user})
    }else{
        res.status(404).json({message:"User not found",success:false});
    }
}

const signup = async (req,res) =>{
    const {firstName,lastName,email,password} = req.body;

    const user = await userModel.findOne({email});

    if(user){
        res.status(409).json({message:"Oops! User Already Exists",success:false});
    }else{
        try{
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(password,salt,async (err,hash)=>{
                    if(err){
                        res.status(500).json({message:"Internal server error",success:false});
                    }else{
                        try{
                            const newUser = await userModel.create({
                                firstName,
                                lastName,
                                email,
                                password:hash
                            })
                            const secret_key = process.env.KEY;
                            const token = jwt.sign({email,id:newUser._id},secret_key);

                            console.log(newUser);
                            
                            res.status(201).json({message:"User Created Successfully!",success:true,user_token:token});

                        }catch(err){
                            res.status(500).json({message:"Internal server error",success:false});
                        }
                    }
                })
            })
        }catch(err){
            res.status(500).json({message:"Internal server error",success:false});
        }
    }
}

const login = async (req,res) =>{
    const {email,password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        res.status(404).json({message:"Oops! User not found",success:false});
    }else{
        try{
            const match_password = await bcrypt.compare(password, user.password);

            if(match_password){
                const secret_key = process.env.KEY;
                const token = jwt.sign({email,id:user._id},secret_key);
                res.status(200).json({message:"User LoggedIn!",success:true,user_token:token});
            }else{
                res.status(404).json({message:"Oops! User not found",success:false});
            }

        }catch(err){
            res.status(500).json({message:"Internal Server error",success:false});
        }
    }
}

const decode_token = async (req,res) =>{
    const {token} = req.body;
    const decoded = jwt.verify(token,process.env.KEY);
    res.status(200).json({user_id:decoded.id})
}

module.exports = {
    signup,
    login,
    profile,
    decode_token
}