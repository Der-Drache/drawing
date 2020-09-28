import { details } from './details';
import { shading } from './shading';
import { shapes } from './shapes';

/**
 * @typedef {import('@svgdotjs/svg.js').G} G
 * @param {G} draw
 */
export const strokes = draw => {
  details(draw);
  shading(draw);
  shapes(draw);
}
