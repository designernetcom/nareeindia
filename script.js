// Small, dependency-free reveal effect
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Close mobile navigation after a section link is selected
document.querySelectorAll(".navbar .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.querySelector("#navMenu");
    if (menu && menu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

/* =========================================
   NAAREE SERVICES DATA + TAB FUNCTIONALITY
========================================= */

const nrImages = {
  threading:
    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80",
  waxing:
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
  cleanup:
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
  facial:
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
  korean:
    "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=80",
  ayurvedic:
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
  manicure:
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
  massage:
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
  draping:
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
};

const nrServiceData = {
  threading: {
    label: "01 / FACE & GROOMING",
    title: "Threading & Facial Waxing",
    desc: "Precise finishing touches for a polished look.",
    tag: "FACE CARE",
    image: nrImages.threading,
    items: [
      {
        name: "Eyebrows",
        price: 59,
        variants: ["Thread ₹59", "Gel wax ₹79", "Bead wax ₹99"],
      },
      {
        name: "Upper Lips",
        price: 59,
        variants: ["Thread ₹59", "Gel wax ₹79", "Bead wax ₹99"],
      },
      {
        name: "Forehead",
        price: 59,
        variants: ["Thread ₹59", "Gel wax ₹79", "Bead wax ₹99"],
      },
      {
        name: "Sidelocks + Jawline",
        price: 59,
        variants: ["Thread ₹59", "Gel wax ₹79", "Bead wax ₹99"],
      },
      {
        name: "Chin + Lower Lips",
        price: 59,
        variants: ["Thread ₹59", "Gel wax ₹79", "Bead wax ₹99"],
      },
      {
        name: "Neck (Front Only)",
        price: 59,
        variants: ["Thread ₹59", "Gel wax ₹159", "Bead wax ₹199"],
      },
      {
        name: "Full Face (Excl. Neck)",
        price: 250,
        variants: ["Thread ₹250", "Gel wax ₹349", "Bead wax ₹450"],
      },
    ],
  },

  waxing: {
    label: "02 / BODY CARE",
    title: "Body Waxing",
    desc: "Smooth skin with a choice of waxing techniques.",
    tag: "BODY CARE",
    image: nrImages.waxing,
    items: [
      {
        name: "Full Arms + Underarms",
        price: 399,
        variants: ["Honey ₹399", "Gel wax ₹449", "Rica ₹549"],
      },
      {
        name: "Full Legs",
        price: 399,
        variants: ["Honey ₹399", "Gel wax ₹449", "Rica ₹549"],
      },
      {
        name: "Half Legs",
        price: 299,
        variants: ["Honey ₹299", "Gel wax ₹349", "Rica ₹449"],
      },
      {
        name: "Full Body",
        price: 1300,
        variants: ["Honey ₹1300", "Gel wax ₹1500", "Rica ₹1800"],
      },
      {
        name: "Full Back",
        price: 399,
        variants: ["Honey ₹399", "Gel wax ₹449", "Rica ₹499"],
      },
      {
        name: "Stomach",
        price: 320,
        variants: ["Honey ₹320", "Gel wax ₹350", "Rica ₹399"],
      },
      {
        name: "Underarms",
        price: 49,
        variants: ["Honey ₹49", "Gel wax ₹99", "Rica ₹169"],
      },
      {
        name: "Butt Waxing",
        price: 399,
        variants: ["Honey ₹399", "Gel wax ₹429", "Rica ₹449"],
      },
      {
        name: "Bikini (Peel-off)",
        price: 699,
        variants: ["Honey ₹699", "Rica ₹1299"],
      },
      {
        name: "Bikini Line (Peel-off)",
        price: 299,
        variants: ["Honey ₹299", "Rica ₹349"],
      },
      {
        name: "Full Arms",
        price: 349,
        variants: ["Honey ₹349", "Gel wax ₹399", "Rica ₹449"],
      },
      {
        name: "Half Arms",
        price: 299,
        variants: ["Honey ₹299", "Gel wax ₹329", "Rica ₹349"],
      },
      {
        name: "Half Back",
        price: 199,
        variants: ["Honey ₹199", "Gel wax ₹299", "Rica ₹349"],
      },
    ],
  },

  cleanup: {
    label: "03 / SKIN ESSENTIALS",
    title: "Cleanup",
    desc: "A refreshing little reset for your skin.",
    tag: "SKIN CARE",
    image: nrImages.cleanup,
    items: [
      { name: "De-Tan Cleanup", price: 929 },
      { name: "Fruit Cleanup", price: 729 },
    ],
  },

  facial: {
    label: "04 / SKIN RITUALS",
    title: "Facial",
    desc: "Thoughtful skincare for your glow-up moments.",
    tag: "FACIAL",
    image: nrImages.facial,
    items: [
      {
        name: "Casmara Hydration Facial",
        price: 3000,
        duration: "1 hr 30 min",
        steps: "5 steps",
      },
      {
        name: "O3+ Shine and Glow Facial",
        price: 1749,
        duration: "1 hr 20 min",
        steps: "7 steps",
      },
      {
        name: "Casmara Anti-Aging Facial",
        price: 3999,
        duration: "1 hr 30 min",
        steps: "5 steps",
      },
      {
        name: "Wine Glow Facial",
        price: 1249,
        duration: "1 hr 15 min",
        steps: "9 steps",
      },
    ],
  },

  korean: {
    label: "05 / K-BEAUTY",
    title: "Korean Facial",
    desc: "Discover dewy, luminous Korean-inspired skincare.",
    tag: "K-BEAUTY",
    image: nrImages.korean,
    items: [
      {
        name: "FYC Korean Glass Skin Facial",
        price: 2000,
        duration: "1 hr 20 min",
        steps: "9 steps",
      },
      {
        name: "Swiss Beauty Korean Glow Facial",
        price: 1399,
        duration: "1 hr 20 min",
        steps: "8 steps",
      },
      {
        name: "Korean Hydration Facial",
        price: 1749,
        duration: "1 hr 20 min",
        steps: "9 steps",
      },
      {
        name: "Korean Anti Age Rewind Facial",
        price: 1899,
        duration: "1 hr 20 min",
        steps: "9 steps",
      },
      {
        name: "K-Facial for Pigmentation and Uneven Skin Tone",
        price: 1899,
        duration: "1 hr 20 min",
        steps: "10 steps",
      },
    ],
  },

  ayurvedic: {
    label: "06 / NATURAL BEAUTY",
    title: "Ayurvedic Facial",
    desc: "Traditional beauty-inspired rituals for radiant skin.",
    tag: "AYURVEDIC",
    image: nrImages.ayurvedic,
    items: [
      {
        name: "Kumkumadi Hydration Facial",
        price: 1299,
        duration: "1 hr 20 min",
        steps: "6 steps",
      },
      {
        name: "O3+ Ayurvedic Facial",
        price: 1790,
        duration: "1 hr 15 min",
        steps: "7 steps",
      },
    ],
  },

  manicure: {
    label: "07 / HANDS & FEET",
    title: "Manicure & Pedicure",
    desc: "Beautiful care from fingertips to toes.",
    tag: "NAIL CARE",
    image: nrImages.manicure,
    items: [
      { name: "Classic Manicure & Pedicure", price: 780 },
      { name: "Premium Manicure & Pedicure", price: 1299 },
      { name: "Classic Pedicure", price: 599 },
      { name: "Premium Pedicure", price: 999 },
      { name: "Classic Manicure", price: 499 },
      { name: "Premium Manicure", price: 899 },
    ],
  },

  massage: {
    label: "08 / RELAXATION",
    title: "Head Massage",
    desc: "A quiet moment of relaxation, just for you.",
    tag: "RELAX",
    image: nrImages.massage,
    items: [
      {
        name: "Relaxing Head Massage for Scalp Health",
        price: 299,
        duration: "30 min",
      },
      {
        name: "Head, Neck & Shoulder Massage",
        price: 499,
        duration: "30 min",
      },
    ],
  },

  draping: {
    label: "09 / OCCASION READY",
    title: "Draping",
    desc: "The finishing touch for your special occasion.",
    tag: "STYLING",
    image: nrImages.draping,
    items: [{ name: "Saree Draping", price: 399 }],
  },
};

/* Escape dynamic text before HTML insertion */
function nrEscape(value) {
  return String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );
}

function nrRenderServices(categoryKey) {
  const category = nrServiceData[categoryKey];
  if (!category) return;

  document.getElementById("nrCategoryLabel").textContent = category.label;

  document.getElementById("nrCategoryTitle").textContent = category.title;

  document.getElementById("nrCategoryDesc").textContent = category.desc;

  document.getElementById("nrServiceCount").textContent = String(
    category.items.length,
  ).padStart(2, "0");

  const grid = document.getElementById("nrServiceGrid");

  grid.innerHTML = category.items
    .map((service, index) => {
      const details = [service.duration, service.steps]
        .filter(Boolean)
        .join(" · ");

      const variants = service.variants?.length
        ? `<div class="nr-variants">
          ${service.variants
            .map(
              (variant) =>
                `<span class="nr-variant">${nrEscape(variant)}</span>`,
            )
            .join("")}
        </div>`
        : "";

      return `
      <div class="col-md-6 col-lg-4 nr-card-col">
        <article class="nr-service-card">

          <div class="nr-card-body">
         
            <h4>${nrEscape(service.name)}</h4>
            <div class="nr-price-area">
              <span class="nr-price-label">
                ${service.variants ? "STARTING FROM" : "SERVICE PRICE"}
              </span>

              <span class="nr-price">
                ₹${Number(service.price).toLocaleString("en-IN")}
              </span>

              ${variants}
            </div>

            <a href="#qb-service-picker" class="nr-book-btn">
              <span>Book This Service</span>
              <i class="bi bi-arrow-up-right"></i>
            </a>
          </div>

        </article>
      </div>
    `;
    })
    .join("");
}

/* Tab click functionality */
document.querySelectorAll(".nr-tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    document.querySelectorAll(".nr-tab").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });

    this.classList.add("active");
    this.setAttribute("aria-selected", "true");

    nrRenderServices(this.dataset.category);
  });
});

