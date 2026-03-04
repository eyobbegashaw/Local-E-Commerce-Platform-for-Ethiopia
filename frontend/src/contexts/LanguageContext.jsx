import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // 'en' or 'am'

  const translations = {
    en: {
      // Navigation
      home: 'Home',
      categories: 'Categories',
      vendors: 'Vendors',
      login: 'Login',
      register: 'Register',
      dashboard: 'Dashboard',
      logout: 'Logout',
      
      // Product related
      price: 'Price',
      contact: 'Contact via',
      call: 'Call',
      telegram: 'Telegram',
      addToCart: 'Add to Cart',
      
      // Vendor related
      shopName: 'Shop Name',
      location: 'Location',
      products: 'Products',
      addProduct: 'Add Product',
      
      // Common
      search: 'Search products...',
      filter: 'Filter',
      allCategories: 'All Categories',
      submit: 'Submit',
      cancel: 'Cancel',
      loading: 'Loading...',
      
      // Admin
      approveVendors: 'Approve Vendors',
      pendingVendors: 'Pending Vendors',
      manageProducts: 'Manage Products',
    },
    am: {
      // Navigation
      home: 'መነሻ',
      categories: 'ምድቦች',
      vendors: 'ሻጮች',
      login: 'ግባ',
      register: 'ተመዝገብ',
      dashboard: 'ዳሽቦርድ',
      logout: 'ውጣ',
      
      // Product related
      price: 'ዋጋ',
      contact: 'ያግኙ በ',
      call: 'ደውሉ',
      telegram: 'ቴሌግራም',
      addToCart: 'ይግዙ',
      
      // Vendor related
      shopName: 'የሱቅ ስም',
      location: 'አካባቢ',
      products: 'ምርቶች',
      addProduct: 'ምርት ጨምር',
      
      // Common
      search: 'ምርቶችን ይፈልጉ...',
      filter: 'አጣራ',
      allCategories: 'ሁሉም ምድቦች',
      submit: 'አስገባ',
      cancel: 'ሰርዝ',
      loading: 'በመጫን ላይ...',
      
      // Admin
      approveVendors: 'ሻጮችን አጽድቅ',
      pendingVendors: 'በመጠባበቅ ላይ',
      manageProducts: 'ምርቶችን አስተዳድር',
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'am' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};