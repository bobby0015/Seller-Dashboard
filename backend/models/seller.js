const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    shopImg:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/026/705/034/small_2x/hand-drawn-cafe-building-in-flat-style-vector.jpg"
    },
    shopName:{
        type:String,
        required:true,
    },
    shopDesc:{
        type:String,
        required:true
    },
    shopAddress:{
        type:String,
        required:true
    },
    ordersPlaced:{
        type:[String],
    },
    products:{
        type:[String],
    }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


module.exports = mongoose.model("seller",sellerSchema);