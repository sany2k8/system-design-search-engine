import { useRef, useState, useEffect } from 'react';
import { CATEGORY_COLORS } from '../data';

interface FilterButtonsProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (category: string) => void;
}

export default function FilterButtons({ categories, activeFilter, onFilterChange }: FilterButtonsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [categories]);

  const scrollBy = (amount: number) => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full mb-4 max-w-5xl mx-auto group animate-fade-in" style={{ animationDelay: '100ms' }}>
      {/* Left gradient fade & button */}
      <div className={`absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-surface-950 to-transparent z-10 flex items-center transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button 
          onClick={() => scrollBy(-300)}
          className="ml-2 w-8 h-8 rounded-full bg-surface-100 dark:bg-surface-800/80 backdrop-blur border border-surface-300 dark:border-surface-700 flex items-center justify-center text-surface-600 dark:text-surface-300 hover:text-gray-900 dark:hover:text-white hover:bg-surface-200 dark:hover:bg-surface-700 hover:border-surface-400 dark:hover:border-surface-600 transition-all shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Scroller */}
      <div 
        ref={scrollerRef}
        onScroll={checkScroll}
        className="flex space-x-2 overflow-x-auto hide-scrollbar scroll-smooth px-8 py-1.5 w-full snap-x snap-mandatory"
      >
        {categories.map((category) => {
          const isActive = category === activeFilter;
          const colorClasses = CATEGORY_COLORS[category] || CATEGORY_COLORS['All'];
          
          return (
            <button
              key={category}
              onClick={() => onFilterChange(category)}
              className={`
                shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 snap-center
                border ${isActive 
                  ? `bg-gradient-to-r ${colorClasses} shadow-[0_0_15px_rgba(255,255,255,0.05)] scale-105` 
                  : 'bg-surface-100 dark:bg-surface-900/50 border-surface-300 dark:border-surface-800/60 text-surface-700 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200 hover:bg-surface-200 dark:hover:bg-surface-800 hover:border-surface-400 dark:hover:border-surface-700'}
              `}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Right gradient fade & button */}
      <div className={`absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-surface-950 to-transparent z-10 flex items-center justify-end transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button 
          onClick={() => scrollBy(300)}
          className="mr-2 w-8 h-8 rounded-full bg-surface-100 dark:bg-surface-800/80 backdrop-blur border border-surface-300 dark:border-surface-700 flex items-center justify-center text-surface-600 dark:text-surface-300 hover:text-gray-900 dark:hover:text-white hover:bg-surface-200 dark:hover:bg-surface-700 hover:border-surface-400 dark:hover:border-surface-600 transition-all shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
