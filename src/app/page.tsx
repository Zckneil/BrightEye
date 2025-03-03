import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Header/Navigation */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 glass-panel sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold glow-text">BrightEye</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white hover-glow transition">Features</a>
            <a href="#technology" className="text-gray-300 hover:text-white hover-glow transition">Technology</a>
            <a href="#about" className="text-gray-300 hover:text-white hover-glow transition">About</a>
            <Link href="/auth/signin" className="text-gray-300 hover:text-white hover-glow transition">
              Sign In
            </Link>
          </nav>
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="absolute inset-0 bg-[url('/images/eye-pattern.svg')] bg-center opacity-5 z-0"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 glow-text">
            Next-Generation<br />Eye Scanner
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Revolutionary AI-powered ophthalmic platform for real-time corneal topography, 
            prescription analysis, and telemedicine integration.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/dashboard/patient" 
              className="neon-border px-8 py-4 bg-primary/20 text-white hover-glow backdrop-blur-sm"
            >
              Patient Dashboard
            </Link>
            <Link 
              href="/dashboard/doctor" 
              className="neon-border px-8 py-4 bg-accent/20 text-white hover-glow backdrop-blur-sm"
            >
              Doctor Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 glow-text">
            Cutting-Edge Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="tech-card p-8 hover-glow">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Real-Time Corneal Topography</h3>
                <p className="text-gray-300">
                  Advanced 3D visualization of corneal structure with precise measurements and interactive controls.
                </p>
              </div>
            </div>
            <div className="tech-card p-8 hover-glow">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">AI-Driven Prescription Analysis</h3>
                <p className="text-gray-300">
                  Machine learning algorithms that analyze scan data to generate accurate prescription recommendations.
                </p>
              </div>
            </div>
            <div className="tech-card p-8 hover-glow">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Telemedicine Integration</h3>
                <p className="text-gray-300">
                  Seamless virtual consultations with eye care professionals, sharing scan data in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-panel p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 glow-text">
              Experience the Future
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Interactive 3D Visualization
                </h3>
                <p className="text-gray-300">
                  Experience our cutting-edge corneal visualization technology with real-time parameter controls and professional analysis tools.
                </p>
                <div className="mt-8">
                  <Link 
                    href="/demo/corneal-visualization" 
                    className="neon-border inline-flex items-center px-6 py-3 text-white hover-glow bg-primary/20 backdrop-blur-sm"
                  >
                    Try Interactive Demo
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="tech-card aspect-video relative overflow-hidden">
                <Link href="/demo/corneal-visualization" className="block relative group h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-300 group-hover:text-white transition">
                        Launch Interactive Demo
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto tech-card p-12">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center glow-text">
              Ready to Experience the Future of Eye Care?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto text-center">
              Join thousands of patients and doctors who are already benefiting from our advanced eye scanning technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/auth/signup" 
                className="neon-border px-8 py-4 bg-primary/20 text-white hover-glow backdrop-blur-sm text-center"
              >
                Create an Account
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-4 border-2 border-white/20 text-white hover:bg-white/5 transition rounded-xl text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-xl text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 glow-text">BrightEye</h3>
            <p className="text-gray-400">
              Next-generation AI-powered ophthalmic platform for advanced eye care.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
              <li><a href="#technology" className="text-gray-400 hover:text-white transition">Technology</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition">About</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Dashboards</h4>
            <ul className="space-y-2">
              <li><Link href="/dashboard/patient" className="text-gray-400 hover:text-white transition">Patient Dashboard</Link></li>
              <li><Link href="/dashboard/doctor" className="text-gray-400 hover:text-white transition">Doctor Dashboard</Link></li>
              <li><Link href="/dashboard/admin" className="text-gray-400 hover:text-white transition">Admin Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: info@brighteye.com</li>
              <li className="text-gray-400">Phone: +1 (555) 123-4567</li>
              <li className="text-gray-400">Address: 123 Vision St, Eye City</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} BrightEye. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
