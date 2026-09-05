/**
 * ============================================================================
 * PREMIUM ISLAMIC LUXURY WEDDING INVITATION SCRIPT
 * Groom: Aleena & Bride
 * Date: Wednesday, 14 November 2026 • 7:00 PM IST
 * Venue: Seven hilles,sirsi road,kanakpura Marriage Garden, Jaipur, Rajasthan
 * WhatsApp RSVP Line: +91 89556 06092 (8955606092)
 * ============================================================================
 */

// 1. CONFIGURATION OBJECT (Easily edit all details here)
const CONFIG = {
  // Couple Information
  groomName: "Shami",
  brideName: "Aleena", // Change this to your bride's name (e.g., "Fatima", "Amina", etc.)
  brideNameFull: "Aleena",
  
  // Wedding Date & Time (ISO format with Indian Standard Time UTC+05:30)
  weddingDateISO: "2026-11-21T19:00:00+05:30",
  weddingDateDisplay: "Wednesday, 14 November 2026",
  weddingTimeDisplay: "7:00 PM Onwards",
  
  // Venue Information
  venueName: "Seven hilles Marriage Garden, sirsi road, kanakpura ",
  venueCity: "Jaipur, Rajasthan, India",
  venueFullAddress: "Seven hilles  Marriage Garden,sirsi road,kanakpura, Jaipur, Rajasthan, India",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Seven hilles Marriage Garden, sirsi road, kanakpura+Jaipur+Rajasthan",
  
  // WhatsApp RSVP Settings
  // Set your WhatsApp number here (Country Code + 10-digit Mobile Number without spaces or +)
  whatsappNumber: "918955606092", // 89556 06092 with +91 India code
  
  // Background Audio Settings
  audioFilePath: "audio/music.mp3",
  autoPlayMutedFallback: true
};

// 2. DOM INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  initAudioPlayer();
  initCountdownTimer();
  initRsvpForm();
  initGalleryFilter();
  initLightbox();
  initScrollAnimations();
  initNavbarScroll();
  initCalendarButton();
});

/* ==========================================================================
   3. BACKGROUND AUDIO PLAYER LOGIC
   ========================================================================== */
function initAudioPlayer() {
  const audio = document.getElementById("weddingAudio");
  const audioBtn = document.getElementById("audioToggleBtn");
  const audioWidget = document.getElementById("audioWidget");
  let isPlaying = false;

  if (!audio || !audioBtn) return;

  // Toggle play / pause on button click
  audioBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      audioBtn.classList.remove("playing");
      audioBtn.setAttribute("aria-label", "Play Background Music");
    } else {
      audio.play().then(() => {
        isPlaying = true;
        audioBtn.classList.add("playing");
        audioBtn.setAttribute("aria-label", "Pause Background Music");
      }).catch(err => {
        console.log("Audio playback restricted by browser policy:", err);
      });
    }
  });

  // Enable audio on first user click anywhere on page if allowed
  const startAudioOnFirstInteraction = () => {
    if (!isPlaying) {
      audio.play().then(() => {
        isPlaying = true;
        audioBtn.classList.add("playing");
      }).catch(() => {
        // User gesture required or autoplay blocked; silently wait for direct button press
      });
    }
    document.removeEventListener("click", startAudioOnFirstInteraction);
  };

  document.addEventListener("click", startAudioOnFirstInteraction, { once: true });
}

/* ==========================================================================
   4. LIVE COUNTDOWN TIMER
   ========================================================================== */
function initCountdownTimer() {
  const daysEl = document.getElementById("cdDays");
  const hoursEl = document.getElementById("cdHours");
  const minutesEl = document.getElementById("cdMinutes");
  const secondsEl = document.getElementById("cdSeconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const targetDate = new Date(CONFIG.weddingDateISO).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 48 * 100 * 20));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ==========================================================================
   5. GOOGLE CALENDAR ADD-EVENT INTEGRATION
   ========================================================================== */
function initCalendarButton() {
  const btn = document.getElementById("btnAddToCalendar");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const title = encodeURIComponent(`Wedding: ${CONFIG.groomName} & ${CONFIG.brideName}`);
    const details = encodeURIComponent(
      `You are cordially invited to celebrate the blessed Nikah and Wedding of ${CONFIG.groomName} and ${CONFIG.brideName}.\n\nDate: ${CONFIG.weddingDateDisplay}\nTime: ${CONFIG.weddingTimeDisplay}\nVenue: ${CONFIG.venueName}, ${CONFIG.venueCity}`
    );
    const location = encodeURIComponent(`${CONFIG.venueName}, ${CONFIG.venueCity}`);
    // Saturday 21 Nov 2026, 7:00 PM IST is 13:30 UTC -> 20261121T133000Z to 20261121T183000Z
    const dates = "20261121T133000Z/20261121T183000Z";

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(calendarUrl, "_blank");
  });
}

/* ==========================================================================
   6. RSVP FORM & WHATSAPP GENERATOR
   ========================================================================== */
