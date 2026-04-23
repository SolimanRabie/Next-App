# E-Commerce App - Setup Guide

## ✅ Project Status

Your Next.js e-commerce application is fully configured and ready to use! Here's what has been completed:

### Core Features Implemented ✅

- **Modern UI** with gradient backgrounds, emojis, and responsive Bootstrap styling
- **MongoDB Integration** with Mongoose ORM
- **Full CRUD Operations** for Products, Cart, and News
- **ISR (Incremental Static Regeneration)** - Products page caches for 60 seconds
- **SSR (Server-Side Rendering)** - News page fetches fresh data on each request
- **Shopping Cart System** with automatic price calculation and persistent storage
- **Authentication** with NextAuth.js (OAuth ready)
- **Database Seeding** - 20 diverse products pre-populated

### Running the Application

```bash
# Terminal 1: Start MongoDB (if not already running)
mongod

# Terminal 2: Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

## 🔐 OAuth Setup (Optional but Recommended)

To enable social authentication (GitHub, Google, Facebook), follow these steps:

### 1. GitHub OAuth Setup

1. Go to [GitHub Settings - Developer Settings - OAuth Apps](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - **Application name:** Your App Name
   - **Homepage URL:** `http://localhost:3000`
   - **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
4. Copy the **Client ID** and generate a **Client Secret**
5. Add to `.env.local`:
   ```
   GITHUB_ID=your_client_id
   GITHUB_SECRET=your_client_secret
   ```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable the Google+ API
4. Create OAuth 2.0 credentials (OAuth consent screen):
   - User type: External
   - Add scopes: profile, email
5. Create OAuth 2.0 Client ID (Web application):
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
6. Copy **Client ID** and **Client Secret**
7. Add to `.env.local`:
   ```
   GOOGLE_ID=your_client_id
   GOOGLE_SECRET=your_client_secret
   ```

### 3. Facebook OAuth Setup

1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create a new app → Choose "Consumer" type
3. Set up Facebook Login product
4. In Settings → Basic, copy **App ID** and **App Secret**
5. Add Valid OAuth Redirect URIs:
   - `http://localhost:3000/api/auth/callback/facebook`
6. Add to `.env.local`:
   ```
   FACEBOOK_ID=your_app_id
   FACEBOOK_SECRET=your_app_secret
   ```

### 4. Update AUTH_SECRET

Generate a secure secret (or use the current placeholder for development):

```bash
# Generate a random secret
openssl rand -base64 33
```

Then update in `.env.local`:

```
AUTH_SECRET=your-generated-secret
```

## 📱 Using the App

### Navigate to Key Pages

- **Home:** [http://localhost:3000](http://localhost:3000)
- **Products:** [http://localhost:3000/products](http://localhost:3000/products)
- **Shopping Cart:** [http://localhost:3000/cart](http://localhost:3000/cart) (requires login)
- **Add Product:** [http://localhost:3000/products/addform](http://localhost:3000/products/addform)
- **News:** [http://localhost:3000/news](http://localhost:3000/news)
- **Sign In:** [http://localhost:3000/auth/signin](http://localhost:3000/auth/signin)

### Cart Features

- ✅ Add products to cart (requires sign-in)
- ✅ Update quantities
- ✅ Remove items
- ✅ View order summary with tax calculation
- ✅ Persistent storage per user

### Product Management

- ✅ View all products or filter by category
- ✅ Search products by name
- ✅ View product details
- ✅ Add new products
- ✅ Delete products
- ✅ Add to cart directly from listing

## 🛠️ Database

### MongoDB Connection

- **Host:** localhost
- **Port:** 27017
- **Database:** nextapp
- **Connection String:** mongodb://localhost:27017/nextapp

### Collections

- **Product** - Store all products
- **Cart** - Store user shopping carts
- **News** - Store news articles

### Re-seed Database

```bash
npm run seed
```

## 📦 Project Structure

```
src/
├── pages/
│   ├── api/
│   │   ├── products.js          # Product CRUD
│   │   ├── products/[id].js     # Single product
│   │   ├── cart/[userId].js     # Cart operations
│   │   ├── news.js              # News listing
│   │   └── auth/[...nextauth].js # OAuth handler
│   ├── auth/signin.jsx          # Sign-in page
│   ├── products/index.jsx       # Products listing (ISR)
│   ├── products/[id].jsx        # Product detail (ISR)
│   ├── products/addform.jsx     # Add product form
│   ├── cart/index.jsx           # Shopping cart page
│   ├── news/index.jsx           # News page (SSR)
│   ├── _app.jsx                 # App root with SessionProvider
│   ├── index.jsx                # Home page
│   └── components/
│       ├── NavBar.jsx           # Navigation with auth UI
│       ├── Footer.jsx           # Footer
│       ├── productsComponent.jsx # Product listing component
│       ├── contactUsComponent.jsx
│       ├── Toast.jsx            # Toast notifications
│       └── ErrorComponent.jsx
├── styles/
│   ├── globals.css
│   └── Home.module.css
└── models/
    ├── Product.js
    ├── Cart.js
    └── News.js

models/
├── Product.js
├── Cart.js
└── News.js

lib/
└── mongodb.js                   # MongoDB connection

auth.ts                           # NextAuth configuration
.env.local                        # Environment variables
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

```bash
# Check if MongoDB is running
netstat -ano | findstr :27017

# Start MongoDB
mongod
```

### Next.js Development Server Issues

```bash
# Clear .next cache and rebuild
rm -r .next
npm run dev
```

### OAuth Not Working

- Ensure all credentials are correctly added to `.env.local`
- Verify redirect URLs match exactly
- Check AUTH_SECRET is set
- Test with the correct callback URLs

### Port Already in Use

```bash
# Kill process on port 3000
taskkill /PID <pid> /F

# Or use a different port
npm run dev -- -p 3001
```

## 🚀 Production Deployment

### Environment Variables for Production

```
AUTH_SECRET=your-production-secret
MONGODB_URI=your-production-mongodb-uri
NEXTAUTH_URL=https://yourdomain.com
```

### Build for Production

```bash
npm run build
npm start
```

## 📝 API Endpoints Reference

### Products

- `GET /api/products` - Get all products (with optional ?category=xyz)
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Cart

- `GET /api/cart/[userId]` - Get user's cart
- `POST /api/cart/[userId]` - Add item to cart
- `PUT /api/cart/[userId]` - Update item quantity
- `DELETE /api/cart/[userId]` - Remove item from cart

### News

- `GET /api/news` - Get all news (SSR)
- `POST /api/news` - Create news article

### Authentication

- `GET /api/auth/signin` - Sign-in page
- `POST/GET /api/auth/callback/github` - GitHub callback
- `POST/GET /api/auth/callback/google` - Google callback
- `POST/GET /api/auth/callback/facebook` - Facebook callback

## 🎨 Customization

### Update Colors & Branding

- Edit `src/styles/globals.css` for global styles
- Update `next.config.ts` for image remote patterns
- Modify components in `src/pages/components/`

### Add More Categories

Update the category filter in `src/pages/components/productsComponent.jsx`

### Adjust ISR Cache Time

In `src/pages/products/index.jsx`, change `revalidate: 60` to desired seconds

## 📞 Support

For issues or questions:

1. Check the troubleshooting section above
2. Review `.env.local` configuration
3. Check browser console for error messages
4. Verify MongoDB is running

---

**Happy Shopping! 🛍️**
