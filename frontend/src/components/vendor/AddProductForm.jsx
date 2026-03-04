import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaImage, FaTag, FaMoneyBill, FaList } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import api from '../../services/api';
import '../../styles/vendor/AddProductForm.css';

const AddProductForm = ({ onSuccess, onCancel }) => {
  const { language, t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    titleAmharic: '',
    description: '',
    descriptionAmharic: '',
    price: '',
    category: 'Clothes',
    image: null
  });

  const categories = ['Clothes', 'Spices', 'Handicrafts', 'Food', 'Electronics', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(language === 'en' 
          ? 'Image size should be less than 5MB' 
          : 'የምስል መጠን ከ5ሜባ በታች መሆን አለበት');
        return;
      }
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      toast.error(language === 'en' ? 'Please select an image' : 'እባክዎ ምስል ይምረጡ');
      return;
    }

    setLoading(true);

    try {
      const productData = new FormData();
      productData.append('title', formData.title);
      productData.append('titleAmharic', formData.titleAmharic);
      productData.append('description', formData.description);
      productData.append('descriptionAmharic', formData.descriptionAmharic);
      productData.append('price', formData.price);
      productData.append('category', formData.category);
      productData.append('image', formData.image);

      const response = await api.post('/products', productData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success(language === 'en' ? 'Product added successfully!' : 'ምርት በተሳካ ሁኔታ ተጨምሯል!');
      onSuccess?.(response.data);
      
      setFormData({
        title: '',
        titleAmharic: '',
        description: '',
        descriptionAmharic: '',
        price: '',
        category: 'Clothes',
        image: null
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <h3 className="add-product-title">
        {language === 'en' ? 'Add New Product' : 'አዲስ ምርት ያክሉ'}
      </h3>

      <div className="add-product-form-group">
        <label className="add-product-label">
          {language === 'en' ? 'Product Image' : 'የምርት ምስል'}
        </label>
        <div className="add-product-image-upload">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="add-product-file-input"
            id="product-image"
          />
          <label
            htmlFor="product-image"
            className="add-product-file-label"
          >
            <FaImage className="add-product-upload-icon" />
            <span className="add-product-upload-text">
              {formData.image 
                ? formData.image.name 
                : (language === 'en' ? 'Click to upload image' : 'ምስል ለመጫን ይጫኑ')}
            </span>
          </label>
        </div>
      </div>

      <div className="add-product-form-group">
        <label className="add-product-label">
          {language === 'en' ? 'Product Title (English)' : 'የምርት ርዕስ (እንግሊዝኛ)'}
        </label>
        <div className="add-product-input-group">
          <FaTag className="add-product-input-icon" />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="add-product-input"
          />
        </div>
      </div>

      <div className="add-product-form-group">
        <label className="add-product-label">
          {language === 'en' ? 'Product Title (Amharic)' : 'የምርት ርዕስ (አማርኛ)'}
        </label>
        <div className="add-product-input-group">
          <FaTag className="add-product-input-icon" />
          <input
            type="text"
            name="titleAmharic"
            value={formData.titleAmharic}
            onChange={handleChange}
            className="add-product-input"
            placeholder="አማርኛ ርዕስ"
          />
        </div>
      </div>

      <div className="add-product-form-group">
        <label className="add-product-label">
          {language === 'en' ? 'Description (English)' : 'መግለጫ (እንግሊዝኛ)'}
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="add-product-textarea"
        />
      </div>

      <div className="add-product-form-group">
        <label className="add-product-label">
          {language === 'en' ? 'Description (Amharic)' : 'መግለጫ (አማርኛ)'}
        </label>
        <textarea
          name="descriptionAmharic"
          value={formData.descriptionAmharic}
          onChange={handleChange}
          rows="3"
          className="add-product-textarea"
          placeholder="አማርኛ መግለጫ"
        />
      </div>

      <div className="add-product-form-row">
        <div className="add-product-form-group">
          <label className="add-product-label">
            {language === 'en' ? 'Price (ETB)' : 'ዋጋ (ብር)'}
          </label>
          <div className="add-product-input-group">
            <FaMoneyBill className="add-product-input-icon" />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="add-product-input"
            />
          </div>
        </div>

        <div className="add-product-form-group">
          <label className="add-product-label">
            {language === 'en' ? 'Category' : 'ምድብ'}
          </label>
          <div className="add-product-input-group">
            <FaList className="add-product-input-icon" />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="add-product-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="add-product-actions">
        <button
          type="submit"
          disabled={loading}
          className="add-product-submit-button"
        >
          {loading ? t('loading') : t('addProduct')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="add-product-cancel-button"
        >
          {t('cancel')}
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;