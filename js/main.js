/* DIVINEDS — central config + interactions */
const SITE_CONFIG = {
  brandName: "DIVINEDS",
  tagline: "Interiors That Inspire",
  phoneDisplay: "8755252677",
  phoneInternational: "918755252677",
  get whatsappUrl() { return "https://wa.me/" + this.phoneInternational; },
  email: "divinedsinterior@gmail.com",
  locations: [
    "Shop no - 11 Main dadri road, pillar no - 58, Gautam Budh Nagar (UP) 210304",
    "Shop no - 11 Barola Tpoint (service road Hanuman murti) Main dadri road, pillar no - 58, Gautam Budh Nagar (UP) 210304"
  ]
};

const SERVICE_MESSAGES = {
  "Home Interior Design and Execution": "Hello DIVINEDS, I am interested in your Home Interior Design and Execution service. I would like to discuss my project and understand the next steps. Please share more details.",
  "Office Interior Design and Execution": "Hello DIVINEDS, I am interested in your Office Interior Design and Execution service. I would like to discuss my workspace requirements. Please share more details.",
  "Showroom Interiors": "Hello DIVINEDS, I am interested in your Showroom Interiors service. I would like to discuss display planning and execution for my showroom. Please share more details.",
  "Wooden Work and Custom Joinery": "Hello DIVINEDS, I am interested in your Wooden Work and Custom Joinery service (wardrobes, storage, cabinetry). Please share more details.",
  "Home Furniture": "Hello DIVINEDS, I am interested in your Home Furniture service. I would like to discuss furniture for my home. Please share more details.",
  "Modular Office Furniture": "Hello DIVINEDS, I am interested in your Modular Office Furniture service (desks, workstations, storage). Please share more details.",
  "Modular Kitchen Design and Installation": "Hello DIVINEDS, I am interested in your Modular Kitchen Design and Installation service. I would like to discuss my kitchen requirements. Please share more details.",
  "False Ceiling Design and Execution": "Hello DIVINEDS, I am interested in your False Ceiling Design and Execution service. Please share design options and next steps.",
  "Wooden Flooring": "Hello DIVINEDS, I am interested in your Wooden Flooring service. Please share options and details.",
  "Tile Flooring": "Hello DIVINEDS, I am interested in your Tile Flooring service. Please share options and details.",
  "Painting and Polish": "Hello DIVINEDS, I am interested in your Painting and Polish service. I would like to discuss my project. Please share more details.",
  "Wallpaper Installation": "Hello DIVINEDS, I am interested in your Wallpaper Installation service. Please share pattern options and installation details.",
  "Electrical Work": "Hello DIVINEDS, I am interested in your Electrical Work service as part of my interior requirements. Please share more details.",
  "Networking and Structured Cabling": "Hello DIVINEDS, I am interested in your Networking and Structured Cabling service. Please share more details.",
  "Aluminium Work": "Hello DIVINEDS, I am interested in your Aluminium Work service (frames, partitions and related work). Please share more details.",
  "General Consultation": "Hello DIVINEDS, I would like to book a consultation to discuss my interior project. Please share the next steps.",
  "Project Enquiry": "Hello DIVINEDS, I saw your interior gallery and would like to enquire about a similar project. Please share more details."
};

