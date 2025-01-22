const multer = require("multer");
const path = require("path");
const fs = require("fs")

//Configuer multer for the DiskSotrage

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb) =>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        // console.log(file.originalname)
        cb(null,uniqueSuffix + path.extname(file.originalname))
    }
});

const upload = multer({storage})

const clearDirectory = (directoryPath) => {
    if (!fs.existsSync(directoryPath)) {
      console.log("Directory does not exist.");
      return;
    }
  
    const files = fs.readdirSync(directoryPath);
  
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
  
      if (fs.lstatSync(filePath).isDirectory()) {
        // Recursively remove subdirectory
        clearDirectory(filePath);
        fs.rmdirSync(filePath);
      } else {
        // Remove file
        fs.unlinkSync(filePath);
      }
    });
  
    console.log(`Cleared directory: ${directoryPath}`);
  };
  
  // Example usage
  const directoryPath = 'uploads/';

  const deletePreviousFile = (req,res,next) =>{
    try{
        clearDirectory(directoryPath);
        next();
    }catch(err){
        console.log("Something went wrong");
        next();
    }
  }


module.exports = { upload, deletePreviousFile };