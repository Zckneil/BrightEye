# EyeQ

EyeQ is an innovative application designed to enhance visual accessibility and provide smart vision assistance.

## Project Overview

EyeQ is a revolutionary, AI-powered ophthalmic platform designed to complement the EyeQ handheld eye scanner, enabling real-time corneal topography, AI-driven prescription analysis, and seamless telemedicine integration. The website serves as the primary interface for patients, clinicians, and administrators, providing an interactive, secure, and visually stunning user experience.

## Technology Stack

- **Frontend**: Next.js 14 with App Router, React, TypeScript
- **Styling**: TailwindCSS with custom glass morphism effects, ShadCN UI
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
│   ├── demo/              # Interactive demos
│   │   └── corneal-visualization/  # 3D corneal visualization demo
│   └── scan/               # Scan visualization pages
├── components/             # React components
│   ├── ui/                 # UI components
│   ├── auth/               # Authentication components
│   ├── dashboard/          # Dashboard components
│   ├── scan/               # Scan visualization components
│   │   └── CornealVisualization.tsx  # Interactive 3D cornea component
│   ├── Navigation.tsx      # Main navigation component
│   ├── Footer.tsx         # Footer component with quick links
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
- Modern, responsive landing page with glass morphism and neon effects
- Interactive 3D product showcases
- Smooth scroll navigation with section highlighting
- AI-powered vision tests
- Seamless navigation between patient and doctor portals

### Interactive Demos
- **3D Corneal Visualization** (/demo/corneal-visualization)
  - Real-time 3D rendering of corneal structure
  - Interactive controls (rotate, zoom, pan)
  - Adjustable parameters:
    - Corneal irregularity simulation
    - Thickness visualization
  - Custom shaders for realistic rendering:
    - Fresnel effects
    - Iridescent surface properties
    - Dynamic lighting
  - Professional tools:
    - Surface deformation simulation
    - Real-time parameter updates
    - Medical-grade visualization

### Patient Dashboard
- **Overview**
  - Quick access to recent scans and appointments
  - Latest prescription details
  - Eye health recommendations
  - Activity timeline
- **Scan Management**
  - Complete scan history with filtering
  - Interactive 3D corneal visualization
  - Downloadable scan reports
- **Prescription Tracking**
  - Detailed prescription history
  - Side-by-side comparison of changes
  - Digital prescription sharing
- **Appointment System**
  - Schedule new appointments
  - Video consultation interface
  - Appointment reminders and notifications

### Doctor Dashboard
- **Overview**
  - Key metrics (total patients, monthly scans, accuracy)
  - Recent patient activity
  - Upcoming appointments
  - Performance analytics
- **Patient Management**
  - Comprehensive patient directory
  - Advanced search and filtering
  - Patient history and progress tracking
  - Quick access to patient profiles
- **Appointment Handling**
  - Daily schedule view
  - Video consultation tools
  - Appointment notes and follow-ups
  - Flexible scheduling system
- **Analysis Tools**
  - Real-time corneal topography analysis
  - Prescription trend analysis
  - Treatment progress tracking
  - AI-assisted diagnosis support

### Admin Panel
- User role management
- System logs
- Security analytics
- Performance monitoring

## Security

- HIPAA-compliant data access
- Role-based access control (RBAC)
- AES-256 encryption
- Secure cloud storage on AWS S3
- Regular security audits
- Site-wide password protection

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- Python 3.8+ (for AI services)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Zckneil/EyeQ.git
   cd EyeQ
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

5. Access the application
   - Main application: http://localhost:3000
   - Corneal visualization demo: http://localhost:3000/demo/corneal-visualization

## Deployment on Vercel

### Setting Up Environment Variables

1. Create a Vercel account and link your repository
2. In the Vercel dashboard, navigate to your project
3. Go to the "Settings" tab and select "Environment Variables"
4. Add the following environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXTAUTH_URL`: Your production URL (e.g., https://your-app.vercel.app)
   - `NEXTAUTH_SECRET`: A secure random string for NextAuth
   - `SITE_PASSWORD`: The password to access the site (e.g., "MayoJax")

![Vercel Environment Variables](https://vercel.com/docs/storage/images/env-vars-dashboard.png)

5. Deploy your application
   ```bash
   vercel --prod
   ```

### Updating Environment Variables

To update environment variables:
1. Go to your project in the Vercel dashboard
2. Navigate to Settings > Environment Variables
3. Edit the existing variables or add new ones
4. Redeploy your application for changes to take effect

## Development Status

### Completed Features
- ✅ Landing page with modern UI and glass morphism effects
- ✅ Smooth scroll navigation with section highlighting
- ✅ Patient dashboard with interactive components
- ✅ Doctor dashboard with patient management
- ✅ Basic appointment scheduling system
- ✅ Interactive 3D corneal visualization demo
- ✅ Real-time parameter controls
- ✅ Custom shader implementation
- ✅ Responsive navigation with mobile support
- ✅ Site-wide password protection

### In Progress
- 🔄 Advanced corneal analysis tools
- 🔄 Video consultation system
- 🔄 AI-powered diagnosis support
- 🔄 Mobile app development
- 🔄 Mobile menu implementation

### Planned Features
- 📋 Advanced analytics dashboard
- 📋 Integration with external medical systems
- 📋 Patient mobile app
- 📋 Automated prescription generation
- 📋 Cross-sectional view in visualization
- 📋 Measurement tools integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 