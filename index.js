var Regl = require('regl');

var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = canvas.height = 4096 * 2;

var regl = Regl({
    canvas: canvas
});

var draw = regl({
  vert: `
    precision mediump float;
    attribute vec2 position;
    void main () {
      gl_Position = vec4(2. * position - 1., 0, 1);
    }`,
  frag: `
    precision mediump float;

    void main() {
      vec2 xy = floor(mod(gl_FragCoord.xy, 2.));
      float pixel = xy.x == 0. ? xy.y : 1. - xy.y;
      gl_FragColor = vec4(vec3(pixel), 1);
    }`,
  attributes: {
    position: [
      -2, 0,
      0, -2,
      2, 2
    ],
  },
  count: 3
});

draw();
