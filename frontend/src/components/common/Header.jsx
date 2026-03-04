import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaShoppingBag, FaUser, FaLanguage } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import '../../styles/common/Header.css';

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.success(language === 'en' ? 'Logged out successfully' : 'በተሳካ ሁኔታ ወጥተዋል');
    navigate('/');
  };

  return (
    <header className="header">
      <nav className="header-nav">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <FaShoppingBag className="header-logo-icon" />
          <span className="header-logo-text">
            {language === 'en' ? 'LocalMarket' : 'የአካባቢ ገበያ'}
          </span>
        </Link>

        {/* Search Bar */}
        <div className="header-search">
          <input
            type="text"
            placeholder={t('search')}
            className="header-search-input"
          />
          <button className="header-search-button">
            {t('search')}
          </button>
        </div>

        {/* Right Navigation */}
        <div className="header-actions">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="header-language-toggle"
          >
            <FaLanguage className="header-language-icon" />
            <span className="header-language-text">
              {language === 'en' ? 'Am' : 'En'}
            </span>
          </button>

          {/* Categories Dropdown */}
          <select className="header-categories">
            <option value="">{t('allCategories')}</option>
            <option value="clothes">{language === 'en' ? 'Clothes' : 'አልባሳት'}</option>
            <option value="spices">{language === 'en' ? 'Spices' : 'ቅመማ ቅመም'}</option>
            <option value="handicrafts">{language === 'en' ? 'Handicrafts' : 'የእጅ ሥራዎች'}</option>
          </select>

          {/* User Menu */}
          {user ? (
            <div className="header-user-menu">
              <button className="header-user-button">
                <FaUser className="header-user-icon" />
                <span className="header-user-name">{user.name}</span>
              </button>
              
              <div className="header-dropdown">
                {user.role === 'vendor' && (
                  <Link to="/vendor/dashboard" className="header-dropdown-item">
                    {t('dashboard')}
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link to="/admin" className="header-dropdown-item">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="header-dropdown-item header-dropdown-item-logout"
                >
                  {t('logout')}
                </button>
              </div>
            </div>
          ) : (
            <div className="header-auth-buttons">
              <Link to="/login" className="header-login-button">
                {t('login')}
              </Link>
              <Link to="/register" className="header-register-button">
                {t('register')}
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Search */}
      <div className="header-mobile-search">
        <input
          type="text"
          placeholder={t('search')}
          className="header-mobile-search-input"
        />
      </div>
    </header>
  );
};

export default Header;