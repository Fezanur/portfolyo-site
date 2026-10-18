/* Home page entrance. The opening film is its own page (index.html,
   js/opening.js); when it ends it opens this page with ?intro, and the
   landing (components/hero.js) then plays its entrance: the scene pushes
   in and settles, letters pop in, the girl rises, the cat walks in, the
   word stickers slap on, the header slides down.

   Opened any other way (a link inside the site, back/forward, a #section
   link, reduced motion, GSAP missing) the landing is shown as is. */

export function initIntro() {
  const root = document.querySelector("[data-intro]");
  if (!root) return;

  const landing = root.querySelector("[data-landing]");
  const header = document.querySelector("body > header");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const { gsap } = window;

  // ?intro is only a one-shot marker from the opening page: drop it from
  // the address so a reload / shared link is the plain home page
  const params = new URLSearchParams(location.search);
  const fromOpening = params.has("intro");
  if (fromOpening) {
    params.delete("intro");
    const query = params.toString();
    history.replaceState(null, "", location.pathname + (query ? `?${query}` : "") + location.hash);
  }

  // SMIL loops ignore the CSS reduced-motion rule
  if (reduceMotion) document.querySelectorAll("svg").forEach((svg) => svg.pauseAnimations?.());

  const cat = landing.querySelector("[data-hero-cat]");
  const film = landing.querySelector("[data-hero-video]");
  const playFilm = () => film?.play().catch(() => {});

  const debug = params.has("introDebug");
  if (!(fromOpening || debug) || reduceMotion || !gsap || location.hash.length > 1) {
    root.classList.add("intro--static");
    landing.classList.add("is-revealed");
    cat?.classList.add("is-sitting");
    if (!reduceMotion) {
      startWorking(landing);
      playFilm();
    }
    return;
  }

  window.scrollTo(0, 0);
  const stickers = [...landing.querySelectorAll(".sticker")];
  const girl = landing.querySelector(".home-art__girl") || film;

  gsap.set(landing, { autoAlpha: 0 });
  gsap.set(stickers, { scale: 0, rotate: -25 });
  if (girl) gsap.set(girl, { autoAlpha: 0, y: 26 });
  // phones: the header stays put (no fade / slide) — like the detail pages
  const animateHeader = header && !window.matchMedia("(max-width: 860px)").matches;
  if (animateHeader) gsap.set(header, { autoAlpha: 0, y: -16 });

  // The film ended on paper: the landing arrives with a slight push that
  // settles, as if the camera kept moving forward
  const tl = gsap.timeline({ paused: debug });
  tl
    .set(landing, { autoAlpha: 1 }, 0)
    .fromTo(landing, { scale: 1.045 }, { scale: 1, ease: "expo.out", duration: 1.5 }, 0)
    .add(() => landing.classList.add("is-revealed"), 0.05)
    .add(playFilm, 0.1)
    .to(girl || {}, { autoAlpha: 1, y: 0, ease: "expo.out", duration: 1.2 }, 0.2)
    .add(() => startWorking(landing), 0.9)
    .add(() => walkCatIn(cat, gsap), 0.5)
    .to(stickers, { scale: 1, rotate: 0, ease: "back.out(2.4)", duration: 0.6, stagger: 0.12 }, 0.85);
  if (animateHeader) {
    // hand the header back to CSS afterwards (the hide-on-scroll transform)
    tl.to(header, { autoAlpha: 1, y: 0, ease: "expo.out", duration: 0.9, clearProps: "transform,opacity,visibility" }, 0.55);
  }

  // ?introDebug: window.__intro.progress(0…1) scrubs the entrance by hand
  if (debug) window.__intro = tl;
}

/* ---------- Landing: the cat walks in ---------- */
// The cat's box sits at its final spot; the inner mover starts just past
// the left edge of the window and walks to it at a steady pace.
function walkCatIn(cat, gsap) {
  if (!cat) return;
  const mover = cat.querySelector(".hero-cat__mover");
  const box = cat.getBoundingClientRect();
  const from = -(box.right + 12); // fully off-screen on the left
  const speed = Math.max(90, box.width * 0.75); // px / s, scales with the drawing
  const duration = Math.min(7.5, Math.max(3.2, -from / speed));

  cat.classList.add("is-walking");
  gsap.fromTo(
    mover,
    { x: from },
    {
      x: 0,
      duration,
      ease: "power1.out",
      onComplete() {
        cat.classList.remove("is-walking");
        cat.classList.add("is-sitting");
        gsap.set(mover, { clearProps: "transform" });
      },
    }
  );
}

/* ---------- Landing: the girl types, pauses and smiles ---------- */
// Bursts of keystrokes (alternating hands, uneven rhythm), then a short
// pause in which she smiles; the loop idles while the hero is off screen.
function startWorking(landing) {
  const girl = landing.querySelector(".home-art__girl");
  if (!girl) return;
  const hands = [girl.querySelector(".part--hand-l"), girl.querySelector(".part--hand-r")];
  const rand = (a, b) => a + Math.random() * (b - a);

  let visible = true;
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  }).observe(girl);

  let hand = 0;
  let keys = Math.round(rand(14, 26)); // keystrokes left in this burst
  let nextAt = 0;

  const tap = () => {
    const el = hands[hand];
    hand = Math.random() < 0.8 ? 1 - hand : hand;
    if (!el) return;
    el.classList.add("is-tap");
    setTimeout(() => el.classList.remove("is-tap"), 75);
  };

  const step = (now) => {
    requestAnimationFrame(step);
    if (!visible || document.hidden || now < nextAt) return;

    if (keys > 0) {
      girl.classList.remove("is-smiling");
      tap();
      keys -= 1;
      nextAt = now + rand(70, 170) + (Math.random() < 0.12 ? rand(200, 420) : 0);
    } else {
      // pause: a smile, then the next burst
      girl.classList.add("is-smiling");
      keys = Math.round(rand(14, 26));
      nextAt = now + rand(1500, 2300);
    }
  };
  requestAnimationFrame(step);
}
