/* Home header background: transparent until the hero's subtitle
   ("Kullanıcı deneyimi…") reaches the header, then it starts at a low
   opacity and fills up over the next FILL_DISTANCE px of scrolling.
   Phones: always solid (it also fills the iPhone status-bar strip and
   the heading right under it never shows through). Writes --header-fill (0 … 1) on <header>; css/hero.css. */
const START_OPACITY = 0.35;
const FILL_DISTANCE = 320;
const phone = window.matchMedia("(max-width: 860px)");

export function initHeaderFill() {
  const header = document.querySelector("body.home > header");
  const subtitle = document.querySelector(".hero__subtitle");
  if (!header || !subtitle) return;

  let start = 0;
  const measure = () => {
    // page y at which the subtitle's top meets the bottom of the header
    start = subtitle.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
  };

  // cheap enough to run on every scroll event (one custom property)
  const update = () => {
    if (phone.matches) {
      // phones: always solid, so the status-bar strip is filled too
      header.style.setProperty("--header-fill", "1");
      return;
    }
    const past = window.scrollY - start;
    const fill = past <= 0 ? 0 : START_OPACITY + (1 - START_OPACITY) * Math.min(1, past / FILL_DISTANCE);
    header.style.setProperty("--header-fill", fill.toFixed(3));
  };
  measure();
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", () => {
    measure();
    update();
  });
  window.addEventListener("load", () => {
    measure();
    update();
  });
}
