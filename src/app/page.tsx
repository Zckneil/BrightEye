import Link from 'next/link'
import Image from 'next/image'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Header/Navigation */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 glass-panel sticky top-0 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <Navigation />
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-[90vh] px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_2px,#ffffff03_2px),linear-gradient(to_bottom,transparent_2px,#ffffff03_2px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_2px,#ffffff02_2px),linear-gradient(to_bottom,transparent_2px,#ffffff02_2px)] bg-[size:80px_80px] rotate-45 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
        </div>
        <div className="absolute w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8 relative">
            <h1 className="text-6xl md:text-8xl font-bold glow-text bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-accent">
              Next-Generation<br />Eye Scanner
        </h1>
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-accent/50"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Revolutionary AI-powered ophthalmic platform for real-time corneal topography, 
            prescription analysis, and telemedicine integration.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link 
            href="/dashboard/patient" 
              className="group relative px-8 py-4 bg-primary/20 text-white hover:bg-primary/30 transition-all duration-300 backdrop-blur-sm rounded-xl overflow-hidden"
          >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/20 to-primary/0 animate-shimmer"></span>
              <span className="relative flex items-center justify-center gap-2">
            Patient Dashboard
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
          </Link>
          <Link 
            href="/dashboard/doctor" 
              className="group relative px-8 py-4 bg-accent/20 text-white hover:bg-accent/30 transition-all duration-300 backdrop-blur-sm rounded-xl overflow-hidden"
          >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent/20 to-accent/0 animate-shimmer"></span>
              <span className="relative flex items-center justify-center gap-2">
            Doctor Dashboard
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
          </Link>
        </div>
      </div>
        
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold glow-text bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent inline-block">
              Cutting-Edge Features
            </h2>
            <div className="mt-4 w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group hover:scale-105 transition-all duration-300">
              <div className="tech-card p-8 h-full bg-gradient-to-br from-background to-primary/10 backdrop-blur-lg border border-primary/20 rounded-2xl">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-primary transition-colors">Real-Time Corneal Topography</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    Advanced 3D visualization of corneal structure with precise measurements and interactive controls.
                  </p>
                  <div className="mt-6 flex items-center text-primary/70 group-hover:text-primary transition-colors">
                    <span className="text-sm font-medium">Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="group hover:scale-105 transition-all duration-300">
              <div className="tech-card p-8 h-full bg-gradient-to-br from-background to-accent/10 backdrop-blur-lg border border-accent/20 rounded-2xl">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-accent transition-colors">AI-Driven Prescription Analysis</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    Machine learning algorithms that analyze scan data to generate accurate prescription recommendations.
                  </p>
                  <div className="mt-6 flex items-center text-accent/70 group-hover:text-accent transition-colors">
                    <span className="text-sm font-medium">Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="group hover:scale-105 transition-all duration-300">
              <div className="tech-card p-8 h-full bg-gradient-to-br from-background to-primary/10 backdrop-blur-lg border border-primary/20 rounded-2xl">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-primary transition-colors">Telemedicine Integration</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    Seamless virtual consultations with eye care professionals, sharing scan data in real-time.
                  </p>
                  <div className="mt-6 flex items-center text-primary/70 group-hover:text-primary transition-colors">
                    <span className="text-sm font-medium">Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
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

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-panel p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 glow-text">
              About EyeQ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-300">
                  At EyeQ, we're revolutionizing eye care through cutting-edge technology and AI-driven solutions. Our mission is to make advanced eye care accessible, accurate, and efficient for both patients and healthcare providers.
                </p>
                <p className="text-gray-300">
                  Through our innovative platform, we're bridging the gap between traditional eye care and modern technology, enabling better diagnosis, treatment, and patient care.
                </p>
              </div>
              <div className="tech-card p-8">
                <div className="relative z-10 space-y-4">
                  <h3 className="text-xl font-semibold text-white">Key Benefits</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Advanced AI-powered diagnostics
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Real-time analysis and visualization
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Seamless integration with existing systems
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Enhanced patient care and experience
                    </li>
                  </ul>
                </div>
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

      <Footer />
    </div>
  )
}
