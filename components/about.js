/* Figma 391:3256 — Hakkımda: intro + photo, İş Deneyimi / Eğitim columns */

function ExperienceItem({ logo, role, company, date, location }) {
  return `
    <li class="experience-item">
      <div class="experience-item__main">
        <img src="${logo}" alt="${company} logosu" class="experience-item__logo" />
        <div class="experience-item__text">
          <p class="experience-item__role">${role}</p>
          <p class="experience-item__company">${company}</p>
        </div>
      </div>
      <div class="experience-item__meta">
        <span>${date}</span>
        <span class="experience-item__location">
          <img src="assets/images/location.svg" alt="" width="12" height="12" />
          ${location}
        </span>
      </div>
    </li>
  `;
}

function EducationItem({ logo, date, name, detail, gpa }) {
  return `
    <li class="education-item">
      <img src="${logo}" alt="${name.replace(/<br\s*\/?>/g, " ")} logosu" class="education-item__logo" />
      <div class="education-item__text">
        <p class="education-item__date">${date}</p>
        <p class="education-item__name">${name}</p>
        ${detail ? `<p class="education-item__detail">${detail}</p>` : ""}
        ${gpa ? `<p class="education-item__gpa">${gpa}</p>` : ""}
      </div>
    </li>
  `;
}

/* Photo stack (after uselayouts "Accessible Action"): polaroid cards piled
   with a tilt; the top one can be dragged / swiped or clicked to send it to
   the back (js/about-deck.js). Photos keep their own shape (clamped to
   3:4 … 3:2) so they show whole. Listed top of the pile first.
   caption: optional "Yer, yıl" line written under the photo. */
const ABOUT_PHOTOS = [
  { src: "01.webp", w: 675, h: 900, alt: "Feza Nur Tekin", caption: "Yunanistan, 2026" },
  { src: "13.webp", w: 675, h: 900, alt: "Binnaz, kırmızı beyaz battaniyede uyuyan gri kedi", caption: "Binnaz, İstanbul, 2026" },
  { src: "03.webp", w: 900, h: 600, alt: "Tarçın, yakın plan sarı tekir kedi", caption: "Tarçın, İzmir, 2023" },
  { src: "05.webp", w: 675, h: 900, alt: "Kapadokya'da gün doğumunda sıcak hava balonları", caption: "Kapadokya, 2018" },
  { src: "10.webp", w: 675, h: 900, alt: "Bir müzede mozaiği izleyen Feza", caption: "Gaziantep, 2023" },
  { src: "07.webp", w: 900, h: 616, alt: "Mavi gökyüzü önünde Galata Kulesi", caption: "İstanbul, 2023" },
  { src: "16.webp", w: 682, h: 900, alt: "Kayalıklar arasındaki yolda yürüyen Feza", caption: "Ankara, 2019" },
  { src: "11.webp", w: 675, h: 900, alt: "Deniz kenarında ağaç gölgesindeki şezlonglar", caption: "Yunanistan, 2026" },
  { src: "02.webp", w: 723, h: 900, alt: "Antika ve oyuncak dolu bir dükkân", caption: "Bursa, 2016" },
  { src: "15.webp", w: 900, h: 900, alt: "Gün batımında iskelede balık tutanlar", caption: "İzmir, 2015" },
  { src: "09.webp", w: 900, h: 760, alt: "Mozaik duvarın önünden geçen bir kişi", caption: "Gaziantep, 2023" },
  { src: "06.webp", w: 900, h: 696, alt: "Boğaz'a bakan bir siluet", caption: "İstanbul, 2022" },
  { src: "12.webp", w: 675, h: 900, alt: "Palmiyeler ve koya bakan deniz manzarası", caption: "Yunanistan, 2026" },
  { src: "04.webp", w: 740, h: 900, alt: "Kuşbakışı karlı bir arazide araç izleri", caption: "Bursa, 2016" },
  { src: "08.webp", w: 675, h: 900, alt: "Tarçın, perde arkasında kaloriferin üstünde uyuyor", caption: "Tarçın, İzmir, 2022" },
  { src: "14.webp", w: 720, h: 900, alt: "Uçaktan gün batımında kıyı şehri", caption: "İzmir, 2016" },
];

