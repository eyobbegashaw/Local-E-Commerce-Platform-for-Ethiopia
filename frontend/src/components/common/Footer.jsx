import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaFacebook, FaTelegram, FaTwitter } from 'react-icons/fa';
import '../../styles/common/Footer.css';

const Footer = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* About Section */}
          <div className="footer-section">
            <h3 className="footer-section-title">
              {language === 'en' ? 'About Us' : 'ስለ እኛ'}
            </h3>
            <p className="footer-section-text">
              {language === 'en' 
                ? 'Connecting local vendors with customers in Ethiopia. Supporting small businesses and traditional markets.'
                : 'በኢትዮጵያ ውስጥ የአካባቢ ነጋዴዎችን ከደንበኞች ጋር በማገናኘት ላይ። ትናንሽ ንግዶችን እና ባህላዊ ገበያዎችን መደገፍ።'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-section-title">
              {language === 'en' ? 'Quick Links' : 'ፈጣን አገናኞች'}
            </h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/vendors" className="footer-link">Vendors</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h3 className="footer-section-title">Categories</h3>
            <ul className="footer-links">
              <li><Link to="/category/clothes" className="footer-link">Clothes</Link></li>
              <li><Link to="/category/spices" className="footer-link">Spices</Link></li>
              <li><Link to="/category/handicrafts" className="footer-link">Handicrafts</Link></li>
              <li><Link to="/category/food" className="footer-link">Food</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="footer-section">
            <h3 className="footer-section-title">Follow Us</h3>
            <div className="footer-social">
              <a href="#" className="footer-social-link"><FaFacebook /></a>
              <a href="#" className="footer-social-link"><FaTelegram /></a>
              <a href="#" className="footer-social-link"><FaTwitter /></a>
            </div>
            <p className="footer-contact">Email: support@localmarket.et</p>
            <p className="footer-contact">Phone: +251 11 123 4567</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>&copy; {currentYear} LocalMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;