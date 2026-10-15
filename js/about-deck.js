/* Hakkımda photo stack: a pile of tilted photo cards. The top card follows
   the pointer with a 3D tilt; dragging it far enough, or clicking it, sends
   it to the back of the pile and the others spring forward. Keyboard:
   Enter / Space / arrow keys do the same. Layout per card (from the
   uselayouts CardStack): rotateZ = (n - i - 1) × 4° + a fixed offset,
   scale = 1 + i × 0.06 − n × 0.06, pivot at 90% 90%. */
const MAX_VISIBLE = 5;
const OFFSETS = [2.66, -1.05, -2.8, 1.93, -0.59, 3.12, -2.4];

export function initPhotoDeck(root = document.querySelector("[data-photo-deck]")) {
  if (!root) return;
  const cards = () => [...root.querySelectorAll(".photo-deck__card")];
  if (cards().length < 2) {
    root.classList.add("is-single");
    return;
  }

  const layout = () => {
    const list = cards();
    const n = Math.min(list.length, MAX_VISIBLE);
    list.forEach((card, idx) => {
      // idx 0 = bottom … last = top; only the top MAX_VISIBLE are shown
      const i = idx - (list.length - n);
      const inner = card.querySelector(".photo-deck__inner");
      const hidden = i < 0;
      const id = +card.dataset.id;
      const rot = hidden ? 0 : (n - i - 1) * 4 + OFFSETS[id % OFFSETS.length];
      const scale = hidden ? 0.7 : 1 + i * 0.06 - n * 0.06 + 0.06;
      inner.style.transform = `rotate(${rot}deg) scale(${scale})`;
      card.style.zIndex = String(idx + 1);
      card.classList.toggle("is-hidden", hidden);
      card.classList.toggle("is-top", idx === list.length - 1);
    });
  };

  const sendTopToBack = () => {
    const top = cards().at(-1);
    root.prepend(top);
    layout();
  };

  // ---- dragging the top card ----
  let drag = null;
  const ELASTIC = 0.6;
  const threshold = () => Math.min(140, root.offsetWidth * 0.3);

  root.addEventListener("pointerdown", (event) => {
    const card = event.target.closest(".photo-deck__card");
    if (!card || !card.classList.contains("is-top")) return;
    drag = { card, x0: event.clientX, y0: event.clientY, dx: 0, dy: 0 };
    card.classList.add("is-dragging");
    card.setPointerCapture(event.pointerId);
  });

  root.addEventListener("pointermove", (event) => {
    if (!drag) return;
    drag.dx = event.clientX - drag.x0;
    drag.dy = event.clientY - drag.y0;
    const x = drag.dx * ELASTIC;
    const y = drag.dy * ELASTIC;
    const clamp = (v) => Math.max(-60, Math.min(60, v));
    drag.card.style.transform =
      `translate(${x}px, ${y}px) rotateX(${clamp(-y * 0.6)}deg) rotateY(${clamp(x * 0.6)}deg)`;
  });

  const endDrag = () => {
    if (!drag) return;
    const { card, dx, dy } = drag;
    drag = null;
    card.classList.remove("is-dragging");
    card.style.transform = "";
    const moved = Math.hypot(dx, dy);
    if (moved < 6 || Math.abs(dx) > threshold() || Math.abs(dy) > threshold()) sendTopToBack();
  };
  root.addEventListener("pointerup", endDrag);
  root.addEventListener("pointercancel", () => {
    if (!drag) return;
    drag.card.classList.remove("is-dragging");
    drag.card.style.transform = "";
    drag = null;
  });

  root.addEventListener("keydown", (event) => {
    if (["Enter", " ", "ArrowRight", "ArrowLeft"].includes(event.key)) {
      event.preventDefault();
      sendTopToBack();
    }
  });

  layout();
}
