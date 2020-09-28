/**
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @param {Number} x
 * @param {Number} y
 */
export const cubicBezier = (x1, y1, x2, y2, x, y) => {
  return ['C', x1, y1, x2, y2, x, y];
}

/**
 * @param {Number} dx1
 * @param {Number} dy1
 * @param {Number} dx2
 * @param {Number} dy2
 * @param {Number} dx
 * @param {Number} dy
 */
export const dcubicBezier = (dx1, dy1, dx2, dy2, dx, dy) => {
  return ['C', dx1, dy1, dx2, dy2, dx, dy];
}

/**
 * @param {Number} x2
 * @param {Number} y2
 * @param {Number} x
 * @param {Number} y
 */
export const smoothCubicBezier = (x2, y2, x, y) => {
  return ['C', x2, y2, x, y];
}

/**
 * @param {Number} dx2
 * @param {Number} dy2
 * @param {Number} dx
 * @param {Number} dy
 */
export const dsmoothCubicBezier = (dx2, dy2, dx, dy) => {
  return ['C', dx2, dy2, dx, dy];
}
