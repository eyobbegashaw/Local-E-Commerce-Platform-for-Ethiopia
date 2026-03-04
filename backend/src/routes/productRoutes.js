const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

router.get('/', getProducts);
router.get('/myproducts', protect, getMyProducts);
router.get('/:id', getProductById);
router.post('/', protect, upload.single('image'), createProduct);
router.put('/:id', protect, upload.single('image'), updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;