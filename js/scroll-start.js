/* Start every freshly opened page at the top (or at #hash if the URL has one).
   Pages render their content with JS after load, so the browser — or an embedding
   preview — can carry over the previous page's scroll position. Back/forward
   navigation is left alone so returning to a page keeps the reader's place. */
export function startAtTop() {
  const nav = performance.getEntriesByType?.("navigation")?.[0];
  if (nav && nav.type === "back_forward") return;

  let userScrolled = false;
  const markUserScroll = () => {
    userScrolled = true;
  };
  ["wheel", "touchstart", "keydown", "mousedown"].forEach((type) =>
    window.addEventListener(type, markUserScroll, { once: true, passive: true })
  );

  const go = () => {
    if (userScrolled) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const target = id && document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "instant", block: "start" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  };

  // Now, after the first paint, and once images have settled the layout
  go();
  requestAnimationFrame(go);
  window.addEventListener("load", go, { once: true });
}
