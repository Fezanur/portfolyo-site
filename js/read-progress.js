/* Reading progress bar pinned to the bottom of the screen on detail pages.
   Fills from 0 to 100% as the page scrolls (styles: css/project-detail.css). */
export function initReadProgress() {
  const bar = document.createElement("div");
  bar.className = "read-progress";
  bar.setAttribute("aria-hidden", "true");
  bar.innerHTML = '<span class="read-progress__fill"></span>';
  document.body.append(bar);
  const fill = bar.firstElementChild;

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    fill.style.transform = `scaleX(${progress})`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("load", update);
}
