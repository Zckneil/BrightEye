'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (typeof window === 'undefined') return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = element.offsetTop - 100; // Adjust for header height
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full flex justify-between items-center relative">
      <Link href="/" className="text-2xl font-bold glow-text hover:opacity-80 transition-opacity relative">
        EyeQ
      </Link>
      <nav className="hidden md:flex items-center space-x-8 relative">
        <button 
          type="button"
          onClick={() => scrollToSection('features')} 
          className="relative text-gray-300 hover:text-white hover-glow transition cursor-pointer px-4 py-2 rounded-lg hover:bg-white/5"
        >
          Features
        </button>
        <button 
          type="button"
          onClick={() => scrollToSection('technology')} 
          className="relative text-gray-300 hover:text-white hover-glow transition cursor-pointer px-4 py-2 rounded-lg hover:bg-white/5"
        >
          Technology
        </button>
        <button 
          type="button"
          onClick={() => scrollToSection('about')} 
          className="relative text-gray-300 hover:text-white hover-glow transition cursor-pointer px-4 py-2 rounded-lg hover:bg-white/5"
        >
          About
        </button>
        <Link 
          href="/contact" 
          className="relative text-gray-300 hover:text-white hover-glow transition px-4 py-2 rounded-lg hover:bg-white/5"
        >
          Contact
        </Link>
      </nav>
      <div className="md:hidden relative">
        <button 
          type="button"
          className="relative text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
} 