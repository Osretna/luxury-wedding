import React from 'react';
import { Sparkles, HeartHandshake, Gem, PartyPopper } from 'lucide-react';
import { STORY_MILESTONES } from '../data/weddingData';
import { Language } from '../types/wedding';

interface OurStoryProps {
  language: Language;
}

export const OurStory: React.FC<OurStoryProps> = ({ language }) => {
  const isAr = language === 'ar';

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#C69A39]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#C69A39]" />;
      case 'Gem':
        return <Gem className="w-5 h-5 text-[#C69A39]" />;
      case 'PartyPopper':
        return <PartyPopper className="w-5 h-5 text-[#C69A39]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#C69A39]" />;
    }
  };

  return (
    <section id="story" className="py-24 bg-[#FAF8F5] dark:bg-[#121110] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#C69A39] dark:text-[#DFBF77] bg-[#C69A39]/10 px-4 py-1.5 rounded-full mb-3 border border-[#C69A39]/20">
            {isAr ? 'فصول الحكاية' : 'Our Journey'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
            {isAr ? 'قصة حبنا وبداية العهد' : 'Our Love Story'}
          </h2>
          <div className="text-[#C69A39] text-xl mb-3">❦</div>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'محطات جميلة ومشاعر صادقة قادت خطانا لنلتقي ونبني معاً حياة ملؤها المودة والسكينة'
              : 'Cherished moments and true affection that led us to find home in one another'}
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative">
          {/* Central golden line */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#C69A39]/10 via-[#C69A39] to-[#C69A39]/10" />

          <div className="space-y-16">
            {STORY_MILESTONES.map((milestone, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={milestone.id}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Center Marker on desktop */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-[#1A1816] border-2 border-[#C69A39] items-center justify-center shadow-md z-10">
                    {getIcon(milestone.iconName)}
                  </div>

                  {/* Text Card */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="w-full max-w-md bg-white dark:bg-[#1C1917] p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-[#C69A39] uppercase tracking-wider">
                          {isAr ? milestone.dateAr : milestone.dateEn}
                        </span>
                        <span className="text-stone-300 dark:text-stone-700">•</span>
                        <span className="text-xs font-serif font-bold text-stone-400">
                          {milestone.year}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-3">
                        {isAr ? milestone.titleAr : milestone.titleEn}
                      </h3>

                      <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4">
                        {isAr ? milestone.descriptionAr : milestone.descriptionEn}
                      </p>

                      <div className="md:hidden mt-4 rounded-2xl overflow-hidden h-48">
                        <img
                          src={milestone.imageUrl}
                          alt={isAr ? milestone.titleAr : milestone.titleEn}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Image Card on desktop */}
                  <div className="hidden md:block w-full md:w-1/2">
                    <div className="max-w-md mx-auto h-64 rounded-3xl overflow-hidden shadow-lg border border-stone-200 dark:border-stone-800 group">
                      <img
                        src={milestone.imageUrl}
                        alt={isAr ? milestone.titleAr : milestone.titleEn}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
