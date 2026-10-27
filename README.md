# Oddo AI — Enterprise E-Commerce Automation Platform

> **Full-Stack Monorepo Architecture** cleanly decoupled into **`frontend/`** (Next.js 16 + Tailwind CSS) and **`backend/`** (Node.js + Express + TypeScript API Server).

---

## 📁 Project Architecture & Directory Structure

```plaintext
AI Automotion/
├── frontend/                     # 🌐 Frontend Client Application (Next.js 16)
│   ├── public/                   # Static media, logos (oddo-logo.png), audio assets
│   ├── src/
│   │   ├── app/                  # App Router Pages & Layouts
│   │   │   ├── admin/            # Super Admin HQ & Command Center
│   │   │   ├── dashboard/        # Merchant Client Portal & Live Omni-Inbox
│   │   │   ├── affiliate/        # Agency White-Label & Partner Portal
│   │   │   ├── track/            # Multi-Courier Real-Time Tracking
│   │   │   ├── login/ & signup/  # Authentication views
│   │   │   ├── layout.tsx        # Root HTML shell & Fonts
│   │   │   └── page.tsx          # Public Landing Page & Lead Marketplace
│   │   ├── components/           # Reusable Modular UI Components
│   │   │   ├── Navbar.tsx        # Responsive Navigation Bar
│   │   │   ├── HeroSection.tsx   # High-converting Hero & Live Demo
│   │   │   ├── LeadGenSection.tsx# Bangladeshi Merchant Lead Pack Store
│   │   │   ├── PricingSection.tsx# Transparent BDT Subscription Pricing
│   │   │   └── ...
│   │   └── lib/                  # Client sound effects, utilities
│   ├── next.config.ts            # Proxy rewrites forwarding /api/* to Backend (Port 5000)
│   ├── package.json              # Frontend dependencies (React 19, Lucide, Tailwind)
│   └── tsconfig.json
│
├── backend/                      # ⚙️ Dedicated Backend API Server (Node.js + Express)
│   ├── src/
│   │   ├── config/               # System configurations, ports & fixed catalogs
│   │   │   └── constants.ts
│   │   ├── controllers/          # Request & Response Controllers
│   │   │   ├── ai.controller.ts        # Conversational NLP & Discount Engine
│   │   │   ├── courier.controller.ts   # Steadfast & Pathao Consignment Dispatch
│   │   │   ├── payment.controller.ts   # bKash PGW Dynamic Invoice Generator
│   │   │   ├── webhook.controller.ts   # Meta Graph WhatsApp & Messenger Webhooks
│   │   │   └── leads.controller.ts     # Marketplace Lead Order Fulfillment
│   │   ├── routes/               # Modular Express API Route Definitions
│   │   │   ├── ai.routes.ts            # POST /api/ai/chat
│   │   │   ├── courier.routes.ts       # POST /api/courier/steadfast, /pathao, /fraud-check
│   │   │   ├── payment.routes.ts       # POST /api/payment/bkash-create
│   │   │   ├── webhook.routes.ts       # GET/POST /api/webhooks/meta
│   │   │   ├── leads.routes.ts         # GET/PATCH /api/leads/orders
│   │   │   └── index.ts                # Aggregated /api router
│   │   ├── services/             # Core Business Logic & External API Integrations
│   │   │   ├── gemini.service.ts       # Bengali Banglish NLP, anti-injection guardrails
│   │   │   ├── courier.service.ts      # Steadfast & Pathao logistics dispatcher
│   │   │   ├── fraud.service.ts        # Cross-store collective fake order blacklist
│   │   │   └── bkash.service.ts        # bKash tokenized payment session generator
│   │   ├── middlewares/          # Global error handling & logging
│   │   │   └── errorHandler.ts
│   │   ├── types/                # TypeScript data schemas & payload interfaces
│   │   │   └── index.ts
│   │   └── server.ts             # Express Server Bootstrap (Port 5000)
│   ├── .env                      # API keys, Secrets & Environment variables
│   ├── package.json              # Backend dependencies (Express, CORS, TypeScript, tsx)
│   └── tsconfig.json
│
├── package.json                  # Root Monorepo Orchestrator (Concurrent runner)
└── README.md
```

---

## ⚡ Quick Start & Development

You can run both **Frontend** and **Backend** simultaneously with a single command from the root directory:

```bash
# 1. Run both Frontend (Port 3000) & Backend (Port 5000) concurrently:
npm run dev

# Or run them individually:
npm run dev:frontend   # Starts Next.js client on http://localhost:3000
npm run dev:backend    # Starts Express API server on http://localhost:5000
```

---

## 🔌 API Endpoints (Backend - Port 5000)

| Endpoint | Method | Description |
|---|---|---|
| `/health` | `GET` | Health check probe (uptime, status) |
| `/api/ai/chat` | `POST` | Bengali & Banglish conversational sales NLP + discount coupon logic |
| `/api/courier/steadfast` | `POST` | 1-Click Steadfast consignment generation |
| `/api/courier/pathao` | `POST` | 1-Click Pathao courier booking |
| `/api/courier/fraud-check`| `GET/POST` | Cross-store Bangladeshi phone fraud & RTO risk lookup |
| `/api/payment/bkash-create`| `POST` | Dynamic bKash payment invoice & QR code session |
| `/api/webhooks/meta` | `GET/POST` | Meta Graph Cloud Webhook verification & ingress |
| `/api/leads/orders` | `GET` | Super Admin lead purchase orders queue |

---

## 🛡️ Production Build

```bash
# Build both frontend and backend for production:
npm run build

# Or build individually:
npm run build:frontend
npm run build:backend
```
