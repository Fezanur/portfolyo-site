import { startAtTop } from "./scroll-start.js";
import { initReadProgress } from "./read-progress.js";
import { initHeaderAutohide } from "./header-autohide.js";
import { initTocIsland } from "./toc-island.js";
import { DetailHeader } from "../components/header.js";
import { MobicleanDetay } from "../components/mobicleanDetay.js";

document.getElementById("header").innerHTML = DetailHeader("Mobiclean");
document.getElementById("mobiclean-detay").innerHTML = MobicleanDetay();
startAtTop();
initReadProgress();
initHeaderAutohide();
initCarousel(document.querySelector("[data-mobi-carousel]"));
initTocIsland(
  [
    { id: "mobi-brief", label: "Brief ve Akışlar" },
    { id: "mobi-plan", label: "Proje Planı" },
    { id: "mobi-surec", label: "Tasarım Süreci" },
    { id: "mobi-benchmark", label: "Benchmark" },
    { id: "mobi-wireframe", label: "Wireframe" },
    { id: "mobi-uikit", label: "UI Kit" },
    { id: "mobi-ekranlar", label: "Ekran Akışları" },
  ],
  document.querySelector(".mobi-body")
);
initBackToTop();

/* Ekran Akışları: the tab list switches the visible flow panel.
   Arrow keys move between tabs (WAI-ARIA tabs pattern). */
function initCarousel(root) {
  if (!root) return;
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const slides = [...root.querySelectorAll('[role="tabpanel"]')];
  let current = 0;

  const show = (index, focusTab = false) => {
    current = (index + tabs.length) % tabs.length;
    tabs.forEach((tab, i) => {
      const on = i === current;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
    });
    slides.forEach((slide, i) => {
      slide.hidden = i !== current;
    });
    const tab = tabs[current];
    // keep the active pill in view in the mobile horizontal scroller
    const list = tab.parentElement;
    if (list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: tab.offsetLeft - 20, behavior: "smooth" });
    }
    if (focusTab) tab.focus();
  };

  tabs.forEach((tab, i) => tab.addEventListener("click", () => show(i)));
  root.querySelector('[role="tablist"]').addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") show(current + 1, true);
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") show(current - 1, true);
    else return;
    event.preventDefault();
  });
}

function initBackToTop() {
  document.querySelector("[data-back-to-top]")?.addEventListener("click", (event) => {
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
}
