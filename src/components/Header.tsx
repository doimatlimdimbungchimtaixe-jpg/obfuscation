'use client';

import { useState, useEffect } from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[rgb(var(--background))/90] backdrop-blur-md border-b border-[rgb(var(--border))]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--secondary))] flex items-center justify-center animate-pulse-glow">
                <span className="text-black font-bold text-lg">L</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[rgb(var(--accent))] rounded-full border-2 border-[rgb(var(--background))] animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gradient tracking-tight">Lâm Mod</h1>
              <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">Ultimate Lua Obfuscator</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#obfuscator" className="text-sm font-medium text-gray-300 hover:text-[rgb(var(--primary))] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[rgb(var(--primary))] after:transition-width hover:after:w-full">
              Obfuscator
            </a>
            <a href="#features" className="text-sm font-medium text-gray-300 hover:text-[rgb(var(--primary))] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[rgb(var(--primary))] after:transition-width hover:after:w-full">
              Features
            </a>
            <a href="https://tiktok.com/@awdyeue" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-300 hover:text-[rgb(var(--accent))] transition-colors flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.401.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
              @awdyeue
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="https://tiktok.com/@awdyeue" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
              <span>Follow @awdyeue</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}