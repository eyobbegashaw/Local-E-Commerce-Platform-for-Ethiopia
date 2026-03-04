import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaPhone, FaTelegram } from 'react-icons/fa';
import '../../styles/common/ProductCard.css';

const ProductCard = ({ product }) => {
  const { language, t } = useLanguage();

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleTelegram = (handle) => {
    const username = handle.startsWith('@') ? handle.substring(1) : handle;
    window.open(`https://t.me/${username}`, '_blank');
  };

  return (
    <div className="product-card">
      <div className="product-card-image-container">
        <img
          src={product.imageUrl || 'https://via.placeholder.com/300'}
          alt={language === 'en' ? product.title : (product.titleAmharic || product.title)}
          className="product-card-image"
        />
        <span className="product-card-category">
          {product.category}
        </span>
      </div>

      <div className="product-card-content">
        <h3 className="product-card-title">
          {language === 'en' ? product.title : (product.titleAmharic || product.title)}
        </h3>
        
        <p className="product-card-description">
          {language === 'en' ? product.description : (product.descriptionAmharic || product.description)}
        </p>

        <div className="product-card-price-row">
          <span className="product-card-price">
            {product.price} ETB
          </span>
          <span className="product-card-shop">
            {product.vendorId?.shopName}
          </span>
        </div>

        {product.vendorId && (
          <div className="product-card-location">
            <span className="product-card-location-label">{t('location')}:</span> {product.vendorId.location}
          </div>
        )}

        <div className="product-card-actions">
          <button
            onClick={() => handleCall(product.vendorId?.phone)}
            className="product-card-call-button"
          >
            <FaPhone />
            <span>{t('call')}</span>
          </button>
          
          {product.vendorId?.telegramHandle && (
            <button
              onClick={() => handleTelegram(product.vendorId.telegramHandle)}
              className="product-card-telegram-button"
            >
              <FaTelegram />
              <span>{t('telegram')}</span>
            </button>
          )}
        </div>

        <Link
          to={`/product/${product._id}`}
          className="product-card-details-link"
        >
          {language === 'en' ? 'View Details' : 'ዝርዝሮችን ይመልከቱ'}
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;