function initRsvpForm() {
  const form = document.getElementById("rsvpForm");
  const guestNameInput = document.getElementById("guestName");
  const guestPhoneInput = document.getElementById("guestPhone");
  const attendanceSelect = document.getElementById("attendanceStatus");
  const guestCountSelect = document.getElementById("guestCount");
  const guestMessageInput = document.getElementById("guestMessage");
  const previewText = document.getElementById("whatsappPreviewText");

  if (!form) return;

  // Live preview builder
  function updatePreview() {
    const name = guestNameInput.value.trim() || "[Your Name]";
    const phone = guestPhoneInput.value.trim() || "[Your Phone Number]";
    const attendance = attendanceSelect.value || "Joyfully Attending";
    const count = guestCountSelect.value || "2 Persons";
    const msg = guestMessageInput.value.trim() || "Barakallahu lakuma! May Allah shower His blessings upon you both.";

    if (previewText) {
      previewText.innerHTML = `
        <strong>*Wedding RSVP: ${CONFIG.groomName} &amp; ${CONFIG.brideName}*</strong><br>
        --------------------------------<br>
        *Guest Name:* ${name}<br>
        *Contact:* ${phone}<br>
        *Status:* ${attendance}<br>
        *Total Guests:* ${count}<br>
        *Event Date:* ${CONFIG.weddingDateDisplay}<br>
        *Time:* ${CONFIG.weddingTimeDisplay}<br>
        *Venue:* ${CONFIG.venueName}, ${CONFIG.venueCity}<br>
        *Dua / Message:* ${msg}<br>
        --------------------------------<br>
        <em>_Sent via Aleena &amp; ${CONFIG.brideName}'s Wedding Invitation_</em>
      `;
    }
  }

  [guestNameInput, guestPhoneInput, attendanceSelect, guestCountSelect, guestMessageInput].forEach(el => {
    if (el) {
      el.addEventListener("input", updatePreview);
      el.addEventListener("change", updatePreview);
    }
  });

  // Handle Form Submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = guestNameInput.value.trim();
    const phone = guestPhoneInput.value.trim();
    const attendance = attendanceSelect.value;
    const count = guestCountSelect.value;
    const msg = guestMessageInput.value.trim();

    if (!name || !attendance) {
      alert("Please fill in your name and select your attendance status.");
      return;
    }

    // Build the formatted WhatsApp message
    let waMessage = `*Wedding RSVP: ${CONFIG.groomName} & ${CONFIG.brideName}*\n`;
    waMessage += `━━━━━━━━━━━━━━━━━━━━\n`;
    waMessage += `👤 *Guest Name:* ${name}\n`;
    if (phone) {
      waMessage += `📞 *Phone:* ${phone}\n`;
    }
    waMessage += `✨ *Attendance:* ${attendance}\n`;
    waMessage += `👥 *Number of Guests:* ${count}\n`;
    waMessage += `📅 *Wedding Date:* ${CONFIG.weddingDateDisplay}\n`;
    waMessage += `⏰ *Time:* ${CONFIG.weddingTimeDisplay}\n`;
    waMessage += `📍 *Venue:* ${CONFIG.venueName}, ${CONFIG.venueCity}\n`;
    if (msg) {
      waMessage += `🤲 *Heartfelt Dua / Note:* ${msg}\n`;
    }
    waMessage += `━━━━━━━━━━━━━━━━━━━━\n`;
    waMessage += `_Sent from the Wedding Invitation Website_`;

    // Construct the WhatsApp URL
    const encodedMessage = encodeURIComponent(waMessage);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
  });
}

/* ==========================================================================
   7. PHOTO GALLERY FILTER
   ========================================================================== */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryCols = document.querySelectorAll(".gallery-col");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      galleryCols.forEach(col => {
        const category = col.getAttribute("data-category");
        if (filter === "all" || filter === category) {
          col.style.display = "block";
          col.classList.add("revealed");
        } else {
          col.style.display = "none";
        }
      });
    });
  });
}

/* ==========================================================================
   8. LIGHTBOX MODAL & IMAGE VIEWER
   ========================================================================== */
const galleryImages = [
  { src: "images/gallery/scard.png", caption: "The Sacred Nikah • Signing the Nikahnama" },
  { src: "images/gallery/ring.png", caption: "Rings of Eternity • Sacred Union" },
  { src: "images/gallery/mahndi.png", caption: "Bridal Mehndi • Traditional Henna" },
  { src: "images/gallery/seven hills.png", caption: "seven hilles  Marriage Garden,sirsi road • Jaipur, Rajasthan" },
  { src: "images/gallery/grand.png", caption: "Grand Reception Stage • Golden Illumination" },
  { src: "images/gallery/dawat.png", caption: "Dawat-e-Walima • Royal Feast & Celebrations" }
];

let currentLightboxIndex = 0;

function openLightbox(index) {
  currentLightboxIndex = index;
  const modal = document.getElementById("lightboxModal");
  const img = document.getElementById("lightboxImg");
  const caption = document.getElementById("lightboxCaption");

  if (!modal || !img) return;

  img.src = galleryImages[index].src;
  if (caption) caption.textContent = galleryImages[index].caption;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

function nextLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
  openLightbox(currentLightboxIndex);
}

function prevLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
  openLightbox(currentLightboxIndex);
}

// Keyboard shortcuts for Lightbox
function initLightbox() {
  document.addEventListener("keydown", (e) => {
    const modal = document.getElementById("lightboxModal");
    if (!modal || !modal.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextLightboxImage();
    if (e.key === "ArrowLeft") prevLightboxImage();
  });
}

/* ==========================================================================
   9. SMOOTH SCROLL & REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll("[data-reveal]");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute("data-delay") || 0;
        setTimeout(() => {
          entry.target.classList.add("revealed");
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   10. NAVBAR SCROLL & BACK-TO-TOP
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById("mainNavbar");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;

    // Navbar background change
    if (navbar) {
      if (scrollPos > 60) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // Scroll to top button visibility
    if (scrollTopBtn) {
      if (scrollPos > 400) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Close mobile navbar on navlink click
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navCollapse = document.getElementById("navbarContent");
  if (navCollapse) {
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 992) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      });
    });
  }
}
