import React from 'react';
import { Article } from '../types';

const articles: Article[] = [
  {
    id: '1',
    title: 'experience diet',
    excerpt: "today's overconsumption goes way deeper than you think.",
    readTime: '15m read',
    url: 'https://modelsforreality.substack.com/p/experience-diet',
  },
  {
    id: '2',
    title: 'consistency constant',
    excerpt: 'escaping the gravity of your current situation becomes simple if you understand your orbit.',
    readTime: '12m read',
    url: 'https://modelsforreality.substack.com/p/consistency-constant',
  },
  {
    id: '3',
    title: 'cake saves lives',
    excerpt: "existential philosophy doesn't have to be boring at all.",
    readTime: '2m read',
    url: 'https://modelsforreality.substack.com/p/cake-saves-lives',
  },
  {
    id: '4',
    title: 'the inertia effect',
    excerpt: 'a quick and in depth understanding of momentum in everyday life.',
    readTime: '6m read',
    url: 'https://modelsforreality.substack.com/p/the-inertia-effect',
  },
];

const WritingSection: React.FC = () => {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-12 justify-center">
        <h2 className="text-3xl font-bold tracking-tight text-[#e9dfda]">writing</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <a 
            key={article.id} 
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-8 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:bg-neutral-900 hover:border-neutral-700 transition-all cursor-pointer flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono text-neutral-500 tracking-widest">{article.readTime}</span>
            </div>
            <h3 className="text-2xl font-bold text-[#e9dfda] mb-3 group-hover:text-[#f3efed]">{article.title}</h3>
            <p className="text-neutral-400 leading-relaxed mb-6 flex-grow">{article.excerpt}</p>
            <span className="text-sm font-semibold text-[#e9dfda] underline decoration-neutral-700 group-hover:decoration-[#e9dfda] transition-all underline-offset-4 mt-auto">
              read article
            </span>
          </a>
        ))}
      </div>

      <div className="pt-12 text-center">
        <a 
          href="https://modelsforreality.substack.com/"
          target="_blank"
          rel="noopener noreferrer" 
          className="text-base font-bold border-b border-[#e9dfda]/30 pb-[3px] hover:pb-1 cursor-pointer hover:border-[#e9dfda] transition-all duration-300 hover:text-[#e9dfda] text-[#e9dfda]/30 inline-block"
        >
          read more
        </a>
      </div>
    </section>
  );
};

export default WritingSection;