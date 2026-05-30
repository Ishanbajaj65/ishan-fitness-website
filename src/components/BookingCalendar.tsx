import { motion } from 'motion/react';
import { Calendar, Phone, CheckCircle } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const TIME_SLOTS = ['9:00 AM', '10:30 AM', '12:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'];

// Pre-defined availability — true = available, false = booked
const AVAILABILITY: Record<string, Record<string, boolean>> = {
  'Mon': { '9:00 AM': false, '10:30 AM': true, '12:00 PM': false, '3:00 PM': true, '5:00 PM': false, '7:00 PM': true },
  'Tue': { '9:00 AM': true, '10:30 AM': false, '12:00 PM': true, '3:00 PM': false, '5:00 PM': true, '7:00 PM': false },
  'Wed': { '9:00 AM': false, '10:30 AM': true, '12:00 PM': false, '3:00 PM': true, '5:00 PM': true, '7:00 PM': false },
  'Thu': { '9:00 AM': true, '10:30 AM': false, '12:00 PM': false, '3:00 PM': true, '5:00 PM': false, '7:00 PM': true },
  'Fri': { '9:00 AM': false, '10:30 AM': true, '12:00 PM': true, '3:00 PM': false, '5:00 PM': true, '7:00 PM': false },
  'Sat': { '9:00 AM': true, '10:30 AM': true, '12:00 PM': false, '3:00 PM': false, '5:00 PM': false, '7:00 PM': true },
};

function buildWhatsAppUrl(day: string, time: string) {
  const msg = encodeURIComponent(
    `Hi Ishan, I'd like to book a free 15-min strategy call on ${day} at ${time}. Is this slot available?`
  );
  return `https://wa.me/917297946193?text=${msg}`;
}

export default function BookingCalendar() {
  return (
    <section id="book-call" className="py-24 border-t border-white/5">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 space-y-4"
        >
          <span className="section-badge">
            <Calendar className="h-3 w-3" />
            Free Strategy Call
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-[-0.03em] uppercase mt-4">
            Book Your <span className="text-[#e11d48] neon-text">15-Min</span> Call
          </h2>
          <p className="text-[#9ca3af] text-sm max-w-lg mx-auto leading-relaxed">
            Get a personalized physique audit on a free 15-minute strategy call. Pick an available slot and Ishan will connect with you directly on WhatsApp.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-card rounded-3xl p-6 md:p-8 overflow-x-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white font-bold text-sm">Availability This Week</p>
                <p className="text-[#9ca3af] text-[10px] font-mono mt-0.5">IST (Indian Standard Time)</p>
              </div>
              <div className="flex items-center gap-4 text-[9px] font-mono uppercase tracking-widest shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded border border-[rgba(225,29,72,0.4)] bg-[rgba(225,29,72,0.08)]" />
                  <span className="text-[#9ca3af]">Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded border border-white/10 bg-white/[0.03]" />
                  <span className="text-white/30">Booked</span>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="min-w-[520px]">
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-2 mb-3">
                <div /> {/* empty corner */}
                {DAYS.map((day) => (
                  <div key={day} className="text-center text-[10px] font-mono font-bold text-[#9ca3af] uppercase tracking-wider">
                    {day}
                  </div>
                ))}
              </div>

              {/* Time rows */}
              {TIME_SLOTS.map((time) => (
                <div key={time} className="grid grid-cols-7 gap-2 mb-2">
                  {/* Time label */}
                  <div className="flex items-center justify-end pr-2">
                    <span className="text-[9px] font-mono text-white/30 whitespace-nowrap">{time}</span>
                  </div>

                  {/* Slots */}
                  {DAYS.map((day) => {
                    const isAvailable = AVAILABILITY[day]?.[time];
                    return isAvailable ? (
                      <a
                        key={day}
                        href={buildWhatsAppUrl(day, time)}
                        target="_blank"
                        rel="noreferrer"
                        title={`Book ${day} ${time}`}
                        className="group h-9 rounded-lg border border-[rgba(225,29,72,0.3)] bg-[rgba(225,29,72,0.05)] hover:bg-[rgba(225,29,72,0.15)] hover:border-[rgba(225,29,72,0.6)] transition-all flex items-center justify-center cursor-pointer"
                      >
                        <span className="text-[8px] font-mono text-[#e11d48] opacity-0 group-hover:opacity-100 transition-opacity font-bold">Book</span>
                      </a>
                    ) : (
                      <div
                        key={day}
                        className="h-9 rounded-lg border border-white/5 bg-white/[0.015] flex items-center justify-center"
                      >
                        <div className="h-1 w-4 rounded-full bg-white/10" />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <p className="mt-5 text-[9px] font-mono text-white/20 text-center">
              Click any green slot to book via WhatsApp • Slots shown in IST
            </p>
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* What to expect */}
            <div className="glass-card rounded-3xl p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[rgba(225,29,72,0.08)] border border-[rgba(225,29,72,0.2)] flex items-center justify-center">
                  <Phone className="h-4 w-4 text-[#e11d48]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Free 15-Min Strategy Call</p>
                  <p className="text-[10px] font-mono text-[#9ca3af]">No sales pitch. Just strategy.</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  'We map your current physique baseline',
                  'Identify your #1 bottleneck to progress',
                  'Outline a custom 12–16 week roadmap',
                  'You decide if coaching is the right fit',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="h-3.5 w-3.5 text-[#e11d48] shrink-0 mt-0.5 stroke-[2.5]" />
                    <span className="text-xs text-[#9ca3af] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA fallback */}
            <a
              href="https://wa.me/917297946193?text=Hi%20Ishan%2C%20I%27d%20like%20to%20book%20a%20free%2015-minute%20strategy%20call."
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 neon-btn py-4 rounded-2xl font-mono text-xs font-black uppercase tracking-widest hover:scale-[0.98] transition-transform"
            >
              <Calendar className="h-4 w-4" />
              Book on WhatsApp
            </a>

            <p className="text-center text-[9px] font-mono text-white/25 leading-relaxed">
              Availability updates weekly. Limited to 5 calls/week.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