/* Initial category */
nrRenderServices("threading");

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("nrTabsContainer");
  const prevBtn = document.getElementById("nrTabPrev");
  const nextBtn = document.getElementById("nrTabNext");
  const tabs = document.querySelectorAll(".nr-tabs-wrapper .nr-tab");

  if (!container || !prevBtn || !nextBtn) return;

  function updateArrows() {
    const maxScroll = container.scrollWidth - container.clientWidth;

    prevBtn.disabled = container.scrollLeft <= 2;
    nextBtn.disabled = container.scrollLeft >= maxScroll - 2;
  }

  function scrollTabs(direction) {
    const amount = Math.max(180, container.clientWidth * 0.65);

    container.scrollBy({
      left: direction * amount,
      behavior: "smooth",
    });
  }

  prevBtn.addEventListener("click", function () {
    scrollTabs(-1);
  });

  nextBtn.addEventListener("click", function () {
    scrollTabs(1);
  });

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (item) {
        item.classList.remove("active");
        item.setAttribute("aria-selected", "false");
      });

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      // Update service cards
      nrRenderServices(tab.dataset.category);

      // Scroll active tab into the visible area
      const tabLeft = tab.offsetLeft;
      const tabRight = tabLeft + tab.offsetWidth;
      const viewLeft = container.scrollLeft;
      const viewRight = viewLeft + container.clientWidth;

      if (tabLeft < viewLeft) {
        container.scrollTo({
          left: tabLeft - 8,
          behavior: "smooth",
        });
      } else if (tabRight > viewRight) {
        container.scrollTo({
          left: tabRight - container.clientWidth + 8,
          behavior: "smooth",
        });
      }

      setTimeout(updateArrows, 350);
    });
  });

  container.addEventListener("scroll", updateArrows, {
    passive: true,
  });

  window.addEventListener("resize", updateArrows);

  updateArrows();
});

