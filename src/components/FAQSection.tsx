import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, BookOpen, Weight, Coffee } from 'lucide-react';
import { FAQ_DATA } from '../fitnessData';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'all' | 'nutrition' | 'training' | 'coaching'>('all');

  const filteredFAQ = FAQ_DATA.filter(item => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'nutrition':
        return <Coffee className="h-4 w-4 text-orange-400" />;
      case 'training':
        return <Weight className="h-4 w-4 text-lime-400" />;
      default:
        return <BookOpen className="h-4 w-4 text-blue-400" />;
    }
  };

  const getTabBadge = (category: string) => {
    switch (category) {
      case 'nutrition': return 'Nutrition Science';
      case 'training': return 'Biomechanics';
      default: return 'Elite Coaching';
    }
  };

  return (
    <div id="faq-section" className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* FAQ Left Hero Side */}
      <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
        <div className="space-y-3">
          <span className="text-[10px] font-mono tracking-widest text-[#bfff00] uppercase font-bold">
            Cognitive Interlock
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            QUESTIONS & INTELLECT
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            I believe that a great coaching relationship is built on extreme context and understanding. Here are my raw answers to common inquiries guided by advanced training sciences.
          </p>
        </div>

        {/* Accordion Filters */}
        <div className="flex flex-wrap lg:flex-col gap-2 pt-2">
          <button
            onClick={() => { setActiveTab('all'); setOpenIndex(0); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all font-mono text-left cursor-pointer flex items-center justify-between min-w-[120px] ${
              activeTab === 'all'
                ? 'bg-zinc-800 text-white border border-zinc-700'
                : 'text-zinc-400 hover:text-white border border-transparent'
            }`}
          >
            <span>SHOW ALL SYSTEM COGNITION</span>
            <span className="text-[9px] bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-500 font-bold">{FAQ_DATA.length}</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('nutrition'); setOpenIndex(0); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all font-mono text-left cursor-pointer flex items-center gap-2 ${
              activeTab === 'nutrition'
                ? 'bg-orange-950/30 border border-orange-900/40 text-orange-400'
                : 'text-zinc-400 hover:text-white border border-transparent'
            }`}
          >
            <Coffee className="h-3.5 w-3.5" />
            <span>NUTRITION BIOENERGETICS</span>
          </button>

          <button
            onClick={() => { setActiveTab('training'); setOpenIndex(0); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all font-mono text-left cursor-pointer flex items-center gap-2 ${
              activeTab === 'training'
                ? 'bg-lime-950/30 border border-lime-900/40 text-[#bfff00]'
                : 'text-zinc-400 hover:text-white border border-transparent'
            }`}
          >
            <Weight className="h-3.5 w-3.5" />
            <span>BIOMECHANICAL TRAINING</span>
          </button>

          <button
            onClick={() => { setActiveTab('coaching'); setOpenIndex(0); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all font-mono text-left cursor-pointer flex items-center gap-2 ${
              activeTab === 'coaching'
                ? 'bg-blue-950/30 border border-blue-900/30 text-blue-400'
                : 'text-zinc-400 hover:text-white border border-transparent'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>COMMITTED COACHING</span>
          </button>
        </div>
      </div>

      {/* Accordion Right Side */}
      <div className="lg:col-span-8 space-y-4">
        {filteredFAQ.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className={`border rounded-2xl transition-all duration-300 ${
                isOpen
                  ? 'bg-zinc-900/40 border-zinc-700'
                  : 'bg-zinc-950/60 border-zinc-850 hover:border-zinc-805'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer gap-4 group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-1.5 bg-zinc-900 rounded-lg group-hover:bg-zinc-800 transition-colors mt-0.5 shrink-0 flex items-center justify-center border border-zinc-800">
                    {getCategoryIcon(faq.category)}
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-0.5">
                      {getTabBadge(faq.category)}
                    </span>
                    <h4 className="text-sm md:text-md font-bold text-white tracking-tight leading-tight group-hover:text-[#bfff00] transition-colors">
                      {faq.question}
                    </h4>
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 text-zinc-500 transition-transform duration-300 shrink-0 ${
                  isOpen ? 'transform rotate-180 text-lime-400' : ''
                }`} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-zinc-300 leading-relaxed pl-[4.25rem] border-t border-zinc-850/60">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {filteredFAQ.length === 0 && (
          <div className="text-center py-12 bg-zinc-950 border border-zinc-850 rounded-2xl text-zinc-500">
            No FAQs matching this biological category.
          </div>
        )}
      </div>
    </div>
  );
}
