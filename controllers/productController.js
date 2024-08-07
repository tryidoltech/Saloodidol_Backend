const Product = require("../models/productModel");
const Branch = require("../models/branchModel");
const asyncHandler = require("../middlewares/asyncHandler");
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary");

//==========  Create product  ===========//

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { price, title, description, quantity, stock, branchId } = req.body;
    const images = req.files || [];

    if (branchId) {
      const branch = await Branch.findById(branchId);
      if (!branch) {
        return res.status(404).json({
          success: false,
          message: "The specified branch could not be found.",
        });
      }
    }

    const imageUrls = await Promise.all(
      images.map((image) =>
        uploadOnCloudinary(image.path).then(
          (uploadedImage) => uploadedImage?.url
        )
      )
    );

    const product = await Product.create({
      price,
      title,
      description,
      quantity,
      stock,
      branchId: branchId || undefined,
      image: imageUrls,
    });

    return res.status(201).json({
      success: true,
      message: "Product has been successfully created.",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//==========  Get all product by branch  ============//

const getAllProductsByBranch = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({
      branchId: req.params.branchId,
    }).populate("branchId");

    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "No products found for the specified branch.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully.",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//==========  Get product by productId  ==========//

const getProductByProductId = asyncHandler(async (req, res) => {
  try {
    let product = await Product.findById({
      _id: req.params.productId,
    }).populate("branchId");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product retrieved successfully.",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//===========  Update product  ============//

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { price, title, description, quantity, stock } = req.body;
    const images = req.files || [];

    let oldProduct = await Product.findById({ _id: req.params.productId });
    if (!oldProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }
    let imageUrls;
    if (images.length > 0) {
      imageUrls = await Promise.all(
        images.map((image) =>
          uploadOnCloudinary(image.path).then(
            (uploadedImage) => uploadedImage?.url
          )
        )
      );
    }

    const product = await Product.findByIdAndUpdate(
      { _id: oldProduct._id },
      {
        $set: {
          price,
          title,
          description,
          quantity,
          stock,
          image: images ? imageUrls : oldProduct?.image,
        },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Product has been successfully deleted.",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//===========  Delete product  ============//

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete({
      _id: req.params.productId,
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = {
  createProduct,
  getAllProductsByBranch,
  getProductByProductId,
  updateProduct,
  deleteProduct,
};
