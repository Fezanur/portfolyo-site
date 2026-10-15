import { startAtTop } from "./scroll-start.js";
import { initReadProgress } from "./read-progress.js";
import { initHeaderAutohide } from "./header-autohide.js";
import { initTocIsland } from "./toc-island.js";
import { DetailHeader } from "../components/header.js";
import { AstrolojiDetay } from "../components/astrolojiDetay.js";

document.getElementById("header").innerHTML = DetailHeader("Astroloji Uygulaması");
document.getElementById("astroloji-detay").innerHTML = AstrolojiDetay();
startAtTop();
initReadProgress();
initHeaderAutohide();

initTocIsland(
  [
    { id: "ikonlar", label: "İkonlar" },
    { id: "tipografi-renk", label: "Tipografi ve Renk" },
    { id: "onboarding", label: "Onboarding Ekranları" },
    { id: "yukselen-burc", label: "Yükselen Burç" },
    { id: "tarot", label: "Tarot" },
    { id: "burclar", label: "Burçlar" },
  ],
  document.querySelector(".astro-panels")
);

document.querySelector("[data-back-to-top]")?.addEventListener("click", (event) => {
  event.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
});
