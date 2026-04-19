import { useState, useMemo, useRef } from 'react';
import './App.css';
import { PROJECTS, CATEGORIES } from './data';
import ProjectCard from './components/ProjectCard';
import SearchBar from './components/SearchBar';
import FilterButtons from './components/FilterButtons';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'auto' });
    }
  };


  const filtered = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchCategory = activeFilter === 'All' || project.cat === activeFilter;
      const query = searchQuery.toLowerCase();
      const matchQuery = 
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.cat.toLowerCase().includes(query) ||
        project.stack.toLowerCase().includes(query) ||
        project.prompt.toLowerCase().includes(query);
      
      return matchCategory && matchQuery;
    });
  }, [searchQuery, activeFilter]);

  const categories = ['All', ...Object.keys(CATEGORIES)];

  // We are removing pagination to allow full vertical scrolling of a robust grid, 
  // or a horizontal snap-scroll flexbox. A wide responsive grid makes the most use of the full page.
  
  return (
    <div className="min-h-screen flex flex-col bg-surface-950 font-sans selection:bg-accent-glow selection:text-white">
      {/* Background ambient elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent-glow blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px] mix-blend-screen"></div>
      </div>

      {/* GitHub Link Button - Top Right */}
      <a 
        href="https://github.com/sany2k8" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed top-6 right-6 z-50 p-2.5 rounded-xl glass-panel text-surface-400 hover:text-white hover:border-surface-600 transition-all duration-300 group shadow-2xl"
        title="View on GitHub"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      </a>

      {/* Navigation Arrows - Right Side */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        <button 
          onClick={scrollToTop}
          className="p-3 rounded-full glass-panel text-surface-400 hover:text-white hover:border-surface-600 transition-all shadow-xl group"
          title="Scroll to Top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-0.5 transition-transform">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>
        <button 
          onClick={scrollToBottom}
          className="p-3 rounded-full glass-panel text-surface-400 hover:text-white hover:border-surface-600 transition-all shadow-xl group"
          title="Scroll to Bottom"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-0.5 transition-transform">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
      </div>


      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col h-screen max-h-screen">
        
        {/* Header Section */}
        <header className="flex flex-col items-center justify-center text-center mb-6 animate-slide-up shrink-0">
          {/* <div className="inline-flex items-center justify-center p-0.5 rounded-full bg-surface-800/50 border border-surface-700/50 backdrop-blur-sm mb-4">
            <span className="px-2 py-0.5 text-[10px] font-semibold text-accent-light tracking-wide uppercase">v2.0 Explorer</span>
          </div> */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2">
            <span className="text-white">System Design</span> <span className="text-gradient-accent text-2xl md:text-3xl lg:text-4xl">Mini Projects</span>
          </h1>
          <p className="text-surface-400 text-sm md:text-base max-w-2xl font-medium">
            Discover <strong className="text-white">{PROJECTS.length}</strong> architectural challenges.
          </p>
        </header>

        {/* Controls Section */}
        <div className="w-full flex-col shrink-0">
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
            resultCount={filtered.length} 
          />
          
          <FilterButtons 
            categories={categories}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Cards Grid / Horizontal Scroll Area */}
        {/* Using a horizontal scroller as requested for making full use without page down */}
        <div className="flex-1 w-full relative min-h-0">
          {filtered.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 glass-panel rounded-2xl mx-auto max-w-2xl">
              <span className="text-6xl mb-4">🔍</span>
              <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
              <p className="text-surface-400">Try adjusting your search terms or filters.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                className="mt-6 px-6 py-2 bg-surface-800 hover:bg-surface-700 text-white rounded-lg transition border border-surface-700"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="h-full w-full overflow-y-auto custom-scrollbar pr-2 pb-6 pt-2" ref={scrollRef}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-start">
                {filtered.map((project, idx) => (
                  <div 
                    key={project.id} 
                    className="animate-fade-in h-full"
                    style={{ animationDelay: `${Math.min(idx * 30, 300)}ms` }}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <footer className="mt-auto pt-6 border-t border-surface-800/50 flex flex-col md:flex-row items-center justify-between gap-4 text-surface-500 text-xs font-medium animate-fade-in shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft"></div>
            <span>© {new Date().getFullYear() > 2026 ? `2026 - ${new Date().getFullYear()}` : '2026'} System Design Explorer. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-surface-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-surface-300 transition-colors">Terms of Service</a>
            <a href="https://github.com/sany2k8/system-design-search-engine" target="_blank" rel="noopener noreferrer" className="text-accent-light hover:text-white transition-colors flex items-center gap-1">
              <span>GitHub Repo</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
