const Appointment = require("../models/appointmentModel");
const asyncHandler = require("../middlewares/asyncHandler");

//============  Create appointment  =============//

const createAppointment = asyncHandler(async (req, res) => {
  try {
    let {
      clientName,
      email,
      phoneNumber,
      date,
      time,
      services,
      userId,
      workerId,
      branchId,
    } = req.body;

    const appointment = await Appointment.create({
      clientName: clientName,
      email: email,
      phoneNumber: phoneNumber,
      city: city,
      date: date,
      time: time,
      services: services,
      userId: userId,
      workerId: workerId,
      branchId: branchId,
    });

    return res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment: appointment,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//============  Update status  ===========  //

const updateStatus = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "Status is required" });
    }
    const appointment = await Appointment.findByIdAndUpdate(
      { _id: req.params.appointmentId },
      { $set: { status: status } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      appointment: appointment,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//============  Update appointment  ===========  //

const updateAppointment = asyncHandler(async (req, res) => {
  try {
    const { clientName, email, phoneNumber, date, time, services, workerId } =
      req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      { _id: req.params.appointmentId },
      {
        $set: {
          clientName: clientName,
          email: email,
          phoneNumber: phoneNumber,
          date: date,
          time: time,
          services: services,
          workerId: workerId,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      appointment: appointment,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//============  Get all appointment  ============//

const getAllAppointmentByBranchId = asyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find({
      branchId: req.params.branchId,
    });

    if (!appointments.length) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Appointment fetched successfully",
      attachments: attachments,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//============  Get all pending appointments by branch  ============//

const getAllPendingAppointmentsByBranchId = asyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find({
      branchId: req.params.branchId,
      status: "PENDING",
    });

    if (!appointments.length) {
      return res
        .status(404)
        .json({ success: false, message: "Pending appointment not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Pending appointment fetched successfully",
      appointments: appointments,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//============  Get all Conform appointments by branch  ============//

const getAllConformAppointmentsByBranchId = asyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find({
      branchId: req.params.branchId,
      status: "CONFORM",
    });

    if (!appointments.length) {
      return res
        .status(404)
        .json({ success: false, message: "Conform appointment not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Conform appointment fetched successfully",
      appointments: appointments,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//============  Get all Arriving appointments by branch  ============//

const getAllArrivingAppointmentsByBranchId = asyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find({
      branchId: req.params.branchId,
      status: "ARRIVING",
    });

    if (!appointments.length) {
      return res
        .status(404)
        .json({ success: false, message: "Arriving appointment not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Arriving appointment fetched successfully",
      appointments: appointments,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//============  Get all check in appointments by branch  ============//

const getAllCheckInAppointmentsByBranchId = asyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find({
      branchId: req.params.branchId,
      status: "CHECK IN",
    });

    if (!appointments.length) {
      return res
        .status(404)
        .json({ success: false, message: "Check in appointment not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Check in appointment fetched successfully",
      appointments: appointments,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//============  Get all work start appointments by branch  ============//

const getAllWorkStartAppointmentsByBranchId = asyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find({
      branchId: req.params.branchId,
      status: "WORK START",
    });

    if (!appointments.length) {
      return res
        .status(404)
        .json({ success: false, message: "Work start appointment not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Work start appointment fetched successfully",
      appointments: appointments,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//============  Get all work complete appointments by branch  ============//

const getAllWorkCompleteAppointmentsByBranchId = asyncHandler(
  async (req, res) => {
    try {
      const appointments = await Appointment.find({
        branchId: req.params.branchId,
        status: "WORK COMPLETED",
      });

      if (!appointments.length) {
        return res.status(404).json({
          success: false,
          message: "Work complete appointment not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Work complete appointment fetched successfully",
        appointments: appointments,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
);

//============  Get all rejected appointments by branch  ============//

const getAllRejectedAppointmentsByBranchId = asyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find({
      branchId: req.params.branchId,
      status: "REJECTED",
    });

    if (!appointments.length) {
      return res.status(404).json({
        success: false,
        message: "Rejected appointment not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Rejected appointment fetched successfully",
      appointments: appointments,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//============  Get all not coming appointments by branch  ============//

const getAllNotComingAppointmentsByBranchId = asyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find({
      branchId: req.params.branchId,
      status: "NOT COMING",
    });

    if (!appointments.length) {
      return res.status(404).json({
        success: false,
        message: "Not coming appointment not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Not coming appointment fetched successfully",
      appointments: appointments,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = {
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
};
