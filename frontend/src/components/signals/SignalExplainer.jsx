import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function SignalExplainer({ explanation }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!explanation) return null;

  return (
    <div className="mt-3 bg-blue-50/50 rounded-lg border border-blue-100">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 text-sm text-blue-800 font-medium hover:bg-blue-50 transition-colors rounded-lg"
      >
        <div className="flex items-center">
          <HelpCircle className="w-4 h-4 mr-2 text-blue-500" />
          Why am I seeing this?
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 pt-1 text-sm text-gray-700 leading-relaxed border-t border-blue-50">
          {explanation}
        </div>
      )}
    </div>
  );
}