// Fit each photo into a 380 × 340 window of the 520-wide deck
const MAX_W = 380;
const MAX_H = 340;
const photoWidth = ({ w, h }) => Math.min(MAX_W, (MAX_H * w) / h);

function PhotoDeck() {
  const many = ABOUT_PHOTOS.length > 1;
  return `
    <div class="about__photo">
      <div class="photo-deck" data-photo-deck ${many ? 'role="button" tabindex="0" aria-label="Sonraki fotoğraf"' : ""}>
        ${ABOUT_PHOTOS.map((p, i) => ({ ...p, i }))
          .reverse()
          .map(
            (p) => `
          <div class="photo-deck__card" data-id="${p.i}" style="--photo-w: ${((photoWidth(p) / 520) * 100).toFixed(2)}cqw">
            <figure class="photo-deck__inner">
              <img src="assets/images/home/about/${p.src}" alt="${p.alt}" width="${p.w}" height="${p.h}" style="aspect-ratio: ${p.w} / ${p.h}" draggable="false" loading="lazy" decoding="async" />
              <figcaption class="photo-deck__caption">${p.caption || ""}</figcaption>
            </figure>
          </div>`
          )
          .join("")}
      </div>
    </div>
  `;
}

export function About() {
  return `
    <div class="container">
      <div class="home-section-head home-section-head--about">
        <p class="home-section-head__label">HAKKIMDA</p>
      </div>

      <div class="about__intro">
        <div class="about__text">
          <p>Üç yılı aşkın süredir eğitimim, stajlarım ve profesyonel çalışma hayatımla tasarım ekosisteminin içerisinde yer alıyorum. Benim için tasarım, sadece görsel olarak estetik yapılar kurgulamak değil; kullanıcının gerçek ihtiyaçlarını anlayıp hayatına doğrudan dokunan çözümler üretebilmektir. Bu yüzden kullanıcı araştırmasından son tasarıma kadar tüm süreçlerde aktif rol almayı ve fikirlerin somut, ölçülebilir sonuçlara dönüştüğünü görmeyi çok kıymetli buluyorum.</p>
          <p>İş hayatının ötesinde; sevdiklerimle vakit geçirmek, yaşam alanlarımı kişiselleştirecek el emeği dekoratif projeler üretmek ve sık sık yeni yerler keşfedeceğim kısa seyahatlere çıkmak en büyük ilham kaynaklarım arasında yer alıyor.</p>
        </div>
        ${PhotoDeck()}
      </div>

      <div class="home-section-head home-section-head--about about__experience-head" id="experience">
        <p class="home-section-head__label">DENEYİM</p>
      </div>

      <div class="about__columns">
        <div class="about__column about__column--experience">
          <h3 class="about__column-title">İş Deneyimi</h3>
          <ul class="experience-list">
            ${ExperienceItem({
              logo: "assets/images/home/exp-demiroren.png",
              role: "UX Designer",
              company: "Demiroren Medya",
              date: "Aralık 2023 - Temmuz 2026",
              location: "İstanbul, Hibrit",
            })}
            ${ExperienceItem({
              logo: "assets/images/home/exp-userspots.png",
              role: "UX Research Intern",
              company: "Userspots",
              date: "Eylül 2022 - Aralık 2022",
              location: "İstanbul, Remote",
            })}
            ${ExperienceItem({
              logo: "assets/images/home/exp-jeffromi.png",
              role: "Product Design Intern",
              company: "Jeffromi Studio",
              date: "Haziran 2023 - Eylül 2023",
              location: "İstanbul, Remote",
            })}
          </ul>
        </div>

        <div class="about__column about__column--education">
          <h3 class="about__column-title">Eğitim</h3>
          <ul class="education-list">
            ${EducationItem({
              logo: "assets/images/logos/hacettepe.jpg",
              date: "2014 - 2019",
              name: "Hacettepe Üniversitesi",
              detail: "İktisat",
              gpa: "GPA: 3.07 / 4.0",
            })}
            ${EducationItem({
              logo: "assets/images/logos/ux-okulu.png",
              date: "Şubat 2022- Eylül 2022",
              name: "Brick Institute | Userspots Akademi<br />UX Okulu",
            })}
          </ul>
        </div>
      </div>
    </div>
  `;
}
