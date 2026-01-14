import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ThanksPage: React.FC = () => {
  useEffect(() => {
    document.title = 'thank you';
  }, []);

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight text-[#e9dfda]">
          thanks for reaching out.
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 max-w-xl mx-auto leading-relaxed">
          we will get back to you as soon as possible.
        </p>
      </div>

      <div className="pt-8">
        <Link 
          to="/"
          className="text-base font-bold border-b border-[#e9dfda]/30 pb-[3px] hover:pb-1 cursor-pointer hover:border-[#e9dfda] transition-all duration-300 hover:text-[#e9dfda] text-[#e9dfda]/30 inline-block bg-transparent"
        >
          return home
        </Link>
      </div>
    </section>
  );
};

export default ThanksPage;