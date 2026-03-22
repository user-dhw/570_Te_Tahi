import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

const PageNavigation: React.FC<PageNavigationProps> = ({ 
  currentPage, 
  totalPages, 
  onNext, 
  onPrev 
}) => {
  return (
    <div className="flex items-center justify-between mt-8 w-full max-w-2xl mx-auto">
      <button
        onClick={onPrev}
        disabled={currentPage === 0}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
          currentPage === 0
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
            : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg active:scale-95'
        }`}
      >
        <ChevronLeft size={20} />
        Previous
      </button>

      <div className="text-slate-500 font-medium">
        Page {currentPage + 1} of {totalPages}
      </div>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages - 1}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
          currentPage === totalPages - 1
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
            : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg active:scale-95'
        }`}
      >
        Next
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default PageNavigation;
