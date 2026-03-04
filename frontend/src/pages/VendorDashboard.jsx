import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import AddProductForm from '../components/vendor/AddProductForm';
import { FaPlus, FaEdit, FaTrash, FaStore } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import '../styles/pages/VendorDashboard.css';

const VendorDashboard = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'vendor') {
      navigate('/login');
      return;
    }
    
    fetchVendorData();
  }, []);

  const fetchVendorData = async () => {
    try {
      const [productsRes, profileRes] = await Promise.all([
        api.get('/products/myproducts'),
        api.get('/auth/profile')
      ]);
      
      setProducts(productsRes.data);
      setVendor(profileRes.data.vendor);
    } catch (error) {
      toast.error('Failed to load vendor data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm(language === 'en' 
      ? 'Are you sure you want to delete this product?' 
      : 'ይህን ምርት መሰረዝ እንደሚፈልጉ እርግጠኛ ነዎት?')) {
      return;
    }

    try {
      await api.delete(`/products/${productId}`);
      setProducts(products.filter(p => p._id !== productId));
      toast.success(language === 'en' ? 'Product deleted' : 'ምርት ተሰርዟል');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-spinner"></div>
        <p className="dashboard-loading-text">{t('loading')}</p>
      </div>
    );
  }

  if (!vendor?.isApproved) {
    return (
      <div className="dashboard-pending">
        <div className="dashboard-pending-card">
          <h2 className="dashboard-pending-title">
            {language === 'en' ? 'Account Pending Approval' : 'መለያ በማጽደቅ ላይ'}
          </h2>
          <p className="dashboard-pending-text">
            {language === 'en'
              ? 'Your vendor account is currently pending approval from our admin team. You will be able to add products once your account is approved.'
              : 'የእርስዎ ነጋዴ መለያ ከአስተዳዳሪዎቻችን ማጽደቅን በመጠባበቅ ላይ ነው። መለያዎ ከጸደቀ በኋላ ምርቶችን ማከል ይችላሉ።'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="vendor-dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            {language === 'en' ? 'Vendor Dashboard' : 'የነጋዴ ዳሽቦርድ'}
          </h1>
          <p className="dashboard-subtitle">
            {vendor.shopName} - {vendor.location}
          </p>
        </div>
        
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="dashboard-add-button"
        >
          <FaPlus />
          <span>{t('addProduct')}</span>
        </button>
      </div>

      {showAddForm && (
        <div className="dashboard-add-form">
          <AddProductForm
            onSuccess={(newProduct) => {
              setProducts([newProduct, ...products]);
              setShowAddForm(false);
            }}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      <div className="dashboard-stats">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-info">
            <p className="dashboard-stat-label">{language === 'en' ? 'Total Products' : 'ጠቅላላ ምርቶች'}</p>
            <h4 className="dashboard-stat-value">{products.length}</h4>
          </div>
          <FaStore className="dashboard-stat-icon" />
        </div>
        
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-info">
            <p className="dashboard-stat-label">{language === 'en' ? 'Shop Status' : 'የሱቅ ሁኔታ'}</p>
            <h4 className={`dashboard-stat-value ${vendor.isApproved ? 'active' : 'pending'}`}>
              {vendor.isApproved 
                ? (language === 'en' ? 'Active' : 'ንቁ')
                : (language === 'en' ? 'Pending' : 'በመጠባበቅ ላይ')}
            </h4>
          </div>
          <div className={`dashboard-status-indicator ${vendor.isApproved ? 'active' : 'pending'}`}>
            <div className={`dashboard-status-dot ${vendor.isApproved ? 'active' : 'pending'}`}></div>
          </div>
        </div>
        
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-info">
            <p className="dashboard-stat-label">{language === 'en' ? 'Member Since' : 'አባል የሆኑት'}</p>
            <h4 className="dashboard-stat-value">
              {new Date(vendor.createdAt).toLocaleDateString()}
            </h4>
          </div>
          <FaStore className="dashboard-stat-icon" />
        </div>
      </div>

      <div className="dashboard-products">
        <h2 className="dashboard-products-title">
          {language === 'en' ? 'Your Products' : 'የእርስዎ ምርቶች'}
        </h2>

        {products.length === 0 ? (
          <div className="dashboard-no-products">
            <p className="dashboard-no-products-text">
              {language === 'en' 
                ? 'You haven\'t added any products yet' 
                : 'እስካሁን ምንም ምርቶች አልጨመሩም'}
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="dashboard-add-first-button"
            >
              <FaPlus />
              <span>{t('addProduct')}</span>
            </button>
          </div>
        ) : (
          <div className="dashboard-products-grid">
            {products.map(product => (
              <div key={product._id} className="dashboard-product-card">
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/300'}
                  alt={product.title}
                  className="dashboard-product-image"
                />
                <div className="dashboard-product-info">
                  <h3 className="dashboard-product-title">{product.title}</h3>
                  <p className="dashboard-product-price">{product.price} ETB</p>
                  <p className="dashboard-product-category">{product.category}</p>
                  
                  <div className="dashboard-product-actions">
                    <button className="dashboard-product-edit">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="dashboard-product-delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;