import { fill } from './fill';
import { strokes } from './strokes';

/**
 * @typedef {import('@svgdotjs/svg.js').G} G
 * @param {G} draw
 */
export const character = draw => {
  fill(draw);
  strokes(draw);
}
