import { startAtTop } from "./scroll-start.js";
import { initReadProgress } from "./read-progress.js";
import { initHeaderAutohide } from "./header-autohide.js";
import { DetailHeader } from "../components/header.js";
import { PeriyodDetay } from "../components/periyodDetay.js";

document.getElementById("header").innerHTML = DetailHeader("Kadın Sağlığı Takibi Uygulaması");
document.getElementById("periyod-detay").innerHTML = PeriyodDetay();
startAtTop();
initReadProgress();
initHeaderAutohide();

/* Insight cards: one open at a time — opening a card closes the others */
const insightTriggers = [...document.querySelectorAll(".insight-card__trigger")];

function setInsightOpen(trigger, open) {
  const card = trigger.closest(".insight-card");
  const content = document.getElementById(trigger.getAttribute("aria-controls"));
  if (!card || !content) return;
  trigger.setAttribute("aria-expanded", String(open));
  trigger.setAttribute(
    "aria-label",
    `${card.querySelector(".insight-card__title").textContent} detayını ${open ? "kapat" : "aç"}`
  );
  content.setAttribute("aria-hidden", String(!open));
  card.classList.toggle("is-expanded", open);
}

insightTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const open = trigger.getAttribute("aria-expanded") !== "true";
    if (open) insightTriggers.forEach((other) => other !== trigger && setInsightOpen(other, false));
    setInsightOpen(trigger, open);
  });
});

const tocLinks = document.querySelectorAll("[data-toc-link]");
// Desktop TOC + mobile island share data-toc-link, so dedupe the ids
const sectionIds = [...new Set(Array.from(tocLinks, (link) => link.getAttribute("data-toc-link")))];
const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

const headerHeight = document.getElementById("header").offsetHeight;
const toc = document.querySelector(".detail-toc");
// Align clicked headings with the sticky TOC's top edge
const stickyTop = toc ? parseFloat(getComputedStyle(toc).top) || headerHeight + 24 : headerHeight + 24;

tocLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const target = document.getElementById(link.getAttribute("data-toc-link"));
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - stickyTop;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

const setActiveLink = (id) => {
  tocLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("data-toc-link") === id);
  });
};

/* ---------- Mobile scroll island ---------- */
const island = document.querySelector("[data-toc-island]");
const islandBar = island?.querySelector(".toc-island__bar");
const islandCurrent = island?.querySelector("[data-toc-island-current]");
const islandCount = island?.querySelector("[data-toc-island-count]");
const islandRing = island?.querySelector(".toc-island__ring-fill");
const ringLength = islandRing ? parseFloat(islandRing.dataset.ringLength) : 0;
const content = document.querySelector(".detail-content");
const total = String(sections.length).padStart(2, "0");

const setIslandOpen = (open) => {
  if (!island) return;
  island.classList.toggle("is-open", open);
  islandBar.setAttribute("aria-expanded", String(open));
  islandBar.setAttribute("aria-label", open ? "İçindekileri kapat" : "İçindekileri aç");
};

function updateIsland(activeSection) {
  if (!island || !content) return;

  const index = sections.indexOf(activeSection);
  const link = island.querySelector(`[data-toc-link="${activeSection.id}"] span:last-child`);
  if (link) islandCurrent.textContent = link.textContent;
  islandCount.textContent = `${String(index + 1).padStart(2, "0")}/${total}`;

  // Reading progress through the content column (0 → 1)
  const rect = content.getBoundingClientRect();
  const scrollable = rect.height - window.innerHeight;
  const progress = Math.min(1, Math.max(0, scrollable > 0 ? -rect.top / scrollable : 1));
  islandRing.style.strokeDashoffset = String(ringLength * (1 - progress));

  // Show only while the content is on screen (after the hero, before the footer)
  const visible = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.4;
  island.classList.toggle("is-visible", visible);
  if (!visible) setIslandOpen(false);
}

if (island) {
  islandBar.addEventListener("click", () => setIslandOpen(!island.classList.contains("is-open")));
  island.querySelectorAll("[data-toc-link]").forEach((link) =>
    link.addEventListener("click", () => setIslandOpen(false))
  );
  document.addEventListener("click", (event) => {
    if (!island.contains(event.target)) setIslandOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setIslandOpen(false);
  });
}

// Same breakpoint where the sticky TOC hides and the island appears
const mobileQuery = window.matchMedia("(max-width: 900px)");

let activeUpdateScheduled = false;
const updateActiveLink = () => {
  activeUpdateScheduled = false;

  // Desktop: a section turns active when its heading reaches the sticky TOC's top.
  // Mobile: it turns active as soon as its heading becomes visible above the
  // island (the bar's top edge), i.e. right when the previous section ends.
  const activationLine = mobileQuery.matches
    ? (islandBar ? islandBar.getBoundingClientRect().top : window.innerHeight) - 8
    : stickyTop + 1;
  let activeSection = sections[0];

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= activationLine) {
      activeSection = section;
    }
  });

  const reachedPageBottom =
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
  if (reachedPageBottom) {
    activeSection = sections[sections.length - 1];
  }

  if (activeSection) {
    setActiveLink(activeSection.id);
    updateIsland(activeSection);
  }
};

const scheduleActiveLinkUpdate = () => {
  if (activeUpdateScheduled) return;
  activeUpdateScheduled = true;
  window.requestAnimationFrame(updateActiveLink);
};

window.addEventListener("scroll", scheduleActiveLinkUpdate, { passive: true });
window.addEventListener("resize", scheduleActiveLinkUpdate);
scheduleActiveLinkUpdate();
