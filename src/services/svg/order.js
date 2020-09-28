import { Element, G } from '@svgdotjs/svg.js';

/**
 * @param {Element} element
 */

const getZIndex = element => +element.data('z-index');

/**
 * @param {G} element
 */
export const orderPaths = element => {
  const paths = element.find('path');

  // set each element an id to use for link
  paths.forEach((e, i) => e.id(`el-${i}`));
  // sort the paths based on their z-index
  paths.sort((a, b) => getZIndex(a) - getZIndex(b));
  // make a symoblic link using "use" to re-use the paths
  // and re - render them in their correct order
  paths.forEach(e => element.use(e.id()));
}
