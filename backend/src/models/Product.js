const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  vendorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Vendor', 
    required: true 
  },
  title: { 
    type: String, 
    required: [true, 'Product title is required'] 
  },
  titleAmharic: { 
    type: String 
  },
  description: { 
    type: String,
    maxlength: 1000
  },
  descriptionAmharic: { 
    type: String 
  },
  price: { 
    type: Number, 
    required: [true, 'Price is required'],
    min: 0
  },
  category: { 
    type: String, 
    required: [true, 'Category is required'],
    enum: ['Clothes', 'Spices', 'Handicrafts', 'Food', 'Electronics', 'Other']
  },
  imageUrl: { 
    type: String, 
    required: [true, 'Product image is required'] 
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Product', productSchema);