const header = document.getElementById("site-header");
const nav = document.getElementById("main-nav");
const navToggle = document.getElementById("nav-toggle");
const loadingScreen = document.getElementById("loading-screen");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

window.addEventListener("load", () => {
  window.setTimeout(() => {
    loadingScreen?.classList.add("is-hidden");
  }, 450);
});

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  navToggle.classList.toggle("is-active", Boolean(isOpen));
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  document.body.classList.toggle("menu-open", Boolean(isOpen));
  header?.classList.toggle("is-open", Boolean(isOpen));
});

document.querySelectorAll(".nav-link, .main-nav .btn").forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("is-open");
    navToggle?.classList.remove("is-active");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
    header?.classList.remove("is-open");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll("[data-reveal]").forEach((item) => revealObserver.observe(item));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-45% 0px -50% 0px" });

sections.forEach((section) => activeObserver.observe(section));

const typewriter = document.getElementById("typewriter");
const words = ["tacos al pastor", "pozole", "carne asada al carbón", "gringas", "alambres", "tostadas"];
let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typewriter) return;

  const current = words[wordIndex];
  typewriter.textContent = current.slice(0, letterIndex);

  if (!deleting && letterIndex < current.length) {
    letterIndex += 1;
    window.setTimeout(typeLoop, 72);
    return;
  }

  if (!deleting && letterIndex === current.length) {
    deleting = true;
    window.setTimeout(typeLoop, 1200);
    return;
  }

  if (deleting && letterIndex > 0) {
    letterIndex -= 1;
    window.setTimeout(typeLoop, 42);
    return;
  }

  deleting = false;
  wordIndex = (wordIndex + 1) % words.length;
  window.setTimeout(typeLoop, 280);
}

typeLoop();
