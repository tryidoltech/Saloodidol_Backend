const express = require("express");
const {
  createService,
  getAllServicesByBranch,
  getByServiceId,
  updateService,
  disableService,
  deleteService,
} = require("../controllers/serviceController");
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.get("/getAllServicesByBranch/:branchId", getAllServicesByBranch);
router.get("/getByServiceId/:serviceId", getByServiceId);

//==========  Admin route  ===========//
router.post("/createService", upload.single("image"), createService);
router.put("/updateService/:serviceId", updateService);
router.put("/disableService/:serviceId", disableService);
router.delete("/deleteService/:serviceId", deleteService);

module.exports = router;
