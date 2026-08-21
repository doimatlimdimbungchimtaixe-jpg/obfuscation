'use client';

import { useState, useEffect } from 'react';

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      <BackgroundOrbs />
      
      <div className="section-container relative z-10 py-12 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <span className="w-2 h-2 rounded-full bg-[rgb(var(--accent-primary))] animate-pulse" />
              <span className="text-xs font-medium font-mono text-[rgb(var(--accent-primary))] uppercase tracking-wider">
                Ultimate Lua Protection
              </span>
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-6">
              <span className="block text-gradient">Lua</span>
              <span className="block text-[rgb(var(--fg-primary))]">Obfuscator</span>
            </h1>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
            <p className="text-lg sm:text-xl md:text-2xl text-[rgb(var(--fg-secondary))] max-w-3xl mx-auto leading-relaxed font-medium">
              Military-grade obfuscation with <span className="text-gradient">AES-256 encryption</span>, 
              <span className="text-gradient-cyan">control flow flattening</span>, and 
              <span className="text-[rgb(var(--accent-tertiary))]">polymorphic layers</span> that cannot be reversed.
            </p>
          </div>

          <div className="animate-slide-up flex flex-col sm:flex-row items-center justify-center gap-4 mt-10" style={{ animationDelay: '500ms' }}>
            <a href="#obfuscator" className="btn-primary px-10 py-4 text-base">
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Start Obfuscating
              </span>
            </a>
            <a href="https://tiktok.com/@awdyeue" target="_blank" rel="noopener noreferrer" className="btn-secondary px-8 py-4 text-base">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.401.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
              <span>Follow @awdyeue</span>
            </a>
          </div>

          <div className="animate-fade-in flex flex-wrap items-center justify-center gap-8 mt-12 opacity-60" style={{ animationDelay: '600ms' }}>
            <div className="flex items-center gap-3 glass px-4 py-2 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] flex items-center justify-center">
                <svg className="w-4 h-4 text-[rgb(var(--bg-deep))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-sm font-mono text-[rgb(var(--fg-secondary))]">Unbreakable</span>
            </div>
            <div className="flex items-center gap-3 glass px-4 py-2 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[rgb(var(--accent-secondary))] to-[rgb(var(--accent-tertiary))] flex items-center justify-center">
                <svg className="w-4 h-4 text-[rgb(var(--bg-deep))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-sm font-mono text-[rgb(var(--fg-secondary))]">Zero Overhead</span>
            </div>
            <div className="flex items-center gap-3 glass px-4 py-2 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[rgb(var(--accent-tertiary))] to-[rgb(var(--accent-cyan))] flex items-center justify-center">
                <svg className="w-4 h-4 text-[rgb(var(--bg-deep))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-sm font-mono text-[rgb(var(--fg-secondary))]">Runtime Safe</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce animate-fade-in" style={{ animationDelay: '1000ms' }}>
          <div className="w-6 h-10 border border-[rgb(var(--accent-primary))/40] rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--accent-primary))] animate-bounce" style={{ animationDuration: '1.5s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function BackgroundOrbs() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[300px] bg-gradient-to-b from-[rgb(var(--accent-primary))/8] via-transparent to-transparent animate-float-slow" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full blur-[300px] bg-gradient-to-bl from-[rgb(var(--accent-secondary))/6] via-transparent to-transparent animate-float" style={{ animationDelay: '-3s' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[300px] bg-gradient-to-tr from-[rgb(var(--accent-tertiary))/5] via-transparent to-transparent animate-float-slow" style={{ animationDelay: '-6s' }} />
    </div>
  );
}