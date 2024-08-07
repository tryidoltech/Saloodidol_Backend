const Service = require("../models/serviceModel");
const Branch = require("../models/branchModel");
const asyncHandler = require("../middlewares/asyncHandler");
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary");

//===========  Create service  ============//

const createService = asyncHandler(async (req, res) => {
  try {
    let { name, price, duration, description, branchId } = req.body;
    let image = req.file ? req.file.path : null;

    let branch;
    if (branchId) {
      branch = await Branch.findById({ _id: branchId });
      if (!branch) {
        return res.status(404).json({
          success: false,
          message: "The specified branch could not be found.",
        });
      }
    }
    const imageUrl = await uploadOnCloudinary(image);
    const service = await Service.create({
      name: name,
      image: imageUrl?.url,
      price: price,
      duration: duration,
      description: description,
      branchId: branch?._id,
    });

    return res.status(201).json({
      success: true,
      message: "Service has been successfully created.",
      data: service,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//===========  Get all services  ===========//

const getAllServicesByBranch = asyncHandler(async (req, res) => {
  try {
    const services = await Service.find({
      branchId: req.params.branchId,
    }).populate("branchId");

    if (!services.length) {
      return res.status(404).json({
        success: false,
        message: "No services found for the specified branch.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Services retrieved successfully.",
      data: services,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//===========  Get by serviceId  ===========//

const getByServiceId = asyncHandler(async (req, res) => {
  try {
    const service = await Service.findById({
      _id: req.params.serviceId,
    }).populate("branchId");

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "The requested service could not be found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Service retrieved successfully.",
      data: service,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

//===========  update service  ===========//

const updateService = asyncHandler(async (req, res) => {
  try {
    const { name, price, duration, description } = req.body;
    const image = req.file ? req.file.path : null;
    let imageUrl;

    const existingService = await Service.findById(req.params.serviceId);

    if (!existingService) {
      return res.status(404).json({
        success: false,
        message: "The requested service could not be found.",
      });
    }

    if (image) {
      imageUrl = await uploadOnCloudinary(image);
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.serviceId,
      {
        $set: {
          name,
          image: imageUrl ? imageUrl.url : existingService.image,
          price,
          duration,
          description,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "The service has been successfully updated.",
      data: updatedService,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//===========  Disable service  ===========//

const disableService = asyncHandler(async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "The specified service could not be found.",
      });
    }

    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      { $set: { isDisabled: !service.isDisabled } },
      { new: true }
    );

    const statusMessage = updatedService.isDisabled
      ? "The service has been successfully disabled."
      : "The service has been successfully enabled.";

    return res.status(200).json({
      success: true,
      message: statusMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//===========  Delete service  ===========//

const deleteService = asyncHandler(async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const deletedService = await Service.findByIdAndDelete(serviceId);

    if (!deletedService) {
      return res.status(404).json({
        success: false,
        message: "The specified service could not be found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "The service has been successfully deleted.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = {
  createService,
  getAllServicesByBranch,
  getByServiceId,
  updateService,
  disableService,
  deleteService,
};
