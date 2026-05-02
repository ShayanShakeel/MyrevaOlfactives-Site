# Myreva Olfactives — E-Commerce Website

> Full-stack e-commerce platform for Myreva Olfactives, a luxury fragrance brand based in Karachi, Pakistan.

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React + Vite + Tailwind CSS + Zustand |
| Backend    | Node.js + Express                   |
| Database   | MongoDB Atlas                       |
| Auth       | JWT + bcrypt                        |
| Hosting    | Netlify (frontend) + Render (backend) |

## Design Patterns

| Pattern  | Where Applied                         |
|----------|---------------------------------------|
| Observer | Cart & Wishlist (Zustand stores)      |
| Strategy | Product sorting & filtering           |
| Facade   | Order placement (`OrderFacade`)       |

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm
- A MongoDB Atlas account (free tier)

---

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/myreva-olfactives.git
cd myreva-olfactives
```

---

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create your environment file:
```bash
cp .env.example .env
```

Fill in `.env`:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=any_long_random_string
CLIENT_URL=http://localhost:5173
```

Start the backend dev server:
```bash
npm run dev
```

Backend runs on → `http://localhost:5000`

---

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on → `http://localhost:5173`

The Vite proxy forwards all `/api` requests to `:5000` automatically.

---

## Project Structure

```
myreva-olfactives/
├── frontend/
│   ├── public/images/          ← Product images
│   └── src/
│       ├── components/
│       │   ├── layout/         ← Navbar, Footer
│       │   ├── cart/           ← CartDrawer
│       │   ├── wishlist/
│       │   ├── catalogue/
│       │   └── auth/
│       ├── pages/              ← All page components
│       ├── store/              ← Zustand stores (Observer Pattern)
│       ├── patterns/
│       │   ├── strategies/     ← Strategy Pattern
│       │   └── facade/         ← Facade Pattern
│       ├── data/products.js    ← Product catalogue
│       ├── config/             ← Payment config
│       └── utils/api.js        ← Axios instance
└── backend/
    └── src/
        ├── models/             ← User, Order (Mongoose)
        ├── routes/             ← auth.js, orders.js
        └── middleware/         ← JWT protection
```

---

## Team

| Member   | Module                        |
|----------|-------------------------------|
| Member 1 | Catalogue + Strategy Pattern  |
| Member 2 | Cart + Wishlist + Observer    |
| Member 3 | Checkout + Facade + Order API |
| Member 4 | Auth + Shell + Deployment     |
