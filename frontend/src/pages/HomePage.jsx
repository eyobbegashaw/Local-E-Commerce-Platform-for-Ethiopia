import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ProductCard from '../components/common/ProductCard';
import { FaFilter } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import '../styles/pages/HomePage.css';

const HomePage = () => {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    search: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Clothes', 'Spices', 'Handicrafts', 'Food', 'Electronics', 'Other'];
  const locations = ['Merkato', 'Shiro Meda', 'Shola', 'Bole', 'Piassa', 'Other'];

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.location) params.append('location', filters.location);
      if (filters.search) params.append('search', filters.search);

      const response = await api.get(`/products?${params.toString()}`);
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="homepage">
      <section className="homepage-hero">
        <div className="homepage-hero-content">
          <h1 className="homepage-hero-title">
            {language === 'en' 
              ? 'Support Local Vendors' 
              : 'የአካባቢ ነጋዴዎችን ይደግፉ'}
          </h1>
          <p className="homepage-hero-subtitle">
            {language === 'en'
              ? 'Discover unique products from local markets'
              : 'ከአካባቢ ገበያዎች ልዩ ምርቶችን ያግኙ'}
          </p>
          
          <form onSubmit={handleSearch} className="homepage-search-form">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder={t('search')}
              className="homepage-search-input"
            />
            <button
              type="submit"
              className="homepage-search-button"
            >
              {t('search')}
            </button>
          </form>
        </div>
      </section>

      <button
        onClick={() => setShowFilters(!showFilters)}
        className="homepage-filter-toggle"
      >
        <FaFilter />
        <span>{t('filter')}</span>
      </button>

      <div className="homepage-main-layout">
        <div className={`homepage-filters-sidebar ${showFilters ? 'show' : ''}`}>
          <div className="homepage-filters-container">
            <h3 className="homepage-filters-title">{t('filter')}</h3>
            
            <div className="homepage-filter-group">
              <label className="homepage-filter-label">{t('categories')}</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="homepage-filter-select"
              >
                <option value="">{t('allCategories')}</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="homepage-filter-group">
              <label className="homepage-filter-label">{t('location')}</label>
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="homepage-filter-select"
              >
                <option value="">{language === 'en' ? 'All Locations' : 'ሁሉም አካባቢዎች'}</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setFilters({ category: '', location: '', search: '' })}
              className="homepage-clear-filters"
            >
              {language === 'en' ? 'Clear Filters' : 'ማጣሪያዎችን አጽዳ'}
            </button>
          </div>
        </div>

        <div className="homepage-products-grid">
          {loading ? (
            <div className="homepage-loading">
              <div className="homepage-spinner"></div>
              <p className="homepage-loading-text">{t('loading')}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="homepage-no-products">
              {language === 'en' 
                ? 'No products found' 
                : 'ምንም ምርቶች አልተገኙም'}
            </div>
          ) : (
            <div className="homepage-products-container">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;