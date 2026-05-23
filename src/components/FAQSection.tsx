import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, BookOpen, Weight, Coffee, HelpCircle } from 'lucide-react';
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
      case 'nutrition': return <Coffee className="h-4 w-4 text-orange-400" />;
      case 'training': return <Weight className="h-4 w-4 text-[#bfff00]" />;
      default: return <BookOpen className="h-4 w-4 text-blue-400" />;
    }
  };

  const getTabBadge = (category: string) => {
    switch (category) {
      case 'nutrition': return 'Nutrition Science';
      case 'training': return 'Biomechanics';
      default: return 'Elite Coaching';
    }
  };

  const tabs = [
    { id: 'all', label: 'All Questions', count: FAQ_DATA.length, activeClass: 'bg-[rgba(255,255,255,0.06)] text-white border-white/15' },
    { id: 'nutrition', label: 'Nutrition', count: FAQ_DATA.filter(f => f.category === 'nutrition').length, activeClass: 'bg-orange-950/30 text-orange-400 border-orange-800/40' },
    { id: 'training', label: 'Training', count: FAQ_DATA.filter(f => f.category === 'training').length, activeClass: 'bg-[rgba(191,255,0,0.06)] text-[#bfff00] border-[rgba(191,255,0,0.2)]' },
    { id: 'coaching', label: 'Coaching', count: FAQ_DATA.filter(f => f.category === 'coaching').length, activeClass: 'bg-blue-950/30 text-blue-400 border-blue-800/40' },
  ];

  return (
    <div id="faq-section" className="space-y-14">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto space-y-4">
        <span className="section-badge">
          <HelpCircle className="h-3 w-3" />
          FAQ
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-[-0.03em] uppercase">
          Common Questions
        </h2>
        <p className="text-[#8d9479] text-sm leading-relaxed">
          I believe that a great coaching relationship is built on clear communication and understanding. Here are honest, simple answers to how my training programs work.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left — Filters */}
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
          <p className="text-[10px] font-mono text-[#434933] uppercase tracking-widest font-bold">Filter by category</p>
          <div className="flex flex-wrap lg:flex-col gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setOpenIndex(0); }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer border text-left ${
                  activeTab === tab.id
                    ? tab.activeClass
                    : 'text-[#8d9479] border-transparent hover:text-white hover:border-white/10'
                }`}
              >
                <span className="uppercase">{tab.label}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold font-mono ${
                  activeTab === tab.id ? 'bg-black/20' : 'bg-white/5 text-[#434933]'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Sidebar promo card */}
          <div className="glass-card-lime rounded-2xl p-5 mt-6 space-y-3">
            <p className="text-[10px] font-mono text-[#bfff00] uppercase tracking-widest font-bold">Still have questions?</p>
            <p className="text-xs text-[#8d9479] leading-relaxed">
              Every physique is unique. Reach out directly and get a personalised answer.
            </p>
            <a
              href="https://wa.me/917297946193?text=Hi%20Ishan%2C%20I%20have%20a%20question%20about%20your%20coaching."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[10px] font-mono text-black bg-[#bfff00] px-3 py-2 rounded-lg font-bold uppercase tracking-wider hover:bg-white transition-colors"
            >
              Ask Ishan directly
            </a>
          </div>
        </div>

        {/* Right — Accordion */}
        <div className="lg:col-span-8 space-y-3">
          {filteredFAQ.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'glass-card-lime border-[rgba(191,255,0,0.2)]'
                    : 'glass-card hover:border-[rgba(191,255,0,0.1)]'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer gap-4 group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 border transition-colors ${
                      isOpen
                        ? 'bg-[rgba(191,255,0,0.1)] border-[rgba(191,255,0,0.2)]'
                        : 'bg-[rgba(255,255,255,0.04)] border-white/8 group-hover:bg-[rgba(191,255,0,0.05)]'
                    }`}>
                      {getCategoryIcon(faq.category)}
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-[#434933] uppercase tracking-widest block mb-1">
                        {getTabBadge(faq.category)}
                      </span>
                      <h4 className={`text-sm font-bold tracking-tight leading-tight transition-colors ${
                        isOpen ? 'text-[#bfff00]' : 'text-white group-hover:text-[#bfff00]'
                      }`}>
                        {faq.question}
                      </h4>
                    </div>
                  </div>
                  <ChevronDown className={`h-5 w-5 shrink-0 transition-all duration-300 ${
                    isOpen ? 'rotate-180 text-[#bfff00]' : 'text-[#8d9479] group-hover:text-[#bfff00]'
                  }`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-sm text-[#8d9479] leading-relaxed pl-[4.5rem] border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filteredFAQ.length === 0 && (
            <div className="text-center py-14 glass-card rounded-2xl text-[#8d9479]">
              No FAQs matching this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
