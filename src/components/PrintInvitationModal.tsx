import React from 'react';
import { X, Printer } from 'lucide-react';
import { Language, WeddingConfig } from '../types/wedding';

interface PrintInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  config: WeddingConfig;
}

export const PrintInvitationModal: React.FC<PrintInvitationModalProps> = ({
  isOpen,
  onClose,
  language,
  config,
}) => {
  if (!isOpen) return null;

  const isAr = language === 'ar';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-white dark:bg-[#1A1816] text-[#2C241E] dark:text-[#F5EFEB] max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#C69A39]/30 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* The Printable Card Content */}
        <div id="printable-invitation" className="bg-[#FCFAF6] border-2 border-[#C69A39] p-6 sm:p-8 rounded-2xl text-center shadow-inner relative overflow-hidden">
          {/* Inner decorative border */}
          <div className="border border-[#C69A39]/40 p-6 sm:p-8 rounded-xl relative">
            <div className="text-[#C69A39] text-xs font-serif tracking-widest uppercase mb-2">
              ⚜ {config.monogram} ⚜
            </div>

            <div className="font-serif text-sm text-stone-600 mb-3">
              بسم الله الرحمن الرحيم
            </div>

            <p className="font-serif text-xs sm:text-sm text-stone-700 italic max-w-md mx-auto mb-6 leading-relaxed">
              {config.quoteAr}
            </p>

            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed mb-4">
              {config.parentsInviteAr}
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#C69A39] my-4 tracking-wide">
              {isAr ? config.coupleShortAr : config.coupleShortEn}
            </h2>

            <div className="bg-white/80 border border-[#C69A39]/20 rounded-xl p-4 my-6 text-xs sm:text-sm space-y-1 text-stone-800">
              <p>
                <strong>اليوم والتاريخ:</strong> {config.dateFormattedAr}
              </p>
              <p>
                <strong>الوقت:</strong> {config.timeAr}
              </p>
              <p>
                <strong>المكان:</strong> {config.venueNameAr}
              </p>
              <p className="text-stone-500 text-[11px] pt-1">
                {config.venueCityAr}
              </p>
            </div>

            <p className="font-serif text-sm text-[#C69A39] font-medium mb-2">
              {config.subQuoteAr}
            </p>

            <p className="text-[11px] text-stone-500">
              {config.dressCodeAr}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#C69A39] to-[#DFBF77] text-white font-bold text-xs sm:text-sm shadow-md hover:brightness-110"
          >
            <Printer className="w-4 h-4" />
            <span>{isAr ? 'بدء الطباعة / حفظ كـ PDF' : 'Print / Save as PDF'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-full border border-stone-300 dark:border-stone-700 text-xs sm:text-sm font-semibold hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
