import React, { useState } from 'react';
import './globals.css';

export default function HomePage() {
  const [code, setCode] = useState('');
  const [obfuscated, setObfuscated] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState({ originalSize: 0, obfuscatedSize: 0, ratio: 0 });

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleObfuscate = async () => {
    if (!code.trim()) return;
    setIsProcessing(true);
    try {
      const response = await fetch('/api/obfuscate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      const data = await response.json();
      if (response.ok) {
        setObfuscated(data.obfuscated);
        setStats({ originalSize: code.length, obfuscatedSize: data.obfuscated.length, ratio: data.ratio });
      } else {
        alert(data.error || 'Obfuscation failed');
      }
    } catch {
      alert('Network error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(obfuscated);
  };

  const handleDownload = () => {
    const blob = new Blob([obfuscated], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'obfuscated.lua';
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
  };

  return (
    <div className="min-h-screen bg-[rgb(6,6,12)] text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-4">
            <span className="text-gradient">Lua Obfuscator</span>
          </h1>
          <p className="text-lg text-[rgb(180,180,200)] max-w-2xl mx-auto">
            Military-grade obfuscation with AES-256 encryption and polymorphic layers
          </p>
          <p className="text-sm text-[rgb(110,110,130)] mt-3">
            Made by Lam Mod - TikTok @awdyeue
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[rgb(0,255,136)] uppercase tracking-wider">Original Code</h2>
              <span className="text-xs text-[rgb(110,110,130)] font-mono">{code.length} chars</span>
            </div>
            <textarea
              value={code}
              onChange={handleCodeChange}
              className="w-full h-[400px] rounded-xl p-4 text-sm font-mono resize-none outline-none bg-[rgb(14,14,24)] border border-[rgb(35,35,55)] text-[rgb(250,250,255)] placeholder:text-[rgb(110,110,130)] focus:border-[rgb(0,255,136)] focus:ring-2 focus:ring-[rgba(0,255,136,0.2)] transition-all"
              spellCheck={false}
              placeholder="Paste your Lua code here..."
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[rgb(138,43,226)] uppercase tracking-wider">Obfuscated Output</h2>
              {obfuscated && (
                <span className="text-xs text-[rgb(110,110,130)] font-mono">{obfuscated.length} chars</span>
              )}
            </div>
            <textarea
              value={obfuscated}
              readOnly
              className="w-full h-[400px] rounded-xl p-4 text-xs font-mono resize-none outline-none bg-[rgb(14,14,24)] border border-[rgb(35,35,55)] text-[rgb(250,250,255)] overflow-auto"
              spellCheck={false}
              placeholder="Obfuscated output will appear here..."
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <button
            onClick={handleObfuscate}
            disabled={!code.trim() || isProcessing}
            className="px-8 py-3.5 bg-gradient-to-r from-[rgb(0,255,136)] to-[rgb(0,200,100)] text-[rgb(6,6,12)] font-semibold text-sm rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(0,255,136,0.3)]"
          >
            {isProcessing ? 'Processing...' : 'Obfuscate Code'}
          </button>
          {obfuscated && (
            <>
              <button
                onClick={handleCopy}
                className="px-6 py-3.5 bg-[rgb(20,20,34)] border border-[rgb(35,35,55)] text-[rgb(180,180,200)] font-medium text-sm rounded-xl transition-all duration-300 hover:border-[rgba(0,255,136,0.4)] hover:text-[rgb(250,250,255)]"
              >
                Copy
              </button>
              <button
                onClick={handleDownload}
                className="px-6 py-3.5 bg-[rgb(20,20,34)] border border-[rgb(35,35,55)] text-[rgb(180,180,200)] font-medium text-sm rounded-xl transition-all duration-300 hover:border-[rgba(138,43,226,0.4)] hover:text-[rgb(250,250,255)]"
              >
                Download
              </button>
            </>
          )}
        </div>

        {obfuscated && (
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[rgb(14,14,24)] border border-[rgb(35,35,55)] rounded-xl p-4 text-center">
              <div className="text-xs text-[rgb(110,110,130)] uppercase tracking-wider mb-1">Original</div>
              <div className="text-xl font-bold font-mono text-[rgb(0,255,136)]">{formatBytes(stats.originalSize)}</div>
            </div>
            <div className="bg-[rgb(14,14,24)] border border-[rgb(35,35,55)] rounded-xl p-4 text-center">
              <div className="text-xs text-[rgb(110,110,130)] uppercase tracking-wider mb-1">Obfuscated</div>
              <div className="text-xl font-bold font-mono text-[rgb(138,43,226)]">{formatBytes(stats.obfuscatedSize)}</div>
            </div>
            <div className="bg-[rgb(14,14,24)] border border-[rgb(35,35,55)] rounded-xl p-4 text-center">
              <div className="text-xs text-[rgb(110,110,130)] uppercase tracking-wider mb-1">Expansion</div>
              <div className="text-xl font-bold font-mono text-[rgb(255,0,110)]">{stats.ratio}%</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}