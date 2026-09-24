import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/weddingData';
import { Language, GalleryItem } from '../types/wedding';

interface GalleryProps {
  language: Language;
}

export const Gallery: React.FC<GalleryProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeFilter, setActiveFilter] = useState<'all' | 'prewedding' | 'engagement' | 'details' | 'family'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filterOptions = [
    { key: 'all', labelAr: 'جميع الصور', labelEn: 'All Photos' },
    { key: 'prewedding', labelAr: 'جلسة التصوير', labelEn: 'Pre-Wedding' },
    { key: 'engagement', labelAr: 'ليلة الخطوبة', labelEn: 'Engagement' },
    { key: 'details', labelAr: 'الخواتم والتفاصيل', labelEn: 'Details' },
    { key: 'family', labelAr: 'العائلة والمحبة', labelEn: 'Family' },
  ];

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const currentItem: GalleryItem | null = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-24 bg-white dark:bg-[#161412] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#C69A39] dark:text-[#DFBF77] bg-[#C69A39]/10 px-4 py-1.5 rounded-full mb-3 border border-[#C69A39]/20">
            {isAr ? 'أجمل اللحظات' : 'Cherished Moments'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
            {isAr ? 'معرض الصور وذكريات المحبة' : 'Photo Gallery'}
          </h2>
          <div className="text-[#C69A39] text-xl mb-3">❦</div>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'مقتطفات من أجمل جلسات التصوير ولحظات التحضير لليوم الكبير'
              : 'Glimpses into our journey, pre-wedding photoshoot, and celebration preparations'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterOptions.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key as any)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeFilter === tab.key
                  ? 'bg-gradient-to-r from-[#C69A39] to-[#DFBF77] text-white shadow-md shadow-[#C69A39]/25 scale-105'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {isAr ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 bg-stone-100 dark:bg-stone-900 aspect-4/3"
            >
              <img
                src={item.imageUrl}
                alt={isAr ? item.titleAr : item.titleEn}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-serif text-lg font-bold">
                    {isAr ? item.titleAr : item.titleEn}
                  </h4>
                  <Maximize2 className="w-4 h-4 text-[#DFBF77]" />
                </div>
                <p className="text-xs text-[#DFBF77]">
                  {isAr ? item.captionAr : item.captionEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && currentItem && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption */}
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={currentItem.imageUrl}
              alt={isAr ? currentItem.titleAr : currentItem.titleEn}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
            />
            <div className="text-center mt-4 text-white">
              <h4 className="font-serif text-xl font-bold text-[#DFBF77]">
                {isAr ? currentItem.titleAr : currentItem.titleEn}
              </h4>
              <p className="text-sm text-stone-300 mt-1">
                {isAr ? currentItem.captionAr : currentItem.captionEn}
              </p>
              <span className="text-xs text-stone-500 mt-2 block">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
