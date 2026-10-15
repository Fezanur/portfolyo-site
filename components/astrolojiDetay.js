import { Socials } from "./socials.js";


/* Astroloji Uygulaması — detail page (Figma 411:5226)
   Hero card reuses the Periyod detail hero structure/styles (project-detail.css).
   Below it: full-width (1200px) dark presentation panels, no TOC. */

function AstrolojiHero() {
  return `
    <div class="container">
      <div class="detail-hero">
        <div class="detail-hero__visual detail-hero__visual--astro">
          <img src="assets/images/home/astroloji-phones.png" alt="Astroloji uygulaması ekran görüntüleri" class="detail-hero__visual-fg" />
        </div>
        <div class="detail-hero__content">
          <div class="detail-hero__meta">
            <span class="detail-hero__badge">UX/UI Design</span>
            <span class="detail-hero__dot">·</span>
            <span>2025</span>
          </div>
          <h1 class="detail-hero__title">Astroloji Uygulaması</h1>
          <p class="detail-hero__desc">Gazetelerdeki astroloji köşelerini tek bir tasarıma taşıyan uygulama. Amaç, her platformun sunduğu astroloji verilerinin ortak bir template altında toplanması. Bunu yaparken tüm platformlar incelenerek hangi verileri sunuyorlarsa ortak noktalarını bulmak ve tasarımı buna göre gerçekleştirmek.</p>
          <ul class="detail-hero__summary">
            <li class="detail-hero__summary-title">Özet: Ne göreceksin?</li>
            <li><span>01</span>İkon, tipografi, renk bilgisi</li>
            <li><span>02</span>Tasarımı gerçekleştirilen bazı ekranlar ve açıklamaları</li>
          </ul>
          <div class="detail-hero__author">
            <div class="detail-hero__author-info">
              <img src="assets/images/home/about-photo.jpg" alt="" class="detail-hero__author-avatar" />
              <div>
                <p class="detail-hero__author-name">Feza Nur Tekin</p>
                <p class="detail-hero__author-role">User Experience Designer</p>
              </div>
            </div>
            ${Socials("detail-hero__socials")}
          </div>
        </div>
      </div>
    </div>
  `;
}

/* Screen flow panels — one image each, with the panel text repeated
   as a visually hidden caption for screen readers and search. */
const SCREEN_PANELS = [
  {
    id: "onboarding",
    src: "assets/images/astroloji-detay/onboarding.jpg",
    height: 3258,
    caption: `
      <h2>Onboarding Ekranları</h2>
      <p>Astroloji uygulamalarında en önemli unsur aldığınız tarih, saat ve lokasyon bilgileridir. Uygulamanın içeriği bu bilgilere göre şekilleniyorsa onboarding aşamasında bu bilgileri almamız gerekiyor. Fakat her kullanıcı doğum gününü ve saatini doğru bilmemektedir. Bu sebeple kullanıcıya bir kaçış yolu sunmamız gerekiyor.</p>
      <h3>Doğum Tarihini Atla</h3>
      <p>Doğum gününü bilmeyen bir kişi bu adımı atlamak isterse, kullanıcıya bir bilgilendirme yaparak direk kişiye özel olmayan bir anasayfaya yönlendiriyoruz. Çünkü doğum günü temel bilgidir ve onu bilmemek astroloji için en temel veriyi kaçırmaktır ve böylece saat ve lokasyon bilgilerinin de önemi kalmayacaktır.</p>
      <h3>Doğum Saatini Atla</h3>
      <p>Doğum gününü bilen ama doğum saatini bilmeyen kullanıcılarımız ise “doğum saatimi bilmiyorum” seçeneği ile bu adımı atlayabilir. Anasayfada “Yükselen burç” ve “Ay burcu” bilgisi tasarımda görünür olduğu için bu verinin dolması amacıyla doğum saati standart olarak 12.00 alınır ve buna göre hesaplama yapılır. Kullanıcıya da bunun bilgilendirmesi yapılır.</p>
    `,
  },
  {
    id: "yukselen-burc",
    src: "assets/images/astroloji-detay/yukselen-burc.jpg",
    height: 1986,
    caption: `
      <h2>Anasayfa Akışları: Yükselen Burç</h2>
      <h3>Yükselen Burç Hesaplama</h3>
      <p>Kendi bilgileriniz ile girdiğiniz uygulamada başkaları için de yükselen burç hesaplaması yapılabilir.</p>
    `,
  },
  {
    id: "tarot",
    src: "assets/images/astroloji-detay/tarot.jpg",
    height: 1686,
    caption: `
      <h2>Tarot</h2>
      <h3>Tarot ve Diğer Kartlar Bakımı</h3>
      <p>Kullanıcı bir soru sorar, bu soruya göre kart seçer. Burada geçmiş, şimdi ve gelecek için ayrı ayrı istediği kartı seçebilir.</p>
    `,
  },
  {
    id: "burclar",
    src: "assets/images/astroloji-detay/burclar.jpg",
    height: 2666,
    caption: `
      <h2>Burçlar</h2>
      <h3>Tüm Burçlar</h3>
      <p>Kendi burcumuz haricinde diğer tüm burçların temel bilgileri, özellikleri ve yorumları da görebiliriz.</p>
    `,
  },
];

function ScreenPanels() {
  return SCREEN_PANELS.map(
    (panel) => `
    <figure class="astro-panel" id="${panel.id}" aria-labelledby="astro-${panel.id}-desc">
      <img src="${panel.src}" alt="" width="2400" height="${panel.height}" loading="lazy" decoding="async" />
      ${
        panel.id === "burclar"
          ? `<a href="#top" class="astro-top" data-back-to-top>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Başa dön
      </a>`
          : ""
      }
      <figcaption id="astro-${panel.id}-desc" class="visually-hidden">${panel.caption}</figcaption>
    </figure>
  `
  ).join("");
}

export function AstrolojiDetay() {
  return `
    ${AstrolojiHero()}
    <div class="container astro-panels">
      <figure class="astro-panel" id="ikonlar">
        <img src="assets/images/astroloji-detay/ikonlar.jpg" alt="İkonlar: 12 burç ikonu (Koç, Boğa, İkizler, Yengeç, Aslan, Başak, Terazi, Akrep, Yay, Oğlak, Kova, Balık), dört element (Ateş, Toprak, Hava, Su) ve gezegen ikonları" width="2400" height="1354" decoding="async" />
      </figure>
      <figure class="astro-panel" id="tipografi-renk">
        <img src="assets/images/astroloji-detay/tipografi-renk.jpg" alt="Tipografi ve renk: Figtree yazı tipi; Kozmik Mor #993CFE, Gece Moru #241650 ve Gün Batımı #F57856 renk skalaları; #100A24'ten #F57856'ya kozmik gradyan" width="2400" height="1248" loading="lazy" decoding="async" />
      </figure>
      ${ScreenPanels()}
    </div>
  `;
}
