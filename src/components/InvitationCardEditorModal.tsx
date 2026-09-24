import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Printer, 
  Share2, 
  RotateCcw, 
  Check, 
  Calendar, 
  MapPin, 
  Heart, 
  User, 
  Palette, 
  Phone,
  FileText
} from 'lucide-react';
import { WeddingConfig, Language } from '../types/wedding';
import { WEDDING_CONFIG } from '../data/weddingData';

interface InvitationCardEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  config: WeddingConfig;
  onSaveConfig: (newConfig: WeddingConfig) => void;
}

export const InvitationCardEditorModal: React.FC<InvitationCardEditorModalProps> = ({
  isOpen,
  onClose,
  language,
  config,
  onSaveConfig,
}) => {
  if (!isOpen) return null;

  const isAr = language === 'ar';
  const [formData, setFormData] = useState<WeddingConfig>({ ...config });
  const [activeTab, setActiveTab] = useState<'couple' | 'text' | 'datetime' | 'theme' | 'contact'>('couple');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field: keyof WeddingConfig, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // Auto generate monogram if couple names change
      if (field === 'groomNameAr' || field === 'brideNameAr') {
        const groomFirst = (field === 'groomNameAr' ? value : prev.groomNameAr).trim().split(' ')[0] || '';
        const brideFirst = (field === 'brideNameAr' ? value : prev.brideNameAr).trim().split(' ')[0] || '';
        if (groomFirst && brideFirst) {
          updated.coupleShortAr = `${groomFirst} & ${brideFirst}`;
          const gLetter = groomFirst.charAt(0);
          const bLetter = brideFirst.charAt(0);
          updated.monogram = `${gLetter} & ${bLetter}`;
        }
      }
      return updated;
    });
  };

  const handleSave = () => {
    onSaveConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    if (window.confirm(isAr ? 'هل تريد استعادة البيانات الافتراضية؟' : 'Reset to default data?')) {
      setFormData({ ...WEDDING_CONFIG });
      onSaveConfig({ ...WEDDING_CONFIG });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = isAr
      ? `⚜️ دعوة زفاف ملكية ⚜️\n\n${formData.parentsInviteAr}\n\n💍 زفاف: *${formData.coupleShortAr}*\n📅 التاريخ: ${formData.dateFormattedAr}\n⏰ الوقت: ${formData.timeAr}\n📍 المكان: ${formData.venueNameAr} (${formData.venueCityAr})\n\nيسرنا حضوركم وتأكيد الحضور عبر موقعنا الرقمي: ${window.location.origin}\n\n#${formData.hashtag.replace(/#/g, '')}`
      : `⚜️ Royal Wedding Invitation ⚜️\n\n${formData.parentsInviteEn}\n\n💍 Wedding of *${formData.coupleShortEn}*\n📅 Date: ${formData.dateFormattedEn}\n⏰ Time: ${formData.timeEn}\n📍 Venue: ${formData.venueNameEn}\n\nRSVP online at: ${window.location.origin}`;

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Card theme styling variables
  const getThemeClasses = () => {
    switch (formData.cardTheme) {
      case 'rose-blush':
        return {
          bg: 'bg-gradient-to-b from-[#FFF5F7] to-[#FDF0F4]',
          border: 'border-[#D97D8E]',
          accent: 'text-[#C2586D]',
          badge: 'bg-[#D97D8E]/15 text-[#C2586D] border-[#D97D8E]/30',
          innerBorder: 'border-[#D97D8E]/40',
        };
      case 'emerald':
        return {
          bg: 'bg-gradient-to-b from-[#F2F8F6] to-[#E5F1ED]',
          border: 'border-[#2D6A4F]',
          accent: 'text-[#1B4332]',
          badge: 'bg-[#2D6A4F]/15 text-[#1B4332] border-[#2D6A4F]/30',
          innerBorder: 'border-[#2D6A4F]/40',
        };
      case 'noir-gold':
        return {
          bg: 'bg-gradient-to-b from-[#1C1A17] to-[#121110] text-[#F5EFEB]',
          border: 'border-[#C69A39]',
          accent: 'text-[#DFBF77]',
          badge: 'bg-[#C69A39]/20 text-[#DFBF77] border-[#DFBF77]/30',
          innerBorder: 'border-[#C69A39]/40',
        };
      case 'royal-gold':
      default:
        return {
          bg: 'bg-gradient-to-b from-[#FFFDF9] to-[#FBF7EE]',
          border: 'border-[#C69A39]',
          accent: 'text-[#C69A39]',
          badge: 'bg-[#C69A39]/15 text-[#97711B] border-[#C69A39]/30',
          innerBorder: 'border-[#C69A39]/40',
        };
    }
  };

  const themeStyle = getThemeClasses();

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white dark:bg-[#1A1816] text-[#2C241E] dark:text-[#F5EFEB] max-w-6xl w-full rounded-3xl shadow-2xl border border-[#C69A39]/40 my-6 max-h-[94vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#201D1A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C69A39]/15 text-[#C69A39] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span>{isAr ? 'استوديو تصميم كرت الدعوة وتخصيص بيانات الزفاف' : 'Wedding Invitation Studio & Editor'}</span>
                <span className="text-xs bg-[#C69A39]/20 text-[#C69A39] px-2 py-0.5 rounded-full font-sans font-semibold">مباشر</span>
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {isAr ? 'عدّل أسماء العروسين، أولياء الأمور، القاعة، والموعد وشاهد كرت الدعوة يتحدث فورياً!' : 'Customise names, date, venue and preview your royal digital card in real-time!'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-300 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Layout: Left Form + Right Card Preview */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-stone-200 dark:divide-stone-800">
          
          {/* Left Column: Form & Inputs (7 cols) */}
          <div className="lg:col-span-7 p-6 overflow-y-auto max-h-[calc(94vh-140px)] space-y-6">
            
            {/* Tabs Bar */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-stone-100 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('couple')}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'couple'
                    ? 'bg-white dark:bg-[#1A1816] text-[#C69A39] shadow-sm font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>{isAr ? 'العروسين' : 'Couple'}</span>
              </button>

              <button
                onClick={() => setActiveTab('text')}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'text'
                    ? 'bg-white dark:bg-[#1A1816] text-[#C69A39] shadow-sm font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{isAr ? 'صيغة الدعوة' : 'Invitation Text'}</span>
              </button>

              <button
                onClick={() => setActiveTab('datetime')}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'datetime'
                    ? 'bg-white dark:bg-[#1A1816] text-[#C69A39] shadow-sm font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{isAr ? 'الموعد والمكان' : 'Date & Venue'}</span>
              </button>

              <button
                onClick={() => setActiveTab('theme')}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'theme'
                    ? 'bg-white dark:bg-[#1A1816] text-[#C69A39] shadow-sm font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>{isAr ? 'شكل الكرت' : 'Card Theme'}</span>
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'contact'
                    ? 'bg-white dark:bg-[#1A1816] text-[#C69A39] shadow-sm font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{isAr ? 'التواصل' : 'Contact'}</span>
              </button>
            </div>

            {/* Tab 1: Couple Names */}
            {activeTab === 'couple' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl text-xs text-amber-800 dark:text-amber-300">
                  {isAr 
                    ? '💡 اكتب أسماء العروسين هنا، وستتحدث تلقائياً في شاشة البداية، وبطاقة الدعوة، والفوتر، وكل أجزاء الموقع!'
                    : '💡 Enter the names here, and the entire website & card will update automatically!'}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      {isAr ? 'اسم العريس كاملاً (بالعربية) *' : 'Groom Full Name (Arabic) *'}
                    </label>
                    <input
                      type="text"
                      value={formData.groomNameAr}
                      onChange={(e) => handleChange('groomNameAr', e.target.value)}
                      placeholder="مثال: طارق عبد العزيز المنصور"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:border-[#C69A39] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      {isAr ? 'اسم العروس كاملاً (بالعربية) *' : 'Bride Full Name (Arabic) *'}
                    </label>
                    <input
                      type="text"
                      value={formData.brideNameAr}
                      onChange={(e) => handleChange('brideNameAr', e.target.value)}
                      placeholder="مثال: سارة خالد الخطيب"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:border-[#C69A39] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      {isAr ? 'اسم العريس (بالإنجليزية)' : 'Groom Name (English)'}
                    </label>
                    <input
                      type="text"
                      value={formData.groomNameEn}
                      onChange={(e) => handleChange('groomNameEn', e.target.value)}
                      placeholder="e.g. Tarek Al-Mansoor"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:border-[#C69A39] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      {isAr ? 'اسم العروس (بالإنجليزية)' : 'Bride Name (English)'}
                    </label>
                    <input
                      type="text"
                      value={formData.brideNameEn}
                      onChange={(e) => handleChange('brideNameEn', e.target.value)}
                      placeholder="e.g. Sarah Al-Khatib"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:border-[#C69A39] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      {isAr ? 'الأسماء المختصرة (للعناوين)' : 'Short Display Names'}
                    </label>
                    <input
                      type="text"
                      value={formData.coupleShortAr}
                      onChange={(e) => handleChange('coupleShortAr', e.target.value)}
                      placeholder="مثال: طارق & سارة"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:border-[#C69A39] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      {isAr ? 'المونوغرام والشعار (حرفين أو رمز)' : 'Monogram (2 letters or symbol)'}
                    </label>
                    <input
                      type="text"
                      value={formData.monogram}
                      onChange={(e) => handleChange('monogram', e.target.value)}
                      placeholder="مثال: T & S أو ط & س"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:border-[#C69A39] focus:outline-none font-bold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Invitation Text & Parents */}
            {activeTab === 'text' && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {isAr ? 'صيغة دعوة أولياء الأمور والعائلتين *' : 'Parents Invitation Line *'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.parentsInviteAr}
                    onChange={(e) => handleChange('parentsInviteAr', e.target.value)}
                    placeholder="مثال: يتشرف الشيخ فلان والمهندس فلان بدعوة سيادتكم الكريمة لحضور حفل زفاف نجليهما المبارك..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:border-[#C69A39] focus:outline-none"
                  />
                  <span className="text-[11px] text-stone-400">تظهر هذه الصيغة الرسمية في صدر كرت الدعوة الورقي والرقمي.</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {isAr ? 'الآية الكريمة أو العبارة الترحيبية الافتتاحية' : 'Quranic Verse or Opening Quote'}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.quoteAr}
                    onChange={(e) => handleChange('quoteAr', e.target.value)}
                    placeholder="«وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً»"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:border-[#C69A39] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {isAr ? 'عبارة الختام والترحيب بالضيوف' : 'Closing & Welcoming Note'}
                  </label>
                  <input
                    type="text"
                    value={formData.subQuoteAr}
                    onChange={(e) => handleChange('subQuoteAr', e.target.value)}
                    placeholder="فرحتنا لا تكتمل إلا بوجودكم ومشاركتكم أسعد لحظات العمر"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:border-[#C69A39] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {isAr ? 'كود اللباس والتعليمات (Dress Code)' : 'Dress Code Note'}
                  </label>
                  <input
                    type="text"
                    value={formData.dressCodeAr}
                    onChange={(e) => handleChange('dressCodeAr', e.target.value)}
                    placeholder="البدلة الرسمية / البلاك تاي والفساتين الملكية. (يرجى ترك الأبيض للعروس)"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:border-[#C69A39] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Tab 3: Date, Time & Venue */}
            {activeTab === 'datetime' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      {isAr ? 'تاريخ الحفل النصي *' : 'Formatted Date String *'}
                    </label>
                    <input
                      type="text"
                      value={formData.dateFormattedAr}
                      onChange={(e) => handleChange('dateFormattedAr', e.target.value)}
                      placeholder="مثال: الجمعة، 16 أكتوبر 2026"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:border-[#C69A39] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      {isAr ? 'وقت الحفل *' : 'Event Time *'}
                    </label>
                    <input
                      type="text"
                      value={formData.timeAr}
                      onChange={(e) => handleChange('timeAr', e.target.value)}
                      placeholder="مثال: الساعة 06:30 مساءً"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:border-[#C69A39] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {isAr ? 'تاريخ العداد التنازلي الحي (ISO Date)' : 'Target Date for Countdown Timer'}
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.weddingDateISO.slice(0, 16)}
                    onChange={(e) => handleChange('weddingDateISO', e.target.value + ':00')}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:border-[#C69A39] focus:outline-none font-mono"
                  />
                  <span className="text-[11px] text-stone-400">سيعمل العداد التنازلي في الموقع تلقائياً بناءً على هذا التاريخ.</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      {isAr ? 'اسم الفندق والقاعة *' : 'Venue & Hall Name *'}
                    </label>
                    <input
                      type="text"
                      value={formData.venueNameAr}
                      onChange={(e) => handleChange('venueNameAr', e.target.value)}
                      placeholder="فندق الفورسيزونز - القاعة الملكية الكبرى"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:border-[#C69A39] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      {isAr ? 'المدينة والعنوان *' : 'City & Address *'}
                    </label>
                    <input
                      type="text"
                      value={formData.venueCityAr}
                      onChange={(e) => handleChange('venueCityAr', e.target.value)}
                      placeholder="برج المملكة، الرياض"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:border-[#C69A39] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {isAr ? 'آخر موعد لتأكيد الحضور (RSVP Deadline)' : 'RSVP Deadline'}
                  </label>
                  <input
                    type="text"
                    value={formData.rsvpDeadlineAr}
                    onChange={(e) => handleChange('rsvpDeadlineAr', e.target.value)}
                    placeholder="يرجى تأكيد الحضور قبل 1 أكتوبر 2026"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:border-[#C69A39] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Tab 4: Card Theme & Palette */}
            {activeTab === 'theme' && (
              <div className="space-y-4 animate-in fade-in">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                  {isAr ? 'اختر النمط الملكي للكرت (Card Style Template):' : 'Select Card Template:'}
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'royal-gold', nameAr: '⚜️ الذهبي الملكي (Royal Gold)', desc: 'فخامة الكلاسيكية مع أوراق الغار الذهبية' },
                    { id: 'rose-blush', nameAr: '🌸 الوردي الرومانسي (Rose Blush)', desc: 'أناقة ناعمة ورومانسية دافئة' },
                    { id: 'emerald', nameAr: '🌿 الزمردي الملكي (Emerald Luxe)', desc: 'أخضر ملكي وأناقة القصور العريقة' },
                    { id: 'noir-gold', nameAr: '🌙 الأسود والذهب (Midnight Noir)', desc: 'عصري فخم جداً وتباين ساحر' },
                  ].map((t) => (
                    <div
                      key={t.id}
                      onClick={() => handleChange('cardTheme', t.id)}
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${
                        formData.cardTheme === t.id
                          ? 'border-[#C69A39] bg-[#C69A39]/10 shadow-md scale-[1.02]'
                          : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 hover:border-stone-400'
                      }`}
                    >
                      <strong className="block text-xs sm:text-sm font-serif text-stone-900 dark:text-stone-100 mb-1">
                        {t.nameAr}
                      </strong>
                      <p className="text-[11px] text-stone-500">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 5: Contact & Socials */}
            {activeTab === 'contact' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      {isAr ? 'رقم الواتساب لمنسقة الحفل / العروسين' : 'Coordinator WhatsApp Phone'}
                    </label>
                    <input
                      type="text"
                      value={formData.plannerPhone}
                      onChange={(e) => handleChange('plannerPhone', e.target.value)}
                      placeholder="+966501234567"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:border-[#C69A39] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      {isAr ? 'هاشتاق الزفاف الرسمي' : 'Official Wedding Hashtag'}
                    </label>
                    <input
                      type="text"
                      value={formData.hashtag}
                      onChange={(e) => handleChange('hashtag', e.target.value)}
                      placeholder="#طارق_وسارة_2026"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:border-[#C69A39] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {isAr ? 'اسم جهة التنسيق أو المنسقة' : 'Coordinator Name'}
                  </label>
                  <input
                    type="text"
                    value={formData.plannerName}
                    onChange={(e) => handleChange('plannerName', e.target.value)}
                    placeholder="منسقة الحفل: ريم الشريف"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:border-[#C69A39] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Bottom Actions inside form */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 px-3 py-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isAr ? 'استرجاع الافتراضي' : 'Reset Defaults'}</span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C69A39] via-[#DFBF77] to-[#97711B] text-white font-bold text-xs sm:text-sm shadow-md hover:brightness-110 transition-transform hover:scale-105"
              >
                <Check className="w-4 h-4" />
                <span>{isAr ? 'تطبيق وحفظ على كامل الموقع' : 'Save & Apply to Website'}</span>
              </button>
            </div>

            {savedSuccess && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4" />
                <span>{isAr ? 'تم تحديث كامل الموقع وبطاقة الدعوة ببياناتكم بنجاح!' : 'Website & Card updated successfully!'}</span>
              </div>
            )}
          </div>

          {/* Right Column: Live Invitation Card Preview (5 cols) */}
          <div className="lg:col-span-5 p-6 bg-stone-100/70 dark:bg-black/40 flex flex-col items-center justify-between overflow-y-auto">
            
            <div className="w-full flex items-center justify-between mb-3 text-xs text-stone-500">
              <span className="font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C69A39]" />
                {isAr ? 'المعاينة الحية لكرت الدعوة' : 'Live Invitation Card Preview'}
              </span>
              <span className="text-[11px] bg-white dark:bg-stone-800 px-2 py-0.5 rounded-full border border-stone-200 dark:border-stone-700">
                {formData.cardTheme}
              </span>
            </div>

            {/* The Live Digital Invitation Card Container */}
            <div 
              id="printable-invitation-card"
              className={`w-full max-w-sm rounded-3xl border-2 ${themeStyle.border} ${themeStyle.bg} p-5 sm:p-6 shadow-xl relative transition-all duration-300 text-center overflow-hidden my-auto`}
            >
              {/* Inner Decorative Golden Border */}
              <div className={`border ${themeStyle.innerBorder} rounded-2xl p-5 sm:p-6 relative`}>
                
                {/* Monogram / Top Symbol */}
                <div className={`font-serif text-sm tracking-widest uppercase mb-2 ${themeStyle.accent}`}>
                  ⚜ {formData.monogram || 'T & S'} ⚜
                </div>

                {/* Bismillah */}
                <div className="font-serif text-xs opacity-80 mb-2">
                  بسم الله الرحمن الرحيم
                </div>

                {/* Quranic Verse */}
                <p className="font-serif text-[11px] sm:text-xs italic opacity-90 leading-relaxed mb-4 line-clamp-3">
                  {formData.quoteAr}
                </p>

                {/* Parents Invitation */}
                <p className="text-[11px] sm:text-xs opacity-90 leading-relaxed mb-4">
                  {formData.parentsInviteAr}
                </p>

                {/* Main Couple Names */}
                <div className="my-3 py-2 border-y border-[#C69A39]/20">
                  <h1 className={`font-serif text-2xl sm:text-3xl font-bold tracking-wide ${themeStyle.accent}`}>
                    {formData.coupleShortAr}
                  </h1>
                </div>

                {/* Event Schedule Info Box */}
                <div className="my-4 p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-[#C69A39]/20 text-[11px] sm:text-xs space-y-1.5 text-left rtl:text-right">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C69A39] flex-shrink-0" />
                    <span><strong>اليوم والتاريخ:</strong> {formData.dateFormattedAr}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#C69A39] flex-shrink-0" />
                    <span><strong>الوقت:</strong> {formData.timeAr}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C69A39] flex-shrink-0" />
                    <span className="truncate"><strong>المكان:</strong> {formData.venueNameAr}</span>
                  </div>
                  <div className="text-[10px] opacity-70 pr-5">
                    {formData.venueCityAr}
                  </div>
                </div>

                {/* Welcoming Sub-quote */}
                <p className={`font-serif text-xs font-semibold mb-2 ${themeStyle.accent}`}>
                  {formData.subQuoteAr}
                </p>

                {/* Dress Code Note */}
                <p className="text-[10px] opacity-75">
                  {formData.dressCodeAr}
                </p>

                <div className="mt-3 text-[10px] font-mono opacity-60">
                  {formData.hashtag}
                </div>
              </div>
            </div>

            {/* Quick Card Print & Share Actions */}
            <div className="w-full flex items-center justify-center gap-2 mt-4 pt-3 border-t border-stone-200 dark:border-stone-800">
              <button
                onClick={handlePrint}
                className="flex-1 py-2 rounded-xl bg-stone-900 dark:bg-stone-800 hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
                title={isAr ? 'طباعة أو حفظ كـ PDF عالي الدقة' : 'Print or Save as PDF'}
              >
                <Printer className="w-3.5 h-3.5 text-[#DFBF77]" />
                <span>{isAr ? 'طباعة الكرت (PDF)' : 'Print (PDF)'}</span>
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="flex-1 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
                title={isAr ? 'مشاركة رابط الكرت بالواتساب' : 'Share via WhatsApp'}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{isAr ? 'إرسال بالواتساب' : 'WhatsApp'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
