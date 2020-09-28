/**
 * @param {Number} x
 * @param {Number} y
 */
export const move = (x, y) => {
  return ['M', x, y];
}

/**
 * @param {Number} dx
 * @param {Number} dy
 */
export const dmove = (dx, dy) => {
  return ['m', dx, dy];
}
