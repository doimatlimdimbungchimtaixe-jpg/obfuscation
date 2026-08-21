'use client';

import { useState, useEffect } from 'react';

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

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleObfuscate = async () => {
    if (!code.trim()) return;

    setIsProcessing(true);
    setObfuscated(null);
    
    try {
      const response = await fetch('/api/obfuscate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, options })
      });

      const data = await response.json();
      
      if (response.ok) {
        setObfuscated(data.obfuscated);
        setStats({
          originalSize: code.length,
          obfuscatedSize: data.obfuscated.length,
          ratio: data.ratio
        });
      } else {
        alert(data.error || 'Obfuscation failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (!obfuscated) return;
    
    navigator.clipboard.writeText(obfuscated);
    alert('Code copied to clipboard!');
  };

  const handleDownload = () => {
    if (!obfuscated) return;
    
    const blob = new Blob([obfuscated], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'obfuscated-lua.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto py-16 md:py-24">
      <div className="grid lg:grid-cols-[350px_1fr] gap-8">
        
        {/* Left Panel - Controls */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gradient mb-4">Obfuscation Settings</h2>
          
          <div className="card p-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block text-gray-300 mb-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={options.stringEncryption}
                    onChange={(e) => 
                      setOptions(prev => ({ ...prev, stringEncryption: e.target.checked }))}
                    className="w-4 h-4 rounded border-[rgb(var(--border))] cursor-pointer"
                  />
                  String Encryption
                </label>
                <p className="text-xs text-gray-500 mt-1">Encrypt all string literals using AES-256-CBC</p>
              </div>
              <div>
                <label className="block text-gray-300 mb-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={options.controlFlow}
                    onChange={(e) => 
                      setOptions(prev => ({ ...prev, controlFlow: e.target.checked }))}
                    className="w-4 h-4 rounded border-[rgb(var(--border))] cursor-pointer"
                  />
                  Control Flow Obfuscation
                </label>
                <p className="text-xs text-gray-500 mt-1">Split code into blocks and use jump table</p>
              </div>
              <div>
                <label className="block text-gray-300 mb-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={options.variableRenaming}
                    onChange={(e) => 
                      setOptions(prev => ({ ...prev, variableRenaming: e.target.checked }))}
                    className="w-4 h-4 rounded border-[rgb(var(--border))] cursor-pointer"
                  />
                  Variable Renaming
                </label>
                <p className="text-xs text-gray-500 mt-1">Rename local variables to meaningless names</p>
              </div>
              <div>
                <label className="block text-gray-300 mb-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={options.deadCode}
                    onChange={(e) => 
                      setOptions(prev => ({ ...prev, deadCode: e.target.checked }))}
                    className="w-4 h-4 rounded border-[rgb(var(--border))] cursor-pointer"
                  />
                  Dead Code Injection
                </label>
                <p className="text-xs text-gray-500 mt-1">Inject harmless dead code</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-300 mb-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={options.antiDebug}
                    onChange={(e) => 
                      setOptions(prev => ({ ...prev, antiDebug: e.target.checked }))}
                    className="w-4 h-4 rounded border-[rgb(var(--border))] cursor-pointer"
                  />
                  Anti-Debug
                </label>
                <p className="text-xs text-gray-500 mt-1">Add anti-debug and anti-tamper checks</p>
              </div>
              <div>
                <label className="block text-gray-300 mb-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={options.selfModifying}
                    onChange={(e) => 
                      setOptions(prev => ({ ...prev, selfModifying: e.target.checked }))}
                    className="w-4 h-4 rounded border-[rgb(var(--border))] cursor-pointer"
                  />
                  Self-Modifying Code
                </label>
                <p className="text-xs text-gray-500 mt-1">Add self-modifying code patterns</p>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Layers</label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={options.layers}
                  onChange={(e) => 
                    setOptions(prev => ({ ...prev, layers: Number(e.target.value)}))}
                  className="w-full accent-color: rgb(var(--primary)) cursor-pointer"
                />
                <span 
                  className="absolute right-0 text-xs text-gray-400"
                  style={{ right: 10 }}
                >{options.layers}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="card p-5">
            <div className="flex gap-3">
              <button
                onClick={handleObfuscate}
                disabled={isProcessing}
                className={`btn-primary flex-1 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? 'Processing...' : 'Obfuscate Code'}
              </button>
              
              {obfuscated && (
                <>
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-[rgb(var(--secondary))] text-black font-medium rounded-lg hover:bg-opacity-90 transition-colors text-sm"
                    aria-label="Copy to clipboard"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M16 4h1c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1h-4v2l2.5-2.5-2.5-2.5v2H8.9l-.8 3.2.8 3.2v2H4.6v2h2.5v2h2.4v-2h.7l.8-3.2-.8-3.2v-2H1.4v-2h2.5v-2h2.4V5c0-.6.4-1 1-1h4l.4-2.4c.4.1.5.7.3 1.1zM20 8.6L18 6.6H6l-2 2H4c-.6 0-1 .4-1 1v8c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-5.4l2-2z"/></svg>
                    Copy
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] text-black font-medium rounded-lg hover:opacity-90 transition-opacity text-sm"
                    aria-label="Download as file"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M14.5 3h-4.6l-.5 3.4H7.5v4h3.8l.5-3.4H12v4h3.5l-.6-3.4h3.9zM19.5 15.5h-4.6l-.5 3.4H12.5v-4h3.8l.5 3.4h1.5v-4.5zM20.7 5.8l-2.6 1.5H21c.6 0 1 .4 1 1v13c0 .6-.4 1-1 1h-4.3l-.7-3.3-.7 3.3H5.4c-.6 0-1-.4-1-1V7.5l2.6-1.5c.1-.3.4-.3.5 0z"/></svg>
                    Download
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Code Areas */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gradient mb-4">Original Code</h2>
          
          <div className="card">
            <div className="flex items-center justify-between pb-3 border-b border-[rgb(var(--border))]">
              <span className="text-sm text-gray-400 font-mono">Lua Code</span>
              <span className="text-xs text-gray-500">{code.length}</span>
            </div>
            <textarea
              value={code}
              onChange={handleCodeChange}
              className="input-area w-full h-[200px] resize-none"
              placeholder="Paste your Lua code here..."
              rows={4}
            />
          </div>

          {obfuscated && (
            <>
              <h2 className="text-xl font-bold text-gradient mb-4">Obfuscated Code</h2>
              
              <div className="card p-5">
                <div className="flex items-center justify-between pb-3 border-b border-[rgb(var(--border))]">
                  <span className="text-sm text-gray-400 font-mono">Obfuscated Lua</span>
                  <span className="text-xs text-gray-500">{obfuscated.length}</span>
                </div>
                <textarea
                  readOnly
                  value={obfuscated}
                  className="input-area w-full h-[300px] resize-none overflow-auto font-mono text-xs"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <div className="text-xs text-gray-300 mb-2">Original Size</div>
                  <div className="text-right">
                    <span className="text-lg font-mono text-[rgb(var(--primary))]">{stats.originalSize}</span>
                    <span className="text-xs text-gray-400"> bytes</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-300 mb-2">Obfuscated Size</div>
                  <div className="text-right">
                    <span className="text-lg font-mono text-[rgb(var(--secondary))]">{stats.obfuscatedSize}</span>
                    <span className="text-xs text-gray-400"> bytes</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-300 mb-2">Compression Ratio</div>
                  <div className="text-right">
                    <span className="text-lg font-mono text-[rgb(var(--accent))]">{stats.ratio}%</span>
                    <span className="text-xs text-gray-400"> of original</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-300 mb-2">Layers Applied</div>
                  <div className="text-right">
                    <span className="text-lg font-mono">{options.layers}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}