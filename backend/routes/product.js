const express = require("express");
const { createProduct, updateProduct } = require("../controllers/product");
const { Upload } = require("../controllers/image-upload");
const { upload, deletePreviousFile } = require("../middlewares/upload");
const router = express.Router();
const { checkIdforDel } = require("../middlewares/product-middleware");
const productModel = require("../models/product");
const sellerModel = require("../models/seller");

router.get("/info/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "No produt found", success: false });
  } else {
    try {
      const product = await productModel.findOne({ _id: id });
      // 676f84077fd52725ef865015
      res
        .status(200)
        .json({ message: "Product Fetched", success: true, product });
    } catch (err) {
      res.status(500).json({ message: "Something Went wrong", success: false });
    }
  }
});
router.delete("/delete/:sellerId/:id", checkIdforDel, async (req, res) => {
  const id = req.params.id;
  const yourProduct = await productModel.findById(id);
  if (!yourProduct) {
    console.log("Product not found", yourProduct);
    return;
  } else {
    const seller_id = req.params.sellerId;
    if (!seller_id) {
      console.log("Product not belong to any seller", yourProduct);
      return;
    } else {
      const seller = await sellerModel.findById(seller_id);
      const productArr = seller.products;
      const updatedProduct = productArr.filter((pid) => pid !== id);
      const sellerUpdated = await sellerModel.updateOne(
        { _id: seller_id },
        {
          $set: {
            products: updatedProduct,
          },
        }
      );
      console.log(sellerUpdated);

      try {
        const delProduct = await productModel.deleteOne({ _id: req.params.id });
        if (delProduct) {
          res
            .status(200)
            .json({ message: "Product Delete successfully !", success: true });
        }
      } catch (err) {
        res
          .status(500)
          .json({ message: "Somthing went Wrong ! Try again", success: false });
      }
    }
  }
});
router.post("/image-upload", deletePreviousFile, upload.single("file"), Upload);
router.post("/create", createProduct);
router.patch("/update", updateProduct);

module.exports = router;
