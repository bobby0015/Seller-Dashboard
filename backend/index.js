const express = require("express");
const app = express();
const user = require("./routes/user");
const seller = require("./routes/selller");
const product = require("./routes/product");
const cors = require("cors");
const bodyParser = require("body-parser")
require("dotenv").config();
require("./config/db");

//middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//routes
app.use("/user",user);
app.use("/seller",seller);
app.use("/seller/product",product)

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log("Running on PORT: ",PORT);
})