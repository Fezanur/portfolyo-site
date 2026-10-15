/* Mobile "scroll island" for detail pages without a desktop TOC
   (Astroloji, Mobiclean). Same markup / styles as the Periyod island
   (css/project-detail.css, ≤ 900px): a floating pill showing the current
   section and reading progress; tapping it opens the section list.

   items: [{ id, label }] — ids of elements already on the page.
   content: the element whose scroll range drives progress + visibility. */
export function initTocIsland(items, content) {
  const sections = items.map((item) => document.getElementById(item.id)).filter(Boolean);
  if (!sections.length || !content) return;

  const RING_R = 9;
  const RING_C = 2 * Math.PI * RING_R;
  const num = (i) => String(i + 1).padStart(2, "0");
  const total = String(sections.length).padStart(2, "0");

  const island = document.createElement("div");
  island.className = "toc-island";
  island.innerHTML = `
    <div class="toc-island__panel" id="toc-island-panel">
      <div class="toc-island__panel-inner">
        <p class="toc-island__label">İÇİNDEKİLER</p>
        <ol class="toc-island__list">
          ${items
            .map(
              (item, i) => `
            <li>
              <a href="#${item.id}" class="toc-island__link" data-toc-link="${item.id}">
                <span class="toc-island__num">${num(i)}</span>
                <span>${item.label}</span>
              </a>
            </li>`
            )
            .join("")}
        </ol>
      </div>
    </div>
    <button type="button" class="toc-island__bar" aria-expanded="false" aria-controls="toc-island-panel" aria-label="İçindekileri aç">
      <svg class="toc-island__ring" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="${RING_R}" class="toc-island__ring-track" />
        <circle cx="12" cy="12" r="${RING_R}" class="toc-island__ring-fill" style="stroke-dasharray:${RING_C.toFixed(2)};stroke-dashoffset:${RING_C.toFixed(2)}" />
      </svg>
      <span class="toc-island__current">${items[0].label}</span>
      <span class="toc-island__count">01/${total}</span>
      <svg class="toc-island__chevron" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 7.5 6 4.5l3 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
  `;
  document.body.append(island);

  const bar = island.querySelector(".toc-island__bar");
  const current = island.querySelector(".toc-island__current");
  const count = island.querySelector(".toc-island__count");
  const ring = island.querySelector(".toc-island__ring-fill");
  const links = [...island.querySelectorAll("[data-toc-link]")];

  const setOpen = (open) => {
    island.classList.toggle("is-open", open);
    bar.setAttribute("aria-expanded", String(open));
    bar.setAttribute("aria-label", open ? "İçindekileri kapat" : "İçindekileri aç");
  };

  bar.addEventListener("click", () => setOpen(!island.classList.contains("is-open")));
  document.addEventListener("click", (event) => {
    if (!island.contains(event.target)) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setOpen(false);
      const target = document.getElementById(link.dataset.tocLink);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - 24;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    });
  });

  let scheduled = false;
  const update = () => {
    scheduled = false;
    // active = last section whose top has passed above the island
    const line = bar.getBoundingClientRect().top - 8;
    let index = 0;
    sections.forEach((section, i) => {
      if (section.getBoundingClientRect().top <= line) index = i;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1) {
      index = sections.length - 1;
    }
    links.forEach((link, i) => link.classList.toggle("is-active", i === index));
    current.textContent = items[index].label;
    count.textContent = `${num(index)}/${total}`;

    const rect = content.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const progress = Math.min(1, Math.max(0, scrollable > 0 ? -rect.top / scrollable : 1));
    ring.style.strokeDashoffset = String(RING_C * (1 - progress));

    const visible = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.4;
    island.classList.toggle("is-visible", visible);
    if (!visible) setOpen(false);
  };
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();
}
