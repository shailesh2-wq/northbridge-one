import { Info } from 'lucide-react';

export default function DemoBanner() {
  return (
    <div className="bg-primary-600 text-white flex items-center justify-center text-xs font-medium w-full py-1.5 px-4 text-center leading-tight">
      <Info className="w-3.5 h-3.5 mr-1.5 shrink-0 opacity-80" />
      <span>Portfolio Prototype — NorthBridge International School (Fictional) — Synthetic Data</span>
    </div>
  );
}
