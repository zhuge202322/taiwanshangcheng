import { MessageCircle } from 'lucide-react';

export default function LineFloatButton() {
  return (
    <a
      href="https://lin.ee/PjfZXiP"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LINE 線上客服"
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 group flex items-center gap-2 bg-[#06C755] hover:bg-[#05B14C] text-white rounded-full shadow-lg shadow-black/20 pl-4 pr-5 py-3 transition-all hover:scale-105"
    >
      <MessageCircle size={22} strokeWidth={2.5} fill="white" className="text-[#06C755]" />
      <span className="font-bold text-sm tracking-wide">LINE 客服</span>
    </a>
  );
}
