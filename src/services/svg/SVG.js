import { SVG, Svg, extend } from '@svgdotjs/svg.js';

extend(Svg, {
  svgRoot: function () {
    return SVG('#svg-root');
  },
});

export {
  SVG,
}
