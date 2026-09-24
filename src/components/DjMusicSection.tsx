import React, { useState } from 'react';
import { Disc, Heart, Plus, Ban, Music2, Radio, Instagram, Check } from 'lucide-react';
import { INITIAL_DJ_SONGS, DO_NOT_PLAY_LIST, DJ_INFO } from '../data/weddingData';
import { Language, SongRequest } from '../types/wedding';

interface DjMusicSectionProps {
  language: Language;
}

export const DjMusicSection: React.FC<DjMusicSectionProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [songs, setSongs] = useState<SongRequest[]>(INITIAL_DJ_SONGS);
  const [votedIds, setVotedIds] = useState<Record<string, boolean>>({});

  // Form states
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [requestedBy, setRequestedBy] = useState('');
  const [dedication, setDedication] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpvote = (id: string) => {
    setSongs((prev) =>
      prev.map((song) => {
        if (song.id === id) {
          const isVoted = votedIds[id];
          return {
            ...song,
            upvotes: isVoted ? song.upvotes - 1 : song.upvotes + 1,
          };
        }
        return song;
      })
    );
    setVotedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !artist.trim()) return;

    const newSong: SongRequest = {
      id: `song-${Date.now()}`,
      title: title.trim(),
      artist: artist.trim(),
      requestedBy: requestedBy.trim() || (isAr ? 'أحد الضيوف الكرام' : 'A special guest'),
      dedication: dedication.trim() || undefined,
      upvotes: 1,
      status: 'pending',
    };

    setSongs([newSong, ...songs]);
    setVotedIds((prev) => ({ ...prev, [newSong.id]: true }));
    setTitle('');
    setArtist('');
    setRequestedBy('');
    setDedication('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <section id="dj-music" className="py-24 bg-[#FAF8F5] dark:bg-[#121110] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#C69A39] dark:text-[#DFBF77] bg-[#C69A39]/10 px-4 py-1.5 rounded-full mb-3 border border-[#C69A39]/20">
            {isAr ? 'أنغام الفرح' : 'The Sound of Tonight'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
            {isAr ? 'قسم الديجي والموسيقى' : 'DJ & Dancefloor Lounge'}
          </h2>
          <div className="text-[#C69A39] text-xl mb-3">❦</div>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'الموسيقى هي نبض الحفل وروح الفرح.. اطلب أغنيتك المفضلة وشارك في تنسيق سهرة العمر!'
              : 'Music is the soul of celebration. Request your favorite dance hits and help curate tonight’s playlist!'}
          </p>
        </div>

        {/* Top Grid: DJ Profile & Song Request Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* DJ Profile Card (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#1A1816] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="relative rounded-2xl overflow-hidden mb-6 h-60 shadow-md">
                <img
                  src={DJ_INFO.imageUrl}
                  alt={isAr ? DJ_INFO.nameAr : DJ_INFO.nameEn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-2 border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{isAr ? 'الديجي الرسمي للحفل' : 'Official Wedding DJ'}</span>
                </div>
              </div>

              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">
                {isAr ? DJ_INFO.nameAr : DJ_INFO.nameEn}
              </h3>

              <span className="text-xs font-semibold text-[#C69A39] block mb-3">
                {isAr ? DJ_INFO.roleAr : DJ_INFO.roleEn}
              </span>

              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-6">
                {isAr ? DJ_INFO.bioAr : DJ_INFO.bioEn}
              </p>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-stone-100 dark:border-stone-800">
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {isAr ? 'حسابات التواصل والتسجيلات:' : 'Connect & Mixes:'}
              </span>
              <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
                <span className="text-xs font-mono font-semibold text-[#C69A39]">{DJ_INFO.instagram}</span>
              </div>
            </div>
          </div>

          {/* Guest Song Request Box (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#1A1816] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#C69A39]/10 flex items-center justify-center text-[#C69A39]">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                  {isAr ? 'اطلب أغنيتك للديجي الآن' : 'Request a Song from the DJ'}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {isAr ? 'أغنية تحب أن ترقص عليها في الحفل؟ أرسلها مباشرة هنا!' : 'A song you love to dance to? Submit it straight to the DJ booth!'}
                </p>
              </div>
            </div>

            {/* Request Form */}
            <form onSubmit={handleAddSong} className="space-y-4 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    {isAr ? 'اسم الأغنية *' : 'Song Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={isAr ? 'مثال: Perfect أو عبالي حبيبي' : 'e.g., Can’t Stop the Feeling'}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#C69A39]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    {isAr ? 'اسم الفنان / المغني *' : 'Artist Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder={isAr ? 'مثال: ماجد المهندس أو إليسا' : 'e.g., Bruno Mars'}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#C69A39]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    {isAr ? 'اسمك الكريم (اختياري)' : 'Your Name (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={requestedBy}
                    onChange={(e) => setRequestedBy(e.target.value)}
                    placeholder={isAr ? 'من طالب الأغنية؟' : 'Who is requesting?'}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#C69A39]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    {isAr ? 'إهداء خاص (اختياري)' : 'Dedication (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={dedication}
                    onChange={(e) => setDedication(e.target.value)}
                    placeholder={isAr ? 'إهداء للعروسين، للأصدقاء...' : 'To the bride, family...'}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#C69A39]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C69A39] to-[#DFBF77] text-white font-semibold text-sm hover:brightness-105 shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? 'إضافة الأغنية لقائمة المقترحات' : 'Submit Song Request'}</span>
              </button>

              {showSuccess && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-medium text-center flex items-center justify-center gap-1.5 animate-in fade-in">
                  <Check className="w-4 h-4" />
                  <span>{isAr ? 'تمت إضافة الأغنية بنجاح وستصل مباشرة للديجي!' : 'Song requested successfully!'}</span>
                </div>
              )}
            </form>

            {/* Requested Songs List */}
            <div className="mt-auto">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 flex items-center gap-2">
                <Music2 className="w-4 h-4 text-[#C69A39]" />
                <span>{isAr ? 'قائمة الأغاني المقترحة وتصويت الضيوف:' : 'Requested Songs & Votes:'}</span>
              </h4>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {songs.map((song) => {
                  const isVoted = votedIds[song.id];

                  return (
                    <div
                      key={song.id}
                      className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h5 className="font-semibold text-sm text-stone-900 dark:text-stone-100 truncate">
                            {song.title}
                          </h5>
                          <span className="text-xs text-stone-400">•</span>
                          <span className="text-xs text-stone-600 dark:text-stone-400 truncate">
                            {song.artist}
                          </span>
                        </div>
                        {song.dedication && (
                          <p className="text-[11px] text-[#C69A39] mt-0.5 truncate italic">
                            {song.dedication} ({song.requestedBy})
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => handleUpvote(song.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                          isVoted
                            ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 border border-rose-200 dark:border-rose-900'
                            : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-rose-300'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isVoted ? 'fill-rose-500 text-rose-500' : ''}`} />
                        <span>{song.upvotes}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Do Not Play List (قائمة الأغاني الممنوعة) */}
        <div className="bg-white dark:bg-[#1A1816] rounded-3xl border border-rose-200/60 dark:border-rose-950/40 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center">
              <Ban className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                {isAr ? 'قائمة الأغاني الممنوعة (Do Not Play List)' : 'Do Not Play Guidelines'}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {isAr
                  ? 'حرصاً على رقي وفخامة أجواء الحفل ورغبة العروسين، لن يتم تشغيل الأنماط التالية:'
                  : 'To ensure a sophisticated atmosphere, the following musical genres are strictly excluded:'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DO_NOT_PLAY_LIST.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30"
              >
                <h5 className="font-semibold text-xs sm:text-sm text-stone-900 dark:text-stone-100 mb-1">
                  {isAr ? item.titleAr : item.titleEn}
                </h5>
                <p className="text-xs text-rose-700/80 dark:text-rose-400/80">
                  {isAr ? item.reasonAr : item.reasonEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
