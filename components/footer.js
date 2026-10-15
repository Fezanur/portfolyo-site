import { SocialButtons } from "./socials.js";

/* Home footer: the girl with her cat on the left (mirrored, leaning left),
   "Bana ulaşabilirsiniz" with labelled social buttons on the right */
export function Footer() {
  const year = new Date().getFullYear();
  return `
    <div class="container site-footer">
      <img class="site-footer__art" src="assets/images/home/footer-girl.webp" alt="" width="900" height="616" loading="lazy" decoding="async" />
      <div class="site-footer__contact">
        <h2 class="site-footer__title">Bana ulaşabilirsiniz</h2>
        ${SocialButtons("site-footer__socials")}
        <p class="site-footer__copy">&copy; ${year} Feza Nur Tekin. Tüm hakları saklıdır.</p>
      </div>
    </div>
  `;
}
