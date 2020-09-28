/**
 * @param {Number} x
 * @param {Number} y
 */
export const line = (x, y) => {
  return ['L', x, y];
}

/**
 * @param {Number} dx
 * @param {Number} dy
 */
export const dline = (dx, dy) => {
  return ['l', dx, dy];
}

/**
 * @param {Number} y
 */
export const vline = (y) => {
  return ['V', y];
}

/**
 * @param {Number} dy
 */
export const dvline = (dy) => {
  return ['v', dy];
}

/**
 * @param {Number} x
 */
export const hline = (x) => {
  return ['H', x];
}

/**
 * @param {Number} dx
 */
export const dhline = (dx) => {
  return ['h', dx];
}
