/**
 * @typedef {import('@svgdotjs/svg.js').G} G
 * @param {G} draw
 */
export const shapes = (draw) => {
  draw.path(['m', 0, 0, 'l', 100, 100]).stroke('#000')
}
