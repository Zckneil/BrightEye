#!/bin/bash

# Create Next.js project structure
mkdir -p src/app/auth \
         src/app/dashboard/patient \
         src/app/dashboard/doctor \
         src/app/dashboard/admin \
         src/app/scan \
         src/components/ui \
         src/components/auth \
         src/components/dashboard \
         src/components/scan \
         src/components/layout \
         src/components/landing \
         src/lib \
         src/hooks \
         src/styles \
         src/utils \
         src/types \
         src/services \
         src/middleware \
         prisma \
         public/images \
         public/icons \
         public/models

# Create package.json
cat > package.json << 'EOL'
{
  "name": "brighteye",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@prisma/client": "^5.7.0",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@react-three/drei": "^9.92.1",
    "@react-three/fiber": "^8.15.12",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "lucide-react": "^0.294.0",
    "next": "14.0.4",
    "next-auth": "^4.24.5",
    "react": "^18",
    "react-dom": "^18",
    "tailwind-merge": "^2.1.0",
    "tailwindcss-animate": "^1.0.7",
    "three": "^0.159.0",
    "zustand": "^4.4.7"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "@types/three": "^0.159.0",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.0.4",
    "postcss": "^8",
    "prisma": "^5.7.0",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}
EOL

# Create tsconfig.json
cat > tsconfig.json << 'EOL'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOL

# Create next.config.js
cat > next.config.js << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'brighteye.com'],
  },
}

module.exports = nextConfig
EOL

# Create tailwind.config.js
cat > tailwind.config.js << 'EOL'
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom BrightEye colors
        brighteye: {
          primary: "#0070f3",
          secondary: "#00c8ff",
          accent: "#7928ca",
          background: "#f8fafc",
          text: "#1a202c",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
EOL

# Create postcss.config.js
cat > postcss.config.js << 'EOL'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOL

# Create .env file
cat > .env << 'EOL'
# Environment variables
DATABASE_URL="postgresql://postgres:password@localhost:5432/brighteye"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
EOL

# Create prisma schema
cat > prisma/schema.prisma << 'EOL'
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  password      String?
  image         String?
  role          Role      @default(PATIENT)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  scans         Scan[]
  appointments  Appointment[]
  doctorAppointments Appointment[] @relation("DoctorAppointments")
}

model Scan {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  scanData    Json
  scanType    ScanType
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  prescription Prescription?
}

model Prescription {
  id          String   @id @default(cuid())
  scanId      String   @unique
  scan        Scan     @relation(fields: [scanId], references: [id], onDelete: Cascade)
  data        Json
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Appointment {
  id          String   @id @default(cuid())
  patientId   String
  patient     User     @relation(fields: [patientId], references: [id])
  doctorId    String
  doctor      User     @relation("DoctorAppointments", fields: [doctorId], references: [id])
  date        DateTime
  status      AppointmentStatus @default(SCHEDULED)
  notes       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Role {
  ADMIN
  DOCTOR
  PATIENT
}

enum ScanType {
  CORNEAL_TOPOGRAPHY
  RETINAL
  FULL_EYE
}

enum AppointmentStatus {
  SCHEDULED
  COMPLETED
  CANCELLED
}
EOL

# Create basic app structure
cat > src/app/layout.tsx << 'EOL'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BrightEye - Next-Generation Eye Scanner',
  description: 'AI-powered ophthalmic platform for real-time corneal topography, prescription analysis, and telemedicine integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
EOL

# Create globals.css
cat > src/app/globals.css << 'EOL'
@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
 
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
 
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
 
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
 
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
 
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
 
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
 
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
 
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
 
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
 
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
 
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
 
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
 
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
 
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
 
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}
 
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
EOL

# Create home page
cat > src/app/page.tsx << 'EOL'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-6xl font-bold text-center mb-8 bg-gradient-to-r from-brighteye-primary to-brighteye-accent bg-clip-text text-transparent">
          BrightEye
        </h1>
        <p className="text-2xl text-center mb-12">
          Next-Generation AI-Powered Eye Scanner
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/dashboard/patient" 
            className="px-6 py-3 bg-brighteye-primary text-white rounded-md hover:bg-opacity-90 transition"
          >
            Patient Dashboard
          </Link>
          <Link 
            href="/dashboard/doctor" 
            className="px-6 py-3 bg-brighteye-accent text-white rounded-md hover:bg-opacity-90 transition"
          >
            Doctor Dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}
EOL

# Create basic patient dashboard
cat > src/app/dashboard/patient/page.tsx << 'EOL'
export default function PatientDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>
      <p>Welcome to your BrightEye patient dashboard. This is where you'll access your scan history, prescriptions, and telemedicine appointments.</p>
    </div>
  )
}
EOL

# Create basic doctor dashboard
cat > src/app/dashboard/doctor/page.tsx << 'EOL'
export default function DoctorDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>
      <p>Welcome to your BrightEye doctor dashboard. This is where you'll manage patient scans, analyze results, and conduct telemedicine appointments.</p>
    </div>
  )
}
EOL

# Create basic admin dashboard
cat > src/app/dashboard/admin/page.tsx << 'EOL'
export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p>Welcome to the BrightEye admin dashboard. This is where you'll manage users, system settings, and monitor platform analytics.</p>
    </div>
  )
}
EOL

