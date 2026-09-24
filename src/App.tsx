import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OurStory } from './components/OurStory';
import { EventDetails } from './components/EventDetails';
import { TimelineSchedule } from './components/TimelineSchedule';
import { Gallery } from './components/Gallery';
import { DjMusicSection } from './components/DjMusicSection';
import { RsvpSection } from './components/RsvpSection';
import { GiftRegistry } from './components/GiftRegistry';
import { BridalParty } from './components/BridalParty';
import { TravelAccommodations } from './components/TravelAccommodations';
import { Footer } from './components/Footer';
import { PrintInvitationModal } from './components/PrintInvitationModal';
import { InvitationCardEditorModal } from './components/InvitationCardEditorModal';
import { AdminDrawer } from './components/AdminDrawer';
import { StandaloneCodeModal } from './components/StandaloneCodeModal';
import { romanticAudio } from './utils/audioSynthesizer';
import { Language, WeddingConfig } from './types/wedding';
import { WEDDING_CONFIG } from './data/weddingData';
import { Sparkles, Edit3 } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('ar');
  const [isDark, setIsDark] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Dynamic Wedding Configuration State
  const [config, setConfig] = useState<WeddingConfig>(() => {
    try {
      const saved = localStorage.getItem('wedding_custom_config');
      if (saved) {
        return { ...WEDDING_CONFIG, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Error loading saved wedding config', e);
    }
    return WEDDING_CONFIG;
  });

  // Modals state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Preloader
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check saved theme
    const savedTheme = localStorage.getItem('wedding_theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Preloader timer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleSaveConfig = (newConfig: WeddingConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('wedding_custom_config', JSON.stringify(newConfig));
    } catch (e) {
      console.error('Error saving config', e);
    }
  };

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem('wedding_theme', next ? 'dark' : 'light');
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'ar' ? 'en' : 'ar';
      document.documentElement.setAttribute('lang', next);
      document.documentElement.setAttribute('dir', next === 'ar' ? 'rtl' : 'ltr');
      return next;
    });
  };

  const toggleMusic = () => {
    const status = romanticAudio.toggle();
    setIsPlayingMusic(status);
  };

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className={`min-h-screen font-sans ${isDark ? 'dark bg-[#121110] text-[#F5EFEB]' : 'bg-[#FAF8F5] text-[#2C241E]'}`}
    >
      {/* Initial Welcome Preloader */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-[#121110] flex flex-col items-center justify-center text-white transition-opacity duration-500">
          <div className="text-center animate-pulse">
            <div className="font-serif text-5xl sm:text-6xl text-[#DFBF77] font-bold mb-3 tracking-wider">
              {config.monogram}
            </div>
            <p className="text-sm font-serif text-[#DFBF77]/80 tracking-widest uppercase mb-6">
              {language === 'ar' 
                ? `نحتفي بالحب.. أهلاً بكم في زفاف ${config.coupleShortAr}` 
                : `Celebrating Love • ${config.coupleShortEn}`}
            </p>
            <div className="w-40 h-0.5 bg-[#DFBF77]/20 rounded-full mx-auto overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-[#C69A39] to-[#DFBF77] animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* Sticky Navbar */}
      <Navbar
        language={language}
        config={config}
        onToggleLanguage={toggleLanguage}
        isDark={isDark}
        onToggleDark={toggleTheme}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={toggleMusic}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenEditor={() => setIsEditorOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          language={language}
          config={config}
          onOpenPrintModal={() => setIsPrintModalOpen(true)}
          onOpenEditor={() => setIsEditorOpen(true)}
        />

        {/* 2. Our Love Story */}
        <OurStory language={language} />

        {/* 3. Event Details & Dress Code */}
        <EventDetails language={language} config={config} />

        {/* 4. Timeline Schedule */}
        <TimelineSchedule language={language} />

        {/* 5. Photo & Video Gallery */}
        <Gallery language={language} />

        {/* 6. DJ Lounge & Music Playlist */}
        <DjMusicSection language={language} />

        {/* 7. RSVP Form */}
        <RsvpSection language={language} />

        {/* 8. Gift Registry & Wishing Well */}
        <GiftRegistry language={language} />

        {/* 9. VIP Bridal Party & Family */}
        <BridalParty language={language} />

        {/* 10. Accommodations & Nearby Hotels */}
        <TravelAccommodations language={language} />
      </main>

      {/* 11. Footer */}
      <Footer language={language} config={config} />

      {/* Floating Action Button for Instant Invitation Card Customization */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsEditorOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#C69A39] via-[#DFBF77] to-[#97711B] text-white font-bold text-xs sm:text-sm shadow-2xl hover:scale-105 hover:brightness-110 transition-all border-2 border-white/40 group"
          title={language === 'ar' ? 'تصميم كرت الدعوة وتعديل البيانات' : 'Customize Wedding Card & Info'}
        >
          <Sparkles className="w-4 h-4 text-white animate-spin group-hover:scale-110" />
          <span>{language === 'ar' ? 'صمّم كرت دعوتك الآن' : 'Design Your Card'}</span>
        </button>
      </div>

      {/* Modals */}
      <InvitationCardEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        language={language}
        config={config}
        onSaveConfig={handleSaveConfig}
      />

      <PrintInvitationModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        language={language}
        config={config}
      />

      <AdminDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        language={language}
        plannerPhone={config.plannerPhone}
      />

      <StandaloneCodeModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        language={language}
        config={config}
      />
    </div>
  );
}
