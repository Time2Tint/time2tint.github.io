const PHONE = "+12489040972";
const DEFAULT_MESSAGE =
  "Hi Time2TintMobile! I'd like to request a tint quote. What details and photos do you need from me?";

const smsHref = (message) => `sms:${PHONE}?body=${encodeURIComponent(message)}`;

document.querySelectorAll(".sms-link").forEach((link) => {
  const service = link.dataset.service;
  const message = service
    ? `Hi Time2TintMobile! I'd like to request a quote for ${service.toLowerCase()} window tinting. What details and photos do you need from me?`
    : DEFAULT_MESSAGE;
  link.href = smsHref(message);
});

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");

const setHeaderState = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const closeMenu = () => {
  menuToggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
};

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.querySelector("#quote-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = new FormData(event.currentTarget);
  const goals = form.getAll("goal");
  const lines = [
    "Hi Time2TintMobile! I'd like to request a quote.",
    "",
    `Project: ${form.get("project")}`,
    `Details: ${form.get("details")}`,
    `City/ZIP: ${form.get("location") || "I'll share when you reply"}`,
    `Main goal: ${goals.length ? goals.join(", ") : "Not sure yet"}`,
    `Timing: ${form.get("timing")}`,
    "",
    "Please let me know what photos or other information you need. Thanks!",
  ];

  window.location.href = smsHref(lines.join("\n"));
});

const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.querySelector("img").alt;
    lightbox.showModal();
    document.body.classList.add("lightbox-open");
  });
});

const closeLightbox = () => {
  lightbox.close();
  document.body.classList.remove("lightbox-open");
};

lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
lightbox.addEventListener("close", () => document.body.classList.remove("lightbox-open"));

document.querySelector("#year").textContent = new Date().getFullYear();
