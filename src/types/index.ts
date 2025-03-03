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
