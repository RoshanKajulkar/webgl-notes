function main() {
  // getting canvas element
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("example");

  if (!canvas) {
    console.log("Failed to retrieve <canvas> element");
    return;
  }

  // getting the canvas context
  const ctx = canvas.getContext("2d");

  //draw a blue rectangle
  ctx.fillStyle = "rgba(0, 0, 255, 1.0)";
  ctx.fillRect(120, 10, 150, 150);
}
