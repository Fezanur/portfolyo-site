/* Figma 391:3256 — Sertifikalar: four equal cards in one row */
function CertificateCard({ logo, platform, date, title }) {
  return `
    <li class="certificate-card">
      <div class="certificate-card__header">
        <div class="certificate-card__brand">
          <img src="${logo}" alt="${platform} logosu" class="certificate-card__logo" />
          <span class="certificate-card__platform">${platform}</span>
        </div>
        <span class="certificate-card__date">${date}</span>
      </div>
      <p class="certificate-card__title">${title}</p>
    </li>
  `;
}

export function Certificates() {
  return `
    <div class="container">
      <h3 class="certificates__title">Sertifikalar</h3>
      <ul class="certificates__grid">
        ${CertificateCard({
          logo: "assets/images/logos/uxr-playground.jpg",
          platform: "UXR Playground",
          date: "Nisan 2025",
          title: "UX Araştırma Eğitimi",
        })}
        ${CertificateCard({
          logo: "assets/images/logos/ba-uxistanbul.png",
          platform: "UX Services",
          date: "Mayıs 2024",
          title: "BA UXistanbul Conference 2024",
        })}
        ${CertificateCard({
          logo: "assets/images/logos/userspots-mark.png",
          platform: "Userspots",
          date: "Eylül 2022",
          title: "UX Okulu Başarı Sertifikası",
        })}
        ${CertificateCard({
          logo: "assets/images/logos/userspots-mark.png",
          platform: "Userspots",
          date: "Haziran 2022",
          title: "Sigortayeri Ideathon 3.lüğü",
        })}
      </ul>
    </div>
  `;
}
