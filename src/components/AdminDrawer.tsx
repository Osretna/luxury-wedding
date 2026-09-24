import React, { useState, useEffect } from 'react';
import { X, Users, Download, Trash2, CheckCircle2, XCircle, Utensils, MessageSquare } from 'lucide-react';
import { RsvpEntry, Language } from '../types/wedding';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  plannerPhone?: string;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  language,
  plannerPhone,
}) => {
  const isAr = language === 'ar';
  const [rsvps, setRsvps] = useState<RsvpEntry[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadRsvps();
    }
  }, [isOpen]);

  const loadRsvps = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      setRsvps(stored);
    } catch {
      setRsvps([]);
    }
  };

  const handleClearAll = () => {
    if (window.confirm(isAr ? 'هل أنت متأكد من مسح جميع بيانات الحضور؟' : 'Are you sure you want to clear all RSVPs?')) {
      localStorage.removeItem('wedding_rsvps');
      setRsvps([]);
    }
  };

  const handleExportCsv = () => {
    if (rsvps.length === 0) {
      alert(isAr ? 'لا توجد بيانات حضور لتصديرها حالياً.' : 'No RSVP data to export.');
      return;
    }

    const headers = ['Full Name', 'Phone / Email', 'Attendance', 'Guest Count', 'Meal Choice', 'Dietary Notes', 'Message', 'Submitted At'];
    const rows = rsvps.map(r => [
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.phoneOrEmail.replace(/"/g, '""')}"`,
      `"${r.attendance}"`,
      r.guestCount,
      `"${r.selectedMeal}"`,
      `"${(r.dietaryNotes || '').replace(/"/g, '""')}"`,
      `"${(r.personalMessage || '').replace(/"/g, '""')}"`,
      `"${r.submittedAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Wedding_RSVP_List_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  const totalResponses = rsvps.length;
  const attendingList = rsvps.filter(r => r.attendance === 'attending');
  const attendingCount = attendingList.length;
  const totalGuestsCount = attendingList.reduce((acc, curr) => acc + (curr.guestCount || 1), 0);
  const declinedCount = rsvps.filter(r => r.attendance === 'declined').length;

  const mealCounts = attendingList.reduce<Record<string, number>>((acc, curr) => {
    const meal = curr.selectedMeal || 'unspecified';
    acc[meal] = (acc[meal] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#1A1816] text-[#2C241E] dark:text-[#F5EFEB] max-w-4xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-800 my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C69A39]/10 text-[#C69A39] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                {isAr ? 'لوحة إدارة الحضور والـ RSVP' : 'RSVP & Guest Management'}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {isAr ? 'إحصائيات فورية وتفاصيل تأكيدات الحضور للعروسين' : 'Real-time guest stats and confirmations'}
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

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-center">
            <span className="text-xs text-stone-500 block">{isAr ? 'إجمالي الردود' : 'Total Responses'}</span>
            <strong className="text-2xl font-serif text-[#C69A39]">{totalResponses}</strong>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 text-center">
            <span className="text-xs text-emerald-700 dark:text-emerald-400 block">{isAr ? 'مؤكد الحضور' : 'Confirmed'}</span>
            <strong className="text-2xl font-serif text-emerald-600 dark:text-emerald-400">{attendingCount}</strong>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-center">
            <span className="text-xs text-amber-700 dark:text-amber-400 block">{isAr ? 'إجمالي الضيوف' : 'Total Guests'}</span>
            <strong className="text-2xl font-serif text-[#C69A39]">{totalGuestsCount}</strong>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-center">
            <span className="text-xs text-stone-500 block">{isAr ? 'معتذرون' : 'Declined'}</span>
            <strong className="text-2xl font-serif text-stone-500">{declinedCount}</strong>
          </div>
        </div>

        {/* Meal Breakdown Badge */}
        {attendingCount > 0 && (
          <div className="p-3 bg-stone-50 dark:bg-stone-900/60 rounded-2xl border border-stone-200/70 dark:border-stone-800 mb-6 flex flex-wrap items-center gap-4 text-xs">
            <span className="font-semibold text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-[#C69A39]" />
              {isAr ? 'توزيع الوجبات:' : 'Meal Distribution:'}
            </span>
            {Object.entries(mealCounts).map(([m, cnt]) => (
              <span key={m} className="px-2.5 py-1 bg-white dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
                {m}: <strong>{cnt}</strong>
              </span>
            ))}
          </div>
        )}

        {/* Table / List */}
        <div className="flex-1 overflow-y-auto mb-6">
          {rsvps.length === 0 ? (
            <div className="text-center py-12 text-stone-400">
              <Users className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">{isAr ? 'لم يتم تسجيل أي ردود بعد.' : 'No RSVPs submitted yet.'}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rsvps.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-50 dark:bg-[#1C1A17] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <strong className="text-sm text-stone-900 dark:text-stone-100">
                        {entry.fullName}
                      </strong>
                      <span className="text-stone-400">•</span>
                      <span className="text-stone-500">{entry.phoneOrEmail}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500">
                      {entry.attendance === 'attending' ? (
                        <>
                          <span className="text-emerald-600 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {isAr ? `حاضر (${entry.guestCount} ضيوف)` : `Attending (${entry.guestCount} guests)`}
                          </span>
                          <span>•</span>
                          <span>{entry.selectedMeal}</span>
                        </>
                      ) : (
                        <span className="text-rose-500 font-semibold flex items-center gap-1">
                          <XCircle className="w-3 h-3" />
                          {isAr ? 'أعتذر عن الحضور' : 'Declined'}
                        </span>
                      )}

                      {entry.dietaryNotes && (
                        <>
                          <span>•</span>
                          <span className="text-amber-600">{entry.dietaryNotes}</span>
                        </>
                      )}
                    </div>

                    {entry.personalMessage && (
                      <p className="mt-2 text-xs italic text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-900 p-2 rounded-lg border border-stone-200/60 dark:border-stone-800 flex items-start gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-[#C69A39] flex-shrink-0 mt-0.5" />
                        <span>"{entry.personalMessage}"</span>
                      </p>
                    )}
                  </div>

                  <span className="text-[10px] text-stone-400 sm:text-right">
                    {new Date(entry.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200 dark:border-stone-800">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C69A39] to-[#DFBF77] text-white font-semibold text-xs shadow-md hover:brightness-105"
          >
            <Download className="w-4 h-4" />
            <span>{isAr ? 'تصدير القائمة كملف Excel / CSV' : 'Export as Excel / CSV'}</span>
          </button>

          {rsvps.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-700 px-3 py-2 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'مسح السجلات' : 'Clear Data'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
