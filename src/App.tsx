import React, { useState } from 'react';
import { Link2, Copy, ExternalLink, Terminal, Loader2 } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const shortenUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
        throw new Error('Failed to shorten URL');
      }
      
      const shortUrl = await response.text();
      setShortUrl(shortUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,#0a0a0f_1px),linear-gradient(90deg,transparent_1px,#0a0a0f_1px)] bg-[size:30px_30px] [background-position:center] opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0ff] via-[#f0f] to-[#0ff] opacity-10 animate-pulse"></div>
      </div>

      {/* Glowing circle decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-[#0ff] rounded-full blur-[128px] opacity-20"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-[#f0f] rounded-full blur-[128px] opacity-20"></div>

      <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 w-full max-w-md shadow-[0_0_50px_0_rgba(0,255,255,0.1)]">
        <div className="flex items-center justify-center mb-8 relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-[#0ff] to-[#f0f] rounded-2xl rotate-45 blur opacity-20"></div>
          <Terminal className="w-12 h-12 text-[#0ff]" />
          <div className="ml-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0ff] to-[#f0f] text-transparent bg-clip-text">URL_SHORTENER</h1>
            <p className="text-[#666] text-sm font-mono mt-1">v1.0.0</p>
          </div>
        </div>

        <form onSubmit={shortenUrl} className="space-y-4">
          <div className="relative">
            <label htmlFor="url" className="block text-sm font-mono text-[#0ff] mb-2 tracking-wider">
              {'>'} ENTER_URL:
            </label>
            <input
              type="url"
              id="url"
              required
              placeholder="https://example.com/very-long-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-[#0ff]/20 rounded-lg text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#0ff]/50 focus:border-transparent outline-none transition font-mono text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#0ff] to-[#f0f] hover:opacity-90 text-black font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed font-mono relative group overflow-hidden"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                PROCESSING...
              </span>
            ) : (
              'SHORTEN_URL.exe'
            )}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-500/50 text-red-400 rounded-lg font-mono text-sm">
            ERROR: {error}
          </div>
        )}

        {shortUrl && (
          <div className="mt-6 p-4 bg-black/50 border border-[#0ff]/20 rounded-lg">
            <div className="flex items-center justify-between">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0ff] hover:text-[#f0f] font-mono truncate mr-2 transition-colors flex items-center"
              >
                {shortUrl}
                <ExternalLink className="inline-block w-4 h-4 ml-1" />
              </a>
              <button
                onClick={copyToClipboard}
                className="p-2 text-[#0ff] hover:text-[#f0f] rounded-lg hover:bg-[#0ff]/10 transition group"
                title="Copy to clipboard"
              >
                <Copy className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-[#666] text-xs font-mono">SYSTEM_READY | AWAITING_INPUT...</p>
        </div>
      </div>
    </div>
  );
}

export default App;