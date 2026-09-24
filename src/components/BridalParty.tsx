import React from 'react';
import { BRIDAL_PARTY } from '../data/weddingData';
import { Language } from '../types/wedding';

interface BridalPartyProps {
  language: Language;
}

export const BridalParty: React.FC<BridalPartyProps> = ({ language }) => {
  const isAr = language === 'ar';

  return (
    <section id="bridal-party" className="py-24 bg-white dark:bg-[#161412] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#C69A39] dark:text-[#DFBF77] bg-[#C69A39]/10 px-4 py-1.5 rounded-full mb-3 border border-[#C69A39]/20">
            {isAr ? 'أغلى الناس' : 'VIP & Bridal Party'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
            {isAr ? 'العائلة وسند القلوب' : 'Cherished Family & Bridal Party'}
          </h2>
          <div className="text-[#C69A39] text-xl mb-3">❦</div>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'من غمرونا بفيض المحبة والنصح والدعوات الصادقة لنصل معاً إلى هذا اليوم المبارك'
              : 'The pillars of strength, boundless love, and joy standing beside us today'}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRIDAL_PARTY.map((person) => (
            <div
              key={person.id}
              className="bg-stone-50 dark:bg-[#1C1A17] p-6 rounded-3xl border border-stone-200/90 dark:border-stone-800 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1.5 group flex flex-col items-center"
            >
              {/* Photo with gold ring border */}
              <div className="relative w-28 h-28 mb-5 rounded-full p-1 bg-gradient-to-tr from-[#C69A39] to-[#DFBF77] shadow-md">
                <img
                  src={person.imageUrl}
                  alt={isAr ? person.nameAr : person.nameEn}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <span className="text-xs font-bold text-[#C69A39] uppercase tracking-wider mb-1">
                {isAr ? person.roleAr : person.roleEn}
              </span>

              <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 mb-2">
                {isAr ? person.nameAr : person.nameEn}
              </h4>

              <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
                {isAr ? person.relationAr : person.relationEn}
              </p>

              <blockquote className="text-xs italic text-stone-600 dark:text-stone-400 border-t border-stone-200 dark:border-stone-800 pt-3 mt-auto leading-relaxed">
                {isAr ? person.quoteAr : person.quoteEn}
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
