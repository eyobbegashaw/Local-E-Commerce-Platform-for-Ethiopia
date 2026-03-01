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

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/local-ecommerce
   JWT_SECRET=your_super_secret_jwt_key_change_this
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  phone: String (unique),
  password: String (hashed),
  role: ['buyer', 'admin'],
  createdAt: Date
}
```

### Vendor Model
```javascript
{
  user: ObjectId (ref: User),
  shopName: String,
  shopDescription: String,
  location: String,
  phone: String,
  telegramHandle: String,
  isApproved: Boolean,
  createdAt: Date
}
```

### Product Model
```javascript
{
  vendorId: ObjectId (ref: Vendor),
  title: String,
  description: String,
  price: Number,
  category: String,
  imageUrl: String,
  createdAt: Date
}
```

## 🎯 Core Features in Detail

### For Buyers
- Browse products in a clean, grid layout
- Filter by location (Merkato, Shiro Meda, Bole, etc.)
- Filter by category (Clothes, Spices, Handicrafts, Food)
- Search products by name
- View product details with vendor information
- Contact vendor directly via phone or Telegram
- Toggle between English and Amharic

### For Vendors
- Register with personal and shop information
- Wait for admin approval
- Add products with images and descriptions (Amharic supported)
- Manage listed products (edit/delete)
- View dashboard with all products
- Profile management

### For Admins
- View pending vendor registrations
- Approve or reject vendor applications
- View all registered vendors
- Moderate and remove inappropriate products
- Comprehensive dashboard with statistics

## 🌍 Local Context & Cultural Relevance

### Digital Inclusion
- Brings micro-businesses from traditional markets online
- No technical expertise required
- Phone-based authentication (accessible to all)

### Trust & Simplicity
- Direct contact mimics real-world transactions
- Buyers can negotiate via call/Telegram
- Builds trust through conversation (cultural norm)

### Accessibility
- Full Amharic language support
- Large, clear buttons for non-tech users
- Icon-based navigation
- Simple, step-by-step forms

## 🎨 UI/UX Design

### Color Scheme
- **Primary**: Green (#16a34a) - Trust, growth, prosperity
- **Secondary**: Yellow (#ca8a04) - Warmth, optimism
- **Background**: Light gray (#f9fafb) - Clean, professional
- **Text**: Dark gray (#111827) - Readability

### Design Principles
- **Simplicity**: Minimal clicks to complete actions
- **Clarity**: Large buttons, clear labels
- **Accessibility**: High contrast, readable fonts
- **Consistency**: Uniform design language
- **Feedback**: Clear success/error messages

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Admin-only endpoints
- Input validation
- XSS protection
- CORS configuration

## 📱 Mobile Responsiveness

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Feature phones (basic web support)

## 🚦 API Endpoints

### Authentication
- `POST /api/auth/register` - Register as buyer
- `POST /api/auth/register-vendor` - Register as vendor
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (vendor)
- `PUT /api/products/:id` - Update product (vendor)
- `DELETE /api/products/:id` - Delete product (vendor/admin)
- `GET /api/products/vendor` - Get vendor's products

### Vendors
- `GET /api/vendors` - Get all vendors (admin)
- `GET /api/vendors/pending` - Get pending vendors (admin)
- `PUT /api/vendors/:id/approve` - Approve vendor (admin)
- `GET /api/vendors/profile` - Get vendor profile
- `PUT /api/vendors/profile` - Update vendor profile

## 🧪 Testing

### Manual Testing Scenarios

1. **Vendor Registration Flow**
   - Register as a new vendor
   - Check pending status
   - Admin approval
   - Add products after approval

2. **Product Browsing**
   - View all products
   - Apply filters
   - Search products
   - Contact vendor

3. **Admin Functions**
   - Approve vendors
   - Remove products
   - View all vendors

## 🚀 Deployment

### Backend Deployment (Render/Heroku)
1. Push code to GitHub
2. Create new app on Render/Heroku
3. Connect repository
4. Add environment variables
5. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Build the project:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `build` folder to Vercel/Netlify
3. Update API URL in environment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

### Contribution Guidelines
- Follow existing code style
- Add comments for complex logic
- Update documentation
- Test thoroughly
- Use meaningful commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Ethiopian vendors and market communities
- Open source community
- Contributors and testers

## 📞 Support

For support, email: support@localmarket.com or join our Telegram group

---

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
