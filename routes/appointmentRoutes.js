const express = require("express");
const {
  createAppointment,
  updateStatus,
  updateAppointment,
  getAllAppointmentByBranchId,
  getAllPendingAppointmentsByBranchId,
  getAllConformAppointmentsByBranchId,
  getAllArrivingAppointmentsByBranchId,
  getAllCheckInAppointmentsByBranchId,
  getAllWorkStartAppointmentsByBranchId,
  getAllWorkCompleteAppointmentsByBranchId,
  getAllRejectedAppointmentsByBranchId,
  getAllNotComingAppointmentsByBranchId,
} = require("../controllers/appointmentController");
const router = express.Router();

router.post("/createAppointment", createAppointment);
router.put("/updateAppointment/:appointmentId", updateAppointment);

//==========  Admin route  ===========//

router.put("/updateStatus/:appointmentId", updateStatus);
router.get(
  "/getAllAppointmentByBranchId/:branchId",
  getAllAppointmentByBranchId
);
router.get(
  "/getAllPendingAppointmentsByBranchId/:branchId",
  getAllPendingAppointmentsByBranchId
);
router.get(
  "/getAllConformAppointmentsByBranchId/:branchId",
  getAllConformAppointmentsByBranchId
);
router.get(
  "/getAllArrivingAppointmentsByBranchId/:branchId",
  getAllArrivingAppointmentsByBranchId
);
router.get(
  "/getAllCheckInAppointmentsByBranchId/:branchId",
  getAllCheckInAppointmentsByBranchId
);
router.get(
  "/getAllWorkStartAppointmentsByBranchId/:branchId",
  getAllWorkStartAppointmentsByBranchId
);
router.get(
  "/getAllWorkCompleteAppointmentsByBranchId/:branchId",
  getAllWorkCompleteAppointmentsByBranchId
);
router.get(
  "/getAllRejectedAppointmentsByBranchId/:branchId",
  getAllRejectedAppointmentsByBranchId
);
router.get(
  "/getAllNotComingAppointmentsByBranchId/:branchId",
  getAllNotComingAppointmentsByBranchId
);

module.exports = router;
