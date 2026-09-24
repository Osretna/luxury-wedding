import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, ExternalLink } from 'lucide-react';
import { Language, WeddingConfig } from '../types/wedding';

interface StandaloneCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  config?: WeddingConfig;
}

export const StandaloneCodeModal: React.FC<StandaloneCodeModalProps> = ({
  isOpen,
  onClose,
  language,
  config,
}) => {
  if (!isOpen) return null;

  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js' | 'guide'>('guide');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  // URLs to the standalone exported files in public folder
  const exportUrls = {
    html: '/export/index.html',
    css: '/export/style.css',
    js: '/export/script.js',
  };

  const handleCopy = (text: string, tabName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabName);
    setTimeout(() => setCopiedTab(null), 3000);
  };

  const handleDownload = (filename: string, path: string) => {
    fetch(path)
      .then((res) => res.text())
      .then((rawContent) => {
        let content = rawContent;
        if (filename === 'index.html' && config) {
          content = content
            .replace(/طارق & سارة/g, config.coupleShortAr)
            .replace(/طارق عبد العزيز المنصور/g, config.groomNameAr)
            .replace(/سارة خالد الخطيب/g, config.brideNameAr)
            .replace(/T & S/g, config.monogram)
            .replace(/الجمعة، 16 أكتوبر 2026/g, config.dateFormattedAr)
            .replace(/فندق الفورسيزونز - القاعة الملكية الكبرى/g, config.venueNameAr)
            .replace(/#طارق_وسارة_2026/g, config.hashtag)
            .replace(/\+966 50 123 4567/g, config.plannerPhone);
        }
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#1A1816] text-[#2C241E] dark:text-[#F5EFEB] max-w-4xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#C69A39]/30 my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C69A39]/10 text-[#C69A39] flex items-center justify-center">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                {isAr ? 'ملفات الموقع المستقلة (HTML, CSS, JS)' : 'Standalone Web Files (HTML, CSS, JS)'}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {isAr ? 'كود نقي 100% جاهز للرفع المباشر على أي استضافة بدون تثبيتات' : 'Ready-to-deploy clean vanilla code for any web host'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-2 my-4">
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === 'guide'
                ? 'bg-[#C69A39] text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            {isAr ? '📖 دليل الرفع والنشر السريع' : '📖 Deployment Guide'}
          </button>

          <button
            onClick={() => setActiveTab('html')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === 'html'
                ? 'bg-[#C69A39] text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            📄 index.html
          </button>

          <button
            onClick={() => setActiveTab('css')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === 'css'
                ? 'bg-[#C69A39] text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            🎨 style.css
          </button>

          <button
            onClick={() => setActiveTab('js')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === 'js'
                ? 'bg-[#C69A39] text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            ⚡ script.js
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto bg-stone-900 text-stone-100 p-4 sm:p-6 rounded-2xl font-mono text-xs sm:text-sm leading-relaxed border border-stone-800">
          {activeTab === 'guide' ? (
            <div className="font-sans space-y-5 text-stone-200">
              <h4 className="font-serif text-lg font-bold text-[#DFBF77]">
                {isAr ? 'كيفية رفع الموقع على الاستضافة في 3 خطوات بسيطة:' : 'How to deploy this website in 3 simple steps:'}
              </h4>

              <div className="space-y-3">
                <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700">
                  <strong className="text-amber-400 block mb-1">
                    {isAr ? '1. تنزيل الملفات الثلاثة:' : '1. Download the three files:'}
                  </strong>
                  <p className="text-xs text-stone-300">
                    {isAr
                      ? 'قم بتحميل index.html و style.css و script.js وضعهم معاً داخل مجلد واحد على جهازك.'
                      : 'Download index.html, style.css, and script.js and place them in the same folder.'}
                  </p>
                </div>

                <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700">
                  <strong className="text-amber-400 block mb-1">
                    {isAr ? '2. اختيار الاستضافة المجانية أو المدفوعة:' : '2. Choose any hosting platform:'}
                  </strong>
                  <ul className="list-disc list-inside text-xs text-stone-300 space-y-1">
                    <li><strong>GitHub Pages:</strong> مجانية تماماً مع نطاق خاص.</li>
                    <li><strong>Netlify أو Vercel:</strong> بمجرد سحب وإفلات (Drag & Drop) للمجلد يتم النشر في 10 ثوانٍ!</li>
                    <li><strong>أي استضافة cPanel / Hostinger:</strong> ارفع الملفات إلى مجلد <code>public_html</code>.</li>
                  </ul>
                </div>

                <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700">
                  <strong className="text-amber-400 block mb-1">
                    {isAr ? '3. تخصيص الأسماء والصور:' : '3. Customizing couple names & images:'}
                  </strong>
                  <p className="text-xs text-stone-300">
                    {isAr
                      ? 'يمكنك استبدال أسماء العروسين وتاريخ الزفاف مباشرة داخل index.html واستبدال روابط الصور بصوركم الخاصة.'
                      : 'Replace names, dates, and image URLs directly in index.html with your personal photos.'}
                  </p>
                </div>
              </div>

              {/* Download All Buttons */}
              <div className="pt-4 border-t border-stone-800 flex flex-wrap gap-3">
                <button
                  onClick={() => handleDownload('index.html', exportUrls.html)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold text-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل index.html</span>
                </button>
                <button
                  onClick={() => handleDownload('style.css', exportUrls.css)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold text-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل style.css</span>
                </button>
                <button
                  onClick={() => handleDownload('script.js', exportUrls.js)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold text-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل script.js</span>
                </button>
                <a
                  href="/export/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-600 hover:border-amber-400 text-stone-200 text-xs"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>معاينة النسخة المستقلة</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <span className="text-amber-400 font-bold">
                  {activeTab === 'html' ? 'index.html' : activeTab === 'css' ? 'style.css' : 'script.js'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const url = exportUrls[activeTab as 'html' | 'css' | 'js'];
                      fetch(url)
                        .then((res) => res.text())
                        .then((text) => handleCopy(text, activeTab));
                    }}
                    className="flex items-center gap-1 text-xs text-stone-300 hover:text-white px-2 py-1 bg-stone-800 rounded-lg"
                  >
                    {copiedTab === activeTab ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTab === activeTab ? 'تم النسخ' : 'نسخ الكود'}</span>
                  </button>
                  <button
                    onClick={() => {
                      const filename = activeTab === 'html' ? 'index.html' : activeTab === 'css' ? 'style.css' : 'script.js';
                      handleDownload(filename, exportUrls[activeTab as 'html' | 'css' | 'js']);
                    }}
                    className="flex items-center gap-1 text-xs text-stone-300 hover:text-white px-2 py-1 bg-stone-800 rounded-lg"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تحميل الملف</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-stone-400 font-sans">
                تم حفظ هذا الملف في <code>/public/export/{activeTab === 'html' ? 'index.html' : activeTab === 'css' ? 'style.css' : 'script.js'}</code> وهو جاهز للتحميل والاستخدام الفوري. كما يمكنك تحميله مباشرة بالأعلى أو نسخه.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
