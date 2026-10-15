/* Home intro: a loading scene. The opening film (assets/video/opening.mp4,
   ~5 s — the room comes alive and pushes in on the monitor, ending on
   paper) plays full screen, then cuts to the landing scene
   (components/hero.js); then the page is free to scroll.

   - Scrolling is locked while it plays. A click / key / wheel / touch skips
     straight to the landing.
   - If the film cannot start (autoplay blocked, slow network, error) the
     landing is shown after a short wait instead of a blank screen.
   - Plays only on a fresh visit or a reload. Skipped (landing shown straight
     away) when coming from another page of the site, via back/forward, on a
     #section link, for reduced motion, and when GSAP fails to load. */

export function initIntro() {
  const root = document.querySelector("[data-intro]");
  if (!root) return;

  const room = root.querySelector("[data-room]");
  const video = root.querySelector("[data-video]");
  const landing = root.querySelector("[data-landing]");
  const header = document.querySelector("body > header");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = performance.getEntriesByType?.("navigation")?.[0];
  // The film plays on a fresh open of the site and on reload. Links inside
  // the site that lead back home carry ?home (detail-page "Anasayfa", the
  // logo): those, back/forward and #section links skip it. The marker is
  // removed from the address right away, so a reload plays the film again.
  const params = new URLSearchParams(location.search);
  const fromInside = params.has("home");
  if (fromInside) {
    params.delete("home");
    const query = params.toString();
    history.replaceState(null, "", location.pathname + (query ? `?${query}` : "") + location.hash);
  }
  const deepLink =
    fromInside ||
    location.hash.length > 1 ||
    nav?.type === "back_forward";
  const { gsap } = window;

  // SMIL loops ignore the CSS reduced-motion rule
  if (reduceMotion) document.querySelectorAll("svg").forEach((svg) => svg.pauseAnimations?.());

  const cat = landing.querySelector("[data-hero-cat]");
  const film = landing.querySelector("[data-hero-video]");
  const playFilm = () => film?.play().catch(() => {});

  if (reduceMotion || deepLink || !gsap) {
    root.classList.add("intro--static");
    video?.removeAttribute("src"); // don't download the film
    video?.load();
    landing.classList.add("is-revealed");
    cat?.classList.add("is-sitting");
    if (!reduceMotion) {
      startWorking(landing);
      playFilm();
    }
    return;
  }

  const html = document.documentElement;
  document.body.classList.add("is-intro");
  html.classList.add("is-intro-lock");
  window.scrollTo(0, 0);

  // Landing pieces, revealed one by one after the cut
  // (the text pops in letter by letter from CSS once .is-revealed is set)
  const stickers = [...landing.querySelectorAll(".sticker")];
  const girl = landing.querySelector(".home-art__girl") || film;

  gsap.set(landing, { autoAlpha: 0 });
  gsap.set(stickers, { scale: 0, rotate: -25 });
  if (girl) gsap.set(girl, { autoAlpha: 0, y: 26 });
  if (header) gsap.set(header, { autoAlpha: 0, y: -16 });

  const finish = () => {
    room.style.display = "none";
    video.pause();
    video.removeAttribute("src"); // free the decoder
    video.load();
    html.classList.remove("is-intro-lock");
    document.body.classList.remove("is-intro");
    removeSkip();
  };

  // The cut (seconds from the end of the film). The film ends on paper, so
  // the room layer only has to fade a breath; the landing then arrives with
  // a slight push that settles, as if the camera kept moving forward.
  const CUT = 0.35;
  const tl = gsap.timeline({ paused: true, onComplete: finish });
  tl
    .to(room, { autoAlpha: 0, ease: "power1.in", duration: CUT }, 0)
    .set(landing, { autoAlpha: 1 }, CUT)
    .fromTo(landing, { scale: 1.045 }, { scale: 1, ease: "expo.out", duration: 1.5 }, CUT)
    // text: letters pop in one by one (CSS transition, see hero.css)
    .add(() => landing.classList.add("is-revealed"), CUT + 0.05)
    // illustration: she rises in, the film starts from its first frame
    .add(playFilm, CUT + 0.1)
    .to(girl || {}, { autoAlpha: 1, y: 0, ease: "expo.out", duration: 1.2 }, CUT + 0.2)
    // she starts typing (and smiling now and then)
    .add(() => startWorking(landing), CUT + 0.9)
    // the cat walks in from the left edge of the page and sits beside her
    .add(() => walkCatIn(cat, gsap), CUT + 0.5)
    // colour stickers slap on around the drawing
    .to(
      stickers,
      { scale: 1, rotate: 0, ease: "back.out(2.4)", duration: 0.6, stagger: 0.12 },
      CUT + 0.85
    );

  if (header) tl.to(header, { autoAlpha: 1, y: 0, ease: "expo.out", duration: 0.9 }, CUT + 0.55);

  let revealed = false;
  const reveal = () => {
    if (revealed) return;
    revealed = true;
    clearTimeout(startTimer);
    clearTimeout(maxTimer);
    tl.play();
  };

  let startTimer = 0;
  let maxTimer = 0;

  // Click / key / wheel / touch: straight to the landing
  const skip = () => {
    reveal();
    tl.timeScale(1.6);
  };
  const events = ["pointerdown", "keydown", "wheel", "touchstart"];
  function removeSkip() {
    events.forEach((type) => window.removeEventListener(type, skip));
  }

  // ?introDebug: the film stays paused; window.__intro.progress(0…1) scrubs
  // the cut to the landing by hand
  if (new URLSearchParams(location.search).has("introDebug")) {
    window.__intro = tl;
    return;
  }

  events.forEach((type) => window.addEventListener(type, skip, { passive: true }));

  // Play the film; cut when it ends (a hair early, its last frames are paper)
  video.muted = true; // autoplay needs it as a property too
  video.addEventListener("timeupdate", () => {
    if (video.duration && video.currentTime >= video.duration - 0.12) reveal();
  });
  video.addEventListener("ended", reveal);
  video.addEventListener("error", reveal);

  // Not started within 3 s (slow network)? Go to the landing
  startTimer = setTimeout(() => {
    if (video.paused || video.currentTime === 0) reveal();
  }, 3000);
  video.addEventListener("playing", () => clearTimeout(startTimer), { once: true });
  // Stalled mid-way? Never hold the visitor longer than the film + slack
  video.addEventListener(
    "loadedmetadata",
    () => {
      maxTimer = setTimeout(reveal, (video.duration + 2.5) * 1000);
    },
    { once: true }
  );
  video.play().catch(reveal);
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
