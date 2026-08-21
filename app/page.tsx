import React from 'react';
import './globals.css';

export default function HomePage() {
  const [code, setCode] = React.useState('');
  const [obfuscated, setObfuscated] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [stats, setStats] = React.useState({
    originalSize: 0,
    obfuscatedSize: 0,
    ratio: 0
  });

  const handleCodeChange = (e) => setCode(e.target.value);

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
        setStats({
          originalSize: code.length,
          obfuscatedSize: data.obfuscated.length,
          ratio: data.ratio
        });
      } else {
        alert(data.error || 'Obfuscation failed');
      }
    } catch (error) {
      alert('Network error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(obfuscated).then(() => alert('Copied!')).catch(() => alert('Failed to copy'));
  };

  const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="min-h-screen bg-[rgb(6,6,12)] text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-gradient">
        <span>Lua</span><span> Obfuscator</span>
      </h1>
      
      <div className="grid md:grid-cols-[350px_1fr] gap-8 mb-8">
        <div>
          <h2 className="text-xl font-bold text-gradient mb-4">Original Code</h2>
          <textarea
            value={code}
            onChange={handleCodeChange}
            className="input-code w-full h-[300px] rounded-xl p-4 text-sm resize-none"
            rows={10}
            spellCheck={false}
            placeholder="Paste your Lua code here..."
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gradient mb-4">Obfuscated Code</h2>
          <textarea
            value={obfuscated}
            readOnly
            className="input-code w-full h-[300px] rounded-xl p-3 text-xs overflow-auto font-mono"
            rows={10}
            spellCheck={false}
          />
          {obfuscated && (
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-[rgb(0,255,136)] text-black rounded-lg hover:opacity-90"
              >
                Copy
              </button>
              <button
                className="px-4 py-2 bg-gradient-to-r from-[rgb(138,43,226)] to-[rgb(255,0,110)] text-black rounded-lg hover:opacity-90"
              >
                Download
              </button>
            </div>
          )}
          {obfuscated && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Original</div>
                <div className="text-2xl font-mono text-[rgb(0,255,136)]">{stats.originalSize}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Obfuscated</div>
                <div className="text-2xl font-mono text-[rgb(138,43,226)]">{stats.obfuscatedSize}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Expansion</div>
                <div className="text-2xl font-mono text-[rgb(255,0,110)]">{stats.ratio}%</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <button
          onClick={handleObfuscate}
          disabled={!code.trim()}
          className="btn-primary mt-8 w-full py-3"
        >
          {isProcessing ? 'Processing...' : 'Obfuscate Code'}
        </button>
      </div>
    </div>
  );
}
import React from 'react';