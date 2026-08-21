'use client';

import { useState, useEffect, useRef } from 'react';

export function ObfuscatorPanel() {
  const [code, setCode] = useState('');
  const [obfuscated, setObfuscated] = useState<string | null>(null);
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
        body: JSON.stringify({ code })
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

  return (
    <section id="obfuscator" className="relative py-16 md:py-24">
      <div className="grid lg:grid-cols-[380px_1fr] gap-8">
        <div className="space-y-6">
          <div className="glass-card p-5 glass-card-hover">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gradient">Lâm Mod Obfuscator</h2>
            </div>
            <p className="text-sm text-[rgb(var(--fg-muted))]">Paste your Lua code below</p>
            
            <textarea
              ref={textareaRef}
              value={code}
              onChange={handleCodeChange}
              className="input-code w-full h-[300px] pl-4 pr-3 rounded-xl bg-[rgb(var(--bg-deep))/60] text-sm resize-none outline-none focus:border-[rgb(var(--accent-primary))] focus:ring-2 focus:ring-[rgb(var(--accent-primary))/20]"
              rows={10}
              spellCheck={false}
              placeholder="-- Paste your Lua code here\n-- Example:\nlocal function hello()\n    print(\"Hello, World!\")\nend\n\nhello()"
            />
            
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleObfuscate}
                disabled={isProcessing || !code.trim()}
                className="btn-primary px-6 py-2.5 text-sm font-medium"
              >
                {isProcessing ? 'Processing...' : 'Obfuscate Code'}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card overflow-hidden">
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

            <div className="relative">
              {activeTab === 'input' ? (
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={code}
                    readOnly
                    className="input-code w-full h-[300px] pl-4 pr-3 rounded-xl bg-[rgb(var(--bg-deep))/60] text-sm text-[rgb(var(--fg-primary))] overflow-auto font-mono"
                    rows={10}
                    spellCheck={false}
                  />
                </div>
              ) : (
                <div className="relative" style={{ display: obfuscated ? 'block' : 'none' }}>
                  <textarea
                    ref={outputRef}
                    readOnly
                    value={obfuscated || ''}
                    className="input-code w-full h-[300px] pl-4 pr-3 rounded-xl bg-[rgb(var(--bg-deep))/60] text-sm text-[rgb(var(--fg-primary))] overflow-auto font-mono"
                    rows={10}
                    spellCheck={false}
                  />
                  {!obfuscated && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-8">
                      <div className="text-center glass p-6 rounded-2xl max-w-md">
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