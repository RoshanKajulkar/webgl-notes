// Vertex Shader Program
const VSHADER_SOURCE =
  "void main() {\n" +
  " gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n" +
  " gl_PointSize = 10.0;\n" +
  "}\n";

// Fragment Shader Program
const FSHADER_SOURCE =
  "void main() {\n" + " gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" + "}\n";

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

  // initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("Failed to initialize shaders.");
    return;
  }

  // specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.5);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.POINTS, 0, 1);
}
