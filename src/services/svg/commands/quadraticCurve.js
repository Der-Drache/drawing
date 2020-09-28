/**
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x
 * @param {Number} y
 */
export const quadraticBezier = (x1, y1, x, y) => {
  return ['C', x1, y1, x, y];
}

/**
 * @param {Number} dx1
 * @param {Number} dy1
 * @param {Number} dx
 * @param {Number} dy
 */
export const dquadraticBezier = (dx1, dy1, dx, dy) => {
  return ['C', dx1, dy1, dx, dy];
}

/**
 * @param {Number} x
 * @param {Number} y
 */
export const smoothQuadraticBezier = (x, y) => {
  return ['C', x, y];
}

/**
 * @param {Number} dx
 * @param {Number} dy
 */
export const dsmoothQuadraticBezier = (dx, dy) => {
  return ['C', dx, dy];
}
