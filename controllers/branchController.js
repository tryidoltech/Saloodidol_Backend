const Branch = require("../models/branchModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middlewares/asyncHandler");
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary");

//==============  Create branch  ==============//

const createBranch = asyncHandler(async (req, res) => {
  try {
    let { name, address, city, owner, mobile, email, adminId, password } =
      req.body;
    let logo = req.file ? req.file.path : null;

    // Validation
    // switch (true) {
    //   case !name:
    //     return res.json({ success: false, message: "Name is required" });
    //   case !address:
    //     return res.json({ success: false, message: "Address is required" });
    //   case !city:
    //     return res.json({ success: false, message: "City is required" });
    //   case !owner:
    //     return res.json({ success: false, message: "Owner is required" });
    //   case !mobile:
    //     return res.json({
    //       success: false,
    //       message: "Mobile number is required",
    //     });
    //   case !email:
    //     return res.json({ success: false, message: "Email is required" });
    //   case !password:
    //     return res.json({ success: false, message: "Password is required" });
    //   case !adminId:
    //     return res.json({ success: false, message: "Admin Id is required" });
    //   case !logo:
    //     return res.json({ success: false, message: "Logo is required" });
    // }

    const existingEmail = await Branch.findOne({ email });
    const existingMobile = await Branch.findOne({ mobile });
    const admin = await User.findById({ _id: adminId });
    if (!admin.isAdmin) {
      return res
        .status(404)
        .json({ success: false, message: "You are not a admin" });
    }
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use." });
    }
    if (existingMobile) {
      return res
        .status(400)
        .json({ success: false, message: "Mobile already in use." });
    }

    const logoUrl = await uploadOnCloudinary(logo);

    const branch = await Branch.create({
      name: name,
      address: address,
      city: city,
      owner: owner,
      mobile: mobile,
      email: email,
      adminId: adminId,
      password: password,
      logo: logoUrl?.url,
    });

    return res.status(200).json({
      success: true,
      message: "Branch created successfully",
      branch: branch,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//============  login branch  =============//

const loginBranch = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email.",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please provide password",
      });
    }

    const branch = await Branch.findOne({ email });

    if (!branch) {
      return res
        .status(404)
        .json({ success: false, message: "Branch does not exist" });
    }

    const isMatch = await branch.verifyPassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    // Create and sign JWT token
    const token = jwt.sign({ id: branch._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    branch._doc.token = token;

    return res
      .status(200)
      .json({ success: true, message: "Login successfully.", branch: branch });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//==============  Update branch  =============//

const updateBranch = asyncHandler(async (req, res) => {
  try {
    let { name, address, city, owner, mobile, email } = req.body;
    let logo = req.file ? req.file.path : null;

    //   const logoUrl = uploadOnCloudinary(logo);
    const branch = await Branch.findByIdAndUpdate(
      { _id: req.params.branchId },
      {
        $set: {
          name: name,
          address: address,
          city: city,
          owner: owner,
          mobile: mobile,
          email: email,
          adminId: adminId,
          logo: logoUrl?.url,
        },
      },
      { new: true }
    );

    if (!branch) {
      return res
        .status(404)
        .json({ success: false, message: "Branch not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Branch created successfully",
      data: branch,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//==============  Get all branch by adminId  =============//

const getAllBranchesByAdminId = asyncHandler(async (req, res) => {
  try {
    const branches = await Branch.find({
      adminId: req.params.adminId,
    }).populate("adminId");

    if (!branches.length) {
      return res
        .status(404)
        .json({ success: false, message: "Branches not found" });
    }

    return res.json({
      success: true,
      message: "Branches fetched successfully",
      data: branches,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//==============  Delete branch  =============//

const deleteBranch = asyncHandler(async (req, res) => {
  try {
    const branch = await Branch.findByIdAndDelete({ _id: req.params.branchId });

    if (!branch) {
      return res
        .status(404)
        .json({ success: false, message: "Branch not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Branch delete successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = {
  createBranch,
  loginBranch,
  updateBranch,
  getAllBranchesByAdminId,
  deleteBranch,
};