function waLink(message) {
  return SITE_CONFIG.whatsappUrl + "?text=" + encodeURIComponent(message);
}
function bindServiceButtons(root) {
  (root || document).querySelectorAll("[data-service]").forEach(function (el) {
    const key = el.getAttribute("data-service");
    const msg = SERVICE_MESSAGES[key] || SERVICE_MESSAGES["General Consultation"];
    el.setAttribute("href", waLink(msg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Decode images off the main thread (below-the-fold stays lazy via loading="lazy" in markup)
  try { document.querySelectorAll('img:not([decoding])').forEach(function (img) { img.setAttribute("decoding", "async"); }); } catch (e) {}
  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Mobile menu
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");
  if (btn && menu) {
    btn.addEventListener("click", function () {
      const open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { menu.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) { menu.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.focus(); }
    });
  }

  // Active nav
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-desktop a, .mobile-menu a").forEach(function (a) {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
  });

  // Reveal on scroll
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const els = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in"); });
  } else {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  // Hero video: the hero video is explicit content — always attempt muted
  // autoplay, even when prefers-reduced-motion is set. Reduced-motion is
  // respected for decorative reveal animations above, never by replacing
  // this video with a static poster. Fallback hides only once frames render.
  const video = document.getElementById("heroVideo");
  if (video) {
    const fb = document.getElementById("heroFallback");
    const hero = document.getElementById("heroSection") || video.closest(".hero");
    const playBtn = document.getElementById("heroPlay");
    const DESKTOP_SRC = "assets/herovideobanner.mp4";
    const MOBILE_SRC = "herovideobanner-mobile.mp4";
    const hideFallback = function () {
      if (fb) fb.style.display = "none";
      if (hero) hero.classList.add("is-playing");
      if (playBtn) playBtn.hidden = true;
      try { video.removeAttribute("poster"); } catch (e) {}
    };
    const showFallback = function () {
      // Only show fallback if the video has no decodable frames yet.
      try {
        if (video.videoWidth > 0 && video.readyState >= 2 && !video.paused) return;
      } catch (e) {}
      if (fb && !(hero && hero.classList.contains("is-playing"))) fb.style.display = "block";
    };
    const showPlayButton = function () {
      try {
        if (!video.paused && video.currentTime > 0.05) return;
      } catch (e) {}
      if (playBtn) playBtn.hidden = false;
    };
    try { video.muted = true; video.loop = true; video.playsInline = true; video.setAttribute("muted", ""); video.setAttribute("playsinline", ""); } catch (e) {}
    const pickExpected = function () {
      try {
        if (window.matchMedia && window.matchMedia("(max-width: 768px)").matches) return MOBILE_SRC;
      } catch (e) {}
      return DESKTOP_SRC;
    };
    const ensureCorrectSrc = function () {
      const expected = pickExpected();
      let cur = "";
      try { cur = video.currentSrc || video.getAttribute("src") || ""; } catch (e) {}
      if (cur && cur.indexOf(expected) !== -1) return false;
      // No valid source yet, or viewport crossed 768px leaving the wrong
      // file attached — point the single video element at the verified file.
      try {
        video.src = expected;
        const sources = video.querySelectorAll("source");
        if (sources.length >= 2) {
          sources[0].setAttribute("src", MOBILE_SRC);
          sources[1].setAttribute("src", DESKTOP_SRC);
        }
        video.load();
        return true;
      } catch (e) { return false; }
    };
    const tryPlay = function () {
      try {
        ensureCorrectSrc();
        if (video.paused) {
          const pr = video.play();
          if (pr && pr.catch) pr.catch(function () { showPlayButton(); });
          // If still paused shortly after (policy block), offer manual start.
          setTimeout(function () { try { if (video.paused) showPlayButton(); } catch (e) {} }, 800);
        }
      } catch (e) {}
    };
    try {
      ensureCorrectSrc();
      tryPlay();
    } catch (e) {}
    // Rescue paths: a single autoplay attempt can be rejected (browser policy,
    // background tab, transient interruption) and would otherwise leave the
    // static poster up with no way to start. Retry when data arrives, when
    // the tab is shown again, and on the visitor's first interaction.
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) tryPlay();
    });
    document.addEventListener("pointerdown", tryPlay, { once: true });
    document.addEventListener("keydown", tryPlay, { once: true });
    // Re-evaluate desktop/mobile file if the viewport crosses 768px after load.
    try {
      const mq = window.matchMedia("(max-width: 768px)");
      const onChange = function () { ensureCorrectSrc(); tryPlay(); };
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else if (mq.addListener) mq.addListener(onChange);
    } catch (e) {}
    if (playBtn) {
      playBtn.addEventListener("click", function () {
        try {
          ensureCorrectSrc();
          const pr = video.play();
          if (pr && pr.then) pr.then(function () { hideFallback(); }, function () {});
          else hideFallback();
        } catch (e) {}
      });
    }
    // Hide the static fallback only when frames are actually rendering.
    // (Never on canplay/loadeddata alone — that could leave a black box if
    // autoplay is still blocked.) The <video> (z-index 1) sits above the
    // fallback (z-index 0) and below the gradient (z-index 2) + text (z-index 3).
    video.addEventListener("playing", hideFallback);
    video.addEventListener("timeupdate", function () {
      if (!video.paused && video.currentTime > 0.05) hideFallback();
    });
    video.addEventListener("error", showFallback, true);
    video.querySelectorAll("source").forEach(function (src) { src.addEventListener("error", showFallback); });
  }

  // Authentic WhatsApp icon injection for green enquiry buttons (single source of truth)
  const WA_PATH = "M16 3C9.4 3 4 8.4 4 15c0 2.4.7 4.6 1.9 6.5L4 29l7.7-1.9c1.8 1 3.9 1.5 6.1 1.5h.1c6.6 0 12-5.4 12-12S22.6 3 16 3zm5.5 14.5c-.3-.2-1.8-.9-2-1s-.5-.2-.7.1-.8 1-1 1.2-.4.2-.7.1c-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.4.3-.6.1-.2 0-.4 0-.6L14.3 9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.6.2-.9.8-.3.6-1.1 2.7-1.1 2.7s-.1.2 0 .5c.3.9 1.9 3.6 4.6 5 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4z";
  document.querySelectorAll("a.btn-wa").forEach(function (el) {
    if (!el.querySelector("svg[data-wa-icon]")) {
      const ns = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(ns, "svg");
      svg.setAttribute("viewBox", "0 0 32 32");
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("data-wa-icon", "");
      const path = document.createElementNS(ns, "path");
      path.setAttribute("d", WA_PATH);
      svg.appendChild(path);
      el.insertBefore(svg, el.firstChild);
    }
  });

  bindServiceButtons(document);

  // Generic WhatsApp buttons
  document.querySelectorAll("[data-wa-general]").forEach(function (el) {
    const kind = el.getAttribute("data-wa-general");
    el.setAttribute("href", waLink(SERVICE_MESSAGES[kind] || SERVICE_MESSAGES["General Consultation"]));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  initGallery();
  initConsultationForm();
  initContactForm();
  initFilms();
});

