const cloudinary = require("cloudinary").v2;
require("dotenv").config()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

console.log(process.env.CLOUDINARY_CLOUD_NAME)
console.log(process.env.CLOUDINARY_API_KEY)
console.log(process.env.CLOUDINARY_API_SECRET)

const Upload = async (req,res) =>{
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    try{
        const results = await cloudinary.uploader.upload(req.file.path)
        const url = cloudinary.url(results.public_id,{
            transformation:[
                {
                    quality:'auto',
                    fetch_format:'auto'
                },
            ]
        })
        console.log(url)
        res.status(200).json({message:"Image Uploaded",success:true,image_url:url});
    }catch(err){
        console.log(err);
    }
}

module.exports = {Upload}