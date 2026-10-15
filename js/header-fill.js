/* Home header background: transparent until the hero's subtitle
   ("Kullanıcı deneyimi…") reaches the header, then it starts at a low
   opacity and fills up over the next FILL_DISTANCE px of scrolling.
   Phones: the heading sits right under the header, so the background
   turns (almost) solid as soon as the page moves — text never shows
   through it. Writes --header-fill (0 … 1) on <header>; css/hero.css. */
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
      const fill = window.scrollY <= 2 ? 0 : 0.9 + 0.1 * Math.min(1, window.scrollY / 80);
      header.style.setProperty("--header-fill", fill.toFixed(3));
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
