const Product = require('../models/Product');
const Vendor = require('../models/Vendor');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// @desc    Get all products
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const { category, location, search } = req.query;
    let query = { isActive: true };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by vendor location
    if (location) {
      const vendors = await Vendor.find({ location, isApproved: true }).select('_id');
      query.vendorId = { $in: vendors.map(v => v._id) };
    }

    const products = await Product.find(query)
      .populate({
        path: 'vendorId',
        populate: { path: 'user', select: 'name' }
      })
      .sort('-createdAt');

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate({
        path: 'vendorId',
        populate: { path: 'user', select: 'name' }
      });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product (vendor only)
// @route   POST /api/products
const createProduct = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.user._id });
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    if (!vendor.isApproved) {
      return res.status(403).json({ message: 'Your vendor account is pending approval' });
    }

    const { title, titleAmharic, description, descriptionAmharic, price, category } = req.body;

    // Upload image to Cloudinary
    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const product = await Product.create({
      vendorId: vendor._id,
      title,
      titleAmharic,
      description,
      descriptionAmharic,
      price,
      category,
      imageUrl
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product (vendor only)
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product belongs to vendor
    const vendor = await Vendor.findOne({ user: req.user._id });
    if (product.vendorId.toString() !== vendor._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    product.title = req.body.title || product.title;
    product.titleAmharic = req.body.titleAmharic || product.titleAmharic;
    product.description = req.body.description || product.description;
    product.descriptionAmharic = req.body.descriptionAmharic || product.descriptionAmharic;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      product.imageUrl = result.secure_url;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product (vendor or admin)
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user is admin or product owner
    const vendor = await Vendor.findOne({ user: req.user._id });
    if (req.user.role !== 'admin' && product.vendorId.toString() !== vendor._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await product.remove();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get vendor's products
// @route   GET /api/products/vendor/myproducts
const getMyProducts = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.user._id });
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    const products = await Product.find({ vendorId: vendor._id })
      .sort('-createdAt');
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts
};