# Create basic corneal visualization component
mkdir -p src/components/scan
cat > src/components/scan/corneal-visualization.tsx << 'EOL'
"use client"

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useHelper } from '@react-three/drei'
import * as THREE from 'three'

interface CornealVisualizationProps {
  scanData?: any
  width?: string
  height?: string
}

function CornealModel({ scanData }: { scanData?: any }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.DirectionalLight>(null)
  
  // Optional: Uncomment to show light helper
  // useHelper(lightRef, THREE.DirectionalLightHelper, 1, 'red')
  
  useFrame(() => {
    if (meshRef.current) {
      // Add subtle animation if desired
      // meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        ref={lightRef}
        position={[5, 5, 5]} 
        intensity={1} 
        castShadow 
      />
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[2, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial 
          color="#00c8ff" 
          transparent 
          opacity={0.7} 
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      <gridHelper args={[10, 10, '#888888', '#444444']} />
    </>
  )
}

export default function CornealVisualization({ 
  scanData, 
  width = "100%", 
  height = "500px" 
}: CornealVisualizationProps) {
  return (
    <div style={{ width, height }}>
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <CornealModel scanData={scanData} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
    </div>
  )
}
EOL

# Create test file for corneal visualization
cat > src/components/scan/corneal-visualization.test.tsx << 'EOL'
/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import CornealVisualization from './corneal-visualization'

// Mock the Three.js components since they're not easily testable in Jest
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="three-canvas">{children}</div>,
  useFrame: () => jest.fn(),
}))

jest.mock('@react-three/drei', () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
  useHelper: () => null,
}))

jest.mock('three', () => ({
  DirectionalLight: class MockDirectionalLight {},
  DirectionalLightHelper: class MockDirectionalLightHelper {},
  Mesh: class MockMesh {},
}))

describe('CornealVisualization Component', () => {
  it('renders the component with default props', () => {
    render(<CornealVisualization />)
    expect(screen.getByTestId('three-canvas')).toBeInTheDocument()
  })

  it('applies custom width and height', () => {
    render(<CornealVisualization width="800px" height="600px" />)
    const container = screen.getByTestId('three-canvas').parentElement
    expect(container).toHaveStyle('width: 800px')
    expect(container).toHaveStyle('height: 600px')
  })

  it('renders orbit controls for user interaction', () => {
    render(<CornealVisualization />)
    expect(screen.getByTestId('orbit-controls')).toBeInTheDocument()
  })
})
EOL

# Create auth utilities
mkdir -p src/lib/auth
cat > src/lib/auth/auth-options.ts << 'EOL'
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { compare } from "bcrypt"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.role = token.role as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    }
  }
}
EOL

# Create types
mkdir -p src/types
cat > src/types/index.ts << 'EOL'
import { User, Role } from "@prisma/client"

export type ExtendedUser = User & {
  role: Role
}

export interface ScanData {
  id: string
  userId: string
  scanType: string
  createdAt: string
  cornealData?: CornealData
  retinalData?: RetinalData
}

export interface CornealData {
  topographyMap: number[][]
  curvature: number
  thickness: number
  irregularities?: {
    position: [number, number]
    severity: number
    type: string
  }[]
}

export interface RetinalData {
  image: string
  abnormalities?: {
    position: [number, number]
    type: string
    confidence: number
  }[]
}

export interface PrescriptionData {
  id: string
  scanId: string
  createdAt: string
  sphereRight: number
  sphereLeft: number
  cylinderRight: number
  cylinderLeft: number
  axisRight: number
  axisLeft: number
  addRight?: number
  addLeft?: number
  recommendations?: string[]
}

export interface AppointmentData {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  status: string
  notes?: string
}
EOL

# Create next-auth.d.ts
cat > src/types/next-auth.d.ts << 'EOL'
import NextAuth, { DefaultSession } from "next-auth"
import { Role } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: Role
    } & DefaultSession["user"]
  }

  interface User {
    role: Role
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: Role
  }
}
EOL

# Create middleware.ts for protected routes
cat > src/middleware.ts << 'EOL'
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { NextRequestWithAuth } from "next-auth/middleware"

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req })
  const isAuthenticated = !!token
  
  // Get the pathname from the URL
  const path = req.nextUrl.pathname

  // Define protected routes and their required roles
  const protectedPatientRoutes = path.startsWith('/dashboard/patient')
  const protectedDoctorRoutes = path.startsWith('/dashboard/doctor')
  const protectedAdminRoutes = path.startsWith('/dashboard/admin')

  // Redirect logic based on authentication and roles
  if (!isAuthenticated && (protectedPatientRoutes || protectedDoctorRoutes || protectedAdminRoutes)) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  if (isAuthenticated) {
    const userRole = token.role as string

    if (protectedDoctorRoutes && userRole !== 'DOCTOR' && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard/patient', req.url))
    }

    if (protectedAdminRoutes && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard/patient', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/scan/:path*',
  ],
}
EOL

echo "Next.js project structure created successfully!"

# Add all files
git add .

# Commit
git commit -m "Add Next.js project structure with TypeScript, TailwindCSS, and Three.js"

# Push
git push origin main

echo "Changes committed and pushed successfully!" 