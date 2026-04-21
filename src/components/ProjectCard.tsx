import { Project, CATEGORY_COLORS } from '../data';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const accentStyles = CATEGORY_COLORS[project.cat] || CATEGORY_COLORS['All'];

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    const fullPrompt = `Build project #${project.id}: ${project.title}. Stack: ${project.stack}. Here is the full spec: ${project.prompt}`;
    navigator.clipboard.writeText(fullPrompt).then(() => {
      const btn = e.currentTarget as HTMLButtonElement;
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span class="flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>Copied</span>`;
      btn.classList.add('text-green-400', 'border-green-500/30', 'bg-green-500/10');
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('text-green-400', 'border-green-500/30', 'bg-green-500/10');
      }, 2000);
    });
  };

  return (
    <div className="flex flex-col h-full glass-card rounded-2xl overflow-hidden group">
      {/* Top Banner / Header area */}
      <div className={`p-3 pb-2.5 bg-gradient-to-b ${accentStyles.split(' ').slice(0,2).join(' ')} border-b ${accentStyles.split(' ').slice(3,4).join(' ')} relative`}>
        <div className="flex justify-between items-start mb-1 gap-2">
          <h3 className="text-base font-bold text-white leading-tight group-hover:text-accent-light transition-colors line-clamp-1">{project.title}</h3>
          <span className="font-mono text-[10px] font-bold text-surface-500 bg-surface-900/50 px-1.5 py-0.5 rounded border border-surface-800 shrink-0">#{project.id}</span>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mt-2 text-[10px]">
          <span className={`px-2 py-0.5 flex items-center justify-center rounded-full font-bold border bg-surface-950/50 backdrop-blur-sm ${accentStyles.split(' ').slice(2).join(' ')}`}>
            {project.cat}
          </span>
          <span className="px-2 py-0.5 rounded-full font-mono font-bold border border-surface-700 bg-surface-800/80 text-surface-300 flex items-center shadow-sm">
            {project.stack}
          </span>
        </div>
      </div>

      {/* Content area */}
      <div className="p-3 flex-1 flex flex-col min-h-0 bg-surface-100 dark:bg-surface-900/20 max-h-[140px]">
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 -mr-1 mb-2">
          <div className="text-[12px] text-surface-700 dark:text-surface-300 leading-snug font-sans">
            {project.prompt}
          </div>
        </div>
        
        <div className="pt-2 border-t border-surface-300 dark:border-surface-800/60 flex items-center justify-between mt-auto shrink-0">
          <button
            onClick={handleCopyPrompt}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-surface-200 dark:bg-surface-800 hover:bg-surface-300 dark:hover:bg-surface-700 text-surface-800 dark:text-surface-200 border border-surface-300 dark:border-surface-700 hover:border-surface-400 dark:hover:border-surface-600 transition-all font-semibold text-[11px] font-sans focus:outline-none focus:ring-2 focus:ring-accent-light/50"
          >
            <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span>Copy Prompt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
