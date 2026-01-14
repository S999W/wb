import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // TODO: Replace 'alexandervance' with your actual Substack subdomain
    // Example: if your substack is 'coolmusic.substack.com', put 'coolmusic' here.
    const substackSubdomain = 'modelsforreality'; 
    const subscribeUrl = `https://${substackSubdomain}.substack.com/subscribe?email=${encodeURIComponent(email)}`;

    // Open in new tab so they don't leave your portfolio
    window.open(subscribeUrl, '_blank');
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <div className="space-y-4">
        <h2 className="text-sm font-medium tracking-[0.3em] text-neutral-400 uppercase">
          steezy
        </h2>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight text-[#e9dfda]">
          raw. real. rhythmic.<br />
          
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 max-w-xl mx-auto leading-relaxed">
          most content is synthetic boring slop. fuck that. i deliver raw insight with musical rhythm to create something that touches the soul instead of the brain.
          <br />
          get ready.
        </p>
      </div>

      <div className="w-full max-w-md space-y-3">
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your email address" 
            className="flex-1 bg-neutral-900 border border-neutral-800 text-[#e9dfda] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e9dfda]/20 transition-all placeholder:text-neutral-600"
            required
          />
          <button type="submit" className="bg-[#e9dfda] text-[#1c1b1a] px-6 py-3 rounded-md font-bold hover:bg-[#d6cdc8] transition-colors flex items-center justify-center gap-2">
            join
            <ArrowRight size={16} />
          </button>
        </form>
        <p className="text-xs text-neutral-500">no spam. unsubscribe anytime.</p>
      </div>

      <div className="pt-12">
        <Link 
          to="/apply"
          className="text-base font-bold border-b border-[#e9dfda]/30 pb-[3px] hover:pb-1 cursor-pointer hover:border-[#e9dfda] transition-all duration-300 hover:text-[#e9dfda] text-[#e9dfda]/30 inline-block bg-transparent"
        >
          work with me
        </Link>
      </div>
    </section>
  );
};

export default Hero;