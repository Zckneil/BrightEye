"use client"

import { useState } from 'react'
import Link from 'next/link'

// Mock data for demonstration
const mockPatients = [
  { 
    id: 'pat-1',
    name: 'John Doe',
    lastVisit: '2023-11-15',
    nextAppointment: '2023-12-10T10:00:00',
    status: 'Active',
    recentScan: 'CORNEAL_TOPOGRAPHY',
    age: 45,
    email: 'john.doe@email.com'
  },
  { 
    id: 'pat-2',
    name: 'Jane Smith',
    lastVisit: '2023-11-10',
    nextAppointment: '2023-12-15T14:30:00',
    status: 'Active',
    recentScan: 'RETINAL',
    age: 32,
    email: 'jane.smith@email.com'
  },
  { 
    id: 'pat-3',
    name: 'Robert Johnson',
    lastVisit: '2023-11-05',
    nextAppointment: '2023-12-20T11:00:00',
    status: 'Follow-up Required',
    recentScan: 'FULL_EYE',
    age: 58,
    email: 'robert.j@email.com'
  }
]

const mockAppointments = [
  { 
    id: 'apt-1',
    patientName: 'John Doe',
    patientId: 'pat-1',
    date: '2023-12-10T10:00:00',
    type: 'Follow-up',
    status: 'Scheduled',
    notes: 'Review latest corneal topography'
  },
  { 
    id: 'apt-2',
    patientName: 'Jane Smith',
    patientId: 'pat-2',
    date: '2023-12-15T14:30:00',
    type: 'Regular Check-up',
    status: 'Scheduled',
    notes: 'Annual eye examination'
  },
  { 
    id: 'apt-3',
    patientName: 'Robert Johnson',
    patientId: 'pat-3',
    date: '2023-12-20T11:00:00',
    type: 'Consultation',
    status: 'Scheduled',
    notes: 'Discuss treatment options'
  }
]

const mockAnalytics = {
  totalPatients: 156,
  activePatients: 142,
  monthlyScans: 45,
  averageRating: 4.8,
  patientGrowth: '+12%',
  scanAccuracy: '98.5%',
  upcomingAppointments: 8,
  pendingReviews: 3
}

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-brighteye-primary">BrightEye</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-brighteye-accent flex items-center justify-center text-white font-semibold">
                D
              </div>
              <span className="text-gray-700">Dr. Sarah Johnson</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-brighteye-accent text-brighteye-accent'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('patients')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'patients'
                  ? 'border-brighteye-accent text-brighteye-accent'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Patients
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'appointments'
                  ? 'border-brighteye-accent text-brighteye-accent'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Appointments
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analysis'
                  ? 'border-brighteye-accent text-brighteye-accent'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analysis
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Total Patients</h3>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{mockAnalytics.totalPatients}</p>
                    <p className="ml-2 text-sm font-medium text-green-600">{mockAnalytics.patientGrowth}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Monthly Scans</h3>
                  <p className="text-2xl font-semibold text-gray-900">{mockAnalytics.monthlyScans}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Scan Accuracy</h3>
                  <p className="text-2xl font-semibold text-gray-900">{mockAnalytics.scanAccuracy}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Average Rating</h3>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{mockAnalytics.averageRating}</p>
                    <p className="ml-2 text-sm font-medium text-gray-500">/5.0</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Patients</h2>
                    <button
                      onClick={() => setActiveTab('patients')}
                      className="text-sm text-brighteye-accent hover:text-brighteye-secondary"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {mockPatients.slice(0, 3).map(patient => (
                      <div key={patient.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                            {patient.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                            <p className="text-xs text-gray-500">Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <Link
                          href={`/patient/${patient.id}`}
                          className="text-sm text-brighteye-accent hover:text-brighteye-secondary"
                        >
                          View Profile
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h2>
                    <button
                      onClick={() => setActiveTab('appointments')}
                      className="text-sm text-brighteye-accent hover:text-brighteye-secondary"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {mockAppointments.slice(0, 3).map(appointment => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{appointment.patientName}</p>
                          <p className="text-xs text-gray-500">{new Date(appointment.date).toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{appointment.type}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            {appointment.status}
                          </span>
                          <button className="text-sm text-brighteye-accent hover:text-brighteye-secondary">
                            Start Call
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Patients Tab */}
          {activeTab === 'patients' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">Patient Directory</h2>
                <div className="flex space-x-4 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <input
                      type="text"
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brighteye-accent focus:border-brighteye-accent"
                    />
                    <svg
                      className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <button className="px-4 py-2 bg-brighteye-accent text-white rounded-md hover:bg-opacity-90 transition">
                    Add Patient
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Visit
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Next Appointment
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recent Scan
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPatients.map((patient) => (
                      <tr key={patient.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              {patient.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                              <div className="text-sm text-gray-500">{patient.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            patient.status === 'Active' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {patient.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(patient.lastVisit).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(patient.nextAppointment).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {patient.recentScan.replace('_', ' ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link href={`/patient/${patient.id}`} className="text-brighteye-accent hover:text-brighteye-secondary mr-4">
                            View Profile
                          </Link>
                          <button className="text-gray-600 hover:text-gray-900">
                            Schedule
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Today's Schedule</h2>
                  <button className="px-4 py-2 bg-brighteye-accent text-white rounded-md hover:bg-opacity-90 transition">
                    New Appointment
                  </button>
                </div>
                <div className="space-y-4">
                  {mockAppointments.map((appointment) => (
                    <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                          <h3 className="text-lg font-medium text-gray-800">
                            {appointment.patientName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(appointment.date).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.type} - {appointment.notes}
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm inline-flex items-center justify-center">
                            {appointment.status}
                          </span>
                          <button className="px-3 py-1 bg-brighteye-accent text-white rounded-md hover:bg-opacity-90 transition text-sm">
                            Start Video Call
                          </button>
                          <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition text-sm">
                            View Patient File
                          </button>
                          <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition text-sm">
                            Reschedule
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Scan Analysis Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-brighteye-accent transition cursor-pointer">
                    <div className="w-12 h-12 bg-brighteye-accent bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brighteye-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Corneal Topography</h3>
                    <p className="text-sm text-gray-600">
                      Analyze detailed 3D maps of corneal surface and thickness.
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-brighteye-accent transition cursor-pointer">
                    <div className="w-12 h-12 bg-brighteye-accent bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brighteye-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Prescription Analysis</h3>
                    <p className="text-sm text-gray-600">
                      Review and compare prescription changes over time.
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-brighteye-accent transition cursor-pointer">
                    <div className="w-12 h-12 bg-brighteye-accent bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brighteye-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Treatment Tracking</h3>
                    <p className="text-sm text-gray-600">
                      Monitor patient progress and treatment effectiveness.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Analysis</h2>
                <div className="space-y-4">
                  {mockPatients.slice(0, 3).map(patient => (
                    <div key={patient.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-800">{patient.name}</h3>
                          <p className="text-sm text-gray-500">
                            {patient.recentScan.replace('_', ' ')} - {new Date(patient.lastVisit).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-brighteye-accent text-white rounded-md hover:bg-opacity-90 transition text-sm">
                            View Analysis
                          </button>
                          <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition text-sm">
                            Compare
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
