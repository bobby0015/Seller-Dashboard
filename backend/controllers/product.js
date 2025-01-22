const productModel = require("../models/product");
const sellerModel = require("../models/seller");

const createProduct = async (req, res) => {
  const {
    sellerId,
    image,
    name,
    description,
    category,
    subCategory,
    brand,
    stock,
    warranty,
    price,
    discount,
  } = req.body;
  const seller = await sellerModel.findOne({ _id: sellerId });
  if (!seller) {
    res
      .status(409)
      .json({
        message:
          "You're not allowed to create a product as you are not a seller.",
      });
  } else {
    try {
      const newProduct = await productModel.create({
        image,
        name,
        description,
        category,
        subCategory,
        brand,
        stock,
        warranty,
        price,
        discount,
      });
      seller.products.push(newProduct._id);
      await seller.save();
      res
        .status(201)
        .json({
          message: "Product Created Successfully",
          success: true,
          newProduct,
        });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  }
};

const updateProduct = async (req, res) => {
  const {
    productId,
    image,
    name,
    description,
    stock,
    warranty,
    price,
    discount,
  } = req.body;
  console.log(
    productId,
    image,
    name,
    description,
    stock,
    warranty,
    price,
    discount
  );

  try {
    // Check if the product exists
    const productIsAvailable = await productModel.findById(productId);

    if (!productIsAvailable) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    // Prepare the updated fields
    const updatedFields = {
      image: image ? image : productIsAvailable.image,
      name: name ? name : productIsAvailable.name,
      description: description ? description : productIsAvailable.description,
      stock: stock ? stock : productIsAvailable.stock,
      warranty: warranty ? warranty : productIsAvailable.warranty,
      price: price ? price : productIsAvailable.price,
      discount: discount ? discount : productIsAvailable.discount,
    };
    console.log(productIsAvailable)
    console.log(updatedFields);

    // Update the product
    const updatedProduct = await productModel.updateOne(
      { _id: productId },
      { $set: updatedFields }
    );

    return res.status(200).json({
      message: "Product Updated Successfully",
      success: true,
      updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

module.exports = {
  createProduct,
  updateProduct,
};
