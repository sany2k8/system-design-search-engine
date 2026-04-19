import { useState, useMemo } from 'react';
import './App.css';
import { PROJECTS, CATEGORIES } from './data';
import ProjectCard from './components/ProjectCard';
import SearchBar from './components/SearchBar';
import FilterButtons from './components/FilterButtons';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

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
            <div className="h-full w-full overflow-y-auto custom-scrollbar pr-2 pb-6 pt-2">
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
      </div>
    </div>
  );
}

export default App;
