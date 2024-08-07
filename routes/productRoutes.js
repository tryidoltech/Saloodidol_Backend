const express = require("express");
const {
  createProduct,
  getAllProductsByBranch,
  getProductByProductId,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.get("/getAllProductsByBranch/:branchId", getAllProductsByBranch);
router.get("/getProductByProductId/:productId", getProductByProductId);

//===========  Admin route  =============//
router.post("/createProduct", upload.array("image"), createProduct);
router.put("/updateProduct/:productId", updateProduct);
router.delete("/deleteProduct/:productId", deleteProduct);

module.exports = router;
