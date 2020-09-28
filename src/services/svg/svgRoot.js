import { SVG, Svg, Element } from '@svgdotjs/svg.js';

const svgRootId = 'svg-root';
const svgRootSelector = '#' + svgRootId;

export const svgRoot = () => {
  return SVG(svgRootSelector);
}

/**
 * @param {Svg} svg
 */
export const createSvgRoot = (svg) => {
  return svg.group().id(svgRootId);
}
