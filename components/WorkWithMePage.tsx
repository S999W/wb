import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkWithMePage: React.FC = () => {
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [fit, setFit] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const budgetOptions = ['$1.000 - $3.000', '$2.000 - $5.000', '$5.000 - $10.000', '$10.000+'];
  const timelineOptions = ['right now (rush fee may apply)', 'next 2-4 weeks', 'next month', 'no rush'];
  const serviceOptions = ['ghostwriting/newsletter management', 'brand voice & philosophy', 'creative direction', 'music / audio production', 'other'];

  const toggleService = (option: string) => {
    setServices(prev => 
      prev.includes(option) 
        ? prev.filter(s => s !== option) 
        : [...prev, option]
    );
  };

  return (
    <section className="py-12 px-4 max-w-2xl mx-auto animate-fade-in-up">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#e9dfda] mb-4">apply to work with me</h1>
        <p className="text-neutral-500">let's build something real.</p>
      </div>

      <form action="https://formsubmit.co/contact@stzywav.com" method="POST" className="space-y-12">
        {/* Hidden Configuration Fields for FormSubmit */}
        <input type="hidden" name="_subject" value="New Application - stzywav.com" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        {/* Update _next to use the hashed URL format for GitHub Pages */}
        <input type="hidden" name="_next" value="https://stzywav.com/#/thanks" />
        
        {/* Hidden Data Fields (Mapping React State to Form Data) */}
        <input type="hidden" name="budget" value={budget} />
        <input type="hidden" name="timeline" value={timeline} />
        <input type="hidden" name="services" value={services.join(', ')} />

        {/* Budget */}
        <div className="space-y-4">
          <label className="block text-lg font-bold tracking-wider text-neutral-400">budget</label>
          <div className="flex flex-wrap gap-3">
            {budgetOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setBudget(opt)}
                className={`px-5 py-3 rounded-full border text-sm transition-all duration-300 ${
                  budget === opt 
                    ? 'bg-[#e9dfda] text-[#1c1b1a] border-[#e9dfda]' 
                    : 'bg-transparent border-neutral-800 text-neutral-400 hover:border-neutral-600'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          <label className="block text-lg font-bold tracking-wider text-neutral-400">what's your timeline?</label>
          <div className="flex flex-wrap gap-3">
            {timelineOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setTimeline(opt)}
                className={`px-5 py-3 rounded-full border text-sm transition-all duration-300 ${
                  timeline === opt 
                    ? 'bg-[#e9dfda] text-[#1c1b1a] border-[#e9dfda]' 
                    : 'bg-transparent border-neutral-800 text-neutral-400 hover:border-neutral-600'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Why Fit */}
        <div className="space-y-4">
          <label className="block text-lg font-bold tracking-wider text-neutral-400">why do you think we're a good fit?</label>
          <textarea
            name="why_fit"
            value={fit}
            onChange={(e) => setFit(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-[#e9dfda] focus:outline-none focus:border-[#e9dfda]/50 transition-colors min-h-[120px] placeholder:text-neutral-700"
            placeholder="tell me about your vision..."
            required
          />
        </div>

        {/* Services */}
        <div className="space-y-4">
          <label className="block text-lg font-bold tracking-wider text-neutral-400">what do you need help with?</label>
          <div className="flex flex-wrap gap-3">
            {serviceOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => toggleService(opt)}
                className={`px-5 py-3 rounded-full border text-sm transition-all duration-300 ${
                  services.includes(opt) 
                    ? 'bg-[#e9dfda] text-[#1c1b1a] border-[#e9dfda]' 
                    : 'bg-transparent border-neutral-800 text-neutral-400 hover:border-neutral-600'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <label className="block text-lg font-bold tracking-wider text-neutral-400">describe your wishes or add a message</label>
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-[#e9dfda] focus:outline-none focus:border-[#e9dfda]/50 transition-colors min-h-[120px] placeholder:text-neutral-700"
            placeholder="additional details..."
          />
        </div>

        {/* Submit */}
        <div className="pt-8 flex justify-center">
            <div className="w-full max-w-md">
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your email address"
                        className="flex-1 bg-neutral-900 border border-neutral-800 text-[#e9dfda] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e9dfda]/20 transition-all placeholder:text-neutral-600"
                        required
                    />
                    <button 
                        type="submit" 
                        disabled={!budget || !timeline || services.length === 0 || !fit || !email}
                        className="bg-[#e9dfda] text-[#1c1b1a] px-6 py-3 rounded-md font-bold hover:bg-[#d6cdc8] transition-colors flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap group"
                    >
                        apply
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
      </form>
    </section>
  );
};

export default WorkWithMePage;