document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("siteHeader");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".naaree-nav-links .nav-link");

  if (!header) return;

  // Subtle shadow when scrolling
  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true,
  });

  updateHeader();

  // Active navigation link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Close mobile menu after clicking a link
  if (navMenu && window.bootstrap) {
    navMenu.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 992) {
          const instance = bootstrap.Collapse.getInstance(navMenu);

          if (instance) {
            instance.hide();
          }
        }
      });
    });
  }
});

// hero section

/* ==========================================
   NAAREE HERO SLIDER
========================================== */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const hero = document.querySelector(".naaree-hero");

  if (!hero) return;

  const slider = hero.querySelector("#nhSliderWindow");
  const track = hero.querySelector("#nhSliderTrack");

  const slides = Array.from(hero.querySelectorAll(".nh-service-slide"));

  const prevBtn = hero.querySelector("#nhPrev");
  const nextBtn = hero.querySelector("#nhNext");

  const dots = Array.from(hero.querySelectorAll("#nhSliderDots button"));

  const counter = hero.querySelector("#nhCurrentSlide");
  const visual = hero.querySelector(".nh-visual");

  if (!slider || !track || slides.length === 0) {
    console.error("Naaree slider HTML elements are missing.");
    return;
  }

  let currentIndex = 0;
  let autoTimer = null;
  let touchStartX = 0;
  let touchStartY = 0;

  const totalSlides = slides.length;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* UPDATE SLIDER */

  function updateSlider() {
    track.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;

    // Update pagination dots
    dots.forEach((dot, index) => {
      const active = index === currentIndex;

      dot.classList.toggle("active", active);

      if (active) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });

    // Update counter
    if (counter) {
      counter.textContent = String(currentIndex + 1).padStart(2, "0");
    }
  }

  /* NAVIGATION */

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;

    updateSlider();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function previousSlide() {
    goToSlide(currentIndex - 1);
  }

  /* AUTOPLAY */

  function stopAutoplay() {
    if (autoTimer !== null) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();

    if (reducedMotion || totalSlides < 2 || document.hidden) {
      return;
    }

    autoTimer = setInterval(function () {
      nextSlide();
    }, 4000);
  }

  /* BUTTON EVENTS */

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      previousSlide();
      startAutoplay();
    });
  }

  /* PAGINATION DOTS */

  dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
      goToSlide(index);
      startAutoplay();
    });
  });

  /* MOBILE SWIPE */

  slider.addEventListener(
    "touchstart",
    function (event) {
      touchStartX = event.changedTouches[0].screenX;
      touchStartY = event.changedTouches[0].screenY;
      stopAutoplay();
    },
    { passive: true },
  );

  slider.addEventListener(
    "touchend",
    function (event) {
      const touchEndX = event.changedTouches[0].screenX;
      const touchEndY = event.changedTouches[0].screenY;

      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          nextSlide();
        } else {
          previousSlide();
        }
      }

      startAutoplay();
    },
    { passive: true },
  );

  /* PAUSE ON HOVER */

  if (visual) {
    visual.addEventListener("mouseenter", stopAutoplay);
    visual.addEventListener("mouseleave", startAutoplay);

    visual.addEventListener("focusin", stopAutoplay);

    visual.addEventListener("focusout", function (event) {
      if (!visual.contains(event.relatedTarget)) {
        startAutoplay();
      }
    });
  }

  /* PAGE VISIBILITY */

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  /* INITIALIZE */

  updateSlider();
  startAutoplay();
});

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".naaree-festive-offers");

  if (!section) return;

  const tabs = Array.from(section.querySelectorAll(".nfo-tab"));
  const panels = Array.from(section.querySelectorAll(".nfo-panel"));

  function activateTab(tab) {
    const targetId = tab.getAttribute("data-nfo-target");

    tabs.forEach(function (item) {
      const active = item === tab;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });

    panels.forEach(function (panel) {
      const active = panel.id === targetId;
      panel.classList.toggle("active", active);
      panel.hidden = !active;
    });
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      activateTab(tab);
    });

    tab.addEventListener("keydown", function (event) {
      let nextIndex;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else {
        return;
      }

      event.preventDefault();
      activateTab(tabs[nextIndex]);
      tabs[nextIndex].focus();
    });
  });

  activateTab(tabs[0]);
});
