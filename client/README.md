# QR Menu Web App 🍽️

A full-stack QR Menu web application built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Node.js**, and **Express**. This solution is designed to help restaurant owners and small businesses create, manage, and share their digital menu using QR codes with multilingual support, beautiful UI, and real-time customization.

---

## 🌐 Features

### ✅ Client-Side (Next.js)

- Built with **Next.js App Router** and **Server Actions**
- Responsive UI using **Tailwind CSS**
- Multi-step form for creating business menus
- Upload business logo and banner
- Search for businesses using **Google Maps Places API**
- Real-time preview of business menu
- Dynamic QR code generation for each business
- Redux for state management
- Auto-fill address from selected location
- Dark/light theme readiness
- Optimized images using `next/image`

### 🔒 Server-Side (Node.js + Express)

- User authentication with JWT
- Create, read, update, and delete businesses
- Secure file uploads for banners and logos
- MongoDB or PostgreSQL integration for storing business data
- QR code image generation via external library
- REST API with full CRUD support
- Hosted on `localhost:5050` (in development)

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or yarn
- MongoDB/PostgreSQL instance (cloud/local)
- Google Maps Places API Key

---

### 🔧 Project Structure

qr-menu/
├── app/ # Next.js App Router directory
│ ├── page.js # Landing page
│ ├── dashboard/ # Business dashboard
│ ├── getStarted/ # Onboarding and setup flow
│ ├── UserProfile/ # Business profile view
│ └── utils/ # Constants and API helper
├── components/ # Reusable UI components (Button, Navbar, etc.)
├── public/ # Static assets like logo, favicon
├── server/ # Express server handling API routes
│ ├── routes/ # API endpoints (auth, business, upload)
│ └── controllers/ # Controller logic for APIs
├── styles/ # Tailwind CSS and global styles
├── README.md
├── next.config.js # Next.js config with image domain settings
├── .env.local # Environment variables
└── package.json

---

### 🧠 Key Technologies

- **Frontend**: Next.js, Tailwind CSS, Redux, Next Image
- **Backend**: Node.js, Express, JWT, Multer (for uploads), QRCode package
- **Database**: MongoDB or PostgreSQL
- **API**: Google Places API for business lookup
- **QR Generator**: Node QR Code generator
- **Deployment Ready**: Easily deployable on Vercel (frontend) and Render/Heroku (backend)

---

### 🛠️ Local Development

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/qr-menu.git
cd qr-menu
```

2. Install dependencies

# For frontend

cd client
npm install

# For backend

cd ../server
npm install

3. Configure environment
   Create .env.local and .env files in client/ and server/ folders respectively:

Client: .env.local
NEXT_PUBLIC_BASE_URI=http://localhost:5050
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key

Server: .env
PORT=5050
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret

4. Start development

# Start frontend

cd client
npm run dev

# Start backend

cd ../server
npm run dev

📄 License
MIT License © [Raybit technologies]
