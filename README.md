# ☕ Coffee Shop Mobile App — Pixel-Perfect Figma Implementation

A complete, responsive Coffee Shop Mobile App recreated with pixel-perfect precision based on the iconic Figma reference design. Built with React.js, Vite, React Router, Lucide React icons, and modern responsive CSS.

---

## 📱 Live Demo & Screen Overview

The app recreates all five core screens with meticulous attention to detail, spacing, typography, colors, animations, and real-time state management:

### 1. 🌟 Onboarding Screen (`/`)
- Full-screen dark coffee-themed hero background with high-resolution roasted coffee photography.
- Dark status bar with time (`9:41`), WiFi, Signal, and Battery indicators.
- Large, bold white headline: **“Fall in Love with Coffee in Blissful Delight!”**
- Supporting copy: *“Welcome to our cozy coffee corner, where every cup is a delightful joy for you.”*
- Terracotta orange-brown **“Get Started”** CTA button navigating directly into the Home screen.

### 2. 🏠 Home Screen (`/home`)
- Rich dark gradient header featuring location selector (`Bilzen, Tanjungbalai`).
- Integrated search bar with live filtering by coffee name or flavor notes.
- Filter icon button in signature terracotta accent (`#C67C4E`) with modal filter drawer.
- High-impact promotional coffee banner with red **“Promo”** tag and **“Buy one get one FREE”** typography.
- Horizontal category pill tabs: **All Coffee**, **Macchiato**, **Latte**, and **Americano** with active highlighting.
- 2-column mobile coffee card grid featuring coffee photo, rating badge (`⭐ 4.8`), title, subtitle, dynamic pricing (`$ 4.53`), favorite heart toggle, and instant add-to-cart (`+`) button.
- Bottom navigation with **Home**, **Favorites**, **Cart** (with real-time item counter badge), and **Notifications**.

### 3. ☕ Product Detail Screen (`/detail/:id`)
- Header with back navigation, centered **“Detail”** title, and interactive Favorite toggle.
- High-res product showcase image with rounded corners (`16px`).
- Coffee title, category, feature badges (Bike Delivery, Roasted Bean, Steamed Milk), and rating with review count (`⭐ 4.8 (230)`).
- Collapsible product description with an interactive **“Read More” / “Read Less”** toggle.
- Interactive Size selector (**S**, **M**, **L**) dynamically updating product price in real-time.
- Bottom action bar with dynamic price calculation and prominent **“Buy Now”** button linking straight into the checkout flow.

### 4. 📝 Order & Checkout Screen (`/order`)
- Header with back navigation and centered **“Order”** title.
- Segmented control toggle between **“Deliver”** and **“Pick Up”** (automatically toggles delivery fee and store/shipping address).
- Delivery address section with interactive **“Edit Address”** and **“Add Note”** modals.
- Cart item card showing coffee thumbnail, name, description, size, quantity increment/decrement controls, and calculated total.
- Promo coupon selector with pre-applied **“Buy 1 Get 1 FREE”** discount.
- Payment method selector supporting **Cash** and **Coffee Wallet** (with real-time balance validation).
- Price summary with Subtotal, Delivery Fee (discounted strikethrough), Discount voucher, and Total Payment.
- Interactive **“Order”** button with processing animation and order confirmation modal.

### 5. 🛵 Delivery Tracking Screen (`/delivery`)
- Map section occupying the upper viewport with crisp vector map styling (roads, green parks, water canal, coffee shop origin pin, home destination pin, and glowing route polyline).
- Animated live courier indicator moving along the delivery path.
- Top back button and GPS re-center button.
- Delivery bottom sheet with **“10 minutes left”** and address destination.
- 4-stage delivery progress indicator (Order Confirmed → Brewing → On The Way → Delivered).
- Delivery status summary card (**“Delivered your order”**).
- Courier profile card for **Johan Bleas** (Personal Courier), vehicle details, interactive Chat button, and functional in-app **Phone Call** simulator with call controls.

---

## 🎨 Design System & Tokens

| Token | Value | Description |
|---|---|---|
| **Primary Accent** | `#C67C4E` | Warm coffee terracotta orange/brown |
| **Primary Dark** | `#B46B3F` | Active & button hover states |
| **Primary Light** | `#FFF5EE` / `#F9F2ED` | Active size & badge tint |
| **Dark Charcoal** | `#111111` – `#313131` | Dark gradients and header backgrounds |
| **Body Canvas** | `#F9F9F9` | Clean off-white background |
| **Card Canvas** | `#FFFFFF` | Component card surfaces |
| **Text Primary** | `#2F2D2C` | Deep charcoal readable text |
| **Text Muted** | `#9B9B9B` | Subtitles, labels, and secondary details |
| **Star Gold** | `#FBBE21` | Product ratings |
| **Success** | `#36C073` | Delivery steps and free delivery badges |
| **Danger** | `#ED5151` | Promo tags and favorite indicators |
| **Typography** | `Sora`, `Plus Jakarta Sans`, sans-serif | Modern geometric sans-serif |
| **Viewport Reference** | `375px × 812px` | Standard iPhone mobile viewport |

---

## 🛠️ Technology Stack

- **Framework:** React 18
- **Tooling & Bundler:** Vite 6
- **Routing:** React Router v6 (`react-router-dom`)
- **Icons:** Lucide React (`lucide-react`)
- **State Management:** React Context API (`AppContext`) with `localStorage` persistence
- **Styling:** Custom CSS with responsive variables, Apple iPhone device mockup wrapper, and smooth animations

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (version 18 or newer recommended, tested on Node v22)
- npm or yarn

### 2. Installation
```bash
npm install
```

### 3. Development Server
```bash
npm run dev
```
The application will launch locally at `http://localhost:3000`.

### 4. Production Build
```bash
npm run build
```
Build output is generated in the `/dist` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deployment to Vercel

The application is pre-configured for instant zero-configuration deployment to [Vercel](https://vercel.com):

1. **Option A: Via Vercel CLI**
   ```bash
   npm i -g vercel
   vercel login
   vercel --prod
   ```

2. **Option B: Via GitHub & Vercel Dashboard**
   - Push this repository to GitHub or GitLab.
   - Import the repository in your Vercel Dashboard.
   - Framework Preset: **Vite**.
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Deploy!

A `vercel.json` file is already included with SPA rewrites (`"destination": "/index.html"`) to guarantee all direct routes work seamlessly on refresh.

---

## 📄 License
MIT License. Created with ❤️ for coffee enthusiasts.
