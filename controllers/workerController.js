const Worker = require("../models/workerModel");
const asyncHandler = require("../middlewares/asyncHandler");
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary");

//============  Create worker  =============//

const createWorker = asyncHandler(async (req, res) => {
  try {
    let { name, designation, mobile, password, branchId } = req.body;
    let image = req.file ? req.file.path : null;

    // switch (true) {
    //   case !name:
    //     return res
    //       .status(400)
    //       .json({ success: false, message: "Name is required" });
    //   case !designation:
    //     return res
    //       .status(400)
    //       .json({ success: false, message: "Designation is required" });
    //   case !mobile:
    //     return res
    //       .status(400)
    //       .json({ success: false, message: "Mobile is required" });
    //   case !password:
    //     return res
    //       .status(400)
    //       .json({ success: false, message: "Password is required" });
    //   case !branchId:
    //     return res
    //       .status(400)
    //       .json({ success: false, message: "BranchId is required" });
    //   case !image:
    //     return res
    //       .status(400)
    //       .json({ success: false, message: "Image is required" });
    // }

    const existingMobile = await Worker.findOne({ mobile });

    if (existingMobile) {
      return res
        .status(400)
        .json({ success: false, message: "Mobile already exists" });
    }
    const worker = await Worker.create({
      name: name,
      designation: designation,
      mobile: mobile,
      password: password,
      branchId: branchId,
    });

    return res.status(201).json({
      success: true,
      message: "Worker add successfully",
      worker: worker,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//============  Get all workers by branchId  =============//

const getAllWorkersByBranch = asyncHandler(async (req, res) => {
  try {
    const workers = await Worker.find({ branchId: req.params.branchId });

    if (!workers.length) {
      return res
        .status(404)
        .json({ success: false, message: "No workers found" });
    }

    return res.status(200).json({
      success: true,
      message: "Workers found by branch",
      workers: workers,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//============  Update worker  =============//

const updateWorker = asyncHandler(async (req, res) => {
  try {
    let { name, designation, mobile, password, branchId } = req.body;
    let image = req.file ? req.file.path : null;

    if (mobile) {
      const existingMobile = await Worker.findOne({ mobile });
      if (existingMobile) {
        return res
          .status(400)
          .json({ success: false, message: "Mobile already exists" });
      }
    }

    const worker = await Worker.create({
      name: name,
      designation: designation,
      mobile: mobile,
      password: password,
      branchId: branchId,
    });

    return res.status(200).json({
      success: true,
      message: "Worker updated successfully",
      worker: worker,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});


module.exports = {
  createWorker,
  getAllWorkersByBranch,
  updateWorker,
};
