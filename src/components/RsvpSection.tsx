import React, { useState } from 'react';
import { Send, CheckCircle2, HeartHandshake, PhoneCall } from 'lucide-react';
import { WEDDING_CONFIG } from '../data/weddingData';
import { Language, RsvpEntry } from '../types/wedding';

interface RsvpSectionProps {
  language: Language;
  onRsvpSuccess?: (entry: RsvpEntry) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ language, onRsvpSuccess }) => {
  const isAr = language === 'ar';

  const [fullName, setFullName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'declined'>('attending');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [selectedMeal, setSelectedMeal] = useState('beef');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');

  const [submittedEntry, setSubmittedEntry] = useState<RsvpEntry | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneOrEmail.trim()) return;

    const entry: RsvpEntry = {
      id: `rsvp-${Date.now()}`,
      fullName: fullName.trim(),
      phoneOrEmail: phoneOrEmail.trim(),
      attendance,
      guestCount: attendance === 'attending' ? Number(guestCount) : 0,
      selectedMeal: attendance === 'attending' ? selectedMeal : '',
      dietaryNotes: dietaryNotes.trim() || undefined,
      personalMessage: personalMessage.trim() || undefined,
      submittedAt: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      stored.push(entry);
      localStorage.setItem('wedding_rsvps', JSON.stringify(stored));
    } catch {
      // ignore
    }

    setSubmittedEntry(entry);
    if (onRsvpSuccess) onRsvpSuccess(entry);
  };

  const handleSendToWhatsApp = () => {
    if (!submittedEntry) return;

    const status = submittedEntry.attendance === 'attending'
      ? (isAr ? '✅ نعم، سأحضر بكل سرور ومحبة' : '✅ Joyfully Attending')
      : (isAr ? '❌ للأسف أعتذر عن الحضور' : '❌ Regretfully Declining');

    let text = isAr
      ? `السلام عليكم ورحمة الله وبركاته، أود تأكيد حضوري لحفل زفاف طارق وسارة 💍✨\n\n`
      : `Hello! Here is my RSVP confirmation for Tarek & Sarah’s Wedding 💍✨\n\n`;

    text += `${isAr ? '• الاسم الكريم:' : '• Name:'} ${submittedEntry.fullName}\n`;
    text += `${isAr ? '• رقم التواصل:' : '• Contact:'} ${submittedEntry.phoneOrEmail}\n`;
    text += `${isAr ? '• حالة الحضور:' : '• Status:'} ${status}\n`;

    if (submittedEntry.attendance === 'attending') {
      text += `${isAr ? '• إجمالي الضيوف:' : '• Total Guests:'} ${submittedEntry.guestCount}\n`;
      text += `${isAr ? '• اختيار الوجبة:' : '• Meal Choice:'} ${submittedEntry.selectedMeal}\n`;
      if (submittedEntry.dietaryNotes) {
        text += `${isAr ? '• ملاحظات غذائية:' : '• Dietary:'} ${submittedEntry.dietaryNotes}\n`;
      }
    }

    if (submittedEntry.personalMessage) {
      text += `${isAr ? '• رسالة التهنئة:' : '• Message:'} ${submittedEntry.personalMessage}\n`;
    }

    const cleanPhone = WEDDING_CONFIG.plannerPhone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleReset = () => {
    setFullName('');
    setPhoneOrEmail('');
    setAttendance('attending');
    setGuestCount(1);
    setSelectedMeal('beef');
    setDietaryNotes('');
    setPersonalMessage('');
    setSubmittedEntry(null);
  };

  return (
    <section id="rsvp" className="py-24 bg-white dark:bg-[#161412] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#C69A39] dark:text-[#DFBF77] bg-[#C69A39]/10 px-4 py-1.5 rounded-full mb-3 border border-[#C69A39]/20">
            {isAr ? 'دعوة كريمة' : 'Honored Invitation'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
            {isAr ? 'تأكيد الحضور (RSVP)' : 'RSVP Confirmation'}
          </h2>
          <div className="text-[#C69A39] text-xl mb-3">❦</div>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            {isAr ? WEDDING_CONFIG.rsvpDeadlineAr : WEDDING_CONFIG.rsvpDeadlineEn}
          </p>
        </div>

        {/* Card Box */}
        <div className="bg-stone-50 dark:bg-[#1C1917] p-8 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-lg">
          {!submittedEntry ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                    {isAr ? 'الاسم الكريم الكامل *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isAr ? 'مثال: عبد العزيز بن محمد السالم' : 'e.g., Alexander Smith'}
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#C69A39]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                    {isAr ? 'رقم الهاتف / الواتساب أو الإيميل *' : 'Phone / WhatsApp or Email *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    placeholder={isAr ? 'مثال: 0501234567' : 'e.g., +1 234 567 8900'}
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#C69A39]"
                  />
                </div>
              </div>

              {/* Row 2: Attendance Radio Cards */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  {isAr ? 'حالة الحضور *' : 'Will you attend? *'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label
                    className={`cursor-pointer p-4 rounded-2xl border flex items-center gap-3 transition-all ${
                      attendance === 'attending'
                        ? 'border-[#C69A39] bg-[#C69A39]/10 shadow-sm'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="attending"
                      checked={attendance === 'attending'}
                      onChange={() => setAttendance('attending')}
                      className="hidden"
                    />
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-sm text-stone-900 dark:text-stone-100">
                        {isAr ? 'نعم، سأحضر بكل سرور' : 'Joyfully Accept'}
                      </strong>
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        {isAr ? 'متحمس لمشاركتكم الفرحة' : 'Can’t wait to celebrate with you'}
                      </span>
                    </div>
                  </label>

                  <label
                    className={`cursor-pointer p-4 rounded-2xl border flex items-center gap-3 transition-all ${
                      attendance === 'declined'
                        ? 'border-stone-400 bg-stone-100 dark:bg-stone-800'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="declined"
                      checked={attendance === 'declined'}
                      onChange={() => setAttendance('declined')}
                      className="hidden"
                    />
                    <div className="w-8 h-8 rounded-full bg-stone-500/10 text-stone-500 flex items-center justify-center">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-sm text-stone-900 dark:text-stone-100">
                        {isAr ? 'للأسف، أعتذر عن الحضور' : 'Regretfully Decline'}
                      </strong>
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        {isAr ? 'دعواتي لكم بحياة سعيدة' : 'Celebrating with you from afar'}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Conditional Options for Attendees */}
              {attendance === 'attending' && (
                <div className="space-y-6 pt-4 border-t border-stone-200 dark:border-stone-800 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                        {isAr ? 'إجمالي عدد الضيوف (شاملاً حضرتك)' : 'Total Number of Guests'}
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#C69A39]"
                      >
                        <option value={1}>{isAr ? 'ضيف واحد (أنا فقط)' : '1 Guest (Just me)'}</option>
                        <option value={2}>{isAr ? 'ضيفان (أنا ومرافق)' : '2 Guests (Me + Plus One)'}</option>
                        <option value={3}>{isAr ? '3 ضيوف' : '3 Guests'}</option>
                        <option value={4}>{isAr ? '4 ضيوف' : '4 Guests'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                        {isAr ? 'اختيار وجبة العشاء المفضلة' : 'Meal Preference'}
                      </label>
                      <select
                        value={selectedMeal}
                        onChange={(e) => setSelectedMeal(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#C69A39]"
                      >
                        <option value="beef">{isAr ? 'لحم أنجوس مشوي مع صوص الكمأة' : 'Prime Angus Beef with Truffle Sauce'}</option>
                        <option value="salmon">{isAr ? 'سمك السلمون النرويجي بصوص الليمون والأعشاب' : 'Pan-seared Norwegian Salmon'}</option>
                        <option value="vegetarian">{isAr ? 'طبق نباتي إيطالي فاخر (ريزوتو الفطر البري)' : 'Gourmet Wild Mushroom Risotto (Vegetarian)'}</option>
                        <option value="kids">{isAr ? 'وجبة خاصة بالأطفال' : 'Kids Special Meal'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                      {isAr ? 'ملاحظات غذائية خاصة أو حساسية الأطعمة (إن وجدت)' : 'Dietary Restrictions or Allergies (If any)'}
                    </label>
                    <input
                      type="text"
                      value={dietaryNotes}
                      onChange={(e) => setDietaryNotes(e.target.value)}
                      placeholder={isAr ? 'مثال: خالي من الجلوتين، حساسية مكسرات...' : 'e.g., Gluten-free, nut allergy...'}
                      className="w-full px-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#C69A39]"
                    />
                  </div>
                </div>
              )}

              {/* Row 3: Message to couple */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  {isAr ? 'رسالة مباركة ومحبة للعروسين (اختياري)' : 'Warm Wishes for the Newlyweds (Optional)'}
                </label>
                <textarea
                  rows={3}
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value)}
                  placeholder={isAr ? 'اكتب هنا كلماتك الطيبة ودعواتك للعروسين...' : 'Share your love, blessings and advice...'}
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#C69A39]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#C69A39] via-[#DFBF77] to-[#97711B] text-white font-bold text-base hover:brightness-110 shadow-lg shadow-[#C69A39]/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Send className="w-5 h-5" />
                <span>{isAr ? 'إرسال تأكيد الحضور الآن' : 'Submit RSVP Confirmation'}</span>
              </button>
            </form>
          ) : (
            /* Success confirmation card */
            <div className="text-center py-6 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                {isAr ? 'تم استلام تأكيد حضوركم بنجاح!' : 'RSVP Received with Gratitude!'}
              </h3>

              <p className="text-stone-600 dark:text-stone-400 text-sm max-w-md mx-auto mb-6">
                {submittedEntry.attendance === 'attending'
                  ? (isAr
                      ? `شكراً جزيلاً يا ${submittedEntry.fullName}! يسعدنا جداً حضورك (${submittedEntry.guestCount} ضيوف) وتجهيز مقعدك في القاعة الملكية.`
                      : `Thank you so much, ${submittedEntry.fullName}! We are overjoyed to celebrate with you (${submittedEntry.guestCount} guests).`)
                  : (isAr
                      ? `شكراً لتواصلك يا ${submittedEntry.fullName}.. نقدر اعتذارك ودعواتك الصادقة لنا بالخير والتوفيق.`
                      : `Thank you for letting us know, ${submittedEntry.fullName}. Your loving wishes mean the world to us.`)}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={handleSendToWhatsApp}
                  className="px-6 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs sm:text-sm hover:brightness-105 shadow-md flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{isAr ? 'إرسال التأكيد أيضاً عبر الواتساب' : 'Send via WhatsApp as well'}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-full border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs sm:text-sm hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  {isAr ? 'تعديل أو إرسال تأكيد آخر' : 'Submit Another RSVP'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
