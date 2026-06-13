# 🎪 Giggles Kids Play Area — Full-Stack Website

Premium indoor playground website for Bengaluru, India.

---

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
# Fill in your MongoDB URI, Razorpay keys, and email credentials in .env
npm install
node seed.js          # Seeds admin user + sample data
npm start             # Runs on http://localhost:5000
```

### 2. Frontend Setup

```bash
cd frontend
# Edit .env.local — add your Razorpay Key ID and Google Maps API Key
npm install
npm run dev           # Runs on http://localhost:3000
```

---

## 🔑 Admin Portal

URL: `http://localhost:3000/admin`  
Email: `admin@giggleskids.com`  
Password: `Admin@123`  
*(Change after first login)*

---

## 📁 Project Structure

```
giggles/
├── frontend/               # Next.js 16 + React 19 + Tailwind v4
│   ├── app/
│   │   ├── page.tsx        # Main website (all sections)
│   │   ├── layout.tsx      # SEO metadata + Schema.org
│   │   └── admin/          # Admin dashboard
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── FloatingButtons.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── WhyUsSection.tsx
│   │       ├── PlayZonesSection.tsx
│   │       ├── BirthdaySection.tsx
│   │       ├── MembershipSection.tsx
│   │       ├── GallerySection.tsx
│   │       ├── TestimonialsSection.tsx
│   │       ├── FAQSection.tsx
│   │       └── BookingContactSection.tsx
│   └── lib/utils.ts        # Constants & helpers
│
└── backend/                # Node.js + Express + MongoDB
    ├── server.js
    ├── seed.js
    ├── models/
    │   ├── User.js
    │   ├── Booking.js
    │   ├── Membership.js
    │   ├── Gallery.js
    │   └── Testimonial.js
    └── routes/
        ├── auth.js
        ├── bookings.js
        ├── memberships.js
        ├── gallery.js
        ├── testimonials.js
        ├── payments.js
        ├── contact.js
        └── admin.js
```

---

## 🌐 Website Sections

| # | Section | Features |
|---|---------|----------|
| 1 | Hero | Full-screen, floating animations, 4.9★ badge, 3 CTAs |
| 2 | Why Us | 6 trust cards — Safety, Hygiene, CCTV, AC, Staff |
| 3 | Play Zones | 8 zone cards with hover animations |
| 4 | Birthday | Silver/Gold/Platinum packages with Razorpay |
| 5 | Membership | Monthly/Quarterly/Yearly with Razorpay |
| 6 | Gallery | Masonry + lightbox + category filter |
| 7 | Testimonials | Animated Google review cards |
| 8 | FAQ | Accordion with 8 questions |
| 9 | Booking | Full booking form + Razorpay payment |
| 10 | Contact | Contact form + WhatsApp + Google Maps |
| 11 | Footer | Links, policies, social media |

---

## 💳 Razorpay Integration

1. Sign up at [razorpay.com](https://razorpay.com)
2. Get Key ID & Key Secret from Dashboard → Settings → API Keys
3. Add to:
   - `backend/.env` → `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`
   - `frontend/.env.local` → `NEXT_PUBLIC_RAZORPAY_KEY_ID`

---

## 🗄️ MongoDB Atlas Setup

1. Create cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Get connection string
3. Add to `backend/.env` → `MONGODB_URI`

---

## 📱 Features

- ✅ Razorpay payment for bookings, memberships, birthday packages
- ✅ WhatsApp floating button
- ✅ Google Maps embed
- ✅ Admin dashboard (bookings, gallery, memberships, analytics)
- ✅ JWT authentication for admin
- ✅ Mobile-first responsive design
- ✅ Framer Motion animations throughout
- ✅ SEO optimized with Schema.org markup
- ✅ Contact form with email notifications
- ✅ Photo gallery with lightbox
- ✅ FAQ accordion
- ✅ Sticky mobile CTA bar
