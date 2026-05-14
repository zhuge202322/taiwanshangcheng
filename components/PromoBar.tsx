'use client';
import { useState } from 'react';
import { X } from 'lucide-react';

const messages = [
  '母親節限時暖心抽獎🎁，買五送二抽【1次】，買十送五直接抽【2次】‼️',
  '全館消費滿 $8000 可享好禮 4 選 1 ▶︎ 膠原蛋白、綜合B群、海藻鈣任挑任選',
  '12 大獎有抽必中💫【iPad Air、Switch 2、Dyson 吹風機】等豐富獎品等你抽'
];

export default function PromoBar() {
  const [closed, setClosed] = useState(false);
  const [idx, setIdx] = useState(0);
  if (closed) return null;
  return (
    <div className="bg-promo text-white text-xs md:text-sm relative">
      <div className="container-x py-2.5 text-center pr-10">
        <button
          onClick={() => setIdx((idx + 1) % messages.length)}
          className="hover:underline tracking-wide"
        >
          {messages[idx]}
        </button>
      </div>
      <button
        onClick={() => setClosed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/90 hover:text-white"
        aria-label="close"
      >
        <X size={18} />
      </button>
    </div>
  );
}
