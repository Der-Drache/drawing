import { fill } from './fill';
import { strokes } from './strokes';

/**
 * @typedef {import('@svgdotjs/svg.js').G} G
 * @param {G} draw
 */
export const zougui = draw => {
  fill(draw);
  strokes(draw);
}
