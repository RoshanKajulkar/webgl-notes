// Vertex Shader Program
const VSHADER_SOURCE =
  "attribute vec4 a_Position;\n" +
  "void main() {\n" +
  " gl_Position = a_Position;\n" +
  " gl_PointSize = 10.0;\n" +
  "}\n";

// Fragment Shader Program
const FSHADER_SOURCE =
  "precision mediump float;\n" +
  "uniform vec4 u_FragColor;\n" +
  "void main() {\n" +
  " gl_FragColor = u_FragColor;\n" +
  "}\n";

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

  // Get the storage location of u_FragColor variable
  const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");

  canvas.onmousedown = function (ev) {
    click(ev, gl, canvas, a_Position, u_FragColor);
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
const g_colors = [];

function click(ev, gl, canvas, a_Position, u_FragColor) {
  let x = ev.clientX;
  let y = ev.clientY;
  const rect = ev.target.getBoundingClientRect();

  x = (x - rect.left - canvas.height / 2) / (canvas.height / 2);
  y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);

  g_points.push([x, y]);

  if (x >= 0.0 && y >= 0.0) {
    g_colors.push([1.0, 0.0, 0.0, 1.0]);
  } else if (x < 0.0 && y < 0.0) {
    g_colors.push([0.0, 1.0, 0.0, 1.0]);
  } else {
    g_colors.push([1.0, 1.0, 1.0, 1.0]);
  }

  gl.clear(gl.COLOR_BUFFER_BIT);

  for (let i = 0; i < g_points.length; i++) {
    const xy = g_points[i];
    const rgba = g_colors[i];

    console.log(xy);

    // Pass the position to a_Position variable
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);

    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    gl.drawArrays(gl.POINTS, 0, 1);
  }
}
