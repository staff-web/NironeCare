// app/health-insight/[id]/page.tsx

import { Button } from '@/components/ui/button';
import {
  Calendar, ArrowRight, Bookmark, Share2, Clock, Quote,
  ChevronLeft, Heart, Eye, Download, ExternalLink, Award
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { articles } from '../articles';
import { Footer } from '@/components/footer';
import { CTA } from '@/components/cta';
import { ArticleActions } from '@/components/article-actions';



const categoryColors: Record<string, string> = {
  'Healthcare Innovation': 'bg-blue-600 text-white',
  'Research': 'bg-emerald-600 text-white',
  'Policy': 'bg-slate-700 text-white',
  'Culture': 'bg-violet-600 text-white',
  'Sustainability': 'bg-teal-600 text-white',
  'Technology': 'bg-indigo-600 text-white',
};

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return articles.map((a) => ({ id: a.id }));
}

export default function ArticleDetailPage({ params }: PageProps) {
  const { id } = params;
  const article = articles.find((a) => a.id === id);
  
  if (!article) {
    notFound();
  }

  const relatedArticles = articles.filter(a => a.id !== id).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="bg-[#F8F6F1] dark:bg-[#070c14] text-slate-900 dark:text-slate-100 min-h-screen">
        
        {/* Hero Section */}
        <section className="relative h-[10vh] min-h-[400px] ">
          <div className="absolute inset-0">
            <Image
              src={article.img}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-slate-900/30" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
            <div className="max-w-5xl mx-auto">
              {/* Back button - removed margin-bottom */}
              <Link href="/health-insight">
                <div className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-sm">Back to Journal</span>
                </div>
              </Link>
              
              <div className="flex items-center gap-3  mb-4">
                <div className="h-px w-12 bg-white/30" />
                <span className="text-white/60 text-[10px] font-bold tracking-[.25em] uppercase">
                  {article.date} · Featured Story
                </span>
                <div className="h-px flex-1 bg-white/30" />
              </div>
              
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${categoryColors[article.category]}`}>
                  {article.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-4xl">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mt-6 text-white/70 text-sm">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {article.date}</span>
                <span className="w-1 h-1 bg-white/40 rounded-full" />
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {article.readTime} min read</span>
                <span className="w-1 h-1 bg-white/40 rounded-full" />
                <span className="flex items-center gap-2"><Eye className="w-4 h-4" /> 2.5k views</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
          
          {/* Author & Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-6 pb-8 mb-8 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-800 dark:text-white text-lg">{article.author}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{article.authorRole}</p>
              </div>
            </div>
            
            <ArticleActions />
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none dark:prose-invert
            prose-headings:font-black prose-headings:font-serif prose-headings:text-slate-800 dark:prose-headings:text-white
            prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
            prose-strong:text-slate-800 dark:prose-strong:text-white
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic
            prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-300">
            
            <p className="first-letter:text-6xl first-letter:font-black first-letter:font-serif
              first-letter:float-left first-letter:mr-3 first-letter:leading-none
              first-letter:text-blue-600 first-letter:pr-2">
              {article.excerpt}
            </p>
            
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          {/* Citation */}
          <div className="mt-12 bg-slate-100 dark:bg-white/5 rounded-lg p-6 text-center">
            <Award className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-2">
              Cite This Article
            </p>
            <p className="text-[10px] text-slate-400 font-mono">
              NironCare Health Journal. (2025). Vol 5, pp. 24-31.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 border-t border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-slate-300 dark:bg-slate-700" />
              <h2 className="text-[11px] font-black uppercase tracking-[.25em] text-slate-500 dark:text-slate-400">
                Continue Reading
              </h2>
              <div className="h-px flex-1 bg-slate-300 dark:bg-slate-700" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link key={related.id} href={`/health-insight/${related.id}`}>
                  <div className="group cursor-pointer">
                    <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                      <Image
                        src={related.img}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${categoryColors[related.category]}`}>
                          {related.category}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-black font-serif text-slate-800 dark:text-white text-base leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {related.date} · {related.readTime} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter CTA */}

      </main>
      <CTA/>
      <Footer />
    </>
  );
}