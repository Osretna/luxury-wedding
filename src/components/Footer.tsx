import React, { useState } from 'react';
import { Heart, Copy, Check, Phone, ArrowUp } from 'lucide-react';
import { Language, WeddingConfig } from '../types/wedding';

interface FooterProps {
  language: Language;
  config: WeddingConfig;
}

export const Footer: React.FC<FooterProps> = ({ language, config }) => {
  const isAr = language === 'ar';
  const [copiedHashtag, setCopiedHashtag] = useState(false);

  const handleCopyHashtag = () => {
    const tag = isAr ? config.hashtag : config.hashtagEn;
    navigator.clipboard.writeText(tag);
    setCopiedHashtag(true);
    setTimeout(() => setCopiedHashtag(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121110] text-stone-300 py-16 border-t border-[#DFBF77]/20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Monogram */}
        <div className="font-serif text-3xl text-[#DFBF77] font-bold mb-2">
          {config.monogram}
        </div>

        <h3 className="font-serif text-2xl font-bold text-white mb-2">
          {isAr ? config.coupleShortAr : config.coupleShortEn}
        </h3>

        <p className="text-stone-400 text-sm max-w-md mx-auto mb-6">
          {isAr ? config.subQuoteAr : config.subQuoteEn}
        </p>

        {/* Official Hashtag */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-[#DFBF77]/30 mb-8">
          <span className="text-xs text-stone-400 font-medium">
            {isAr ? 'الهاشتاق الرسمي:' : 'Official Hashtag:'}
          </span>
          <span className="font-bold text-sm text-[#DFBF77]">
            {isAr ? config.hashtag : config.hashtagEn}
          </span>
          <button
            onClick={handleCopyHashtag}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#C69A39] text-white flex items-center justify-center transition-colors ml-1"
            title={isAr ? 'نسخ الهاشتاق' : 'Copy Hashtag'}
          >
            {copiedHashtag ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Wedding Planner Contact */}
        <div className="text-xs text-stone-400 mb-8 flex items-center gap-2">
          <Phone className="w-4 h-4 text-[#DFBF77]" />
          <span>{isAr ? config.plannerName : 'Wedding Coordination & Inquiries:'}</span>
          <a
            href={`tel:${config.plannerPhone.replace(/\s+/g, '')}`}
            className="text-[#DFBF77] font-semibold hover:underline font-mono"
            dir="ltr"
          >
            {config.plannerPhone}
          </a>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-stone-400 mb-8">
          <a href="#hero" className="hover:text-[#DFBF77] transition-colors">{isAr ? 'الرئيسية' : 'Home'}</a>
          <a href="#story" className="hover:text-[#DFBF77] transition-colors">{isAr ? 'قصتنا' : 'Our Story'}</a>
          <a href="#details" className="hover:text-[#DFBF77] transition-colors">{isAr ? 'التفاصيل' : 'Details'}</a>
          <a href="#timeline" className="hover:text-[#DFBF77] transition-colors">{isAr ? 'الجدول' : 'Schedule'}</a>
          <a href="#gallery" className="hover:text-[#DFBF77] transition-colors">{isAr ? 'الصور' : 'Gallery'}</a>
          <a href="#dj-music" className="hover:text-[#DFBF77] transition-colors">{isAr ? 'الموسيقى' : 'Music'}</a>
          <a href="#rsvp" className="hover:text-[#DFBF77] transition-colors">{isAr ? 'تأكيد الحضور' : 'RSVP'}</a>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-stone-800 text-stone-500 text-xs flex flex-col sm:flex-row items-center justify-between w-full gap-4">
          <p>
            {isAr
              ? 'جميع الحقوق محفوظة © 2026 - حفل زفاف طارق وسارة الملكي'
              : 'All rights reserved © 2026 - Tarek & Sarah Royal Wedding'}
          </p>
          <p className="flex items-center gap-1">
            <span>{isAr ? 'صُمم بكل فخامة ومحبة' : 'Crafted with elegance & love'}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="mt-8 w-10 h-10 rounded-full bg-stone-800 hover:bg-[#C69A39] text-white flex items-center justify-center transition-all shadow-md hover:-translate-y-1"
          title={isAr ? 'العودة للأعلى' : 'Back to top'}
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};
