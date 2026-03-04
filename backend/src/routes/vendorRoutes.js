const express = require('express');
const router = express.Router();
const {
  getVendors,
  getVendorById,
  updateVendorProfile,
  getPendingVendors,
  approveVendor
} = require('../controllers/vendorController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getVendors);
router.get('/pending', protect, admin, getPendingVendors);
router.get('/:id', getVendorById);
router.put('/profile', protect, updateVendorProfile);
router.put('/:id/approve', protect, admin, approveVendor);

module.exports = router;