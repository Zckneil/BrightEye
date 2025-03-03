'use client';

import Link from 'next/link';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black/40 backdrop-blur-xl text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <button onClick={scrollToTop} className="text-xl font-bold mb-4 glow-text hover:opacity-80 transition-opacity">
            BrightEye
          </button>
          <p className="text-gray-400">
            Next-generation AI-powered ophthalmic platform for advanced eye care.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={scrollToTop} className="text-gray-400 hover:text-white transition cursor-pointer">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('features')} className="text-gray-400 hover:text-white transition cursor-pointer">
                Features
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('technology')} className="text-gray-400 hover:text-white transition cursor-pointer">
                Technology
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition cursor-pointer">
                About
              </button>
            </li>
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
  );
} 