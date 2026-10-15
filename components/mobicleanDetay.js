/* Mobiclean — product design detail page (Figma 510:3022)
   Hero card reuses the Periyod / Astroloji detail hero (project-detail.css);
   every section below it lives in css/mobiclean-detail.css.
   The Ekran Akışları tabs are wired up in js/mobiclean-detay.js. */

import { Socials } from "./socials.js";

const A = "assets/images/mobiclean-detay/";

function MobicleanHero() {
  return `
    <div class="container">
      <div class="detail-hero">
        <div class="detail-hero__visual mobi-hero__visual">
          <div class="mobi-phone">
            <img src="${A}iphone-frame.png" alt="" class="mobi-phone__frame" />
            <img src="${A}iphone-frame-2.png" alt="" class="mobi-phone__frame" />
            <img src="${A}hero-screen.png" alt="Mobiclean ana ekranı: harita üzerinde en yakın minivanlar ve paket seçimi" width="210.879" height="457.172" class="mobi-phone__screen" />
          </div>
        </div>
        <div class="detail-hero__content">
          <div class="detail-hero__meta">
            <span class="detail-hero__badge">Product design</span>
            <span class="detail-hero__dot">·</span>
            <span>Ağustos 2023</span>
          </div>
          <h1 class="detail-hero__title">Mobiclean</h1>
          <p class="detail-hero__desc">Araç yıkama minivanını tek dokunuşla, aracın park ettiği konuma çağıran bir mobil uygulama. Benchmark analizinden wireframe’e, UI kit’ten ekran tasarımlarına uzanan süreç.</p>
          <ul class="detail-hero__summary">
            <li class="detail-hero__summary-title">Özet: Ne göreceksin?</li>
            <li><span>01</span>Uygulamanın tasarım öncesi briefleri ve proje planı</li>
            <li><span>02</span>Tasarım UI kiti</li>
            <li><span>03</span>Başlık başlık ekran akışları</li>
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

/* ---------- Brief / Yaklaşım / Rolüm + Ekran Akışları ---------- */
const INTRO = [
  {
    shape: "square",
    title: "Brief",
    text: "Kullanıcının aracının park ettiği konumu haritada belirleyip en yakın minivanı çağırabildiği, hizmeti takip edip ödeyebildiği ve değerlendirebildiği uçtan uca akışların tasarlanması.",
  },
  {
    shape: "circle",
    title: "Yaklaşım",
    text: "Her aşama için ekranın amacına uygun örnekler bulmak ve tek bir sektör içinde kalmadan projeye uygun olabilecek feature’ları fark edebilmek.",
  },
  {
    shape: "diamond",
    title: "Rolüm",
    text: "Benchmark analizinden wireframe’lere, UI kit’ten son ekran tasarımlarına ve revize sürecine kadar tüm adımlar.",
  },
];

const FLOWS = [
  {
    title: "Konum ve eşleşme",
    items: [
      "Aracın park konumunu belirleme",
      "En yakın minivanı haritada gösterme",
      "Minivanın müşteriye mesafesi",
      "Minivanın uygunluk durumu",
    ],
  },
  { title: "Talep ve onay", items: ["Araç yıkama talebi oluşturma", "Araçla ilgili sorular", "Hizmet onayı"] },
  { title: "Canlı takip", items: ["Servis yolda", "Servis yaklaşıyor", "Hizmete başlandı"] },
  { title: "Ödeme", items: ["Toplam hizmet bedeli", "Ödeme akışları"] },
];

function IntroSection() {
  return `
    <section class="mobi-section mobi-intro" id="mobi-brief">
      <div class="mobi-intro__grid">
        ${INTRO.map(
          (item) => `
          <div class="mobi-intro__col">
            <h2 class="mobi-h2 mobi-h2--sm mobi-shape mobi-shape--${item.shape}">${item.title}</h2>
            <ul class="mobi-bullets mobi-bullets--lg"><li>${item.text}</li></ul>
          </div>`
        ).join("")}
      </div>

      <h2 class="mobi-h2 mobi-shape mobi-shape--star mobi-flows__title">Ekran Akışları</h2>
      <div class="mobi-flows">
        ${FLOWS.map(
          (flow, i) => `
          <article class="mobi-flow">
            <span class="mobi-flow__step">Adım ${i + 1}</span>
            <h3 class="mobi-flow__title">${flow.title}</h3>
            <ul class="mobi-bullets">${flow.items.map((t) => `<li>${t}</li>`).join("")}</ul>
          </article>`
        ).join("")}
      </div>
    </section>
  `;
}

/* ---------- Proje Planı: six-week timeline ---------- */
const WEEKS = ["H1 · Ağu", "H2", "H3", "H4", "H5", "H6 · Eyl"];
const PHASES = [
  { label: "1. Benchmark", col: "1 / span 1", tone: "primary", items: ["Uygulama ve fiziki yıkama hizmetleri", "Ekran bazlı örnekler"] },
  { label: "2. Wireframe ve akış oluşturma", col: "2 / span 2", tone: "lime", items: ["High fidelity wireframe", "Eksik akışların belirlenmesi"] },
  { label: "3. UI Tasarım", col: "4 / span 2", tone: "orange", items: ["UI Kit", "Ekran tasarımları"] },
  { label: "4. Revize", col: "6 / span 1", tone: "red", items: ["Revizeler"] },
];

function PlanSection() {
  return `
    <section class="mobi-section mobi-plan" id="mobi-plan">
      <h2 class="mobi-h2 mobi-shape mobi-shape--triangle">Proje Planı</h2>
      <p class="mobi-lead">Ağustos ve Eylül ayları arasında altı haftaya yayılan sürecin adımları ve her birinin süresi.</p>
      <div class="mobi-plan__scroll">
        <div class="mobi-plan__chart">
          <div class="mobi-plan__weeks">${WEEKS.map((w) => `<span>${w}</span>`).join("")}</div>
          <div class="mobi-plan__row">
            ${PHASES.map(
              (p) => `<div class="mobi-plan__bar mobi-plan__bar--${p.tone}" style="grid-column: ${p.col}"><i></i>${p.label}</div>`
            ).join("")}
          </div>
          <div class="mobi-plan__row mobi-plan__row--notes">
            ${PHASES.map(
              (p) => `<ul class="mobi-bullets mobi-plan__notes" style="grid-column: ${p.col}">${p.items
                .map((t) => `<li>${t}</li>`)
                .join("")}</ul>`
            ).join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ---------- Tasarım Süreci: four pinned notes ---------- */
const NOTES = [
  { n: "01", title: "Benchmark", text: "Ulaşım, alışveriş ve e-ticaret uygulamalarının ekranları incelendi.", tone: "green" },
  { n: "02", title: "Wireframe", text: "İstenen akışlar high fidelity wireframe olarak çizildi,eksikler belirlendi.", tone: "blue" },
  { n: "03", title: "UI Kit", text: "Renkler, input’lar, bottom sheet’ler, bildirimler, modallar ve ikon seti.", tone: "orange" },
  { n: "04", title: "Design", text: "Onboarding’den hizmet iptaline kadar tüm akışların arayüz tasarımı.", tone: "red" },
];

function ProcessSection() {
  return `
    <section class="mobi-process" id="mobi-surec">
      <div class="mobi-process__head">
        <p class="mobi-brand"><span class="mobi-brand__mark"><img src="${A}mobiclean-mark.svg" alt="" width="16" height="16" /></span>mobiclean</p>
        <h2 class="mobi-display mobi-process__title">Tasarım Süreci</h2>
      </div>
      <ol class="mobi-notes">
        ${NOTES.map(
          (note, i) => `
          <li class="mobi-note mobi-note--${note.tone} mobi-note--${i + 1}">
            <span class="mobi-note__pin" aria-hidden="true"></span>
            <div class="mobi-note__paper">
              <span class="mobi-note__num">${note.n}</span>
              <h3 class="mobi-note__title">${note.title}</h3>
              <p class="mobi-note__text">${note.text}</p>
            </div>
          </li>`
        ).join("")}
      </ol>
    </section>
  `;
}

/* ---------- 01 Benchmark ---------- */
const BRANDS = [
  "Revolut", "Hopper", "neo", "Citymapper", "Martı", "Bolt", "Waze", "Shake Shack",
  "Gojek", "Getir", "Booking", "Airbnb", "Binbin", "Migros", "Yemeksepeti",
];

function BenchmarkSection() {
  return `
    <section class="mobi-dark mobi-benchmark" id="mobi-benchmark">
      <div class="mobi-split-head">
        <div>
          <p class="mobi-eyebrow mobi-eyebrow--lime">01 — Araştırma</p>
          <h2 class="mobi-display">Benchmark</h2>
        </div>
        <p class="mobi-split-head__desc">Yurtiçi ve yurtdışında kullanılmakta olan ulaşım, alışveriş ve e-ticaret uygulamalarının ekranları, her aşamanın amacına göre gruplanarak incelendi.</p>
      </div>
      <img class="mobi-benchmark__img" src="${A}benchmark.webp" alt="Figma’da toplanmış benchmark ekranları: karşılama, giriş, kayıt, anasayfa, menü, buton ve yıkama paketleri" width="2400" height="788" loading="lazy" decoding="async" />
      <p class="mobi-brands__label">İncelenen markalardan bazıları</p>
      <p class="mobi-brands">${BRANDS.join(", ")}</p>
    </section>
  `;
}

/* ---------- 02 Wireframe ---------- */
function WireframeSection() {
  return `
    <section class="mobi-wireframe" id="mobi-wireframe">
      <img class="mobi-wireframe__img" src="${A}wireframe-2.webp" alt="Üye ol, giriş yap, hizmet hazırlık aşaması, geçmiş hizmetler ve hizmet değerlendirme akışlarının high fidelity wireframe’leri" width="1998" height="1788" loading="lazy" decoding="async" />
      <div class="mobi-wireframe__text">
        <p class="mobi-eyebrow mobi-eyebrow--green">02 — Akışlar</p>
        <h2 class="mobi-display mobi-display--ink">Wireframe</h2>
        <p class="mobi-wireframe__desc">Benchmark çalışmasında bu projeye uyabilecek ekranlardan örnekler alınarak istenen akışlar high fidelity wireframe olarak çizildi. Ardından akışlar şekillendirilerek eksikler belirlendi, eksik akışlar için wireframe çalışmaları yapıldı.</p>
        <p class="mobi-callout">Bu işlem UI tarafına geçildikten sonra da devam etti.</p>
      </div>
    </section>
  `;
}

/* ---------- 03 UI Kit ---------- */
function UiKitSection() {
  return `
    <section class="mobi-uikit" id="mobi-uikit">
      <div class="mobi-split-head">
        <div>
          <p class="mobi-eyebrow mobi-eyebrow--deep">03 — Sistem</p>
          <h2 class="mobi-display mobi-display--deep">UI Kit</h2>
        </div>
        <p class="mobi-split-head__desc mobi-split-head__desc--deep">Foundation renkleri, input’lar, navigasyon bar, bottom sheet’ler, bildirimler, modallar ve ikon seti tek bir kütüphanede toplandı.</p>
      </div>
      <div class="mobi-tiles">
        <div class="mobi-tile mobi-tile--primary"><span>Primary</span><strong>#0E5C32</strong></div>
        <div class="mobi-tile mobi-tile--lime"><span>Lime</span><strong>#B6E388</strong></div>
        <div class="mobi-tile mobi-tile--black"><span>Siyah</span><strong>#000000</strong></div>
        <div class="mobi-tile mobi-tile--white">
          <span>Accent</span>
          <div class="mobi-tile__swatches" aria-label="Mavi, yeşil, kırmızı, turuncu">
            <i style="background:#5bb6ef"></i><i style="background:#63cc8a"></i><i style="background:#ef6b6b"></i><i style="background:#f2a93b"></i>
          </div>
        </div>
        <div class="mobi-tile mobi-tile--white"><span>Tipografi</span><strong class="mobi-tile__aa">Aa</strong></div>
      </div>
      <figure class="mobi-uikit__shot">
        <img src="assets/images/mobiclean-detay/uikit-2.webp" alt="UI kit: harita bileşenleri, input ve navigasyon bar, bottom sheet’ler, ikonlar ve yerel bileşenler" width="2400" height="1250" loading="lazy" decoding="async" />
      </figure>
    </section>
  `;
}

/* ---------- 04 Ekran Akışları: vertical tab list + panel ---------- */
const SCREENS = [
  {
    title: "Üye ol / Giriş yap",
    text: "Telefon numarasıyla kayıt, SMS doğrulama, sosyal giriş seçenekleri, hata durumları ile konum ve bildirim izinleri.",
    tags: ["SMS doğrulama", "Sosyal giriş"],
    image: "ui-uye-ol",
    w: 1200,
    h: 608,
  },
  {
    title: "Karşılama Ekranı",
    text: "Kullanıcının anasayfaya ulaştığında harita üzerinden kendisine yakın minivanları görebilmesi amaçlanmıştır. Anasayfada aracı için kaydettiği adresleri, seçebileceği paketleri ve kaydettiği araçlarına ulaşabileceği bir section bulunmaktadır.",
    tags: ["Harita", "Paket seçimi"],
    image: "ui-karsilama",
    w: 526,
    h: 1080,
  },
  {
    title: "Hızlı Paket",
    text: "Sadece aracın kuru temizliğinin yapılmasını amaçlayan pakettir. Bu sebeple bu pakette işlem kısa sürede biter.",
    tags: ["Kuru temizleme"],
    image: "ui-hizli-paket",
    w: 1320,
    h: 1080,
  },
  {
    title: "Detaylı Paket",
    text: "Kullanıcıya araç içi temizliği sunan bu pakette kuru temizleme ve köpüklü temizleme seçeneği mevcuttur.",
    tags: ["Araç içi temizlik"],
    image: "ui-detayli-paket",
    w: 1600,
    h: 1019,
  },
  {
    title: "Kendi Paketini Oluştur",
    text: "Paket içeriğini kişiselleştirme imkanı sunan bir pakettir.",
    tags: ["Kişiselleştirme"],
    image: "ui-paket-olustur",
    w: 1436,
    h: 1080,
  },
  {
    title: "Adres – Randevu Seçimi",
    text: "Kullanıcı isterse hemen isterse başka bir tarih ve zaman için yıkama randevusu oluşturabilmesine imkan sağlayan seçim akışlarıdır.",
    tags: ["Adres seçimi", "Randevu"],
    image: "ui-adres-randevu",
    w: 1526,
    h: 1080,
  },
  {
    title: "Hizmet Değerlendirme",
    text: "Temizliğin aşamalarının görüntüleme ve ardından hizmeti puanlama imkanı sunan akışlardır.",
    tags: ["Canlı takip", "Puanlama"],
    image: "ui-islem-asamalari",
    w: 1596,
    h: 1080,
  },
  {
    title: "Bildirimler",
    text: "Bottomsheetin açık ve kapalı versiyonlu bildirimlerin görünümü.",
    tags: ["Push bildirim", "Bottom sheet"],
    image: "ui-bildirimler",
    w: 1307,
    h: 1080,
  },
  {
    title: "Araç Ekleme",
    text: "Profil sayfasından kullanıcının kayıtlı araçlarını görebildiği, yeni araç ekleyebildiği akıştır.",
    tags: ["Profil", "Araçlarım"],
    image: "ui-arac-ekleme",
    w: 1596,
    h: 1080,
  },
  {
    title: "Hizmet İptali",
    text: "Kullanıcının oluşturduğu hizmeti iptal edebildiği akıştır. İptal öncesinde olası ücret bilgisiyle uyarılır, iptal nedenini seçer ve iptal işlemini onaylar.",
    tags: ["İptal nedeni", "Onay"],
    image: "ui-hizmet-iptal",
    w: 1600,
    h: 1074,
  },
];

function UiDesignSection() {
  const num = (i) => String(i + 1).padStart(2, "0");
  return `
    <section class="mobi-dark mobi-ui" id="mobi-ekranlar" data-mobi-carousel>
      <p class="mobi-eyebrow mobi-eyebrow--lime">04 — Arayüz</p>
      <h2 class="mobi-display">Ekran Akışları</h2>
      <p class="mobi-ui__lead">Kullanıcının uygulamayı ilk açtığı andan hizmetin tamamlanmasına kadar tüm akışlar.</p>
      <div class="mobi-ui__body">
        <div class="mobi-tabs" role="tablist" aria-label="Ekran akışları" aria-orientation="vertical">
          ${SCREENS.map(
            (s, i) => `<button type="button" class="mobi-tab" role="tab" id="mobi-tab-${i}" aria-controls="mobi-slide-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-index="${i}">
              <span>${num(i)} · ${s.title}</span>
              <svg class="mobi-tab__chevron" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>`
          ).join("")}
        </div>
        <div class="mobi-panels">
          ${SCREENS.map(
            (s, i) => `
            <article class="mobi-slide" role="tabpanel" id="mobi-slide-${i}" aria-labelledby="mobi-tab-${i}" ${i === 0 ? "" : "hidden"}>
              <span class="mobi-slide__num">${num(i)}</span>
              <h3 class="mobi-slide__title">${s.title}</h3>
              ${s.text ? `<p class="mobi-slide__desc">${s.text}</p>` : ""}
              ${
                s.image
                  ? `<img class="mobi-slide__img" src="${A}${s.image}.webp" alt="${s.title} ekranları" width="${s.w}" height="${s.h}" loading="lazy" decoding="async" />`
                  : ""
              }
              ${s.tags ? `<p class="mobi-slide__tags">${s.tags.map((t) => `#${t}`).join("  ")}</p>` : ""}
            </article>`
          ).join("")}
        </div>
      </div>
    </section>
  `;
}

/* ---------- Teşekkürler ---------- */
function ThanksSection() {
  return `
    <section class="mobi-thanks">
      <div class="mobi-thanks__sun" aria-hidden="true">
        <img src="${A}sun-rays.svg" alt="" width="89" height="45" class="mobi-thanks__rays" />
        <img src="${A}sun-half.svg" alt="" width="45" height="25" class="mobi-thanks__half" />
      </div>
      <h2 class="mobi-thanks__title">Teşekkürler</h2>
      <a href="#top" class="mobi-thanks__top" data-back-to-top>
        <img src="${A}chevron-b.svg" alt="" width="22" height="22" />
        Başa dön
      </a>
      <p class="mobi-thanks__word" aria-hidden="true">mobiclean</p>
    </section>
  `;
}

export function MobicleanDetay() {
  return `
    ${MobicleanHero()}
    <div class="mobi-body">
      ${IntroSection()}
      ${PlanSection()}
      ${ProcessSection()}
      ${BenchmarkSection()}
      ${WireframeSection()}
      ${UiKitSection()}
      ${UiDesignSection()}
      ${ThanksSection()}
    </div>
  `;
}
