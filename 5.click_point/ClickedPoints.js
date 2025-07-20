// Vertex Shader Program
const VSHADER_SOURCE =
  "attribute vec4 a_Position;\n" +
  "void main() {\n" +
  " gl_Position = a_Position;\n" +
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

  // Get the storage location of attribute variable
  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    console.log("Failed to get storage location of a_Position");
    return;
  }

  canvas.onmousedown = function (ev) {
    click(ev, gl, canvas, a_Position);
  };

  // // Pass vertex position to attribute variable
  // gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
  // gl.vertexAttrib1f(a_PointSize, 10);

  // // specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1);

  // clear canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw a point
  // gl.drawArrays(gl.POINTS, 0, 1);
}

const g_points = [];
function click(ev, gl, canvas, a_Position) {
  let x = ev.clientX;
  let y = ev.clientY;
  const rect = ev.target.getBoundingClientRect();

  x = (x - rect.left - canvas.height / 2) / (canvas.height / 2);
  y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);

  g_points.push([x, y]);

  gl.clear(gl.COLOR_BUFFER_BIT);

  for (let i = 0; i < g_points.length; i++) {
    gl.vertexAttrib3f(a_Position, g_points[i][0], g_points[i][1], 0.0);

    gl.drawArrays(gl.POINTS, 0, 1);
  }
}
