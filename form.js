document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const section = document.getElementById("booking-services");
  if (!section) return;

  // Prevent this script from initializing twice.
  if (section.dataset.nbInitialized === "true") return;
  section.dataset.nbInitialized = "true";

  const $ = (id) => section.querySelector("#" + id);
  const money = (n) => "₹" + Number(n).toLocaleString("en-IN");

  // SERVICE DATA
  // Prices are retained from the supplied booking script.
  // Verify against the latest price list before publishing.

  const services = {
    threading: {
      title: "Threading & Facial Waxing",
      label: "01 / FACE & GROOMING",
      desc: "Beautifully defined brows and smooth skin.",
      items: [
        ["Eyebrows", { Thread: 59, "Gel wax": 79, "Bead wax": 99 }],
        ["Upper Lips", { Thread: 59, "Gel wax": 79, "Bead wax": 99 }],
        ["Forehead", { Thread: 59, "Gel wax": 79, "Bead wax": 99 }],
        ["Sidelocks + Jawline", { Thread: 59, "Gel wax": 79, "Bead wax": 99 }],
        ["Chin + Lower Lips", { Thread: 59, "Gel wax": 79, "Bead wax": 99 }],
        ["Neck (Front Only)", { Thread: 59, "Gel wax": 159, "Bead wax": 199 }],
        [
          "Full Face (Excl. Neck)",
          { Thread: 250, "Gel wax": 349, "Bead wax": 450 },
        ],
      ],
    },
    waxing: {
      title: "Body Waxing",
      label: "02 / BODY",
      desc: "Smooth skin in the comfort of your home.",
      items: [
        ["Full Arms + Underarms", { Honey: 399, "Gel wax": 449, Rica: 549 }],
        ["Full Legs", { Honey: 399, "Gel wax": 449, Rica: 549 }],
        ["Half Legs", { Honey: 299, "Gel wax": 349, Rica: 449 }],
        ["Full Body", { Honey: 1300, "Gel wax": 1500, Rica: 1800 }],
        ["Full Back", { Honey: 399, "Gel wax": 449, Rica: 499 }],
        ["Stomach", { Honey: 320, "Gel wax": 350, Rica: 399 }],
        ["Underarms", { Honey: 49, "Gel wax": 99, Rica: 169 }],
        ["Butt Waxing", { Honey: 399, "Gel wax": 429, Rica: 449 }],
        ["Bikini (Peel-off)", { Honey: 699, Rica: 1299 }],
        ["Bikini Line (Peel-off)", { Honey: 299, Rica: 349 }],
        ["Full Arms", { Honey: 349, "Gel wax": 399, Rica: 449 }],
        ["Half Arms", { Honey: 299, "Gel wax": 329, Rica: 349 }],
        ["Half Back", { Honey: 199, "Gel wax": 299, Rica: 349 }],
      ],
    },
    cleanup: {
      title: "Cleanup",
      label: "03 / SKIN",
      desc: "A refreshing reset for your skin.",
      items: [
        ["De-Tan Cleanup", 929],
        ["Fruit Cleanup", 729],
      ],
    },
    facial: {
      title: "Facial",
      label: "04 / SKIN",
      desc: "Thoughtful facial treatments for your skin.",
      items: [
        ["Casmara Hydration Facial", 3000],
        ["O3+ Shine and Glow Facial", 1749],
        ["Casmara Anti-Aging Facial", 3999],
        ["Wine Glow Facial", 1249],
      ],
    },
    korean: {
      title: "Korean Facial",
      label: "05 / SKIN",
      desc: "Hydration and glow-focused facial care.",
      items: [
        ["FYC Korean Glass Skin Facial", 2000],
        ["Swiss Beauty Korean Glow Facial", 1399],
        ["Korean Hydration Facial", 1749],
        ["Korean Anti Age Rewind Facial", 1899],
        ["K-Facial for Pigmentation and Uneven Skin Tone", 1899],
      ],
    },
    ayurvedic: {
      title: "Ayurvedic Facial",
      label: "06 / SKIN",
      desc: "Traditional-inspired facial care.",
      items: [
        ["Kumkumadi Hydration Facial", 1299],
        ["O3+ Ayurvedic Facial", 1790],
      ],
    },
    manicure: {
      title: "Manicure & Pedicure",
      label: "07 / HANDS & FEET",
      desc: "Beautifully cared-for hands and feet.",
      items: [
        ["Classic Manicure & Pedicure", 780],
        ["Premium Manicure & Pedicure", 1299],
        ["Classic Pedicure", 599],
        ["Premium Pedicure", 999],
        ["Classic Manicure", 499],
        ["Premium Manicure", 899],
      ],
    },
    massage: {
      title: "Head Massage",
      label: "08 / RELAX",
      desc: "A soothing moment for yourself.",
      items: [
        ["Relaxing Head Massage for Scalp Health (30 min)", 299],
        ["Head, Neck & Shoulder Massage (30 min)", 499],
      ],
    },
    draping: {
      title: "Draping",
      label: "09 / OCCASION",
      desc: "Get ready for your special occasion.",
      items: [["Saree Draping", 399]],
    },
  };

  const cart = new Map();

  let currentCategory = "threading";
  let searchTerm = "";
  let selectedDay = "today";
  let selectedSlot = "";
  let bookingMode = "schedule";

  // ==========================================
  // RENDER SERVICES
  // ==========================================

  function renderServices() {
    const data = services[currentCategory];
    const grid = $("nbServiceGrid");
    if (!data || !grid) return;

    $("nbCategoryLabel").textContent = data.label;
    $("nbCategoryTitle").textContent = data.title;
    $("nbCategoryDesc").textContent = data.desc;

    const filtered = data.items.filter(([name]) =>
      name.toLowerCase().includes(searchTerm),
    );

    $("nbServiceCount").textContent = String(filtered.length).padStart(2, "0");

    grid.replaceChildren();

    if (!filtered.length) {
      const empty = document.createElement("p");
      empty.className = "text-muted small";
      empty.textContent = "No matching services found.";
      grid.append(empty);
      return;
    }

    filtered.forEach(([name, options]) => {
      const card = document.createElement("div");
      card.className = "nb-service-card";

      const info = document.createElement("div");
      info.className = "nb-service-info";

      const title = document.createElement("h5");
      title.textContent = name;
      info.append(title);

      const variants = document.createElement("div");
      variants.className = "nb-service-variants";

      const choices =
        typeof options === "number" ? { Standard: options } : options;

      Object.entries(choices).forEach(([variant, price]) => {
        const key = `${currentCategory}|${name}|${variant}`;
        const button = document.createElement("button");

        button.type = "button";
        button.className = "nb-variant-btn";

        const added = cart.has(key);
        button.classList.toggle("is-added", added);
        button.setAttribute("aria-pressed", String(added));

        const label = document.createElement("span");
        label.textContent = variant === "Standard" ? "Add" : variant;

        const amount = document.createElement("strong");
        amount.textContent = money(price);

        button.append(label, amount);

        button.addEventListener("click", () => {
          if (cart.has(key)) {
            cart.delete(key);
          } else {
            cart.set(key, { name, variant, price });
          }

          // Update selected state without jumping the page.
          renderServices();
          renderCart();
        });

        variants.append(button);
      });

      info.append(variants);
      card.append(info);
      grid.append(card);
    });
  }

  // ==========================================
  // RENDER CART
  // ==========================================

  function renderCart() {
    const target = $("qb-cart");
    if (!target) return;

    target.replaceChildren();

    if (!cart.size) {
      const empty = document.createElement("div");
      empty.className = "qb-cart-empty";
      empty.innerHTML = `
        <span class="qb-cart-empty-icon">✦</span>
        <span>
          <b>Choose your services</b>
          <span class="qb-cart-empty-sub">
            Select services from the menu beside this form.
          </span>
        </span>
      `;
      target.append(empty);
      return;
    }

    let total = 0;

    for (const [key, item] of cart.entries()) {
      total += item.price;

      const line = document.createElement("div");
      line.className = "nb-cart-line";

      const detail = document.createElement("div");

      const name = document.createElement("strong");
      name.textContent = item.name;

      const meta = document.createElement("small");
      meta.textContent =
        (item.variant === "Standard" ? "" : item.variant + " · ") +
        money(item.price);

      detail.append(name, meta);

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "nb-cart-remove";
      remove.textContent = "Remove";

      remove.addEventListener("click", () => {
        cart.delete(key);
        renderCart();
        renderServices();
      });

      line.append(detail, remove);
      target.append(line);
    }

    const summary = document.createElement("div");
    summary.className = "nb-cart-total";

    const totalLabel = document.createElement("span");
    totalLabel.textContent = "Total";

    const totalValue = document.createElement("strong");
    totalValue.textContent = money(total);

    summary.append(totalLabel, totalValue);
    target.append(summary);

    const addMore = document.createElement("button");
    addMore.type = "button";
    addMore.className = "nb-add-more";
    addMore.textContent = "+ Add more services";

    addMore.addEventListener("click", () => {
      $("nb-service-search").focus({ preventScroll: true });
      $("qb-service-picker").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    target.append(addMore);
  }

  // ==========================================
  // CATEGORY TABS
  // ==========================================

  const tabs = section.querySelectorAll(".nb-category-tab[data-category]");

  const scroller = $("nbTabsContainer");

  function updateArrows() {
    if (!scroller) return;

    const maxScroll = scroller.scrollWidth - scroller.clientWidth;

    const prev = $("nbTabPrev");
    const next = $("nbTabNext");

    if (prev) prev.disabled = scroller.scrollLeft <= 2;
    if (next) next.disabled = scroller.scrollLeft >= maxScroll - 2;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const category = tab.dataset.category;
      if (!services[category]) return;

      currentCategory = category;
      searchTerm = "";

      $("nb-service-search").value = "";

      tabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", String(active));
      });

      renderServices();
      $("nbServiceGrid").scrollTop = 0;

      // Scroll the tab strip only, not the whole page.
      if (scroller) {
        const left =
          tab.offsetLeft -
          scroller.offsetLeft -
          (scroller.clientWidth - tab.offsetWidth) / 2;

        scroller.scrollTo({
          left: Math.max(0, left),
          behavior: "smooth",
        });
      }
    });
  });

  $("nbTabPrev")?.addEventListener("click", () => {
    scroller?.scrollBy({ left: -240, behavior: "smooth" });
  });

  $("nbTabNext")?.addEventListener("click", () => {
    scroller?.scrollBy({ left: 240, behavior: "smooth" });
  });

  scroller?.addEventListener("scroll", updateArrows);
  window.addEventListener("resize", updateArrows);

  // ==========================================
  // SEARCH
  // ==========================================

  $("nb-service-search")?.addEventListener("input", (event) => {
    searchTerm = event.target.value.toLowerCase().trim();
    renderServices();
  });

  // ==========================================
  // DATE AND TIME SLOTS
  // ==========================================

  function getDate(offset = 0) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + offset);
    return date;
  }

  function formatDate(date) {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const timeSlots = [
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
  ];

  function renderSlots() {
    const date = getDate(selectedDay === "tomorrow" ? 1 : 0);

    $("qb-slot-date-label").textContent =
      (selectedDay === "today" ? "Today, " : "Tomorrow, ") + formatDate(date);

    const container = $("qb-slots");
    container.replaceChildren();

    timeSlots.forEach((label) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "qb-slot-btn";
      button.textContent = label;

      const [hourText, meridiem] = label.split(" ");
      const hour = (Number(hourText) % 12) + (meridiem === "PM" ? 12 : 0);

      const slotDate = new Date(date);
      slotDate.setHours(hour, 0, 0, 0);

      button.disabled = slotDate <= new Date();
      button.classList.toggle(
        "active",
        selectedSlot === label && !button.disabled,
      );

      button.addEventListener("click", () => {
        selectedSlot = label;
        renderSlots();

        $("qb-slot-msg").textContent =
          "Selected " + formatDate(date) + " at " + label;
      });

      container.append(button);
    });

    if (
      selectedDay === "today" &&
      !container.querySelector(".qb-slot-btn:not(:disabled)")
    ) {
      $("qb-slot-msg").textContent =
        "No slots remaining today. Please select Tomorrow.";
    }
  }

  // TODAY / TOMORROW
  section.querySelectorAll(".qb-day-btn").forEach((button) => {
    button.addEventListener("click", () => {
      selectedDay = button.dataset.day;
      selectedSlot = "";

      section.querySelectorAll(".qb-day-btn").forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      $("qb-slot-msg").textContent = "";
      renderSlots();
    });
  });

  // INSTANT / SCHEDULE
  section.querySelectorAll(".qb-mode-btn").forEach((button) => {
    button.addEventListener("click", () => {
      bookingMode = button.dataset.mode;

      section.querySelectorAll(".qb-mode-btn").forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      $("qb-schedule-section").style.display =
        bookingMode === "instant" ? "none" : "block";

      $("qb-instant-hint").style.display =
        bookingMode === "instant" ? "block" : "none";
    });
  });

  // ==========================================
  // WHATSAPP BOOKING
  // ==========================================

  $("quickbook-form")?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) return;

    if (!cart.size) {
      alert("Please select at least one service.");
      $("qb-service-picker").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    if (bookingMode === "schedule" && !selectedSlot) {
      $("qb-slot-msg").textContent = "Please select your preferred time slot.";
      $("qb-schedule-section").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    const name = $("qb-name").value.trim();
    const address = $("qb-address").value.trim();
    const flat = $("qb-flat").value.trim();
    const floor = $("qb-floor").value.trim();

    const date = formatDate(getDate(selectedDay === "tomorrow" ? 1 : 0));

    const message = [
      "Hello Naaree, I would like to request a booking.",
      "",
      "Name: " + name,
      "Address: " + address,
      "Flat / Building: " + flat,
      "Floor: " + (floor || "Not specified"),
      "",
      "Date: " + date,
      "Preferred time: " +
        (bookingMode === "instant" ? "Instant" : selectedSlot),
      "",
      "Selected services:",
    ];

    let total = 0;

    for (const item of cart.values()) {
      total += item.price;

      message.push(
        "• " +
          item.name +
          (item.variant === "Standard" ? "" : " (" + item.variant + ")") +
          " - " +
          money(item.price),
      );
    }

    message.push(
      "",
      "Total: " + money(total),
      "",
      "Please confirm availability and payment details.",
    );

    // Number retained from your uploaded booking script.
    // Confirm it is the correct business WhatsApp number.
    const whatsappNumber = "9225174813";

    const url =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(message.join("\n"));

    window.open(url, "_blank", "noopener,noreferrer");
  });

  // INITIAL RENDER
  renderServices();
  renderCart();
  renderSlots();
  requestAnimationFrame(updateArrows);
});