/* ---------- Click-to-play interior films (never autoplay) ---------- */
function initFilms() {
  document.querySelectorAll("[data-film]").forEach(function (card) {
    const video = card.querySelector("video");
    const btn = card.querySelector(".film-play");
    if (!video || !btn) return;
    btn.addEventListener("click", function () {
      card.classList.add("playing");
      video.setAttribute("controls", "");
      const pr = video.play();
      if (pr && pr.catch) pr.catch(function () { card.classList.remove("playing"); });
      video.focus({ preventScroll: true });
    });
    video.addEventListener("ended", function () {
      card.classList.remove("playing");
    });
  });
}

/* ---------- Gallery filter + lightbox ---------- */
function initGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  const filterBtns = document.querySelectorAll("#galleryFilters button");
  const items = Array.prototype.slice.call(grid.querySelectorAll("figure"));
  filterBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      filterBtns.forEach(function (x) { x.classList.remove("active"); x.setAttribute("aria-selected", "false"); });
      b.classList.add("active"); b.setAttribute("aria-selected", "true");
      const cat = b.getAttribute("data-filter");
      items.forEach(function (fig) {
        const show = cat === "all" || (fig.getAttribute("data-cat") || "").split(" ").indexOf(cat) >= 0;
        fig.style.display = show ? "" : "none";
      });
    });
  });

  // Lightbox (works with currently visible items)
  const lb = document.getElementById("lightbox");
  if (!lb) return;
  const lbImg = lb.querySelector("img");
  const lbCap = lb.querySelector(".lb-cap");
  let list = [], idx = 0, lastFocus = null;
  function visibleList() { return items.filter(function (f) { return f.style.display !== "none"; }); }
  function open(fig) {
    list = visibleList(); idx = list.indexOf(fig);
    lastFocus = document.activeElement;
    render();
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
    lb.querySelector(".lb-close").focus();
  }
  function render() {
    const fig = list[idx]; if (!fig) return;
    const img = fig.querySelector("img");
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || "";
    lbCap.textContent = fig.getAttribute("data-title") || img.alt || "";
  }
  function close() { lb.classList.remove("open"); document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
  function step(d) { if (!list.length) return; idx = (idx + d + list.length) % list.length; render(); }
  items.forEach(function (fig) {
    fig.setAttribute("tabindex", "0");
    fig.setAttribute("role", "button");
    fig.addEventListener("click", function () { open(fig); });
    fig.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(fig); } });
  });
  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", function () { step(-1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { step(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  // Homepage editorial grid lightbox reuse
  const ed = document.getElementById("featuredGrid");
  if (ed) {
    const figs = Array.prototype.slice.call(ed.querySelectorAll("figure"));
    figs.forEach(function (fig) {
      fig.setAttribute("tabindex", "0");
      fig.setAttribute("role", "button");
      const go = function () {
        // open projects page gallery at that image? For homepage, open simple lightbox using same overlay if present, else navigate
        const overlay = document.getElementById("lightbox");
        if (overlay && grid === ed) return;
        // Build one-off lightbox using main overlay by temporarily injecting
        list = figs; idx = figs.indexOf(fig);
        // swap grid context
        items.length = 0; figs.forEach(function (f) { items.push(f); });
        // ensure overlay handlers know new list
        const img = fig.querySelector("img");
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt || "";
        lbCap.textContent = fig.getAttribute("data-title") || img.alt || "";
        // store list globally for nav
        window.__edList = figs; window.__edIdx = idx;
        lb.classList.add("open");
        document.body.style.overflow = "hidden";
      };
      fig.addEventListener("click", go);
      fig.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
  }
}

/* ---------- Contact page enquiry form -> WhatsApp (no backend) ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const status = document.getElementById("contactStatus");
  function setErr(name, msg) {
    const wrap = form.querySelector('[data-field="' + name + '"]');
    if (!wrap) return true;
    const err = wrap.querySelector(".field-err");
    if (msg) { wrap.classList.add("invalid"); if (err) err.textContent = msg; return false; }
    wrap.classList.remove("invalid"); return true;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const fd = new FormData(form);
    const v = {
      name: (fd.get("name") || "").toString().trim(),
      phone: (fd.get("phone") || "").toString().trim(),
      email: (fd.get("email") || "").toString().trim(),
      type: (fd.get("type") || "").toString(),
      location: (fd.get("location") || "").toString().trim(),
      service: (fd.get("service") || "").toString(),
      message: (fd.get("message") || "").toString().trim()
    };
    let ok = true;
    ok = setErr("name", v.name.length >= 2 ? "" : "Please enter your full name.") && ok;
    const digits = v.phone.replace(/\D/g, "");
    let phoneMsg = "";
    if (!digits) phoneMsg = "Please enter your phone number.";
    else if (!/^[6-9]\d{9}$/.test(digits.slice(-10))) phoneMsg = "Please enter a valid 10-digit Indian mobile number.";
    ok = setErr("phone", phoneMsg) && ok;
    if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) { ok = setErr("email", "Please enter a valid email address or leave it blank.") && ok; }
    else setErr("email", "");
    ok = setErr("type", v.type ? "" : "Please select a project type.") && ok;
    ok = setErr("location", v.location.length >= 2 ? "" : "Please enter your project location.") && ok;
    ok = setErr("service", v.service ? "" : "Please select a service.") && ok;
    ok = setErr("message", v.message.length >= 5 ? "" : "Please tell us a little about your project (min. 5 characters).") && ok;
    if (!ok) {
      status.textContent = "Please review the highlighted fields and try again. Your entries have been kept.";
      status.style.display = "block";
      const first = form.querySelector(".field.invalid input,.field.invalid select,.field.invalid textarea");
      if (first) first.focus();
      return;
    }
    const lines = [
      "Hello DIVINEDS, I would like to enquire about my interior project.",
      "",
      "Name: " + v.name,
      "Phone: " + v.phone,
      v.email ? "Email: " + v.email : null,
      "Project Type: " + v.type,
      "Project Location: " + v.location,
      "Service Required: " + v.service,
      "Message: " + v.message,
      "",
      "Please share the next steps. Thank you."
    ].filter(Boolean).join("\n");
    status.innerHTML = "Details validated. Opening WhatsApp with your enquiry — <strong>please press Send in WhatsApp to complete your request.</strong> No data has been stored on our website.";
    status.style.display = "block";
    window.open(waLink(lines), "_blank", "noopener");
  });
}
/* ---------- Consultation form -> WhatsApp ---------- */
function initConsultationForm() {
  const form = document.getElementById("consultForm");
  if (!form) return;
  const status = document.getElementById("formStatus");
  function setErr(name, msg) {
    const wrap = form.querySelector('[data-field="' + name + '"]');
    if (!wrap) return true;
    const input = wrap.querySelector("input,select,textarea");
    const err = wrap.querySelector(".field-err");
    if (msg) { wrap.classList.add("invalid"); if (err) err.textContent = msg; return false; }
    wrap.classList.remove("invalid"); return true;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const fd = new FormData(form);
    const v = {
      name: (fd.get("name") || "").toString().trim(),
      phone: (fd.get("phone") || "").toString().trim(),
      email: (fd.get("email") || "").toString().trim(),
      type: (fd.get("type") || "").toString(),
      location: (fd.get("location") || "").toString().trim(),
      property: (fd.get("property") || "").toString(),
      area: (fd.get("area") || "").toString().trim(),
      budget: (fd.get("budget") || "").toString(),
      start: (fd.get("start") || "").toString(),
      services: fd.getAll("services").join(", "),
      contact: (fd.get("contact") || "").toString(),
      details: (fd.get("details") || "").toString().trim()
    };
    let ok = true;
    ok = setErr("name", v.name.length >= 2 ? "" : "Please enter your full name.") && ok;
    const digits = v.phone.replace(/\D/g, "");
    let phoneMsg = "";
    if (!digits) phoneMsg = "Please enter your phone number.";
    else if (!/^[6-9]\d{9}$/.test(digits.slice(-10))) phoneMsg = "Please enter a valid 10-digit Indian mobile number.";
    ok = setErr("phone", phoneMsg) && ok;
    ok = setErr("type", v.type ? "" : "Please select a project type.") && ok;
    ok = setErr("location", v.location.length >= 2 ? "" : "Please enter your project location.") && ok;
    if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) { ok = setErr("email", "Please enter a valid email address or leave it blank.") && ok; }
    else setErr("email", "");
    if (!ok) {
      status.textContent = "Please review the highlighted fields and try again. Your entries have been kept.";
      status.style.display = "block";
      const first = form.querySelector(".field.invalid input,.field.invalid select,.field.invalid textarea");
      if (first) first.focus();
      return;
    }
    const lines = [
      "Hello DIVINEDS, I would like to book a consultation.",
      "",
      "Name: " + v.name,
      "Phone: " + v.phone,
      v.email ? "Email: " + v.email : null,
      "Project Type: " + v.type,
      "Project Location: " + v.location,
      v.property ? "Property: " + v.property : null,
      v.area ? "Approx. Area: " + v.area : null,
      v.budget ? "Budget Range: " + v.budget : null,
      v.start ? "Expected Start: " + v.start : null,
      v.services ? "Services Required: " + v.services : null,
      v.contact ? "Preferred Contact: " + v.contact : null,
      v.details ? "Details: " + v.details : null,
      "",
      "Please share the next steps. Thank you."
    ].filter(Boolean).join("\n");
    status.innerHTML = "Details validated. Opening WhatsApp with your enquiry — <strong>please press Send in WhatsApp to complete your request.</strong> No data has been stored on our website.";
    status.style.display = "block";
    window.open(waLink(lines), "_blank", "noopener");
  });
}
