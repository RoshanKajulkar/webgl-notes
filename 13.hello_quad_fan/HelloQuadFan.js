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

  // set the positions of vertices
  const n = initVertexBuffer(gl);
  if (n < 0) {
    console.log("Failed to set the positions of the vertices");
    return;
  }

  // specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1);

  // clear canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw a point
  gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}

/**
 * @param {WebGLRenderingContext} gl
 */
function initVertexBuffer(gl) {
  const vertices = new Float32Array([
    -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5,
  ]);

  const n = 4;

  // create a buffer object
  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log("Failed to create the buffer object");
    return -1;
  }

  // binding the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // write data into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const a_Position = gl.getAttribLocation(gl.program, "a_Position");

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  return n;
}
