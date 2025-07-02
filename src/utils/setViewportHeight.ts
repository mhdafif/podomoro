export function setViewportHeight() {
  function updateVh() {
    const vh = window.innerHeight * 0.01;
    document.body.style.setProperty("--vh", `${vh}px`);
  }

  updateVh();

  window.addEventListener("resize", updateVh);
}
