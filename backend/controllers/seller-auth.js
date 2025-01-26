const userModel = require("../models/user")
const sellerModel = require("../models/seller")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const store = async (req, res) => {
    const id = req.params.id;
    try {
        const seller = await sellerModel.findOne({ _id: id });
        if (!seller) {
            res.status(404).json({ message: "No account found", success: false })
        } else {
            res.status(200).json({ message: "Seller found", success: true, seller });
        }
    }catch(err){
        res.status(500).json({message:"Internal server Error",success:false})
    }
}

const signup = async (req, res) => {
    const { firstName, lastName, email, password, shopName, shopDesc, shopAddress } = req.body;
    const seller = await sellerModel.findOne({ email });

    if (seller) {
        res.status(409).json({ message: "Seller Already Exist", success: false });
    } else {
        try{
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) {
                        res.status(500).json({ message: "Internal Server Error", success: true });
                    } else {
                        try {
                            const newSeller = await sellerModel.create({
                                firstName,
                                lastName,
                                email,
                                password:hash,
                                shopName,
                                shopDesc,
                                shopAddress
                            })
                            const token = jwt.sign({ email, seller_id: newSeller._id }, process.env.KEY);
                            res.status(201).json({ message: "Seller Account Created Successfully", success: true, newSeller ,seller_token: token });
                        } catch (err) {
                            res.status(500).json({ message: "Internal Server Error", success: false })
                        }
                    }
                })
            })
        }catch(err){
        res.status(500).json({ message: "Intrnal Server Error", success: false });
        }
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const seller = await sellerModel.findOne({ email });

    if (!seller) {
        res.status(404).json({ message: "Oops! No Account found", success: false });
    } else {
        try {
            const match_password = await bcrypt.compare(password, seller.password);

            if (match_password) {
                const token = jwt.sign({ email, seller_id: seller._id }, process.env.KEY);
                res.status(200).json({ message: "LoggedIn Successfully", success: true, seller_token: token })
            } else {
                res.status(404).json({ message: "Oops! Try again, Something went wrong", success: false });
            }
        } catch (err) {
            res.status(500).json({ message: "Internal server Error", success: false });
        }
    }
}

const decode_token = async (req,res) =>{
    const {token} = req.body;
    const decoded = jwt.verify(token,process.env.KEY);
    res.status(200).json({seller_id:decoded.seller_id})
}

module.exports = {
    signup,
    login,
    store,
    decode_token
}