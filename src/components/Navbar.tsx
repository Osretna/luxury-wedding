import React, { useState, useEffect } from 'react';
import { 
  Music, 
  VolumeX, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Code, 
  Users, 
  Globe,
  Sparkles 
} from 'lucide-react';
import { Language, WeddingConfig } from '../types/wedding';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onOpenAdmin: () => void;
  onOpenExportModal: () => void;
  onOpenEditor: () => void;
  config: WeddingConfig;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  isDark,
  onToggleDark,
  isPlayingMusic,
  onToggleMusic,
  onOpenAdmin,
  onOpenExportModal,
  onOpenEditor,
  config,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAr = language === 'ar';

  const navLinks = [
    { href: '#hero', labelAr: 'الرئيسية', labelEn: 'Home' },
    { href: '#story', labelAr: 'قصتنا', labelEn: 'Our Story' },
    { href: '#details', labelAr: 'التفاصيل', labelEn: 'Details' },
    { href: '#timeline', labelAr: 'الجدول', labelEn: 'Schedule' },
    { href: '#gallery', labelAr: 'الصور', labelEn: 'Gallery' },
    { href: '#dj-music', labelAr: 'الديجي والأغاني', labelEn: 'DJ & Music' },
    { href: '#registry', labelAr: 'الهدايا', labelEn: 'Registry' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#151311]/90 shadow-md backdrop-blur-md py-3 border-b border-[#C69A39]/20'
          : 'bg-gradient-to-b from-black/60 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram / Logo */}
        <a 
          href="#hero" 
          className="flex items-center gap-2 group transition-transform hover:scale-105"
        >
          <span className="text-[#C69A39] dark:text-[#DFBF77] text-2xl font-serif">⚜</span>
          <span className={`font-serif font-bold text-xl tracking-wider ${scrolled ? 'text-[#2C241E] dark:text-[#F5EFEB]' : 'text-white'}`}>
            {isAr ? config.coupleShortAr : config.coupleShortEn}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[#C69A39] dark:hover:text-[#DFBF77] ${
                scrolled ? 'text-[#3E352F] dark:text-[#D1C7BD]' : 'text-white/90'
              }`}
            >
              {isAr ? link.labelAr : link.labelEn}
            </a>
          ))}
          <a
            href="#rsvp"
            className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#C69A39] to-[#DFBF77] text-white hover:brightness-110 shadow-sm transition-transform hover:-translate-y-0.5"
          >
            {isAr ? 'تأكيد الحضور (RSVP)' : 'RSVP Now'}
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Card & Details Editor Studio Button - PROMINENT */}
          <button
            onClick={onOpenEditor}
            title={isAr ? 'تصميم كرت الدعوة وتعديل بيانات الزفاف' : 'Edit Wedding Card & Info'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#C69A39] text-white hover:bg-[#A98028] shadow-md transition-all hover:scale-105 animate-pulse"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAr ? 'تصميم كرت الدعوة' : 'Card Studio'}</span>
          </button>

          {/* Audio toggle */}
          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? (isAr ? 'كتم الموسيقى' : 'Mute Music') : (isAr ? 'تشغيل موسيقى رومانسية' : 'Play Music')}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border ${
              isPlayingMusic
                ? 'bg-[#C69A39] text-white border-[#C69A39] animate-pulse'
                : scrolled
                ? 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-[#C69A39] hover:text-white'
                : 'bg-white/20 text-white border-white/30 hover:bg-[#C69A39]'
            }`}
          >
            {isPlayingMusic ? <Music className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Theme toggle */}
          <button
            onClick={onToggleDark}
            title={isDark ? (isAr ? 'الوضع الفاتح' : 'Light Mode') : (isAr ? 'الوضع المظلم' : 'Dark Mode')}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border ${
              scrolled
                ? 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:text-[#C69A39]'
                : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language Switch */}
          <button
            onClick={onToggleLanguage}
            title={isAr ? 'English' : 'عربي'}
            className={`px-2.5 py-1 text-xs font-semibold rounded-full border transition-all flex items-center gap-1 ${
              scrolled
                ? 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:text-[#C69A39]'
                : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isAr ? 'EN' : 'عربي'}</span>
          </button>

          {/* View Code / Export Modal Button */}
          <button
            onClick={onOpenExportModal}
            title={isAr ? 'تصدير كود HTML/CSS/JS النظيف' : 'Export Clean Code'}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-[#C69A39]/60 text-[#C69A39] dark:text-[#DFBF77] hover:bg-[#C69A39]/10 transition-colors"
          >
            <Code className="w-3.5 h-3.5" />
            <span>{isAr ? 'كود HTML/CSS' : 'Pure Code'}</span>
          </button>

          {/* Admin / Guest List Button */}
          <button
            onClick={onOpenAdmin}
            title={isAr ? 'لوحة إدارة الحضور والـ RSVP' : 'Guest List & RSVP Admin'}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border ${
              scrolled
                ? 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:text-[#C69A39]'
                : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
            }`}
          >
            <Users className="w-4 h-4" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center bg-[#C69A39]/20 text-[#C69A39]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#1A1816] border-b border-stone-200 dark:border-stone-800 px-6 py-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEditor();
              }}
              className="flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold bg-[#C69A39] text-white shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'تعديل وتصميم كرت الدعوة الآن' : 'Design Wedding Card'}</span>
            </button>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-stone-800 dark:text-stone-200 hover:text-[#C69A39] transition-colors"
              >
                {isAr ? link.labelAr : link.labelEn}
              </a>
            ))}
            <a
              href="#rsvp"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-[#C69A39] to-[#DFBF77] text-white shadow-md"
            >
              {isAr ? 'تأكيد الحضور (RSVP)' : 'RSVP Now'}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenExportModal();
              }}
              className="flex items-center justify-center gap-2 py-2 rounded-full text-xs font-medium border border-[#C69A39] text-[#C69A39] mt-1"
            >
              <Code className="w-4 h-4" />
              <span>{isAr ? 'تحميل كود HTML/CSS/JS المستقل' : 'Download HTML/CSS/JS Files'}</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
