import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import '../styles/pages/AdminPanel.css';

const AdminPanel = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('vendors');
  const [pendingVendors, setPendingVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'vendors') {
        const response = await api.get('/vendors/pending');
        setPendingVendors(response.data);
      } else if (activeTab === 'products') {
        const response = await api.get('/products');
        setProducts(response.data);
      }
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveVendor = async (vendorId) => {
    try {
      await api.put(`/vendors/${vendorId}/approve`);
      setPendingVendors(pendingVendors.filter(v => v._id !== vendorId));
      toast.success(language === 'en' ? 'Vendor approved' : 'ነጋዴ ጸድቋል');
    } catch (error) {
      toast.error('Failed to approve vendor');
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

  return (
    <div className="admin-panel">
      <h1 className="admin-title">
        {language === 'en' ? 'Admin Panel' : 'የአስተዳዳሪ ፓነል'}
      </h1>

      <div className="admin-tabs">
        <button
          onClick={() => setActiveTab('vendors')}
          className={`admin-tab ${activeTab === 'vendors' ? 'active' : ''}`}
        >
          {language === 'en' ? 'Pending Vendors' : 'በመጠባበቅ ላይ ያሉ ነጋዴዎች'}
          {pendingVendors.length > 0 && (
            <span className="admin-tab-badge">
              {pendingVendors.length}
            </span>
          )}
        </button>
        
        <button
          onClick={() => setActiveTab('products')}
          className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
        >
          {language === 'en' ? 'Manage Products' : 'ምርቶችን አስተዳድር'}
        </button>
      </div>

      {loading ? (
        <div className="admin-loading">
          <div className="admin-spinner"></div>
          <p className="admin-loading-text">{t('loading')}</p>
        </div>
      ) : (
        <>
          {activeTab === 'vendors' && (
            <div className="admin-vendors-list">
              {pendingVendors.length === 0 ? (
                <div className="admin-empty-state">
                  <p className="admin-empty-text">
                    {language === 'en' 
                      ? 'No pending vendor requests' 
                      : 'በመጠባበቅ ላይ ያሉ የነጋዴ ጥያቄዎች የሉም'}
                  </p>
                </div>
              ) : (
                pendingVendors.map(vendor => (
                  <div key={vendor._id} className="admin-vendor-card">
                    <div className="admin-vendor-info">
                      <h3 className="admin-vendor-name">{vendor.shopName}</h3>
                      <p className="admin-vendor-owner">{vendor.user.name}</p>
                      <div className="admin-vendor-meta">
                        <span className="admin-vendor-tag">📍 {vendor.location}</span>
                        <span className="admin-vendor-tag">📞 {vendor.phone}</span>
                        {vendor.telegramHandle && (
                          <span className="admin-vendor-tag">📱 {vendor.telegramHandle}</span>
                        )}
                      </div>
                      <p className="admin-vendor-date">
                        {language === 'en' ? 'Registered:' : 'የተመዘገቡት:'} {new Date(vendor.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="admin-vendor-actions">
                      <button
                        onClick={() => handleApproveVendor(vendor._id)}
                        className="admin-approve-button"
                      >
                        <FaCheck />
                        <span>{language === 'en' ? 'Approve' : 'አጽድቅ'}</span>
                      </button>
                      
                      <button className="admin-reject-button">
                        <FaTimes />
                        <span>{language === 'en' ? 'Reject' : 'አትቀበል'}</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'products' && (
            <div className="admin-products-grid">
              {products.map(product => (
                <div key={product._id} className="admin-product-card">
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/300'}
                    alt={product.title}
                    className="admin-product-image"
                  />
                  <div className="admin-product-info">
                    <h3 className="admin-product-title">{product.title}</h3>
                    <p className="admin-product-price">{product.price} ETB</p>
                    <p className="admin-product-category">{product.category}</p>
                    <p className="admin-product-vendor">
                      {language === 'en' ? 'Vendor:' : 'ሻጭ:'} {product.vendorId?.shopName}
                    </p>
                    
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="admin-product-delete"
                    >
                      <FaTrash />
                      <span>{language === 'en' ? 'Delete' : 'ሰርዝ'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPanel;