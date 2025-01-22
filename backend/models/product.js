const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    subCategory:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true,
    },
    warranty:{
        type:String,
    },
    price:{
        type:Number,
        required:true,
    },
    discount:{
        type:Number,
    }
})

module.exports = mongoose.model("products",productSchema);