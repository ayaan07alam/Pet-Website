# Rumzee's Exotics 🐾

A premium, full-stack exotic pet destination platform built with Spring Boot, Next.js, Prisma, and Supabase. The project features an ultra-premium dynamic UI, fluid animations, and a comprehensive backend architecture for managing live pet stock, categories, and settings.

## 🌟 Key Features

### 🖥️ Frontend (Next.js 14)
- **Premium Identity**: Rich aesthetic featuring animal textures, elegant typography (Playfair Display & DM Sans), and immersive scroll animations.
- **Dynamic Homepage**: Features an animated stats strip, dynamic categories, species facts, and a featured exotic pets carousel.
- **Shop & Filtering**: Real-time product filtering by species, gender, and price range with a responsive layout. Includes "Live Stock" indicators and a sleek list/grid view toggle.
- **Mobile First**: Fully responsive layouts across all sections with optimized touch interactions and scalable sidebars/grids.
- **Admin Dashboard**: Full CRUD interface for managing pets, categories, users, and site configurations protected by JWT Authentication.

### ⚙️ Backend (Spring Boot & Prisma)
- **Robust API**: RESTful architecture built with Java Spring Boot, handling authentication and core business logic.
- **PostgreSQL Database**: Connected via Prisma ORM for type-safe database access and streamlined migrations. 
- **Supabase Integration**: Direct connection pooler integration via Supabase, including secure file uploads to Supabase Storage.
- **JWT Auth**: Secure user authentication and authorization using JSON Web Tokens.

## 🛠️ Tech Stack

**Frontend:**
- Next.js (React)
- TypeScript
- CSS Modules & Inline Styling
- Framer Motion (Animations)
- Lucide React (Icons)
- Zustand (Global State)

**Backend / Database:**
- Java 17 & Spring Boot
- Prisma ORM
- PostgreSQL (Supabase)

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- Java 17 (JDK)
- PostgreSQL Database (or Supabase project)

### Local Setup

**1. Clone the repository**
```bash
git clone https://github.com/ayaan07alam/Pet-Website.git
cd Pet-Website
```

**2. Frontend Setup**
```bash
cd frontend
npm install

# Create a .env file and add your Supabase Pooler strings:
# DATABASE_URL="..."
# DIRECT_URL="..."

# Generate the Prisma Client
npx prisma generate

# Start the dev server
npm run dev
```

**3. Backend Setup**
```bash
cd backend
# Build the Spring Boot application
mvn clean install
# Run the application
mvn spring-boot:run
```

## 📸 Screenshots

*A fully immersive, responsive environment tailored to exotic pet lovers built completely from the ground up.*
