/* Figma 391:3256 — Projelerim: one wide featured card + two stacked cards */

function Meta({ badge, years }) {
  return `
    <div class="project-meta">
      <span class="project-meta__badge">${badge}</span>
      <span class="project-meta__dot">·</span>
      <span class="project-meta__years">${years}</span>
      <span class="project-meta__dot">·</span>
    </div>
  `;
}

function Hashtags(tags) {
  return `
    <ul class="project-hashtags">
      ${tags.map((tag) => `<li>${tag}</li>`).join("")}
    </ul>
  `;
}

function CardButton({ href = "#", label = "Proje Detayına Git" } = {}) {
  return `<a href="${href}" class="project-button">${label}</a>`;
}

const DEFAULT_TAGS = ["#UX Design", "#Product Design", "#Research", "#User Flow"];
const DESIGN_TAGS = ["#UX Design", "#Product Design", "#User Flow"];

function FeaturedProject() {
  return `
    <article class="project-card project-card--featured">
      <div class="project-card__visual">
        <img src="assets/images/periyod-phones.png" alt="Periyod uygulaması ekran görüntüleri" class="project-card__phones project-card__phones--periyod" />
      </div>
      <div class="project-card__content">
        ${Meta({ badge: "Araştırma- UX Design", years: "2025 -2026" })}
        <h3 class="project-card__title">Kadın Sağlığı Takibi Uygulaması</h3>
        <p class="project-card__desc">Regl takibi, doktor randevusu, uyku takibi su takibinin yanısıra forum alanı ile kadınlara rahatça iletişim kurma, soru sorma ve destek görme alanı açıyor.</p>
        ${Hashtags(DEFAULT_TAGS)}
        ${CardButton({ href: "periyod-uygulamasi.html" })}
      </div>
    </article>
  `;
}

function StackedProject({ image, imageClass, alt, badge, years, title, href, tags = DEFAULT_TAGS }) {
  return `
    <article class="project-card project-card--stacked">
      <div class="project-card__visual">
        <img src="${image}" alt="${alt}" class="project-card__phones ${imageClass}" />
      </div>
      <div class="project-card__content">
        ${Meta({ badge, years })}
        <h3 class="project-card__title">${title}</h3>
        ${Hashtags(tags)}
        ${CardButton({ href })}
      </div>
    </article>
  `;
}

export function Projects() {
  return `
    <div class="container">
      <div class="home-section-head">
        <div class="home-section-head__row home-section-head__row--single">
          <h2 class="home-section-head__label">PROJELERİM</h2>
          <p class="home-section-head__note">2023-2026 yılları arasında yapmış olduğum seçili projelerim</p>
        </div>
      </div>

      ${FeaturedProject()}

      <div class="project-row">
        ${StackedProject({
          image: "assets/images/home/astroloji-phones.png",
          imageClass: "project-card__phones--astroloji",
          alt: "Astroloji uygulaması ekran görüntüleri",
          badge: "UX-UI Design",
          years: "2024 -2025",
          title: "Astroloji Uygulaması",
          href: "astroloji-uygulamasi.html",
          tags: DESIGN_TAGS,
        })}
        ${StackedProject({
          image: "assets/images/home/mobiclean-phone.webp",
          imageClass: "project-card__phones--mobiclean",
          alt: "Mobiclean uygulaması ekran görüntüleri",
          badge: "Product Design",
          years: "Ağustos 2023",
          title: "Mobiclean",
          href: "mobiclean.html",
          tags: DESIGN_TAGS,
        })}
      </div>
    </div>
  `;
}
