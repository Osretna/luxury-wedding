import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Heart, Printer, Send, Sparkles } from 'lucide-react';
import { Language, WeddingConfig } from '../types/wedding';

interface HeroProps {
  language: Language;
  config: WeddingConfig;
  onOpenPrintModal: () => void;
  onOpenEditor: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  language, 
  config, 
  onOpenPrintModal,
  onOpenEditor,
}) => {
  const isAr = language === 'ar';

  // Countdown timer to dynamic wedding date
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(config.weddingDateISO).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [config.weddingDateISO]);

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 overflow-hidden"
    >
      {/* Background Image with luxury dark/gold vignette overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed transform scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('${config.heroImage}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/75 to-[#121110]/85" />
      </div>

      {/* Decorative Gold Rings / Floating Circles */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full border border-[#C69A39]/20 blur-sm pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 rounded-full border border-[#DFBF77]/15 blur-sm pointer-events-none" />

      {/* Content Box */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Monogram emblem */}
        <div className="inline-flex items-center justify-center gap-3 mb-4 px-6 py-2 rounded-full border border-[#DFBF77]/40 bg-black/40 backdrop-blur-sm text-[#DFBF77]">
          <span className="text-sm tracking-widest uppercase font-serif">❖</span>
          <span className="font-serif text-2xl tracking-widest font-bold">
            {config.monogram}
          </span>
          <span className="text-sm tracking-widest uppercase font-serif">❖</span>
        </div>

        {/* Subtitle invitation headline */}
        <p className="text-sm md:text-base text-[#DFBF77] font-medium tracking-wide uppercase mb-3">
          {isAr ? 'نتشرف بدعوتكم لحضور حفل زفاف' : 'Request the honor of your presence at the wedding of'}
        </p>

        {/* Main Couple Names */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-md mb-4 leading-tight">
          <span className="gold-gradient-text">
            {isAr ? config.coupleShortAr : config.coupleShortEn}
          </span>
        </h1>

        {/* Quranic / Romantic Verse */}
        <div className="max-w-2xl mx-auto mb-6 px-4">
          <p className="font-serif text-stone-300 text-base md:text-lg italic leading-relaxed">
            {isAr ? config.quoteAr : config.quoteEn}
          </p>
        </div>

        {/* Date and Location Badge */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-stone-200 mb-8 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/15">
          <div className="flex items-center gap-1.5 text-[#DFBF77]">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">
              {isAr ? config.dateFormattedAr : config.dateFormattedEn}
            </span>
          </div>
          <span className="text-white/40 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-stone-300">
            <MapPin className="w-4 h-4 text-[#DFBF77]" />
            <span>
              {isAr ? config.venueNameAr : config.venueNameEn}
            </span>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="grid grid-cols-4 gap-3 sm:gap-5 mb-8 w-full max-w-lg">
          {[
            { labelAr: 'أيام', labelEn: 'Days', val: timeLeft.days },
            { labelAr: 'ساعات', labelEn: 'Hours', val: timeLeft.hours },
            { labelAr: 'دقائق', labelEn: 'Minutes', val: timeLeft.minutes },
            { labelAr: 'ثواني', labelEn: 'Seconds', val: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-black/50 backdrop-blur-md border border-[#DFBF77]/30 rounded-2xl p-3 sm:p-4 text-center shadow-lg transition-transform hover:-translate-y-1"
            >
              <span className="block font-serif text-2xl sm:text-4xl font-bold text-[#DFBF77]">
                {formatNumber(item.val)}
              </span>
              <span className="text-[11px] sm:text-xs text-stone-400 uppercase tracking-wider mt-1 font-medium">
                {isAr ? item.labelAr : item.labelEn}
              </span>
            </div>
          ))}
        </div>

        {/* Prominent Card Customizer Banner / Studio Trigger */}
        <div className="mb-8 w-full max-w-lg">
          <button
            onClick={onOpenEditor}
            className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-[#DFBF77]/20 via-[#C69A39]/30 to-[#DFBF77]/20 hover:from-[#C69A39]/40 hover:to-[#DFBF77]/40 border border-[#DFBF77]/60 text-white backdrop-blur-md flex items-center justify-center gap-2.5 transition-all shadow-lg hover:scale-102 group"
          >
            <Sparkles className="w-4 h-4 text-[#DFBF77] group-hover:rotate-12 transition-transform" />
            <span className="text-xs sm:text-sm font-bold text-[#DFBF77]">
              {isAr ? '✨ اضغط هنا لتخصيص أسماء العروسين وتصميم كرت الدعوة الخاص بك' : '✨ Click here to customize couple names & design your card'}
            </span>
          </button>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#rsvp"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-gradient-to-r from-[#C69A39] via-[#DFBF77] to-[#97711B] text-white hover:brightness-110 shadow-lg shadow-[#C69A39]/30 transition-all hover:scale-105"
          >
            <Send className="w-4 h-4" />
            <span>{isAr ? 'تأكيد الحضور (RSVP)' : 'RSVP Now'}</span>
          </a>

          <a
            href="#details"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-white/15 hover:bg-white/25 text-white border border-white/25 backdrop-blur-sm transition-all hover:-translate-y-0.5"
          >
            <Heart className="w-4 h-4 text-[#DFBF77]" />
            <span>{isAr ? 'تفاصيل الحفل' : 'Event Details'}</span>
          </a>

          <button
            onClick={onOpenPrintModal}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-black/40 hover:bg-black/60 text-[#DFBF77] border border-[#DFBF77]/50 backdrop-blur-sm transition-all hover:-translate-y-0.5"
          >
            <Printer className="w-4 h-4" />
            <span>{isAr ? 'بطاقة الدعوة للطباعة' : 'Print Invitation'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
