/* ==========================================================================
   BIO CAFE — Script principal (JavaScript pur, sans dépendances)
   ========================================================================== */

// --------------------------------------------------------------------------
// CONFIG — regrouper ici tout ce qui devra être branché plus tard
// (numéro WhatsApp, endpoint de formulaire, identifiants d'analytics, etc.)
// --------------------------------------------------------------------------
const CONFIG = {
  whatsappNumber: "", // ex: "212664757055" — à renseigner pour activer le CTA WhatsApp
  contactFormEndpoint: "", // ex: Formspree endpoint pour le formulaire de contact
  // GA_MEASUREMENT_ID: "G-XXXXXXX",
  // META_PIXEL_ID: "XXXXXXXXXXXXXXX",
};

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initMobileNav();
  initStickyHeader();
  initScrollProgress();
  initRevealOnScroll();
  initCounters();
  initTestimonialSlider();
  initCTAButtons();
});

// --------------------------------------------------------------------------
// Année dans le footer
// --------------------------------------------------------------------------
function initYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// --------------------------------------------------------------------------
// Navigation mobile
// --------------------------------------------------------------------------
function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("flex");
    menu.classList.toggle("hidden");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
      menu.classList.remove("flex");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// --------------------------------------------------------------------------
// En-tête qui se fige au scroll
// --------------------------------------------------------------------------
function initStickyHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add("header-scrolled");
    else header.classList.remove("header-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// --------------------------------------------------------------------------
// Barre de progression "vapeur" en haut de page
// --------------------------------------------------------------------------
function initScrollProgress() {
  const fill = document.getElementById("steam-progress-fill");
  if (!fill) return;
  const onScroll = () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    fill.style.width = pct + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// --------------------------------------------------------------------------
// Apparition au scroll (reveal) + tracé des dividers "vapeur"
// --------------------------------------------------------------------------
function initRevealOnScroll() {
  const targets = document.querySelectorAll(".reveal, .steam-divider");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach((t) => io.observe(t));
}

// --------------------------------------------------------------------------
// Compteurs animés (statistiques)
// --------------------------------------------------------------------------
function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseFloat(el.getAttribute("data-counter"));
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent =
        (Number.isInteger(target) ? Math.floor(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animate);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((c) => io.observe(c));
}

// --------------------------------------------------------------------------
// Slider de témoignages (autoplay, sans dépendance)
// --------------------------------------------------------------------------
function initTestimonialSlider() {
  const track = document.getElementById("testimonial-track");
  const dotsWrap = document.getElementById("testimonial-dots");
  if (!track) return;

  const slides = Array.from(track.children);
  let index = 0;
  let timer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "t-dot";
    dot.setAttribute("aria-label", `Aller au témoignage ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap?.appendChild(dot);
  });

  function updateDots() {
    dotsWrap?.querySelectorAll(".t-dot").forEach((d, i) => {
      d.classList.toggle("t-dot--active", i === index);
    });
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  function next() {
    goTo(index + 1);
  }

  function startAutoplay() {
    timer = setInterval(next, 5500);
  }
  function stopAutoplay() {
    if (timer) clearInterval(timer);
  }

  track.parentElement?.addEventListener("mouseenter", stopAutoplay);
  track.parentElement?.addEventListener("mouseleave", startAutoplay);

  updateDots();
  startAutoplay();
}

// --------------------------------------------------------------------------
// Boutons d'appel à l'action (WhatsApp à brancher plus tard)
// --------------------------------------------------------------------------
function initCTAButtons() {
  const ctaButtons = document.querySelectorAll("[data-cta]");
  ctaButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (!CONFIG.whatsappNumber) {
        // Pas encore configuré : le bouton reste visuel pour le moment,
        // comme demandé — aucune action tant que le numéro WhatsApp
        // n'est pas renseigné dans CONFIG.whatsappNumber.
        e.preventDefault();
        return;
      }
      const message = encodeURIComponent(btn.getAttribute("data-cta-message") || "Bonjour BIO CAFE, je souhaite un renseignement.");
      window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${message}`, "_blank");
    });
  });
}

// Placeholders d'analytics — décommenter et compléter quand prêt
// (function(){ /* Google Analytics gtag.js snippet using CONFIG.GA_MEASUREMENT_ID */ })();
// (function(){ /* Meta Pixel snippet using CONFIG.META_PIXEL_ID */ })();
