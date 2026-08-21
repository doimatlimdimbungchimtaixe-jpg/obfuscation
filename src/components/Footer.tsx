export function Footer() {
  return (
    <footer className="py-12 mt-16 border-t border-[rgb(var(--border))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-400 mb-2">
              Made with ❤️ by
              <a href="https://tiktok.com/@awdyeue" target="_blank" rel="noopener noreferrer" className="text-[rgb(var(--primary))] hover:underline font-medium">
                Lâm Mod
              </a>
            </p>
            <p className="text-xs text-gray-500">
              Ultimate Lua Obfuscator - Protection that can't be bypassed
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-400">
            <a href="https://tiktok.com/@awdyeue" target="_blank" rel="noopener noreferrer" className="hover:text-[rgb(var(--accent))] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.401.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
            </a>
            <span>@awdyeue</span>
          </div>
        </div>
      </div>
    </footer>
  );
}