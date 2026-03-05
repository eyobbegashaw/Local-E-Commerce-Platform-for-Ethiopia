# Local E-Commerce Platform for Ethiopia (Sandaqa/Gulit)

A digital marketplace connecting local Ethiopian vendors with buyers, designed specifically for markets like Merkato, Shiro Meda, and other local trading hubs.

## 🌟 Overview

This platform empowers small, local vendors to establish a digital presence and sell their goods online, bridging the gap between traditional Ethiopian markets and modern e-commerce. The application focuses on simplicity, accessibility, and cultural relevance.

### Key Features

- **Vendor Onboarding**: Simple registration for vendors with phone-based authentication
- **Product Management**: Easy product listing with photo uploads and Amharic text support
- **Product Catalog**: Clean, categorized grid view for buyers
- **Search & Filter**: Search by product name, filter by location and category
- **Direct Contact**: One-click contact via phone or Telegram (no complex checkout)
- **Admin Panel**: Approve vendors and moderate listings
- **Bilingual Interface**: Full English/Amharic language support
- **Mobile Responsive**: Works seamlessly on all devices

## 🛠 Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Cloudinary** for image storage (optional)

### Frontend
- **React.js** with Hooks
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Icons** for iconography
- **React Hot Toast** for notifications

## 📁 Project Structure

```
project-1-local-ecommerce/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middleware/       # Custom middleware
│   │   ├── config/          # Configuration files
│   │   └── server.js        # Entry point
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/       # Reusable components
│       ├── pages/           # Page components
│       ├── contexts/        # Context providers
│       ├── services/        # API services
│       ├── App.js
│       └── index.js
├── package.json
└── README.md
```

 

## 🌟 Future Enhancements

### Version 2.0 Roadmap
- [ ] Online payment integration
- [ ] Delivery tracking
- [ ] Vendor ratings and reviews
- [ ] Bulk order management
- [ ] Analytics dashboard for vendors
- [ ] SMS notifications
- [ ] Multi-vendor cart
- [ ] Order history
- [ ] Product categories management
- [ ] Vendor verification badges

### Version 3.0 Vision
- [ ] Mobile app (Android/iOS)
- [ ] AI-powered product recommendations
- [ ] Chat system
- [ ] Inventory management
- [ ] Sales analytics
- [ ] Marketing tools
- [ ] Integration with delivery services
- [ ] Multi-language support (Oromifa, Tigrigna)

---

**Made with ❤️ for Ethiopian local markets**
