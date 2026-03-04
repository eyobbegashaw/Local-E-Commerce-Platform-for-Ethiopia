const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true 
  },
  shopName: { 
    type: String, 
    required: [true, 'Shop name is required'] 
  },
  shopDescription: { 
    type: String,
    maxlength: 500
  },
  location: { 
    type: String, 
    required: [true, 'Location is required'],
    enum: ['Merkato', 'Shiro Meda', 'Shola', 'Bole', 'Piassa', 'Other']
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'] 
  },
  telegramHandle: { 
    type: String,
    match: [/^@?[a-zA-Z0-9_]{5,32}$/, 'Please enter a valid Telegram handle']
  },
  isApproved: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Vendor', vendorSchema);