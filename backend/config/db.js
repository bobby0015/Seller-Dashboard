const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_URI + "online_store";

// console.log(mongo_url)

mongoose.connect(mongo_url).then(()=>{
    console.log("Connected to Database");
}).catch(()=>{
    console.log("Failed to Connect to Database");
})