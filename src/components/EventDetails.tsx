import React from 'react';
import { Clock, MapPin, ExternalLink, Sparkles, Shirt, Utensils, Music } from 'lucide-react';
import { Language, WeddingConfig } from '../types/wedding';

interface EventDetailsProps {
  language: Language;
  config: WeddingConfig;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ language, config }) => {
  const isAr = language === 'ar';

  const detailsCards = [
    {
      titleAr: 'مراسم الزفاف والزفة الملكية',
      titleEn: 'Royal Zaffa & Ceremony',
      timeAr: config.timeAr,
      timeEn: config.timeEn,
      hallAr: config.venueNameAr,
      hallEn: config.venueNameEn,
      descAr: 'استقبال ضيوفنا الكرام بالبخور والقهوة، تليها الزفة الملوكية ودخول العروسين.',
      descEn: 'Warm royal reception with incense and coffee, followed by the grand entrance.',
      icon: <Sparkles className="w-6 h-6 text-[#C69A39]" />,
      highlight: false,
    },
    {
      titleAr: 'مأدبة العشاء الملكي الفاخر',
      titleEn: 'Gourmet Banquet & Dinner',
      timeAr: '08:30 مساءً',
      timeEn: '08:30 PM AST',
      hallAr: 'الجناح الإمبراطوري للضيافة',
      hallEn: 'Imperial Hospitality Pavilion',
      descAr: 'بوفيه عشاء فاخر ومحطات طهي حية تحت إشراف نخبة من كبار الطهاة العالميين.',
      descEn: 'A five-star gourmet dinner featuring live culinary stations and international cuisine.',
      icon: <Utensils className="w-6 h-6 text-[#C69A39]" />,
      highlight: true,
    },
    {
      titleAr: 'سهرة الديجي والاحتفال المشتعل',
      titleEn: 'DJ Night & Celebrations',
      timeAr: '10:30 مساءً',
      timeEn: '10:30 PM AST',
      hallAr: 'ساحة الرقص والاحتفالات الكبرى',
      hallEn: 'Grand Celebration Lounge',
      descAr: 'أجواء موسيقية غنائية مبهجة مع ديجي الحفل ومفاجآت رقص حماسية حتى منتصف الليل.',
      descEn: 'High-energy musical fiesta with our celebrity DJ and joyous dancing.',
      icon: <Music className="w-6 h-6 text-[#C69A39]" />,
      highlight: false,
    },
  ];

  return (
    <section id="details" className="py-24 bg-white dark:bg-[#161412] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#C69A39] dark:text-[#DFBF77] bg-[#C69A39]/10 px-4 py-1.5 rounded-full mb-3 border border-[#C69A39]/20">
            {isAr ? 'دليل الضيوف' : 'Guest Guide'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
            {isAr ? 'تفاصيل الحفل والموقع' : 'Event Details & Venue'}
          </h2>
          <div className="text-[#C69A39] text-xl mb-3">❦</div>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'كل ما يهمكم معرفته عن أوقات الفعاليات ومقر القاعة الملكية وكود اللباس المعتمد'
              : 'Essential information regarding schedule, venue location, and formal dress code'}
          </p>
        </div>

        {/* 3 Detail Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {detailsCards.map((card, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 flex flex-col ${
                card.highlight
                  ? 'bg-gradient-to-b from-[#FAF6EE] to-white dark:from-[#211D19] dark:to-[#181614] border-[#C69A39] shadow-xl shadow-[#C69A39]/15'
                  : 'bg-stone-50/70 dark:bg-[#1C1A17] border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-lg'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#C69A39]/10 dark:bg-[#C69A39]/20 flex items-center justify-center mb-6">
                {card.icon}
              </div>

              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                {isAr ? card.titleAr : card.titleEn}
              </h3>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#C69A39] mb-3">
                <Clock className="w-4 h-4" />
                <span>{isAr ? card.timeAr : card.timeEn}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-4">
                <MapPin className="w-4 h-4 text-[#C69A39]" />
                <span>{isAr ? card.hallAr : card.hallEn}</span>
              </div>

              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mt-auto">
                {isAr ? card.descAr : card.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Dress Code & Interactive Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dress Code Card */}
          <div className="bg-stone-50/80 dark:bg-[#1C1A17] p-8 rounded-3xl border border-stone-200 dark:border-stone-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#C69A39]/15 flex items-center justify-center text-[#C69A39]">
                  <Shirt className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#C69A39] uppercase tracking-wider">
                    {isAr ? 'كود اللباس الرسمي' : 'Dress Code'}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                    {isAr ? 'البدلة الرسمية وفساتين السهرة الملكية' : 'Black Tie / Royal Evening Attire'}
                  </h4>
                </div>
              </div>

              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-6">
                {isAr ? config.dressCodeAr : config.dressCodeEn}
              </p>
            </div>

            {/* Color Palette recommendation */}
            <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-3">
                {isAr ? 'لوحة الألوان المتناسقة المقترحة:' : 'Suggested Evening Color Palette:'}
              </span>
              <div className="flex items-center gap-3">
                {config.dressCodeColors.map((color, cIdx) => (
                  <div
                    key={cIdx}
                    style={{ backgroundColor: color }}
                    className="w-8 h-8 rounded-full shadow-sm border-2 border-white dark:border-stone-900 transition-transform hover:scale-110"
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="bg-stone-50/80 dark:bg-[#1C1A17] p-8 rounded-3xl border border-stone-200 dark:border-stone-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-[#C69A39] uppercase tracking-wider">
                  {isAr ? 'خريطة الوصول' : 'Venue Location'}
                </span>
                <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                  {isAr ? config.venueNameAr : config.venueNameEn}
                </h4>
              </div>
              <a
                href={config.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#C69A39] hover:underline"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden h-56 border border-stone-200 dark:border-stone-800 shadow-inner">
              <iframe
                src={config.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue Location Map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
