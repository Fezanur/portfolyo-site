/* Social links (LinkedIn, Behance, mail) as 24px brand icons.
   Used in the header and in the detail-page hero cards. */

const ICONS = {
  linkedin: `<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
    <rect width="24" height="24" rx="3" fill="#0a66c2"/>
    <path fill="#fff" d="M5.3 9.4h2.9V19H5.3zM6.75 4.8a1.68 1.68 0 1 1 0 3.36 1.68 1.68 0 0 1 0-3.36zM10 9.4h2.8v1.3h.04c.39-.74 1.34-1.52 2.76-1.52 2.95 0 3.5 1.94 3.5 4.47V19h-2.92v-4.65c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46V19H10z"/>
  </svg>`,
  behance: `<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
    <rect width="24" height="24" rx="3" fill="#1769ff"/>
    <path fill="#fff" d="M9.9 11.6c.6-.3 1-.85 1-1.65 0-1.55-1.15-2.05-2.6-2.05H4.4v8.2h4c1.5 0 2.85-.72 2.85-2.4 0-1.03-.5-1.8-1.35-2.1zM6.2 9.3h1.7c.65 0 1.2.18 1.2.9 0 .67-.47.93-1.1.93H6.2zm1.9 5.4H6.2v-2.2h1.95c.77 0 1.27.33 1.27 1.13 0 .8-.6 1.07-1.32 1.07zM16.3 10.2c-1.9 0-3.15 1.4-3.15 3.25 0 1.9 1.2 3.22 3.15 3.22 1.48 0 2.44-.67 2.9-2.08h-1.5c-.16.52-.82.8-1.33.8-.98 0-1.5-.58-1.5-1.55h4.43c.07-1.95-1.02-3.64-3-3.64zm-1.43 2.6c.05-.8.58-1.3 1.38-1.3.84 0 1.25.5 1.32 1.3zM14.6 8.4h3.4v.85h-3.4z"/>
  </svg>`,
  mail: `<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
    <rect x=".5" y=".5" width="23" height="23" rx="3" fill="#fff" stroke="#e4e4e4"/>
    <path fill="#4285f4" d="M5.1 17.6h2.3v-5.6L4.1 9.5v6.8c0 .72.58 1.3 1 1.3z"/>
    <path fill="#34a853" d="M16.6 17.6h2.3c.42 0 1-.58 1-1.3V9.5l-3.3 2.5z"/>
    <path fill="#fbbc04" d="M16.6 7.6V12l3.3-2.5V8.2c0-1.26-1.44-1.98-2.45-1.22z"/>
    <path fill="#ea4335" d="M7.4 12V7.6l4.6 3.45 4.6-3.45V12L12 15.45z"/>
    <path fill="#c5221f" d="M4.1 8.2v1.3L7.4 12V7.6l-.85-.62C5.54 6.22 4.1 6.94 4.1 8.2z"/>
  </svg>`,
};

export const SOCIAL_LINKS = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/fezakumcu/" },
  { id: "behance", label: "Behance", href: "https://www.behance.net/fezakumcu" },
  { id: "mail", label: "E-posta gönder", text: "E-posta", href: "mailto:fezanurkumcu@gmail.com" },
];

export function Socials(className = "") {
  return `
    <ul class="socials ${className}">
      ${SOCIAL_LINKS.map(
        (s) => `
        <li>
          <a href="${s.href}" class="socials__link" aria-label="${s.label}"${
            s.id === "mail" ? "" : ' target="_blank" rel="noopener"'
          }>${ICONS[s.id]}</a>
        </li>`
      ).join("")}
    </ul>
  `;
}

/* Labelled pill buttons (icon + name), used in the footer */
export function SocialButtons(className = "") {
  return `
    <ul class="social-buttons ${className}">
      ${SOCIAL_LINKS.map(
        (s) => `
        <li>
          <a href="${s.href}" class="social-button"${s.id === "mail" ? "" : ' target="_blank" rel="noopener"'}>
            ${ICONS[s.id]}
            <span>${s.text || s.label}</span>
          </a>
        </li>`
      ).join("")}
    </ul>
  `;
}
