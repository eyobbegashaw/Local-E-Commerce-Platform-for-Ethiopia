import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { FaPhone, FaTelegram, FaMapMarkerAlt, FaStore, FaCalendarAlt } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import '../styles/pages/ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleTelegram = (handle) => {
    const username = handle.startsWith('@') ? handle.substring(1) : handle;
    window.open(`https://t.me/${username}`, '_blank');
  };

  if (loading) {
    return (
      <div className="product-loading">
        <div className="product-spinner"></div>
        <p className="product-loading-text">{t('loading')}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <p className="product-not-found-text">
          {language === 'en' ? 'Product not found' : 'ምርት አልተገኘም'}
        </p>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-detail-grid">
          <div className="product-detail-image">
            <img
              src={product.imageUrl || 'https://via.placeholder.com/600'}
              alt={language === 'en' ? product.title : (product.titleAmharic || product.title)}
              className="product-detail-img"
            />
          </div>

          <div className="product-detail-info">
            <span className="product-detail-category">
              {product.category}
            </span>

            <h1 className="product-detail-title">
              {language === 'en' ? product.title : (product.titleAmharic || product.title)}
            </h1>

            <p className="product-detail-price">
              {product.price} ETB
            </p>

            <div className="product-detail-description">
              <h3 className="product-detail-description-title">
                {language === 'en' ? 'Description' : 'መግለጫ'}
              </h3>
              <p className="product-detail-description-text">
                {language === 'en' 
                  ? product.description 
                  : (product.descriptionAmharic || product.description)}
              </p>
            </div>

            {product.vendorId && (
              <div className="product-vendor-card">
                <h3 className="product-vendor-title">
                  <FaStore className="product-vendor-icon" />
                  {language === 'en' ? 'Vendor Information' : 'የሻጭ መረጃ'}
                </h3>
                
                <div className="product-vendor-details">
                  <p className="product-vendor-item">
                    <FaStore className="product-vendor-item-icon" />
                    <span className="product-vendor-item-label">{t('shopName')}:</span>
                    {product.vendorId.shopName}
                  </p>
                  
                  <p className="product-vendor-item">
                    <FaMapMarkerAlt className="product-vendor-item-icon" />
                    <span className="product-vendor-item-label">{t('location')}:</span>
                    {product.vendorId.location}
                  </p>
                  
                  <p className="product-vendor-item">
                    <FaCalendarAlt className="product-vendor-item-icon" />
                    <span className="product-vendor-item-label">
                      {language === 'en' ? 'Member since' : 'አባል የሆኑት'}:
                    </span>
                    {new Date(product.vendorId.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            <div className="product-detail-actions">
              <button
                onClick={() => handleCall(product.vendorId?.phone)}
                className="product-detail-call-button"
              >
                <FaPhone />
                <span>{t('call')}</span>
              </button>
              
              {product.vendorId?.telegramHandle && (
                <button
                  onClick={() => handleTelegram(product.vendorId.telegramHandle)}
                  className="product-detail-telegram-button"
                >
                  <FaTelegram />
                  <span>{t('telegram')}</span>
                </button>
              )}
            </div>

            <div className="product-detail-note">
              <p>
                {language === 'en'
                  ? 'Contact the vendor directly to purchase this product'
                  : 'ይህን ምርት ለመግዛት በቀጥታ ሻጩን ያግኙ'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;