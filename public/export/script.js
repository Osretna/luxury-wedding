/**
 * ==========================================================================
 * Luxury Modern Wedding JavaScript (script.js)
 * Pure Vanilla JavaScript (No heavy external frameworks required)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. إخفاء شاشة التحميل (Preloader)
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      setTimeout(() => preloader.style.display = 'none', 600);
    }, 1200);
  }

  // 2. العداد التنازلي لموعد الزفاف (Wedding Countdown Timer)
  // Target: October 16, 2026, 18:30:00 (GMT+3 / AST)
  const weddingDate = new Date('2026-10-16T18:30:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const daysEl = document.getElementById('days');
      const hoursEl = document.getElementById('hours');
      const minutesEl = document.getElementById('minutes');
      const secondsEl = document.getElementById('seconds');

      if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
      if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
      if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
      if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // 3. شريط التنقل العلوي وتأثير التمرير (Sticky Navbar & Back to Top)
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // تثبيت القائمة مع خلفية زجاجية بلورية
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // إظهار زر العودة للأعلى
    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // تحديث الرابط النشط في القائمة
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. القائمة المنسدلة للهواتف (Mobile Menu Toggle)
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const navMenu = document.getElementById('navMenu');

  if (menuToggleBtn && navMenu) {
    menuToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = menuToggleBtn.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // إغلاق القائمة عند النقر على أي رابط
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = menuToggleBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 5. تبديل الوضع الليلي الفاخر (Dark Mode Toggle)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('wedding_theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeToggleBtn) {
      themeToggleBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      localStorage.setItem('wedding_theme', isDark ? 'dark' : 'light');

      const icon = themeToggleBtn.querySelector('i');
      if (isDark) {
        icon.classList.replace('fa-moon', 'fa-sun');
      } else {
        icon.classList.replace('fa-sun', 'fa-moon');
      }
    });
  }

  // 6. المشغل الصوتي الموسيقي المدمج (Web Audio API Romantic Harp)
  // يولد ألحان قيثارة رومانسية دافئة بدون ملفات خارجية ثقيلة وبدون أخطاء
  let audioCtx = null;
  let isPlayingAudio = false;
  let audioInterval = null;
  let noteIndex = 0;
  
  // نغمات كلاسيكية دافئة (Canon in D Chords)
  const harpNotes = [
    293.66, 369.99, 440.00, 587.33,
    220.00, 329.63, 440.00, 554.37,
    246.94, 369.99, 493.88, 587.33,
    185.00, 277.18, 369.99, 440.00,
    196.00, 293.66, 392.00, 493.88,
    146.83, 220.00, 293.66, 369.99,
    196.00, 293.66, 392.00, 493.88,
    220.00, 329.63, 440.00, 554.37
  ];

  function playHarpNote(freq) {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const now = audioCtx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 2.0);
  }

  const musicToggleBtn = document.getElementById('musicToggleBtn');
  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      isPlayingAudio = !isPlayingAudio;
      if (isPlayingAudio) {
        musicToggleBtn.style.background = 'var(--gold-primary)';
        musicToggleBtn.style.color = '#FFFFFF';
        audioInterval = setInterval(() => {
          playHarpNote(harpNotes[noteIndex]);
          noteIndex = (noteIndex + 1) % harpNotes.length;
        }, 450);
      } else {
        musicToggleBtn.style.background = '';
        musicToggleBtn.style.color = '';
        clearInterval(audioInterval);
      }
    });
  }

  // 7. فلترة معرض الصور (Gallery Filters)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === itemCategory) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 8. المعاينة المكبرة للصور (Lightbox Modal)
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGalleryIndex = 0;
  const visibleImages = [];

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentGalleryIndex = index;
      openLightbox(item);
    });
  });

  function openLightbox(item) {
    const img = item.querySelector('img');
    const title = item.getAttribute('data-title') || '';
    const desc = item.getAttribute('data-desc') || '';

    lightboxImg.src = img.src;
    lightboxCaption.innerHTML = `<strong>${title}</strong> - ${desc}`;
    lightbox.classList.add('active');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
      openLightbox(galleryItems[currentGalleryIndex]);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
      openLightbox(galleryItems[currentGalleryIndex]);
    });
  }

  // 9. نموذج تأكيد الحضور (RSVP Form Handling)
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpSuccess = document.getElementById('rsvpSuccess');
  const attendingDetails = document.getElementById('attendingDetails');
  const attendanceRadios = document.getElementsByName('attendance');
  let lastRsvpData = null;

  // إخفاء أو إظهار تفاصيل الوجبات والضيوف بناءً على حالة الحضور
  attendanceRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.value === 'declined') {
        if (attendingDetails) attendingDetails.style.display = 'none';
      } else {
        if (attendingDetails) attendingDetails.style.display = 'block';
      }
    });
  });

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(rsvpForm);
      const fullName = formData.get('fullName');
      const phone = formData.get('phone');
      const attendance = formData.get('attendance');
      const guestCount = formData.get('guestCount') || 1;
      const mealChoice = formData.get('mealChoice') || '';
      const dietaryNotes = formData.get('dietaryNotes') || '';
      const message = formData.get('message') || '';

      lastRsvpData = {
        fullName,
        phone,
        attendance,
        guestCount,
        mealChoice,
        dietaryNotes,
        message,
        date: new Date().toISOString()
      };

      // حفظ الرد في ذاكرة المتصفح (LocalStorage)
      const existingRsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      existingRsvps.push(lastRsvpData);
      localStorage.setItem('wedding_rsvps', JSON.stringify(existingRsvps));

      // عرض رسالة النجاح
      rsvpForm.style.display = 'none';
      rsvpSuccess.classList.remove('hidden');

      const guestNameEl = document.getElementById('successGuestName');
      if (guestNameEl) {
        if (attendance === 'attending') {
          guestNameEl.innerText = `شكراً جزيلاً يا ${fullName}! يسعدنا جداً حضورك (${guestCount} ضيوف) وتجهيز مقعدك في القاعة.`;
        } else {
          guestNameEl.innerText = `شكراً لتواصلك يا ${fullName}.. نقدر اعتذارك ودعواتك الصادقة لنا بالخير والتوفيق.`;
        }
      }
    });
  }

  // إعادة تعيين النموذج
  const resetFormBtn = document.getElementById('resetFormBtn');
  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      rsvpForm.reset();
      rsvpForm.style.display = 'block';
      rsvpSuccess.classList.add('hidden');
      if (attendingDetails) attendingDetails.style.display = 'block';
    });
  }

  // إرسال البيانات إلى واتساب العروسين
  const sendToWhatsAppBtn = document.getElementById('sendToWhatsAppBtn');
  if (sendToWhatsAppBtn) {
    sendToWhatsAppBtn.addEventListener('click', () => {
      if (!lastRsvpData) return;
      const brideGroomPhone = '+966501234567'; // رقم العروسين أو المنسق
      const statusText = lastRsvpData.attendance === 'attending' ? '✅ نعم، سأحضر بكل سرور' : '❌ للأسف أعتذر عن الحضور';
      
      let text = `مرحباً، أود تأكيد حضوري لحفل زفاف طارق وسارة 💍✨\n\n`;
      text += `• الاسم: ${lastRsvpData.fullName}\n`;
      text += `• رقم الهاتف: ${lastRsvpData.phone}\n`;
      text += `• الحالة: ${statusText}\n`;
      if (lastRsvpData.attendance === 'attending') {
        text += `• عدد الضيوف: ${lastRsvpData.guestCount}\n`;
        text += `• الوجبة: ${lastRsvpData.mealChoice}\n`;
        if (lastRsvpData.dietaryNotes) text += `• ملاحظات غذائية: ${lastRsvpData.dietaryNotes}\n`;
      }
      if (lastRsvpData.message) text += `• رسالة التهنئة: ${lastRsvpData.message}\n`;

      const whatsappUrl = `https://wa.me/${brideGroomPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // 10. قسم الديجي والأغاني المطلوبة (DJ Section)
  const initialSongs = [
    { title: 'نور عيني (نسخة الزفاف الملكية)', artist: 'عمرو دياب', upvotes: 45 },
    { title: 'يا قمرنا طلي', artist: 'ماجد المهندس', upvotes: 38 },
    { title: 'Perfect (Duet Arabic/English)', artist: 'Ed Sheeran', upvotes: 29 },
    { title: 'مبروك يا عريسنا الغالي', artist: 'حسين الجسمي', upvotes: 34 }
  ];

  const songsListContainer = document.getElementById('songsListContainer');
  const songRequestForm = document.getElementById('songRequestForm');

  function renderSongs() {
    if (!songsListContainer) return;
    songsListContainer.innerHTML = '';

    initialSongs.forEach((song, index) => {
      const item = document.createElement('div');
      item.className = 'song-item';
      item.innerHTML = `
        <div class="song-meta">
          <h5>${song.title}</h5>
          <span>${song.artist}</span>
        </div>
        <button class="btn-upvote" onclick="upvoteSong(${index})">
          <i class="fa-solid fa-heart"></i> ${song.upvotes}
        </button>
      `;
      songsListContainer.appendChild(item);
    });
  }

  window.upvoteSong = function(index) {
    initialSongs[index].upvotes += 1;
    renderSongs();
  };

  if (songRequestForm) {
    songRequestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleInput = document.getElementById('songTitle');
      const artistInput = document.getElementById('songArtist');

      if (titleInput && artistInput && titleInput.value) {
        initialSongs.unshift({
          title: titleInput.value,
          artist: artistInput.value || 'طلب خاص',
          upvotes: 1
        });
        renderSongs();
        songRequestForm.reset();
        alert('شكراً لك! تمت إضافة الأغنية إلى قائمة مقترحات الديجي بنجاح 🎶');
      }
    });
  }

  renderSongs();

  // 11. نافذة طباعة بطاقة الدعوة (Print Modal)
  const printCardBtn = document.getElementById('printCardBtn');
  const printModal = document.getElementById('printModal');
  const closePrintModalBtn = document.getElementById('closePrintModalBtn');
  const dismissPrintBtn = document.getElementById('dismissPrintBtn');

  if (printCardBtn && printModal) {
    printCardBtn.addEventListener('click', () => {
      printModal.classList.add('active');
    });
  }

  function closePrintModal() {
    if (printModal) printModal.classList.remove('active');
  }

  if (closePrintModalBtn) closePrintModalBtn.addEventListener('click', closePrintModal);
  if (dismissPrintBtn) dismissPrintBtn.addEventListener('click', closePrintModal);
});

// 12. دوال مساعدة عامة (Copy IBAN & Copy Hashtag)
window.copyIban = function(elementId) {
  const codeEl = document.getElementById(elementId);
  if (codeEl) {
    const text = codeEl.innerText.trim();
    navigator.clipboard.writeText(text).then(() => {
      alert(`تم نسخ رقم الآيبان بنجاح: ${text}`);
    }).catch(() => {
      prompt('يمكنك نسخ الآيبان يدوياً:', text);
    });
  }
};

window.copyHashtag = function() {
  const hashtagEl = document.getElementById('hashtagText');
  if (hashtagEl) {
    const text = hashtagEl.innerText.trim();
    navigator.clipboard.writeText(text).then(() => {
      alert(`تم نسخ هاشتاق الزفاف: ${text}`);
    }).catch(() => {
      prompt('انسخ الهاشتاق:', text);
    });
  }
};
