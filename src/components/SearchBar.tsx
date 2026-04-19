import { useEffect, useRef, useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export default function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Keyboard shortcut to focus search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative group max-w-3xl mx-auto w-full mb-4 animate-fade-in">
      <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent via-purple-500 to-accent opacity-20 blur-lg transition-opacity duration-500 ${isFocused ? 'opacity-40 animate-pulse-soft' : 'group-hover:opacity-30'}`}></div>
      
      <div className={`relative flex items-center glass-panel rounded-2xl overflow-hidden transition-all duration-300 ${isFocused ? 'ring-2 ring-accent border-transparent bg-surface-900/80' : 'hover:border-surface-600'}`}>
        <div className="pl-5 pr-2 py-2.5 text-surface-400">
          <svg className={`w-6 h-6 transition-colors duration-300 ${isFocused || value ? 'text-accent-light' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent border-none py-2.5 px-2 text-base text-white font-medium placeholder:text-surface-500 focus:outline-none focus:ring-0 w-full"
          placeholder="Search by topic, database, tech stack..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <div className="flex items-center gap-3 pr-4">
          {value ? (
            <button
              onClick={() => {
                onChange('');
                inputRef.current?.focus();
              }}
              className="p-1.5 hover:bg-surface-800 rounded-full text-surface-400 hover:text-white transition-colors"
              title="Clear search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <div className="hidden sm:flex items-center justify-center h-7 px-2 border border-surface-700 rounded bg-surface-800/50 text-xs font-mono text-surface-400 select-none">
              <span className="mr-1">⌘</span>K
            </div>
          )}
          
          <div className="h-6 w-px bg-surface-800 hidden sm:block"></div>
          
          <div className="hidden sm:flex flex-col items-end justify-center min-w-[3rem]">
            <span className="text-xl font-bold text-accent-light leading-none">{resultCount}</span>
            <span className="text-[10px] uppercase font-semibold text-surface-500 tracking-wider">Found</span>
          </div>
        </div>
      </div>
    </div>
  );
}
