import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaUser, FaStore, FaPhone, FaLock, FaMapMarkerAlt, FaTelegram } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import api from '../../services/api';
import '../../styles/auth/Register.css';

const Register = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [role, setRole] = useState('buyer');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    shopName: '',
    location: 'Merkato',
    telegramHandle: ''
  });
  const [loading, setLoading] = useState(false);

  const locations = ['Merkato', 'Shiro Meda', 'Shola', 'Bole', 'Piassa', 'Other'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error(language === 'en' ? 'Passwords do not match' : 'የይለፍ ቃላት አይዛመዱም');
      return;
    }

    setLoading(true);

    try {
      const registrationData = {
        name: formData.name,
        phone: formData.phone,
        password: formData.password,
        role: role
      };

      if (role === 'vendor') {
        registrationData.shopName = formData.shopName;
        registrationData.location = formData.location;
        registrationData.telegramHandle = formData.telegramHandle;
      }

      const response = await api.post('/auth/register', registrationData);
      
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.token);
      
      toast.success(language === 'en' ? 'Registration successful!' : 'በተሳካ ሁኔታ ተመዝግበዋል!');
      
      if (role === 'vendor') {
        toast.success(language === 'en' 
          ? 'Your vendor account is pending approval' 
          : 'የነጋዴ መለያዎ በማጽደቅ ላይ ነው');
      }
      
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h2 className="register-title">
          {language === 'en' ? 'Create Account' : 'መለያ ይፍጠሩ'}
        </h2>

        <div className="register-role-selector">
          <button
            onClick={() => setRole('buyer')}
            className={`register-role-button ${role === 'buyer' ? 'active' : ''}`}
          >
            {language === 'en' ? 'Buyer' : 'ገዢ'}
          </button>
          <button
            onClick={() => setRole('vendor')}
            className={`register-role-button vendor ${role === 'vendor' ? 'active' : ''}`}
          >
            {language === 'en' ? 'Vendor' : 'ነጋዴ'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-form-group">
            <label className="register-label">
              {language === 'en' ? 'Full Name' : 'ሙሉ ስም'}
            </label>
            <div className="register-input-group">
              <FaUser className="register-input-icon" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="register-input"
              />
            </div>
          </div>

          <div className="register-form-group">
            <label className="register-label">
              {language === 'en' ? 'Phone Number' : 'ስልክ ቁጥር'}
            </label>
            <div className="register-input-group">
              <FaPhone className="register-input-icon" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="register-input"
                placeholder="0912345678"
              />
            </div>
          </div>

          <div className="register-form-group">
            <label className="register-label">
              {language === 'en' ? 'Password' : 'የይለፍ ቃል'}
            </label>
            <div className="register-input-group">
              <FaLock className="register-input-icon" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="register-input"
              />
            </div>
          </div>

          <div className="register-form-group">
            <label className="register-label">
              {language === 'en' ? 'Confirm Password' : 'የይለፍ ቃል ያረጋግጡ'}
            </label>
            <div className="register-input-group">
              <FaLock className="register-input-icon" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="register-input"
              />
            </div>
          </div>

          {role === 'vendor' && (
            <>
              <div className="register-form-group">
                <label className="register-label">
                  {language === 'en' ? 'Shop Name' : 'የሱቅ ስም'}
                </label>
                <div className="register-input-group">
                  <FaStore className="register-input-icon" />
                  <input
                    type="text"
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleChange}
                    required
                    className="register-input"
                  />
                </div>
              </div>

              <div className="register-form-group">
                <label className="register-label">
                  {language === 'en' ? 'Location' : 'አካባቢ'}
                </label>
                <div className="register-input-group">
                  <FaMapMarkerAlt className="register-input-icon" />
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="register-select"
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="register-form-group">
                <label className="register-label">
                  {language === 'en' ? 'Telegram Handle (Optional)' : 'የቴሌግራም አድራሻ (አማራጭ)'}
                </label>
                <div className="register-input-group">
                  <FaTelegram className="register-input-icon" />
                  <input
                    type="text"
                    name="telegramHandle"
                    value={formData.telegramHandle}
                    onChange={handleChange}
                    className="register-input"
                    placeholder="@username"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`register-submit-button ${role === 'vendor' ? 'vendor' : ''}`}
          >
            {loading ? t('loading') : t('register')}
          </button>
        </form>

        <p className="register-footer">
          {language === 'en' ? 'Already have an account?' : 'መለያ አለዎት?'}{' '}
          <Link to="/login" className="register-login-link">
            {t('login')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;