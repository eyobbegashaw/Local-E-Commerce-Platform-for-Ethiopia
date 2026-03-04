const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Vendor = require('../models/Vendor');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user (buyer or vendor)
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, phone, password, role, shopName, location, telegramHandle } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ phone });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this phone number' });
    }

    // Create user
    const user = await User.create({
      name,
      phone,
      password,
      role: role || 'buyer'
    });

    // If registering as vendor, create vendor profile
    if (role === 'vendor') {
      await Vendor.create({
        user: user._id,
        shopName,
        location,
        phone,
        telegramHandle,
        isApproved: false
      });
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Check for user
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(401).json({ message: 'Invalid phone number or password' });
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid phone number or password' });
    }

    // Get vendor info if user is vendor
    let vendorInfo = null;
    if (user.role === 'vendor') {
      vendorInfo = await Vendor.findOne({ user: user._id });
    }

    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      vendor: vendorInfo,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (user.role === 'vendor') {
      const vendor = await Vendor.findOne({ user: user._id });
      res.json({ user, vendor });
    } else {
      res.json({ user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};