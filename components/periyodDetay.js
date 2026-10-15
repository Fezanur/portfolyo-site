import { Socials } from "./socials.js";

function DetailHero() {
  return `
    <div class="container">
      <div class="detail-hero">
        <div class="detail-hero__visual">
          <img src="assets/images/periyod-phones.png" alt="Periyod uygulaması ekran görüntüleri" class="detail-hero__visual-fg" />
        </div>
        <div class="detail-hero__content">
          <div class="detail-hero__meta">
            <span class="detail-hero__badge">Araştırma- UX Design</span>
            <span class="detail-hero__dot">·</span>
            <span>2025 -2026</span>
          </div>
          <h1 class="detail-hero__title">Kadın Sağlığı Takibi Uygulaması</h1>
          <p class="detail-hero__desc">Regl takibi, doktor randevusu, uyku takibi su takibinin yanısıra forum alanı ile kadınlara rahatça iletişim kurma, soru sorma ve destek görme alanı açıyor.</p>
          <ul class="detail-hero__summary">
            <li class="detail-hero__summary-title">Özet: Ne göreceksin?</li>
            <li><span>01</span>Bir uygulamanın tasarlamadan önce geçtiği aşamalar</li>
            <li><span>02</span>Tasarım kararlarının hangi verilere dayanarak yapıldığı</li>
            <li><span>03</span>Tüm bu yapılan araştırma süreçlerinin tasarım süreçlerine katkıları</li>
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

function ProjeOzeti() {
  return `
    <div class="proje-ozeti">
      <p class="proje-ozeti__label">Proje özeti</p>
      <div class="proje-ozeti__grid">
        <div class="proje-ozeti__item">
          <p class="proje-ozeti__term">Kapsam</p>
          <p class="proje-ozeti__desc">Her yaştan kadın için regl ve sağlık takiplerini yapabilecekleri bir uygulama tasarlamak</p>
        </div>
        <div class="proje-ozeti__item">
          <p class="proje-ozeti__term">Aşamalar</p>
          <p class="proje-ozeti__desc">Netnografi, Benchmark, Wireframe, Arayüz Tasarımı</p>
        </div>
        <div class="proje-ozeti__item">
          <p class="proje-ozeti__term">Kaynaklar</p>
          <ul class="proje-ozeti__desc proje-ozeti__list">
            <li>Google Play, App Store</li>
            <li>Reddit, Ekşi Sözlük</li>
            <li>Kadınlar Kulübü Anket, Forum ve Yorumları</li>
          </ul>
        </div>
        <div class="proje-ozeti__item proje-ozeti__item--ekip">
          <p class="proje-ozeti__term">Ekip</p>
          <p class="proje-ozeti__desc"><strong class="proje-ozeti__name">Feza Nur Tekin</strong> - Araştırma, Kullanıcı Deneyimi Tasarımı, Akış Tasarımı, Wireframe</p>
          <p class="proje-ozeti__desc"><strong class="proje-ozeti__name">Pelin Demirbaş</strong> - Kullanıcı Deneyimi Tasarımı, Arayüz Tasarımı</p>
        </div>
      </div>
    </div>
  `;
}

const TOC_ITEMS = [
  { id: "nasil-basladi", label: "Nasıl Başladı?" },
  { id: "netnografi", label: "Netnografi" },
  { id: "kullanici-icgorusu", label: "Kullanıcı İçgörüleri Sentezi" },
  { id: "proto-persona", label: "Proto-Persona" },
  { id: "benchmark-analizi", label: "Benchmark Analizi" },
  { id: "arastirma-sonucu", label: "Araştırma sonucu neler gösterdi?" },
  { id: "wireframe", label: "Tasarıma Başlangıç: Wireframe ile akış oluşturma" },
  { id: "tasarim-kararlari", label: "Tasarım Kararları: Neden bu kararlar alındı?" },
];

function DetailToc() {
  return `
    <nav class="detail-toc" aria-label="İçindekiler">
      <p class="detail-toc__label">İÇİNDEKİLER</p>
      <ul class="detail-toc__list">
        ${TOC_ITEMS.map(
          (item, index) => `
          <li>
            <a href="#${item.id}" class="detail-toc__link" data-toc-link="${item.id}">
              <span class="detail-toc__num">${String(index + 1).padStart(2, "0")}</span>
              <span>${item.label}</span>
            </a>
          </li>
        `
        ).join("")}
      </ul>
    </nav>
  `;
}

/* Mobile "scroll island": floating pill that shows the current section
   and reading progress; tapping it expands into the full TOC list.
   Uses the same TOC_ITEMS and data-toc-link hooks as the desktop TOC. */
function TocIsland() {
  const RING_R = 9;
  const RING_C = (2 * Math.PI * RING_R).toFixed(2);
  return `
    <div class="toc-island" data-toc-island>
      <div class="toc-island__panel" id="toc-island-panel">
        <div class="toc-island__panel-inner">
          <p class="toc-island__label">İÇİNDEKİLER</p>
          <ol class="toc-island__list">
            ${TOC_ITEMS.map(
              (item, index) => `
              <li>
                <a href="#${item.id}" class="toc-island__link" data-toc-link="${item.id}">
                  <span class="toc-island__num">${String(index + 1).padStart(2, "0")}</span>
                  <span>${item.label}</span>
                </a>
              </li>
            `
            ).join("")}
          </ol>
        </div>
      </div>
      <button type="button" class="toc-island__bar" aria-expanded="false" aria-controls="toc-island-panel" aria-label="İçindekileri aç">
        <svg class="toc-island__ring" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="${RING_R}" class="toc-island__ring-track" />
          <circle cx="12" cy="12" r="${RING_R}" class="toc-island__ring-fill" style="stroke-dasharray:${RING_C};stroke-dashoffset:${RING_C}" data-ring-length="${RING_C}" />
        </svg>
        <span class="toc-island__current" data-toc-island-current>${TOC_ITEMS[0].label}</span>
        <span class="toc-island__count" data-toc-island-count>01/${String(TOC_ITEMS.length).padStart(2, "0")}</span>
        <svg class="toc-island__chevron" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 7.5 6 4.5l3 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
  `;
}

function Section({ id, title, body, empty }) {
  return `
    <section id="${id}" class="detail-section${empty ? " detail-section--empty" : ""}">
      <h2 class="detail-section__title">${title}</h2>
      <div class="detail-section__body">${body}</div>
    </section>
  `;
}

const INSIGHTS = [
  {
    title: "Bildirimler",
    text: "Kullanıcılar bildirimlerin tonu, gün içerisinde gönderilme sıklığı ve içerikleri konusunda sade bir yaklaşım beklemektedirler.",
    icon: "assets/images/periyod-detay/icon-bildirimler.png",
    details: [
      { heading: "Bildirimlerin Tonu", text: "<strong>Duygusal olarak abartılı</strong> ya da <strong>kullanıcının yaşına uymayan</strong> bir dil, kullanıcı ile uygulama arasına mesafe koyuyor." },
      { heading: "Bildirimlerin G\u00f6nderilme S\u0131kl\u0131\u011f\u0131", text: "Kullanıcılar bildirimlerde <strong>dengeli bir sıklık</strong> istiyor. Çok sık gelen ve özellikle <strong>konuyla ilgisi olmayan bildirimler</strong> rahatsızlık yaratıyor; bu da kullanıcıyı <strong>bildirimleri sessize almaya ya da tamamen kapatmaya</strong> itebiliyor." },
      { heading: "Bildirimlerin \u0130\u00e7eri\u011fi", text: "Kullanıcılar bildirimlerin yalnızca hatırlatma yapmasını değil, <strong>motive eden, bilgi veren ve duygusal bağ kuran</strong> içerikler sunmasını bekliyor. Adet zamanı uyarısı gibi işlevsel bildirimlerle motivasyon cümleleri gibi duygusal bildirimlerin <strong>doğru zamanda ve kişiye özel</strong> gelmesi, uygulamayla kurulan bağı güçlendiriyor ve memnuniyeti artırıyor." },
    ],
  },
  {
    title: "Reklamsız Kullanım ve Premium İçeriklere Olan Bakış Açısı",
    text: "Kullanıcılar, uygulamanın deneyimlerini kesintiye uğratmasını veya ihtiyaç duydukları içeriğe erişimlerini kısıtlamasını değil, kendilerine kesintisiz ve gerçek bir değer sunmasını bekliyor.",
    icon: "assets/images/periyod-detay/icon-reklamsiz.png",
    details: [
      { heading: "Reklaml\u0131 Kullan\u0131m Deneyimi", text: "Kullanıcılar reklam yoğunluğunu doğrudan <strong>deneyimin kalitesiyle</strong> ilişkilendiriyor. Rahatsızlığın kaynağı reklamın kendisinden çok <strong>deneyimin bölünmesi</strong> ve bunun yarattığı <strong>reklamdan kaçma isteği</strong>. Reklamların <strong>az sayıda</strong>, <strong>doğru ekranda</strong> ve <strong>doğru zamanda</strong> gösterilmesi onları daha katlanılabilir kılıyor." },
      { heading: "Premium \u0130\u00e7erik Beklentisi", text: "<strong>Duygusal destek sunan içeriklerin</strong> ücretli olması, kullanıcıların uygulamaya duyduğu güveni zedeliyor. Kullanıcılar premium üyeliğin <strong>ödenen ücrete değecek nitelikte</strong> içerikler sunmasını bekliyor; kolayca ulaşabilecekleri içeriklerin <strong>ücret duvarının arkasına alınmasını</strong> doğru bulmuyor." },
    ],
  },
  {
    title: "Uygulamaların Blog İçerikleri",
    text: "Kişiselleştirilmiş, güvenilir ve destekleyici içerik kullanıcıda 'anlaşılıyorum' hissi yaratarak uygulamaya duyulan güveni ve bağlılığı güçlendiriyor.",
    icon: "assets/images/periyod-detay/icon-blog-icerikleri.png",
    details: [
      { heading: "Ya\u015fa Uygun \u0130\u00e7erik", text: "Kullanıcılar yaş bilgilerini paylaşmalarına rağmen <strong>yaşlarına uygun olmayan içeriklerle</strong> karşılaştıklarında uygulamaya olan güvenleri sarsılıyor. Bu durum özellikle <strong>genç kullanıcılar</strong> için önemli bir kırılma noktası. Kayıt sırasında alınan yaş bilgisi, kullanıcıda <strong>içeriklerin buna göre filtreleneceği</strong> beklentisini oluşturuyor." },
      { heading: "Fiziksel ve Ruhsal Sa\u011fl\u0131k \u0130\u00e7erikleri", text: "Regl dönemine yönelik <strong>bedensel ve ruhsal destek sunan</strong> içerikler kullanıcılar için oldukça değerli. <strong>Egzersizler, ses terapileri ve rahatlatıcı yönlendirmeler</strong> kullanıcının konforunu artırırken kendini <strong>önemsenmiş ve anlaşılmış</strong> hissetmesini sağlıyor." },
      { heading: "Regl D\u00f6ng\u00fcs\u00fc Hakk\u0131nda Bilgilendirici \u0130\u00e7erikler", text: "<strong>Sade, anlaşılır ve bilimsel</strong> bilgiler kullanıcıların bedenlerini daha iyi tanımasına ve sürece dair önyargılarını bırakmasına yardımcı oluyor. Kullanıcının yalnızca bir uygulama kullanıcısı değil, <strong>bilgiye değer veren bir birey</strong> olarak görülmesi <strong>uzun vadeli bir bağlılık</strong> yaratıyor." },
    ],
  },
  {
    title: "Veri Tahminlerinin Doğruluğu",
    text: "Kullanıcılar, uygulamanın kendi döngülerini doğru anlayarak onları doğru yönlendirmesini bekliyor; bu güven, hem tahminlerin doğruluğuna hem de kullanıcının veriyi güncelleyebilmesine bağlı.",
    icon: "assets/images/periyod-detay/icon-veri-tahmin.png",
    details: [
      { heading: null, text: "Kullanıcılar için <strong>regl tahminlerinin doğruluğu</strong> uygulamanın en temel değerlerinden biri. Tutarlı tahminler güçlü bir bağlılık yaratırken hatalı tahminler hem <strong>güven kaybına</strong> hem de uygulamanın <strong>işe yarayıp yaramadığının sorgulanmasına</strong> yol açıyor. Kullanıcının hatalı verileri <strong>düzeltememesi</strong> ise kendi döngüsü üzerindeki kontrolü kaybetmiş gibi hissetmesine ve zamanla uygulamadan uzaklaşmasına neden oluyor." },
    ],
  },
  {
    title: "Sadık Kullanıcı Potansiyeli",
    text: "Kullanıcılar, alıştığı deneyimin korunmasını, değişimin ise mevcut alışkanlıklarını bozmayacak şekilde gerçekleşmesini bekliyor.",
    icon: "assets/images/periyod-detay/icon-sadik-kullanici.png",
    details: [
      { heading: null, text: "Kullanıcılar uygulamaların <strong>güncellemelerle bozulmamasını</strong> ve içeriğin bir anda <strong>köklü bir değişime</strong> uğramamasını bekliyor. Bu uygulamalar <strong>uzun soluklu</strong> kullanıldığı için kullanıcılar zamanla belirli <strong>kullanım alışkanlıkları</strong> geliştiriyor; bu alışkanlıkların korunması da uygulamaya duyulan bağlılığı ve sadakati güçlendiriyor." },
    ],
  },
  {
    title: "Güvenli Sosyalleşme Alanı ve Dijital Mahremiyet",
    text: "Kullanıcılar, kadın kadına olacakları, mahremiyetleri korunmuş ve yalnız olmadığını hissedebileceği güvenli bir alan arıyor.",
    icon: "assets/images/periyod-detay/icon-guvenli-sosyallesme.png",
    details: [
      { heading: "G\u00f6rsel Gizlilik ve Anonim Kullan\u0131m", text: "Kullanıcılar regl gibi özel bir konuyu takip eden uygulamanın <strong>adının ve ikonunun konuyu belli etmemesini</strong> mahremiyetlerini koruyan önemli bir özellik olarak görüyor. Bu, uygulamanın gündelik hayatta <strong>rahat ve çekinmeden</strong> kullanılmasını sağlıyor." },
      { heading: "Sosyalle\u015fme \u0130ste\u011fi ve Topluluklarda G\u00fcvenlik", text: "Kullanıcılar regl döneminde yalnızca veri takibi değil, <strong>duygusal destek ve sosyal etkileşim</strong> de arıyor. <strong>Sohbet, paylaşım ve dayanışma alanları</strong> onlara yalnız olmadıklarını hissettiriyor. Ancak kadınlara yönelik olması gereken bu alanlarda güvenliğin sağlanamaması ciddi bir <strong>mahremiyet ve konfor sorunu</strong> yaratıyor; forumlar destek alanı olmaktan çıkıp <strong>taciz ve rahatsızlık</strong> kaynağına dönüşebiliyor." },
    ],
  },
  {
    title: "Uygulama Tasarım Dili",
    text: "Kullanıcılar, kendilerini yansıtabileceği temalar seçmek ve gereksiz görsel yükten sadeleşmiş arayüzler görmek istiyorlar.",
    icon: "assets/images/periyod-detay/icon-tasarim-dili.png",
    details: [
      { heading: "Ki\u015fiselle\u015ftirilebilir Temalar", text: "Kullanıcılar alışılmış <strong>pembe tonlu tasarımlardan uzaklaşıp</strong> daha <strong>nötr, kişiselleştirilebilir temalar ve karanlık mod</strong> istiyor. Bu seçim özgürlüğü kullanıcının kendini ifade etmesine ve uygulamayla daha güçlü bir bağ kurmasına alan açıyor." },
      { heading: "G\u00f6rsel Sadelik", text: "Kullanıcılar arayüzde <strong>sade ve anlaşılır</strong> bir tasarım bekliyor. <strong>Fazla renk kullanımı ve gereksiz sekmeler</strong> deneyimi olumsuz etkileyerek <strong>görsel yorgunluğa</strong> yol açabiliyor." },
    ],
  },
  {
    title: "Uygulamanın Kayıt Tutma İşlevselliği",
    text: "Kullanıcılar döngülerini ve günlük durumlarını kolayca kaydedebilmeyi, bu kayıtların telefon değişse bile kaybolmadan saklanmasını bekliyor.",
    icon: "assets/images/periyod-detay/icon-kayit-tutma.png",
    details: [
      { heading: "Temel Kullan\u0131m Ama\u00e7lar\u0131", text: "Kullanıcılar bu uygulamaları öncelikle <strong>döngü sürelerini kaydetmek</strong>, <strong>ovulasyon tarihlerini hesaplamak</strong> ve <strong>döngü tarihlerini akılda tutma</strong> yükünden kurtulmak için kullanıyor. Döngü boyunca <strong>ruhsal ve fiziksel durumlarını</strong> kaydedebilmeleri ise uygulamayı <strong>günlük olarak</strong> kullanmalarını sağlıyor." },
      { heading: "Ki\u015fisel Verilerde S\u00fcreklilik ve G\u00fcven", text: "<strong>Verileri yedekleme</strong> özelliği pek çok kullanıcının ilk başta fark etmediği, ancak telefon değişikliği ya da güncelleme gibi durumlarda büyük ihtiyaç duyduğu bir özellik. <strong>Geçmiş kayıtlarına ulaşabilmek</strong> kullanıcıda <strong>süreklilik hissi</strong> yaratıyor ve uygulamaya duyulan güveni pekiştiriyor." },
    ],
  },
];

function InsightGrid() {
  const renderInsight = (insight, index) => {
    const contentId = `insight-content-${index + 1}`;
    return `
      <article class="insight-card" style="--insight-order: ${index}">
        ${insight.icon ? `<img class="insight-card__icon" src="${insight.icon}" alt="" />` : ""}
        <p class="insight-card__title">${insight.title}</p>
        <p class="insight-card__text">${insight.text}</p>
        <div class="insight-card__content" id="${contentId}" aria-hidden="true">
          <div class="insight-card__content-inner">
            ${(insight.details || [])
              .map(
                (d, i) => `
              <div class="insight-detail">
                ${d.heading ? `<p class="insight-detail__heading">${String.fromCharCode(97 + i)}) ${d.heading}</p>` : ""}
                <p class="insight-detail__text">${d.text}</p>
              </div>`
              )
              .join("")}
          </div>
        </div>
        <button
          type="button"
          class="insight-card__trigger"
          aria-expanded="false"
          aria-controls="${contentId}"
          aria-label="${insight.title} detayını aç"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </article>
    `;
  };

  return `
    <div class="insight-grid">
      <div class="insight-grid__column">
        ${INSIGHTS.filter((_, index) => index % 2 === 0)
          .map((insight, index) => renderInsight(insight, index * 2))
          .join("")}
      </div>
      <div class="insight-grid__column">
        ${INSIGHTS.filter((_, index) => index % 2 === 1)
          .map((insight, index) => renderInsight(insight, index * 2 + 1))
          .join("")}
      </div>
    </div>
  `;
}

function PersonaCard() {
  return `
    <div class="persona-card">
      <img src="assets/images/periyod-detay/proto-persona.png" alt="Bilinçli Kullanıcı Zeynep" class="persona-card__image" />
    </div>
  `;
}

const DECISIONS = [
  {
    heading: "Modern Renklerde Sade Tasarım Dili",
    text: "Çiçekli, toz pembe renklerde, çocuksu bir görünümden uzak, renkleri daha modern ve tasarım dili sade bir arayüz kurgulandı.",
    label: "Renk paletimiz",
    swatches: ["#a2337f", "#f35c27", "#9fe8e0"],
    shots: [
      { src: "assets/images/periyod-detay/decision-renk-paleti-1.png", w: 243 },
      { src: "assets/images/periyod-detay/decision-renk-paleti-2.png", w: 235 },
    ],
  },
  {
    heading: "Kişisel Gizlilik",
    text: "Uygulama ikonu regl döngüsünü anımsatmayan, bildirim tonları 'profesyonel' ve kullanıcının kendi bildirim metinlerini ayarlayabileceği bir yapı oluşturuldu.",
    label: "Logomuz",
    logo: "assets/images/periyod-detay/decision-logo-mask.svg",
    shots: [
      { src: "assets/images/periyod-detay/decision-kisisel-gizlilik-1.png", w: 266 },
      { src: "assets/images/periyod-detay/decision-kisisel-gizlilik-2.png", w: 266 },
    ],
  },
  {
    heading: "Veri Saklama",
    text: "Kullanıcıların geçmiş tarih verileri kadın hastalıkları konusunda onlara bilgiler verdiği için bunların saklanmasının önemi büyük. Bu yüzden Apple ve Google Sağlık alt yapılarına kaydetme imkanı verdik. Her türlü veri gizliliği ayarları için de bilgilendirme yaparak istedikleri zaman değiştirebilecekleri ayarlar sunduk.",
    shots: [
      { src: "assets/images/periyod-detay/decision-veri-saklama-1.png", w: 311 },
      { src: "assets/images/periyod-detay/decision-veri-saklama-2.png", w: 311 },
      { src: "assets/images/periyod-detay/decision-veri-saklama-3.png", w: 311 },
    ],
  },
  {
    heading: "Güvenlik Önlemleri",
    text: "Kullanıcılara sorular sorabilecekleri alanlar tanırken forum aşamasındaki güvenlik sorunlarını giderebilmek için editör denetimi ve uzman cevap desteği sunduk.",
    shots: [
      { src: "assets/images/periyod-detay/decision-guvenlik-1.png", w: 266 },
      { src: "assets/images/periyod-detay/decision-guvenlik-2.png", w: 266 },
      { src: "assets/images/periyod-detay/decision-guvenlik-3.png", w: 266 },
      { src: "assets/images/periyod-detay/decision-guvenlik-4.png", w: 266 },
    ],
  },
  {
    heading: "Sağlık Deneyimi Bütünü",
    text: "Uygulamamızı sadece tarih eklenen bir uygulama işlevinden çıkarıp içinde sağlıkla ilgili ve regl takipleriyle de ilişkili uyku takibi, su takibi, doktor randevu takibi, ilaç hatırlatıcısı ve göğüs muayenesi gibi hatırlatıcılar ve trackerlar ekleyerek bir sağlık günlüğü deneyimine dönüştürdük.",
    shots: [
      { src: "assets/images/periyod-detay/decision-saglik-deneyimi-1.png", w: 266 },
      { src: "assets/images/periyod-detay/decision-saglik-deneyimi-2.png", w: 266 },
      { src: "assets/images/periyod-detay/decision-saglik-deneyimi-3.png", w: 266 },
      { src: "assets/images/periyod-detay/decision-saglik-deneyimi-4.png", w: 266 },
    ],
  },
];

function DecisionList() {
  return `
    <ul class="decision-list">
      ${DECISIONS.map(
        (d) => `
        <li>
          <p class="decision-list__heading">${d.heading}</p>
          <p class="decision-list__text">${d.text}</p>
          <div class="decision-card${d.label ? " decision-card--labeled" : ""}">
            ${
              d.label
                ? `
              <div class="decision-card__label">
                ${d.label}
                ${
                  d.swatches
                    ? `<div class="decision-card__swatches">${d.swatches
                        .map((c) => `<span class="decision-card__swatch" style="background:${c}"></span>`)
                        .join("")}</div>`
                    : ""
                }
                ${d.logo ? `<span class="decision-card__logo" role="img" aria-label="Periyod logosu" style="-webkit-mask-image:url(${d.logo});mask-image:url(${d.logo})"></span>` : ""}
              </div>
            `
                : ""
            }
            <div class="decision-card__shots">
              ${d.shots
                .map(
                  (shot, i) =>
                    `<img src="${shot.src}" alt="${d.heading} ekran görüntüsü ${i + 1}" class="decision-card__shot" style="--shot-n:${shot.w / 2}" loading="lazy" />`
                )
                .join("")}
            </div>
          </div>
        </li>
      `
      ).join("")}
    </ul>
  `;
}

function DetailContent() {
  return `
    <div class="detail-content">
      ${Section({
        id: "nasil-basladi",
        title: "Nasıl Başladı? Neden Bu Methodlar?",
        body: `
          ${ProjeOzeti()}
          <p>Proje için verilen araştırma süresinin kısıtlı olması sebebi ile uygulamayı anlayabilmek için en hızlı araştırma yöntemleri olan netnografiyi tercih ettim. Netnografi yaparak hedeflediklerim;</p>
          <ul>
            <li>Product ekibinin çalışmış olduğu bir sunum doğrultusunda sunumlarına referans aldıkları <strong>5 temel uygulama</strong>nın <strong>(My Calendar, Beije, Pepapp, Flo, Clue )</strong> sunduğu özelliklerin kullanıcılardaki karşılığını anlamak,</li>
            <li>Bu uygulamaların motivasyon ve acı noktalarını belirleyerek kendimize bir başlangıç noktası belirlemek,</li>
            <li>Tasarım kararları alırken buradaki acı noktalara dikkat ederek aynı hatalara düşmemeye çalışmak.</li>
          </ul>
        `,
      })}
      ${Section({
        id: "netnografi",
        title: "İlk adım: Netnografi",
        body: `
          <p>Kullanıcı yorumlarını incelediğim My Calendar, Beije, Pepapp, Flo, Clue uygulamalarının tekrarlayan ve birbirine yakın olan yorumlarını bir araya getirerek öncelikle küçük başlıklara ayırdım. Ardından bu başlıklardan birbiri ile aynı gruba girebilecek olanları tek bir ana başlık altında grupladım.</p>
          <p>Böylece odaklanmamız gereken ana konuları ve alt başlıklarını görmüş oldum.</p>
          <img src="assets/images/periyod-detay/netnografi-board.png" alt="Netnografi ve kullanıcı içgörüleri çalışma panosu" />
        `,
      })}
      ${Section({
        id: "kullanici-icgorusu",
        title: "Kullanıcı İçgörüleri Sentezi",
        body: `
          <p>Kullanıcıların motivasyonları, acı noktaları ve beklentileri üzerine yapılan analiz sonucu ortaya çıkan temel temalar ve sentezlenmiş iç görüler:</p>
          ${InsightGrid()}
        `,
      })}
      ${Section({
        id: "proto-persona",
        title: "Proto-Persona: Bilinçli Kullanıcı",
        body: `
          <p>Kullanıcılarla ilgili elimizde yaş aralıkları, meslekleri, eğitim düzeyleri, ilgi alanları gibi veriler bulunmadığı için tahmini bir personayla ilerledim ve araştırma çıktılarımızı özetlemiş oldum.</p>
          ${PersonaCard()}
        `,
      })}
      ${Section({
        id: "benchmark-analizi",
        title: "Tasarım İçin Benchmark Çalışması",
        body: `
          <p>Tasarım aşaması öncesi uygulamanın ana başlıklarını çıkartmak, userflow oluşturabilmek, best practicelerini anlayabilmek ve rakip uygulamalardaki yenilikleri gözlemlemek için benchmark çalışması yaptım.</p>
          <img src="assets/images/periyod-detay/benchmark-collage.png" alt="Benchmark çalışması ekran görüntüleri koleksiyonu" />
        `,
      })}
      ${Section({
        id: "arastirma-sonucu",
        title: "Araştırma sonucu neler gösterdi?",
        body: `
          <p>Bu çalışma,</p>
          <div class="quote-list">
            <p class="quote-list__item">Kadın sağlığı uygulamalarının sadece birer "takvim" değil, aynı zamanda birer <em class="magenta">güvenli alan</em> olması gerektiğini,</p>
            <p class="quote-list__item">Kullanıcıların duygusal durumlarıyla kurulan <em class="orange">doğru tondaki iletişimin</em>, sadakati artıran en büyük etkenlerden biri olduğunu,</p>
            <p class="quote-list__item">Bu uygulamaların mahrem ve sağlık verileri içermesi bakımından kullanıcılar için <em class="magenta">verilerin saklanabilirliğinin önemini</em>,</p>
            <p class="quote-list__item">Kullanıcıların bir kısmının artık modern hayata uygun, kadınları "çocuksu, çiçek gibi görme" kavramlarından uzak, <em class="orange">tasarım dili bakımından daha sade</em> uygulamalar görmek istediğini bizlere gösterdi.</p>
          </div>
        `,
      })}
      ${Section({
        id: "wireframe",
        title: "Tasarıma Başlangıç: Wireframe ile akış oluşturma",
        body: `
          <p>Araştırma sonucu ortaya çıkan çıktılar doğrultusunda wireframe ile userflow oluşturma aşamasına başladım. Bu aşamada iş birimleri ile konuşarak örneğin onboarding aşamasında hangi bilgilerin ve izinlerin alınması gerekliliği gibi konularda konuşup bilgi alarak ekranları şekillendirmeye başladım. Ayrıca yapmış olduğum benchmarklar doğrultusunda kadın sağlığı uygulamalarında en çok tercih edilen, best practice görünümleri de dikkate aldım.</p>
          <div class="figure-card">
            <img src="assets/images/periyod-detay/wireframe-overview.png" alt="Onboarding ve akış wireframe ekranları" />
            <p class="figure-card__caption">Her ekran aşamasından önce ilk olarak <strong>kendime bir yol haritası çizdim</strong> ve ekranlarda <strong>neler olması gerektiğini belirleyerek</strong> yine <strong>iş birimleri</strong> ile nasıl ilerlemeliyiz konusunda kendim için notlar aldım.</p>
          </div>
          <div class="figure-row">
            <div class="figure-card">
              <img src="assets/images/periyod-detay/wireframe-calendar-notes.png" alt="Takvim ekranı wireframe notları" />
              <p class="figure-card__caption">Oluşturduğum akışların nasıl ilerleyeceğini, <strong>ekranlardaki ögelerin işlevlerinin neler olduğunu</strong> açıklayarak ilerledim</p>
            </div>
            <div class="figure-card">
              <img src="assets/images/periyod-detay/wireframe-brainstorm-board.png" alt="Akış soruları ve öneriler panosu" />
              <p class="figure-card__caption">Ayrıca akışlar oluşturulurken aklıma takılan, <strong>akışlar için önemli olan konu ve soruları ve önerileri</strong> bu süreçte not ederek ilerledim.</p>
            </div>
          </div>
        `,
      })}
      ${Section({
        id: "tasarim-kararlari",
        title: "Tasarım Kararları: Neden bu kararlar alındı?",
        body: `
          <p>Bu aşamada ekip arkadaşım Pelin Demirbaş ile çıktılar doğrultusunda uygulamanın renk ve diğer görünümlerini belirledik ve uygulamayı tamamladık.</p>
          ${DecisionList()}
        `,
      })}
    </div>
  `;
}

export function PeriyodDetay() {
  return `
    ${DetailHero()}
    <div class="container detail-layout">
      ${DetailToc()}
      ${DetailContent()}
    </div>
    ${TocIsland()}
  `;
}
