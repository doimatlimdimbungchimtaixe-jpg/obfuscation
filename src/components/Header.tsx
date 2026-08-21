'use client';

import { useState, useEffect } from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-[rgb(var(--bg-deep))/95] backdrop-blur-2xl border-b border-[rgb(var(--border-subtle))/50] shadow-[0_4px_40px_rgb(0,0,0,0.3)]' 
        : 'bg-transparent'
    }`}>
      <div className="section-container">
        <div className="flex items-center justify-between h-18 sm:h-20">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[rgb(var(--accent-primary))] via-[rgb(var(--accent-secondary))] to-[rgb(var(--accent-tertiary))] flex items-center justify-center animate-pulse-glow shadow-[0_0_30px_rgb(var(--accent-primary),0.4)]">
                <span className="text-[rgb(var(--bg-deep))] font-black text-lg sm:text-xl tracking-tight">L</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[rgb(var(--accent-tertiary))] rounded-full border-2 border-[rgb(var(--bg-deep))] animate-ping" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-tertiary))] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-gradient tracking-tight">Lâm Mod</h1>
              <p className="text-xs sm:text-sm text-[rgb(var(--fg-muted))] font-mono uppercase tracking-widest mt-0.5">Ultimate Lua Obfuscator</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <a href="#obfuscator" className="btn-ghost px-4 py-2.5 text-sm">Obfuscator</a>
            <a href="#features" className="btn-ghost px-4 py-2.5 text-sm">Features</a>
            <a href="#docs" className="btn-ghost px-4 py-2.5 text-sm">Docs</a>
          </nav>

          <div className="flex items-center gap-3">
            <a 
              href="https://tiktok.com/@awdyeue" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary hidden sm:flex items-center gap-2 px-5 py-2.5"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.401.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
              <span className="font-medium">@awdyeue</span>
            </a>
            
            <button
              className="md:hidden p-2 rounded-lg glass-card hover:bg-[rgb(var(--accent-primary))/10] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-[rgb(var(--fg-primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-[rgb(var(--border-subtle))/30] animate-slide-up">
            <div className="flex flex-col gap-2">
              <a href="#obfuscator" className="btn-ghost px-4 py-3 text-left" onClick={() => setMenuOpen(false)}>Obfuscator</a>
              <a href="#features" className="btn-ghost px-4 py-3 text-left" onClick={() => setMenuOpen(false)}>Features</a>
              <a href="#docs" className="btn-ghost px-4 py-3 text-left" onClick={() => setMenuOpen(false)}>Docs</a>
              <a href="https://tiktok.com/@awdyeue" target="_blank" rel="noopener noreferrer" className="btn-secondary w-full justify-center mt-2" onClick={() => setMenuOpen(false)}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.401.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                <span>Follow @awdyeue</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}