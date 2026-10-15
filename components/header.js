import { Socials } from "./socials.js";

export function Header() {
  return `
    <div class="container header__inner">
      <a href="index.html?home" class="header__brand">
        <img src="assets/images/logo.svg" alt="fntekin" class="header__logo-img" />
      </a>

      <nav class="header__nav" id="header-nav">
        <a href="index.html#projects" class="header__nav-link">Projelerim</a>
        <a href="index.html#about" class="header__nav-link">Hakkımda</a>
        <a href="index.html#experience" class="header__nav-link">Deneyim</a>
        ${Socials("header__nav-socials")}
      </nav>

      <div class="header__actions">
        ${Socials("header__socials")}
        <button type="button" class="header__menu-toggle" aria-label="Menüyü aç" aria-expanded="false" aria-controls="header-nav">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  `;
}

/* Detail pages: back to the home page | page title | social icons */
export function DetailHeader(title) {
  return `
    <div class="container header__inner detail-header">
      <a href="index.html?home" class="detail-header__back" aria-label="Anasayfaya dön">
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
          <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Anasayfa</span>
      </a>
      <p class="detail-header__title">${title}</p>
      ${Socials("detail-header__socials")}
    </div>
  `;
}

/* Mobile: hamburger opens/closes the nav as a dropdown under the header */
export function initHeader(root = document.getElementById("header")) {
  if (!root) return;
  const toggle = root.querySelector(".header__menu-toggle");
  const nav = root.querySelector(".header__nav");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    root.classList.toggle("is-menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
  };

  toggle.addEventListener("click", () => setOpen(!root.classList.contains("is-menu-open")));
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
}
