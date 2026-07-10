'use client';

import { useState } from 'react';
import { Heart, Bookmark, Share2 } from 'lucide-react';

export function ArticleActions({ initialLiked = false, initialSaved = false }: { initialLiked?: boolean; initialSaved?: boolean }) {
  const [liked, setLiked] = useState(initialLiked);
  const [saved, setSaved] = useState(initialSaved);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setLiked(!liked)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
          ${liked ? 'bg-red-50 text-red-600 dark:bg-red-900/20' : 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400'}`}
      >
        <Heart className={`w-4 h-4 ${liked ? 'fill-red-600' : ''}`} />
        <span className="text-sm">124</span>
      </button>

      <button
        onClick={() => setSaved(!saved)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
          ${saved ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' : 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400'}`}
      >
        <Bookmark className={`w-4 h-4 ${saved ? 'fill-blue-600' : ''}`} />
        <span className="text-sm">Save</span>
      </button>

      <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 transition-all">
        <Share2 className="w-4 h-4" />
        <span className="text-sm">Share</span>
      </button>
    </div>
  );
}
