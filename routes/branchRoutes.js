const express = require("express");
const {
  createBranch,
  loginBranch,
  updateBranch,
  getAllBranchesByAdminId,
  deleteBranch,
} = require("../controllers/branchController");
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.post("/loginBranch", loginBranch);
router.put("/updateBranch", updateBranch);

//===========  Admin route  ============//
router.post("/createBranch", upload.single("logo"), createBranch);
router.get("/getAllBranchesByAdminId/:adminId", getAllBranchesByAdminId);
router.delete("/deleteBranch/:branchId", deleteBranch);

module.exports = router;
