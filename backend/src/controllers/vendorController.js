const Vendor = require('../models/Vendor');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get all vendors (approved)
// @route   GET /api/vendors
const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({ isApproved: true })
      .populate('user', 'name phone')
      .select('-__v');
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get vendor by ID
// @route   GET /api/vendors/:id
const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id)
      .populate('user', 'name phone')
      .select('-__v');
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    // Get vendor's products
    const products = await Product.find({ 
      vendorId: vendor._id,
      isActive: true 
    });

    res.json({ vendor, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update vendor profile
// @route   PUT /api/vendors/profile
const updateVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.user._id });
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    vendor.shopName = req.body.shopName || vendor.shopName;
    vendor.shopDescription = req.body.shopDescription || vendor.shopDescription;
    vendor.location = req.body.location || vendor.location;
    vendor.telegramHandle = req.body.telegramHandle || vendor.telegramHandle;

    const updatedVendor = await vendor.save();
    res.json(updatedVendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get pending vendors (admin only)
// @route   GET /api/vendors/pending
const getPendingVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({ isApproved: false })
      .populate('user', 'name phone createdAt')
      .select('-__v');
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve vendor (admin only)
// @route   PUT /api/vendors/:id/approve
const approveVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    vendor.isApproved = true;
    await vendor.save();

    res.json({ message: 'Vendor approved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getVendors,
  getVendorById,
  updateVendorProfile,
  getPendingVendors,
  approveVendor
};