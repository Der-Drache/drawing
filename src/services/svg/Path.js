import { SVG, Svg, Path, PathArray } from '@svgdotjs/svg.js';

Svg.Path = class extends Path {

  line = (x, y) => {
    return new PathArray([
      'L', x, y
    ])
  }
}

SVG().path()