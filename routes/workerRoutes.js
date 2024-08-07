const express = require("express");
const {
  createWorker,
  getAllWorkersByBranch,
  updateWorker,
} = require("../controllers/workerController");
const router = express.Router();

router.post("/createWorker", createWorker);
router.put("/updateWorker/:workerId", updateWorker);

//==========  Admin route  ===========//
router.get("/getAllWorkersByBranch/:branchId", getAllWorkersByBranch);

module.exports = router;
