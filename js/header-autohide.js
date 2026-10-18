/* The header slides away while scrolling down and comes
   back as soon as the visitor scrolls up (or reaches the top). */
export function initHeaderAutohide(header = document.querySelector("body > header")) {
  if (!header) return;
  let lastY = window.scrollY;
  let scheduled = false;
  const DELTA = 6; // ignore tiny jitters

  const update = () => {
    scheduled = false;
    const y = Math.max(0, window.scrollY);
    const diff = y - lastY;
    if (Math.abs(diff) < DELTA) return;
    const hide = diff > 0 && y > header.offsetHeight;
    header.classList.toggle("is-hidden", hide);
    document.documentElement.classList.toggle("header-hidden", hide);
    lastY = y;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(update);
    },
    { passive: true }
  );
  // keyboard users: tabbing into the header shows it
  header.addEventListener("focusin", () => {
    header.classList.remove("is-hidden");
    document.documentElement.classList.remove("header-hidden");
  });
}
