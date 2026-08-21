'use client';

import { useState, useEffect, useRef } from 'react';

export function ObfuscatorPanel() {
  const [code, setCode] = useState('');
  const [obfuscated, setObfuscated] = useState<string | null>(null);
  const [options, setOptions] = useState({
    stringEncryption: true,
    controlFlow: true,
    variableRenaming: true,
    deadCode: true,
    antiDebug: true,
    selfModifying: true,
    layers: 3
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState({
    originalSize: 0,
    obfuscatedSize: 0,
    ratio: 0
  });
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('input');
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleObfuscate = async () => {
    if (!code.trim()) return;

    setIsProcessing(true);
    setObfuscated(null);
    setProgress(0);
    progressRef.current = 0;

    const progressInterval = setInterval(() => {
      progressRef.current = Math.min(progressRef.current + Math.random() * 15, 90);
      setProgress(progressRef.current);
    }, 100);

    try {
      const response = await fetch('/api/obfuscate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, options })
      });

      clearInterval(progressInterval);
      setProgress(100);

      const data = await response.json();
      
      if (response.ok) {
        setObfuscated(data.obfuscated);
        setStats({
          originalSize: code.length,
          obfuscatedSize: data.obfuscated.length,
          ratio: data.ratio
        });
        setActiveTab('output');
      } else {
        alert(data.error || 'Obfuscation failed');
      }
    } catch (error) {
      clearInterval(progressInterval);
      console.error('Error:', error);
      alert('Network error occurred');
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
      }, 500);
    }
  };

  const handleCopy = async () => {
    if (!obfuscated) return;
    
    try {
      await navigator.clipboard.writeText(obfuscated);
    } catch {
      alert('Failed to copy');
    }
  };

  const handleDownload = () => {
    if (!obfuscated) return;
    
    const blob = new Blob([obfuscated], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `obfuscated-${Date.now()}.lua`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const OptionIcon = ({ iconPath }: { iconPath: string }) => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
    </svg>
  );

  const optionsList = [
    { key: 'stringEncryption', label: 'String Encryption', desc: 'AES-256-CBC encryption for all string literals', iconPath: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { key: 'controlFlow', label: 'Control Flow', desc: 'Split code into blocks with jump table dispatcher', iconPath: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { key: 'variableRenaming', label: 'Variable Renaming', desc: 'Obfuscate local variable names to meaningless identifiers', iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { key: 'deadCode', label: 'Dead Code Injection', desc: 'Insert harmless dead code to confuse deobfuscators', iconPath: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { key: 'antiDebug', label: 'Anti-Debug', desc: 'Add runtime anti-debug and anti-tamper checks', iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { key: 'selfModifying', label: 'Self-Modifying', desc: 'Inject self-modifying code patterns', iconPath: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  ];

  return (
    <section id="obfuscator" className="relative py-16 md:py-24">
      <div className="grid lg:grid-cols-[380px_1fr] gap-8">
        
        {/* Left Panel - Settings */}
        <div className="space-y-6">
          <div className="glass-card p-6 glass-card-hover animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gradient">Protection Layers</h2>
              <div className="flex items-center gap-2 px-3 py-1 glass rounded-lg text-xs font-mono text-[rgb(var(--accent-primary))]">
                <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--accent-primary))] animate-pulse" />
                <span>{options.layers}x Layers</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {optionsList.map((opt, i) => (
                <label 
                  key={opt.key}
                  className="flex items-start gap-4 p-4 glass rounded-xl cursor-pointer transition-all duration-300 hover:bg-[rgb(var(--accent-primary))/5] hover:border-[rgb(var(--accent-primary))/20] group animate-slide-up"
                  style={{ animationDelay: `${100 + i * 50}ms` }}
                >
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={options[opt.key as keyof typeof options]}
                      onChange={(e) => 
                        setOptions(prev => ({ ...prev, [opt.key]: e.target.checked }))}
                      className="peer sr-only"
                    />
                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center peer-checked:bg-gradient-to-br peer-checked:from-[rgb(var(--accent-primary))] peer-checked:to-[rgb(var(--accent-secondary))] peer-checked:border-[rgb(var(--accent-primary))/40] transition-all duration-300 border border-[rgb(var(--border-subtle))/50]">
                      <span className="peer-checked:hidden text-[rgb(var(--fg-secondary))]">
                        <OptionIcon iconPath={opt.iconPath} />
                      </span>
                      <svg className="w-5 h-5 text-[rgb(var(--bg-deep))] hidden peer-checked:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-[rgb(var(--fg-primary))] group-hover:text-[rgb(var(--accent-primary))] transition-colors">{opt.label}</p>
                    <p className="text-xs text-[rgb(var(--fg-muted))] mt-0.5 font-mono">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-[rgb(var(--border-subtle))/30]">
              <label className="block text-sm font-medium text-[rgb(var(--fg-secondary))] mb-3">Obfuscation Depth</label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={options.layers}
                  onChange={(e) => 
                    setOptions(prev => ({ ...prev, layers: Number(e.target.value)}))}
                  className="w-full h-2 bg-[rgb(var(--bg-deep))/50] rounded-full appearance-none accent-[rgb(var(--accent-primary))] cursor-pointer"
                />
                <div className="flex justify-between mt-3 text-xs text-[rgb(var(--fg-muted))] font-mono">
                  <span>Minimal</span>
                  <span className="text-[rgb(var(--accent-primary))] font-bold">{options.layers}</span>
                  <span>Paranoid</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="glass-card p-5 glass-card-hover animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleObfuscate}
                disabled={isProcessing || !code.trim()}
                className={`btn-primary flex-1 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''} ${!code.trim() ? 'opacity-30 cursor-not-allowed' : ''}`}
              >
                <span className="flex items-center justify-center gap-2">
                  {isProcessing ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Processing... {Math.round(progress)}%</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span>Obfuscate Code</span>
                    </>
                  )}
                </span>
              </button>
              
              {obfuscated && (
                <>
                  <button
                    onClick={handleCopy}
                    className="btn-secondary flex items-center justify-center gap-2 px-5"
                    aria-label="Copy to clipboard"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 4h1c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1h-4v2l2.5-2.5-2.5-2.5v2H8.9l-.8 3.2.8 3.2v2H4.6v2h2.5v2h2.4v-2h.7l.8-3.2-.8-3.2v-2H1.4v-2h2.5v-2h2.4V5c0-.6.4-1 1-1h4l.4-2.4c.4.1.5.7.3 1.1zM20 8.6L18 6.6H6l-2 2H4c-.6 0-1 .4-1 1v8c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-5.4l2-2z"/></svg>
                    Copy
                  </button>
                  <button
                    onClick={handleDownload}
                    className="btn-secondary flex items-center justify-center gap-2 px-5"
                    aria-label="Download as file"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.5 3h-4.6l-.5 3.4H7.5v4h3.8l.5-3.4H12v4h3.5l-.6-3.4h3.9zM19.5 15.5h-4.6l-.5 3.4H12.5v-4h3.8l.5 3.4h1.5v-4.5zM20.7 5.8l-2.6 1.5H21c.6 0 1 .4 1 1v13c0 .6-.4 1-1 1h-4.3l-.7-3.3-.7 3.3H5.4c-.6 0-1-.4-1-1V7.5l2.6-1.5c.1-.3.4-.3.5 0z"/></svg>
                    Download
                  </button>
                </>
              )}
            </div>
            
            {isProcessing && (
              <div className="mt-4 h-1.5 bg-[rgb(var(--bg-deep))/50] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[rgb(var(--accent-primary))] via-[rgb(var(--accent-secondary))] to-[rgb(var(--accent-tertiary))] rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>

          {/* Stats */}
          {obfuscated && (
            <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="glass-card p-4 glass-card-hover text-center">
                <div className="text-xs text-[rgb(var(--fg-muted))] font-mono uppercase tracking-wider mb-1">Original</div>
                <div className="text-2xl font-black font-mono text-[rgb(var(--accent-primary))]">{formatBytes(stats.originalSize)}</div>
              </div>
              <div className="glass-card p-4 glass-card-hover text-center">
                <div className="text-xs text-[rgb(var(--fg-muted))] font-mono uppercase tracking-wider mb-1">Obfuscated</div>
                <div className="text-2xl font-black font-mono text-[rgb(var(--accent-secondary))]">{formatBytes(stats.obfuscatedSize)}</div>
              </div>
              <div className="glass-card p-4 glass-card-hover text-center">
                <div className="text-xs text-[rgb(var(--fg-muted))] font-mono uppercase tracking-wider mb-1">Expansion</div>
                <div className="text-2xl font-black font-mono text-[rgb(var(--accent-tertiary))]">{stats.ratio}%</div>
              </div>
              <div className="glass-card p-4 glass-card-hover text-center">
                <div className="text-xs text-[rgb(var(--fg-muted))] font-mono uppercase tracking-wider mb-1">Layers</div>
                <div className="text-2xl font-black font-mono text-[rgb(var(--accent-cyan))]">{options.layers}</div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Code Areas */}
        <div className="space-y-6">
          <div className="glass-card overflow-hidden animate-slide-up" style={{ animationDelay: '200ms' }}>
            {/* Tab Bar */}
            <div className="flex border-b border-[rgb(var(--border-subtle))/30] bg-[rgb(var(--bg-deep))/30]">
              <button
                onClick={() => setActiveTab('input')}
                className={`flex-1 px-6 py-4 text-sm font-medium font-mono transition-all duration-200 relative ${
                  activeTab === 'input'
                    ? 'text-[rgb(var(--accent-primary))]'
                    : 'text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--fg-secondary))]'
                }`}
              >
                Original Code
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-[rgb(var(--accent-primary))/20] text-[rgb(var(--accent-primary))] font-mono">
                  {code.length}
                </span>
                {activeTab === 'input' && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] rounded-t-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('output')}
                disabled={!obfuscated}
                className={`flex-1 px-6 py-4 text-sm font-medium font-mono transition-all duration-200 relative ${
                  !obfuscated
                    ? 'opacity-30 cursor-not-allowed'
                    : activeTab === 'output'
                      ? 'text-[rgb(var(--accent-secondary))]'
                      : 'text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--fg-secondary))]'
                }`}
              >
                Obfuscated
                {obfuscated && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-[rgb(var(--accent-secondary))/20] text-[rgb(var(--accent-secondary))] font-mono">
                    {obfuscated.length}
                  </span>
                )}
                {activeTab === 'output' && obfuscated && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-[rgb(var(--accent-secondary))] to-[rgb(var(--accent-tertiary))] rounded-t-full" />
                )}
              </button>
            </div>

            {/* Code Area */}
            <div className="relative">
              {activeTab === 'input' ? (
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-[rgb(var(--bg-deep))/50] border-r border-[rgb(var(--border-subtle))/30] flex items-start justify-center pt-5 pointer-events-none">
                    <div className="font-mono text-xs text-[rgb(var(--fg-muted))/50] select-none">
                      {Array.from({ length: Math.max(1, Math.ceil((code.split('\n').length || 1) / 1)) }, (_, i) => i + 1).join('\n')}
                    </div>
                  </div>
                  <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={handleCodeChange}
                    className="input-code w-full h-[500px] pl-14 pr-5"
                    placeholder="-- Paste your Lua code here\n-- Example:\nlocal function hello()\n    print(\"Hello, World!\")\nend\n\nhello()"
                    rows={20}
                    spellCheck={false}
                  />
                  {!code && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-10">
                      <div className="text-center glass p-8 rounded-2xl max-w-md">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[rgb(var(--accent-primary))/20] to-[rgb(var(--accent-secondary))/20] flex items-center justify-center">
                          <svg className="w-8 h-8 text-[rgb(var(--accent-primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Drop Lua code here</h3>
                        <p className="text-sm text-[rgb(var(--fg-muted))]">Paste or type your Lua script to obfuscate</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative" style={{ display: obfuscated ? 'block' : 'none' }}>
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-[rgb(var(--bg-deep))/50] border-r border-[rgb(var(--border-subtle))/30] flex items-start justify-center pt-5 pointer-events-none">
                    <div className="font-mono text-xs text-[rgb(var(--fg-muted))/50] select-none">
                      {Array.from({ length: Math.max(1, Math.ceil((obfuscated?.split('\n').length || 1) / 1)) }, (_, i) => i + 1).join('\n')}
                    </div>
                  </div>
                  <textarea
                    ref={outputRef}
                    readOnly
                    value={obfuscated || ''}
                    className="input-code w-full h-[500px] pl-14 pr-5 bg-[rgb(var(--bg-deep))/60]"
                    rows={20}
                    spellCheck={false}
                  />
                  {!obfuscated && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-10">
                      <div className="text-center glass p-8 rounded-2xl max-w-md">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[rgb(var(--accent-secondary))/20] to-[rgb(var(--accent-tertiary))/20] flex items-center justify-center">
                          <svg className="w-8 h-8 text-[rgb(var(--accent-secondary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Obfuscated output will appear here</h3>
                        <p className="text-sm text-[rgb(var(--fg-muted))]">Click "Obfuscate Code" to generate protected output</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}