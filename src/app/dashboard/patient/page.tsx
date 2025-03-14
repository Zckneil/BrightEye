"use client"

import { useState } from 'react'
import Link from 'next/link'

// Mock data for demonstration
const mockScans = [
  { id: 'scan-1', date: '2023-11-15', type: 'CORNEAL_TOPOGRAPHY', status: 'Completed' },
  { id: 'scan-2', date: '2023-10-22', type: 'RETINAL', status: 'Completed' },
  { id: 'scan-3', date: '2023-09-05', type: 'FULL_EYE', status: 'Completed' },
]

const mockAppointments = [
  { id: 'apt-1', date: '2023-12-10T10:00:00', doctor: 'Dr. Sarah Johnson', status: 'Scheduled' },
  { id: 'apt-2', date: '2024-01-15T14:30:00', doctor: 'Dr. Michael Chen', status: 'Scheduled' },
]

const mockPrescriptions = [
  { 
    id: 'pres-1', 
    date: '2023-11-15', 
    scanId: 'scan-1',
    details: {
      sphereRight: -1.25,
      sphereLeft: -1.50,
      cylinderRight: -0.50,
      cylinderLeft: -0.75,
      axisRight: 180,
      axisLeft: 175,
    }
  },
  { 
    id: 'pres-2', 
    date: '2023-09-05', 
    scanId: 'scan-3',
    details: {
      sphereRight: -1.50,
      sphereLeft: -1.75,
      cylinderRight: -0.50,
      cylinderLeft: -0.75,
      axisRight: 180,
      axisLeft: 175,
    }
  },
]

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-EyeQ-primary">EyeQ</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-EyeQ-primary flex items-center justify-center text-white font-semibold">
                J
              </div>
              <span className="text-gray-700">John Doe</span>
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
                  ? 'border-EyeQ-primary text-EyeQ-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('scans')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'scans'
                  ? 'border-EyeQ-primary text-EyeQ-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Scans
            </button>
            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'prescriptions'
                  ? 'border-EyeQ-primary text-EyeQ-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Prescriptions
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'appointments'
                  ? 'border-EyeQ-primary text-EyeQ-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Appointments
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Scans</h3>
                    <button
                      onClick={() => setActiveTab('scans')}
                      className="text-sm text-EyeQ-primary hover:text-EyeQ-secondary"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {mockScans.slice(0, 2).map(scan => (
                      <div key={scan.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{scan.type.replace('_', ' ')}</p>
                          <p className="text-xs text-gray-500">{new Date(scan.date).toLocaleDateString()}</p>
                        </div>
                        <Link
                          href={`/scan/${scan.id}`}
                          className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-200 transition"
                        >
                          View
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
                    <button
                      onClick={() => setActiveTab('appointments')}
                      className="text-sm text-EyeQ-primary hover:text-EyeQ-secondary"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {mockAppointments.map(apt => (
                      <div key={apt.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{apt.doctor}</p>
                          <p className="text-xs text-gray-500">{new Date(apt.date).toLocaleString()}</p>
                        </div>
                        <span className="text-xs bg-green-100 px-3 py-1 rounded-full text-green-800">
                          {apt.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Latest Prescription</h3>
                    <button
                      onClick={() => setActiveTab('prescriptions')}
                      className="text-sm text-EyeQ-primary hover:text-EyeQ-secondary"
                    >
                      View All
                    </button>
                  </div>
                  {mockPrescriptions.length > 0 && (
                    <div>
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-800">Prescription from {new Date(mockPrescriptions[0].date).toLocaleDateString()}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Right Eye</p>
                          <p className="text-sm">Sphere: {mockPrescriptions[0].details.sphereRight}</p>
                          <p className="text-sm">Cylinder: {mockPrescriptions[0].details.cylinderRight}</p>
                          <p className="text-sm">Axis: {mockPrescriptions[0].details.axisRight}°</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Left Eye</p>
                          <p className="text-sm">Sphere: {mockPrescriptions[0].details.sphereLeft}</p>
                          <p className="text-sm">Cylinder: {mockPrescriptions[0].details.cylinderLeft}</p>
                          <p className="text-sm">Axis: {mockPrescriptions[0].details.axisLeft}°</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Eye Health Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-3">Recent Activity</h4>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-4 w-4 rounded-full bg-green-500 mt-1"></div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">Completed eye scan</p>
                          <p className="text-xs text-gray-500">Nov 15, 2023</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-4 w-4 rounded-full bg-blue-500 mt-1"></div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">Received new prescription</p>
                          <p className="text-xs text-gray-500">Nov 15, 2023</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-4 w-4 rounded-full bg-purple-500 mt-1"></div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">Scheduled appointment with Dr. Sarah Johnson</p>
                          <p className="text-xs text-gray-500">Nov 10, 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-3">Recommendations</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-600">Schedule your annual comprehensive eye exam</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-600">Update your prescription glasses based on your latest scan</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-600">Take regular breaks when using digital screens (20-20-20 rule)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Scans Tab */}
          {activeTab === 'scans' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">My Scans</h2>
                <button className="px-4 py-2 bg-EyeQ-primary text-white rounded-md hover:bg-opacity-90 transition">
                  Upload New Scan
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockScans.map((scan) => (
                      <tr key={scan.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(scan.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {scan.type.replace('_', ' ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {scan.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link href={`/scan/${scan.id}`} className="text-EyeQ-primary hover:text-EyeQ-secondary mr-4">
                            View
                          </Link>
                          <button className="text-gray-600 hover:text-gray-900">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Prescriptions Tab */}
          {activeTab === 'prescriptions' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">My Prescriptions</h2>
              <div className="space-y-6">
                {mockPrescriptions.map((prescription) => (
                  <div key={prescription.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Prescription from {new Date(prescription.date).toLocaleDateString()}
                      </h3>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition text-sm">
                          Download
                        </button>
                        <button className="px-3 py-1 bg-EyeQ-primary text-white rounded-md hover:bg-opacity-90 transition text-sm">
                          Share
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="text-md font-medium text-gray-900 mb-3">Right Eye</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-900 mb-1">Sphere</p>
                            <p className="text-sm font-medium text-gray-900">{prescription.details.sphereRight}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-900 mb-1">Cylinder</p>
                            <p className="text-sm font-medium text-gray-900">{prescription.details.cylinderRight}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-900 mb-1">Axis</p>
                            <p className="text-sm font-medium text-gray-900">{prescription.details.axisRight}°</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="text-md font-medium text-gray-900 mb-3">Left Eye</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-900 mb-1">Sphere</p>
                            <p className="text-sm font-medium text-gray-900">{prescription.details.sphereLeft}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-900 mb-1">Cylinder</p>
                            <p className="text-sm font-medium text-gray-900">{prescription.details.cylinderLeft}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-900 mb-1">Axis</p>
                            <p className="text-sm font-medium text-gray-900">{prescription.details.axisLeft}°</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-900">
                        Based on scan from {new Date(prescription.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">My Appointments</h2>
                <button className="px-4 py-2 bg-EyeQ-primary text-white rounded-md hover:bg-opacity-90 transition">
                  Schedule New Appointment
                </button>
              </div>
              <div className="space-y-6">
                {mockAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-lg font-medium text-gray-800">
                        {appointment.doctor}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(appointment.date).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm inline-flex items-center justify-center">
                        {appointment.status}
                      </span>
                      <button className="px-3 py-1 bg-EyeQ-primary text-white rounded-md hover:bg-opacity-90 transition text-sm">
                        Join Video Call
                      </button>
                      <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition text-sm">
                        Reschedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
