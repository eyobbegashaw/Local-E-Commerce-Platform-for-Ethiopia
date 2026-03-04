import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaPhone, FaLock } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import api from '../../services/api';
import '../../styles/auth/Login.css';

const Login = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.token);
      
      toast.success(language === 'en' ? 'Login successful!' : 'በተሳካ ሁኔታ ገብተዋል!');
      
      if (response.data.role === 'admin') {
        navigate('/admin');
      } else if (response.data.role === 'vendor') {
        navigate('/vendor/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-title">
          {language === 'en' ? 'Welcome Back!' : 'እንኳን በደህና መጡ!'}
        </h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
            <label className="login-label">
              {language === 'en' ? 'Phone Number' : 'ስልክ ቁጥር'}
            </label>
            <div className="login-input-group">
              <FaPhone className="login-input-icon" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="login-input"
                placeholder="0912345678"
              />
            </div>
          </div>

          <div className="login-form-group">
            <label className="login-label">
              {language === 'en' ? 'Password' : 'የይለፍ ቃል'}
            </label>
            <div className="login-input-group">
              <FaLock className="login-input-icon" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="login-input"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="login-submit-button"
          >
            {loading ? t('loading') : t('login')}
          </button>
        </form>

        <p className="login-footer">
          {language === 'en' ? "Don't have an account?" : 'መለያ የለዎትም?'}{' '}
          <Link to="/register" className="login-register-link">
            {t('register')}
          </Link>
        </p>

        <div className="login-vendor-note">
          <p className="login-vendor-note-text">
            {language === 'en' 
              ? 'Are you a vendor? Register to start selling your products!'
              : 'ነጋዴ ነዎት? ምርቶችዎን መሸጥ ለመጀመር ይመዝገቡ!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;