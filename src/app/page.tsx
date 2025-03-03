import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Header/Navigation */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-brighteye-primary">BrightEye</h1>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-600 hover:text-brighteye-primary transition">Features</a>
          <a href="#technology" className="text-gray-600 hover:text-brighteye-primary transition">Technology</a>
          <a href="#about" className="text-gray-600 hover:text-brighteye-primary transition">About</a>
          <Link href="/auth/signin" className="text-gray-600 hover:text-brighteye-primary transition">
            Sign In
          </Link>
        </nav>
        <div className="md:hidden">
          {/* Mobile menu button */}
          <button className="text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="absolute inset-0 bg-[url('/images/eye-pattern.svg')] bg-center opacity-5 z-0"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-brighteye-primary to-brighteye-accent bg-clip-text text-transparent">
            Next-Generation<br />Eye Scanner
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Revolutionary AI-powered ophthalmic platform for real-time corneal topography, 
            prescription analysis, and telemedicine integration.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/dashboard/patient" 
              className="px-8 py-4 bg-brighteye-primary text-white rounded-md hover:bg-opacity-90 transition shadow-lg"
            >
              Patient Dashboard
            </Link>
            <Link 
              href="/dashboard/doctor" 
              className="px-8 py-4 bg-brighteye-accent text-white rounded-md hover:bg-opacity-90 transition shadow-lg"
            >
              Doctor Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Cutting-Edge Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-brighteye-primary bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brighteye-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Real-Time Corneal Topography</h3>
              <p className="text-gray-600">
                Advanced 3D visualization of corneal structure with precise measurements and interactive controls.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-brighteye-secondary bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brighteye-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">AI-Driven Prescription Analysis</h3>
              <p className="text-gray-600">
                Machine learning algorithms that analyze scan data to generate accurate prescription recommendations.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-brighteye-accent bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brighteye-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Telemedicine Integration</h3>
              <p className="text-gray-600">
                Seamless virtual consultations with eye care professionals, sharing scan data in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Powered by Advanced Technology
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">3D Corneal Visualization</h3>
              <p className="text-gray-600 mb-6">
                Our platform utilizes Three.js to create immersive, interactive 3D visualizations of corneal topography. 
                This allows for precise measurements, detailed analysis, and better understanding of eye health.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Interactive rotation and zoom controls</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Precise measurement tools</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Color-coded visualization of corneal thickness</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 text-center">3D Corneal Visualization Demo</p>
                {/* This will be replaced with the actual 3D visualization component */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brighteye-primary">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Ready to Experience the Future of Eye Care?
          </h2>
          <p className="text-xl text-white opacity-90 mb-12 max-w-3xl mx-auto">
            Join thousands of patients and doctors who are already benefiting from our advanced eye scanning technology.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/auth/signup" 
              className="px-8 py-4 bg-white text-brighteye-primary rounded-md hover:bg-gray-100 transition shadow-lg"
            >
              Create an Account
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-md hover:bg-white hover:bg-opacity-10 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">BrightEye</h3>
            <p className="text-gray-400">
              Next-generation AI-powered ophthalmic platform for advanced eye care.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
              <li><a href="#technology" className="text-gray-400 hover:text-white transition">Technology</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition">About</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Dashboards</h4>
            <ul className="space-y-2">
              <li><Link href="/dashboard/patient" className="text-gray-400 hover:text-white transition">Patient Dashboard</Link></li>
              <li><Link href="/dashboard/doctor" className="text-gray-400 hover:text-white transition">Doctor Dashboard</Link></li>
              <li><Link href="/dashboard/admin" className="text-gray-400 hover:text-white transition">Admin Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: info@brighteye.com</li>
              <li className="text-gray-400">Phone: +1 (555) 123-4567</li>
              <li className="text-gray-400">Address: 123 Vision St, Eye City</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} BrightEye. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
