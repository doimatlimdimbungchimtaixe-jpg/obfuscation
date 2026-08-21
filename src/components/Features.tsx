'use client';

export function Features() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'AES-256 String Encryption',
      desc: 'Every string literal encrypted with unique keys and IVs. Impossible to extract without runtime execution.',
      gradient: 'from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))]',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Control Flow Flattening',
      desc: 'Code split into basic blocks with a dispatcher jump table. Original logic flow completely destroyed.',
      gradient: 'from-[rgb(var(--accent-secondary))] to-[rgb(var(--accent-tertiary))]',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Variable Renaming',
      desc: 'All local variables renamed to meaningless identifiers. Zero semantic information preserved.',
      gradient: 'from-[rgb(var(--accent-tertiary))] to-[rgb(var(--accent-cyan))]',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Anti-Debug & Anti-Tamper',
      desc: 'Runtime integrity checks, timing attacks detection, and debugger detection with process termination.',
      gradient: 'from-[rgb(var(--accent-cyan))] to-[rgb(var(--accent-primary))]',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: 'Self-Modifying Code',
      desc: 'Code that rewrites itself at runtime. Each execution produces different byte patterns.',
      gradient: 'from-[rgb(var(--accent-primary))] via-[rgb(var(--accent-secondary))] to-[rgb(var(--accent-tertiary))]',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      title: 'Polymorphic Layers',
      desc: 'Multiple obfuscation passes (1-5 layers). Each layer adds exponential complexity for attackers.',
      gradient: 'from-[rgb(var(--accent-secondary))] via-[rgb(var(--accent-tertiary))] to-[rgb(var(--accent-cyan))]',
    },
  ];

  return (
    <section id="features" className="relative py-20 md:py-28">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[rgb(var(--accent-primary))] animate-pulse" />
            <span className="text-xs font-medium font-mono text-[rgb(var(--accent-primary))] uppercase tracking-wider">
              Protection Features
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Why <span className="text-gradient">Lâm Mod</span> Obfuscator?
          </h2>
          <p className="text-lg text-[rgb(var(--fg-secondary))] leading-relaxed">
            Every layer is designed to defeat static analysis, dynamic analysis, and automated deobfuscation tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div 
              key={feature.title}
              className="glass-card p-6 glass-card-hover relative overflow-hidden group animate-slide-up"
              style={{ animationDelay: `${200 + i * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: feature.gradient }} />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" style={{ background: feature.gradient }}>
                  <span className="text-[rgb(var(--bg-deep))]">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-[rgb(var(--fg-primary))]">{feature.title}</h3>
                <p className="text-sm text-[rgb(var(--fg-muted))] leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}