import React from 'react';
import { Star, MapPin, Tag, ExternalLink } from 'lucide-react';
import { HOTEL_RECOMMENDATIONS } from '../data/weddingData';
import { Language } from '../types/wedding';

interface TravelAccommodationsProps {
  language: Language;
}

export const TravelAccommodations: React.FC<TravelAccommodationsProps> = ({ language }) => {
  const isAr = language === 'ar';

  return (
    <section id="accommodations" className="py-24 bg-[#FAF8F5] dark:bg-[#121110] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#C69A39] dark:text-[#DFBF77] bg-[#C69A39]/10 px-4 py-1.5 rounded-full mb-3 border border-[#C69A39]/20">
            {isAr ? 'إقامة مريحة' : 'Accommodations'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
            {isAr ? 'فنادق وإقامة مقترحة لضيوفنا' : 'Nearby Hotels & Stay'}
          </h2>
          <div className="text-[#C69A39] text-xl mb-3">❦</div>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'خيارات إقامة فاخرة قريبة من القاعة الملكية مع كود خصم خاص بضيوف حفل زفافنا'
              : 'Curated luxury accommodations near the wedding venue with exclusive guest discount rates'}
          </p>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOTEL_RECOMMENDATIONS.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white dark:bg-[#1A1816] rounded-3xl border border-stone-200/90 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1.5 flex flex-col"
            >
              {/* Hotel Image */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={hotel.imageUrl}
                  alt={isAr ? hotel.nameAr : hotel.nameEn}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full text-amber-400 text-xs font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>5 نجوم</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 mb-1">
                    {isAr ? hotel.nameAr : hotel.nameEn}
                  </h4>

                  <div className="flex items-center gap-1 text-xs text-[#C69A39] font-medium mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{isAr ? hotel.distanceAr : hotel.distanceEn}</span>
                  </div>

                  <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm leading-relaxed mb-4">
                    {isAr ? hotel.descriptionAr : hotel.descriptionEn}
                  </p>
                </div>

                {/* Discount and Link */}
                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-stone-700 dark:text-stone-300">
                    <Tag className="w-3.5 h-3.5 text-[#C69A39]" />
                    <span className="font-mono font-bold bg-amber-50 dark:bg-amber-950/40 text-[#C69A39] px-2 py-0.5 rounded-md border border-[#C69A39]/30">
                      {hotel.discountCode}
                    </span>
                  </div>

                  <a
                    href={hotel.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-stone-900 dark:text-stone-100 hover:text-[#C69A39] flex items-center gap-1"
                  >
                    <span>{isAr ? 'حجز' : 'Book'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
