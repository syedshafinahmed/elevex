<div align="center">

  <img src="https://raw.githubusercontent.com/syedshafinahmed/elevex/main/public/logo.png" alt="Elevex Logo" width="180"/>

  # Elevex

  **Direct-to-Producer Global Trade Exchange — Zero Broker Spreads**

  🔗 [Live Demo](https://elevex-ssa.vercel.app/)

  [![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
  [![Neon](https://img.shields.io/badge/Neon-Serverless-00E5BF?style=flat-square&logo=neon)](https://neon.tech/)
  [![Prisma](https://img.shields.io/badge/Prisma-6.19.3-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
  [![Auth.js](https://img.shields.io/badge/Auth.js-v5_beta-CC4A00?style=flat-square&logo=auth0)](https://authjs.dev/)
  [![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe)](https://stripe.com/)
  [![Motion](https://img.shields.io/badge/Motion-v13-FF0055?style=flat-square&logo=framer)](https://motion.dev/)
  [![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com/)

</div>


---


## 📖 Overview

**Elevex** is a modern B2B cross-border trade exchange platform built to connect verified commodity producers across South and Southeast Asia directly with international enterprise buyers — with zero broker intermediaries.

By combining an intuitive digital marketplace with institutional escrow-grade payment security, transparent compliance workflows, and immutable origin documentation, Elevex dismantles the antiquated multi-tiered broker syndicates that have long squeezed producer margins. Sellers list verified bulk commodities; buyers discover and procure with guaranteed settlement security.

---

## ✨ Features

### 🛒 Marketplace
- Browse a curated catalog of verified bulk commodities across 6 trade verticals
- Filter and search products by category, origin, and specifications
- Detailed product pages with origin documentation and pricing

### 📦 Order & Trade Management
- Place and manage bulk import orders end-to-end
- Real-time order status tracking and history
- Export management for seller-side workflows

### 🔐 Authentication
- Secure sign-up and login with credentials
- Google OAuth integration via Auth.js v5
- Protected routes for buyers, sellers, and admins

### 💳 Payments
- Checkout and payment processing via Stripe
- Secure card payment with live confirmation
- Transaction history and payment method management

### 👤 User Dashboard
- Role-based access for buyers, sellers, and admins
- Import and export workflow management
- Profile and account management

### 👨‍💼 Admin Panel
- Full user management (view, block/unblock)
- Product and order administration
- Platform operations overview

### 🌐 Company & About
- Interactive origin story carousel showcasing trade corridors
- Detailed company mission, vision, and charter principles
- Team and leadership profiles

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16.2.9 (App Router, Server Actions, React Compiler) |
| **Language** | TypeScript 5 |
| **UI Library** | React 19.2.4 |
| **Styling** | TailwindCSS 4, Vanilla CSS |
| **Animation** | Motion (Framer Motion v13) |
| **Database** | PostgreSQL via Neon (Serverless) |
| **ORM** | Prisma 6.19.3 |
| **Authentication** | Auth.js v5 beta, @auth/prisma-adapter |
| **Payments** | Stripe, @stripe/stripe-js |
| **Icons** | Lucide React, React Icons |
| **Utilities** | clsx, tailwind-merge, bcryptjs |
| **Notifications** | gooey-toast |
| **3D / Globe** | Cobe |
| **Theming** | next-themes |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- PostgreSQL database (Neon recommended for serverless)
- Google Cloud OAuth credentials
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/syedshafinahmed/elevex.git
   cd elevex
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory:
   ```env
   # Neon PostgreSQL Connection String
   DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

   # Auth.js Secret
   AUTH_SECRET=your_auth_secret

   # Google OAuth Credentials
   AUTH_GOOGLE_ID=your_google_client_id
   AUTH_GOOGLE_SECRET=your_google_client_secret

   # Base URLs
   NEXTAUTH_URL=http://localhost:3000
   AUTH_URL=http://localhost:3000/api/auth

   # Stripe
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   ```

4. **Apply database migrations**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to `http://localhost:3000`

---

## 📁 Project Structure

```
elevex/
├── prisma/
│   └── schema.prisma          # Database schema (User, Product, Order, etc.)
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── about/             # About & Origin Story page
│   │   ├── actions/           # Next.js Server Actions
│   │   ├── api/               # API Route Handlers
│   │   │   ├── auth/          # Auth.js [...nextauth] handler
│   │   │   ├── cart/          # Cart API
│   │   │   ├── checkout/      # Checkout API
│   │   │   ├── imports/       # Import orders API
│   │   │   ├── payment-methods/
│   │   │   ├── products/      # Products API
│   │   │   └── transactions/  # Transactions API
│   │   ├── checkout/          # Checkout page
│   │   ├── components/
│   │   │   ├── auth/          # Auth modals & forms
│   │   │   ├── common/        # Shared page sections
│   │   │   ├── dashboard/     # Dashboard components
│   │   │   ├── home/          # Home page sections
│   │   │   ├── layout/        # Navbar, Footer
│   │   │   ├── motion/        # Animation components
│   │   │   ├── products/      # Product cards & listing
│   │   │   ├── skeletons/     # Loading skeletons
│   │   │   └── ui/            # Core UI primitives (Button, Badge, etc.)
│   │   ├── contact/           # Contact page
│   │   ├── dashboard/         # Dashboard (buyer/seller/admin)
│   │   ├── my-exports/        # Seller export management
│   │   ├── my-imports/        # Buyer import management
│   │   ├── privacy/           # Privacy policy
│   │   ├── products/          # Products marketplace
│   │   ├── services/          # Services page
│   │   ├── terms/             # Terms of service
│   │   ├── globals.css        # Global styles & design tokens
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── context/               # React Context (ProductContext, etc.)
│   ├── lib/
│   │   ├── auth.ts            # Auth.js configuration
│   │   ├── fonts.ts           # Font definitions
│   │   └── prisma.ts          # Prisma client singleton
│   └── types/                 # TypeScript type definitions
├── .env                       # Environment variables (not committed)
├── next.config.ts             # Next.js configuration
├── postcss.config.mjs         # PostCSS / TailwindCSS config
└── package.json
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open Prisma database GUI |
| `npx prisma db push` | Sync schema to database |

---

## 🌐 Routes

### Public Routes
| Path | Description |
|------|-------------|
| `/` | Homepage with hero, marketplace preview, and trade stats |
| `/about` | Company story, mission, and origin story carousel |
| `/products` | Full commodity marketplace |
| `/products/[id]` | Individual product detail page |
| `/services` | Platform services overview |
| `/contact` | Contact form |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

### Protected Routes
| Path | Description |
|------|-------------|
| `/dashboard` | User dashboard overview |
| `/my-imports` | Buyer import order management |
| `/my-exports` | Seller export listing management |
| `/checkout` | Order checkout & Stripe payment |

---

## 🎨 Design System

The application features:
- 🌑 Dark-first design with **Amethyst** primary accent color
- 🔤 Custom typography: **Pink Average**, **Sansation**, **Trunkey**
- ✨ Glassmorphism cards with inset shadows and radial ambient glows
- 📱 Fully responsive layout across all breakpoints
- 🎭 Micro-animations powered by Motion (Framer Motion v13)
- 🌏 Interactive 3D globe (Cobe) on the homepage
- 🎠 Cinematic auto-advancing image carousel on the About page

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---



## 🙏 Acknowledgments

- Regional commodity producers and exporters across South Asia
- Open source community for exceptional tooling and libraries
- Vercel and Neon for seamless serverless deployment infrastructure

---

<div align="center">
  <p>Built with precision for transparent global trade</p>
  <p><strong>Elevex — Authentic producers. Direct buyers. Zero intermediaries.</strong></p>
</div>
