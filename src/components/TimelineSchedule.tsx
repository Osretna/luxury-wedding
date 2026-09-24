import React from 'react';
import { Wine, Crown, Utensils, Music, Disc, Sparkles } from 'lucide-react';
import { SCHEDULE_EVENTS } from '../data/weddingData';
import { Language } from '../types/wedding';

interface TimelineScheduleProps {
  language: Language;
}

export const TimelineSchedule: React.FC<TimelineScheduleProps> = ({ language }) => {
  const isAr = language === 'ar';

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wine':
        return <Wine className="w-5 h-5 text-[#C69A39]" />;
      case 'Crown':
        return <Crown className="w-5 h-5 text-[#C69A39]" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-[#C69A39]" />;
      case 'Music':
        return <Music className="w-5 h-5 text-[#C69A39]" />;
      case 'Disc':
        return <Disc className="w-5 h-5 text-[#C69A39]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#C69A39]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#C69A39]" />;
    }
  };

  return (
    <section id="timeline" className="py-24 bg-[#FAF8F5] dark:bg-[#121110] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#C69A39] dark:text-[#DFBF77] bg-[#C69A39]/10 px-4 py-1.5 rounded-full mb-3 border border-[#C69A39]/20">
            {isAr ? 'ساعات الفرح' : 'Wedding Flow'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
            {isAr ? 'الجدول الزمني لليوم الكبير' : 'Day Schedule & Timeline'}
          </h2>
          <div className="text-[#C69A39] text-xl mb-3">❦</div>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'تسلسل فقرات الحفل المبارك من لحظة الاستقبال الأولى وحتى وداع العروسين'
              : 'The sequential celebration program from guest arrival to the sparkler send-off'}
          </p>
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          {SCHEDULE_EVENTS.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#1A1816] p-5 sm:p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-all hover:border-[#C69A39]/60 flex items-start gap-4 sm:gap-6 group"
            >
              {/* Time Column */}
              <div className="w-24 sm:w-28 flex-shrink-0 pt-0.5">
                <span className="font-serif font-bold text-base sm:text-lg text-[#C69A39] block">
                  {isAr ? item.timeAr : item.timeEn}
                </span>
              </div>

              {/* Icon badge */}
              <div className="w-10 h-10 rounded-full bg-[#C69A39]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                {getStepIcon(item.icon)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 mb-1">
                  {isAr ? item.titleAr : item.titleEn}
                </h4>
                <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm leading-relaxed">
                  {isAr ? item.descriptionAr : item.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
