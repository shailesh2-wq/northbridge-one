import { Info } from 'lucide-react';

export default function DemoBanner() {
  return (
    <div className="bg-primary-600 text-white flex items-center justify-center text-xs font-medium w-full h-[32px]">
      <Info className="w-3.5 h-3.5 mr-2 opacity-80" />
      Portfolio Prototype — NorthBridge International School (Fictional) — Synthetic Data
    </div>
  );
}
