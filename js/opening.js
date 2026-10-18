/* Opening page: plays the film once, then opens the home page.
   - Tap / click / key skips straight to the home page.
   - If the film can't start (autoplay blocked, slow network, error) the
     home page opens after a short wait instead of a blank screen.
   - Reduced motion: go to the home page right away.
   The home page gets ?intro so it plays its entrance animation; the
   opening page is replaced in history (Back doesn't return to it). */
const HOME = "anasayfa.html";

const video = document.querySelector("[data-opening-video]");
const stage = document.querySelector(".opening");
let leaving = false;

function goHome(fade = true) {
  if (leaving) return;
  leaving = true;
  const url = `${HOME}?intro${location.hash}`;
  if (!fade) return location.replace(url);
  stage.classList.add("is-leaving");
  setTimeout(() => location.replace(url), 350);
}

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !video) {
  location.replace(HOME);
} else {
  video.muted = true;
  // a hair before the end: its last frames are plain paper
  video.addEventListener("timeupdate", () => {
    if (video.duration && video.currentTime >= video.duration - 0.35) goHome();
  });
  video.addEventListener("ended", () => goHome());
  video.addEventListener("error", () => goHome(false));

  // not started within 3 s → home; never wait longer than film + slack
  const startTimer = setTimeout(() => {
    if (video.paused || video.currentTime === 0) goHome(false);
  }, 3000);
  video.addEventListener("playing", () => clearTimeout(startTimer), { once: true });
  video.addEventListener(
    "loadedmetadata",
    () => setTimeout(() => goHome(), (video.duration + 2.5) * 1000),
    { once: true }
  );
  video.play().catch(() => goHome(false));

  ["pointerdown", "keydown"].forEach((type) =>
    window.addEventListener(type, () => goHome(), { passive: true })
  );
}
