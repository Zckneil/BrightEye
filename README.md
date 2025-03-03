# BrightEye

BrightEye is an innovative application designed to enhance visual accessibility and provide smart vision assistance.

## Project Overview

BrightEye is a revolutionary, AI-powered ophthalmic platform designed to complement the BrightEye handheld eye scanner, enabling real-time corneal topography, AI-driven prescription analysis, and seamless telemedicine integration. The website serves as the primary interface for patients, clinicians, and administrators, providing an interactive, secure, and visually stunning user experience.

## Technology Stack

- **Frontend**: Next.js 14 with App Router, React, TypeScript
- **Styling**: TailwindCSS, ShadCN UI
- **3D Visualization**: Three.js, React Three Fiber
- **State Management**: Zustand
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **API**: Next.js API Routes + Python FastAPI for AI services
- **Deployment**: AWS

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── auth/               # Authentication pages
│   ├── dashboard/          # Dashboard pages
│   │   ├── patient/        # Patient dashboard
│   │   ├── doctor/         # Doctor dashboard
│   │   └── admin/          # Admin dashboard
│   └── scan/               # Scan visualization pages
├── components/             # React components
│   ├── ui/                 # UI components
│   ├── auth/               # Authentication components
│   ├── dashboard/          # Dashboard components
│   ├── scan/               # Scan visualization components
│   ├── layout/             # Layout components
│   └── landing/            # Landing page components
├── lib/                    # Utility libraries
├── hooks/                  # Custom React hooks
├── styles/                 # Global styles
├── utils/                  # Utility functions
├── types/                  # TypeScript type definitions
├── services/               # Service integrations
└── middleware/             # Next.js middleware
```

## Features

### Public-Facing Pages
- Landing page with futuristic, clinical UI
- Interactive 3D product showcases
- AI-powered vision tests

### Patient Dashboard
- Personal scan history
- AI-generated prescriptions
- Telemedicine appointments
- Interactive 3D corneal visualization

### Doctor Dashboard
- Real-time scan analysis tools
- Patient management
- Telehealth capabilities

### Admin Panel
- User role management
- System logs
- Security analytics

## Security

- HIPAA-compliant data access
- Role-based access control (RBAC)
- AES-256 encryption
- Secure cloud storage on AWS S3

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- Python 3.8+ (for AI services)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Zckneil/BrightEye.git
   cd BrightEye
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

## Usage

- Coming soon

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 