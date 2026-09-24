import React, { useState } from 'react';
import { Building2, Copy, Check, EyeOff, Eye } from 'lucide-react';
import { GIFT_REGISTRY } from '../data/weddingData';
import { Language } from '../types/wedding';

interface GiftRegistryProps {
  language: Language;
}

export const GiftRegistry: React.FC<GiftRegistryProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isHiddenByChoice, setIsHiddenByChoice] = useState(false);

  const handleCopy = (iban: string, id: string) => {
    navigator.clipboard.writeText(iban);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <section id="registry" className="py-24 bg-[#FAF8F5] dark:bg-[#121110] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with hide/show toggle */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#C69A39] dark:text-[#DFBF77] bg-[#C69A39]/10 px-4 py-1.5 rounded-full mb-3 border border-[#C69A39]/20">
              {isAr ? 'محبة وتقدير' : 'Wishing Well'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              {isAr ? 'قائمة الهدايا والحسابات البنكية' : 'Gift Registry & Wishing Well'}
            </h2>
            <div className="text-[#C69A39] text-xl mb-3">❦</div>
          </div>
        </div>

        {/* Visibility Toggle Switch */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsHiddenByChoice(!isHiddenByChoice)}
            className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 hover:text-[#C69A39] px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1A1816]"
            title={isAr ? 'خيار إخفاء/إظهار هذا القسم' : 'Toggle Registry Visibility'}
          >
            {isHiddenByChoice ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>
              {isHiddenByChoice
                ? (isAr ? 'إظهار قسم الهدايا' : 'Show Registry')
                : (isAr ? 'إخفاء هذا القسم' : 'Hide Registry')}
            </span>
          </button>
        </div>

        {!isHiddenByChoice ? (
          <>
            <p className="text-center text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-12">
              {isAr ? GIFT_REGISTRY.quoteAr : GIFT_REGISTRY.quoteEn}
            </p>

            {/* Bank Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {GIFT_REGISTRY.accounts.map((acc, idx) => {
                const isCopied = copiedId === acc.iban;

                return (
                  <div
                    key={idx}
                    className="bg-white dark:bg-[#1A1816] p-6 sm:p-8 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-md transition-all hover:border-[#C69A39]/50"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#C69A39]/10 text-[#C69A39] flex items-center justify-center">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                          {isAr ? acc.bankAr : acc.bankEn}
                        </h4>
                        <span className="text-xs text-stone-500 dark:text-stone-400">
                          {acc.currency}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-xs text-stone-500 dark:text-stone-400 block mb-1">
                        {isAr ? 'اسم صاحب الحساب:' : 'Account Beneficiary:'}
                      </span>
                      <strong className="text-sm text-stone-800 dark:text-stone-200">
                        {isAr ? acc.accountNameAr : acc.accountNameEn}
                      </strong>
                    </div>

                    <div className="bg-stone-50 dark:bg-stone-900 p-3 rounded-2xl border border-stone-200/80 dark:border-stone-800 flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] uppercase font-bold text-stone-400 block mb-0.5">
                          IBAN
                        </span>
                        <code className="text-xs sm:text-sm font-mono text-[#C69A39] font-semibold block truncate">
                          {acc.iban}
                        </code>
                      </div>

                      <button
                        onClick={() => handleCopy(acc.iban, acc.iban)}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#C69A39] hover:bg-[#97711B] text-white'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{isAr ? 'تم النسخ' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{isAr ? 'نسخ' : 'Copy'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-[#1A1816] rounded-3xl border border-dashed border-stone-300 dark:border-stone-800">
            <p className="text-sm text-stone-500 dark:text-stone-400">
              {isAr
                ? 'تم إخفاء قسم الهدايا والحسابات البنكية بناءً على اختيارك.'
                : 'The gift registry section is currently hidden.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
