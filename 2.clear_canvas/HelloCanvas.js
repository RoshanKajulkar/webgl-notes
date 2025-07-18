function main() {
  // getting canvas element
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("webgl");

  if (!canvas) {
    console.log("Failed to retrieve <canvas> element");
    return;
  }

  // getting the rendering context for webgl
  const gl = canvas.getContext("webgl");

  if (!gl) {
    console.log("Failed to get the rendering context for WebGL");
    return;
  }

  // specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 1.0, 0.5);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
