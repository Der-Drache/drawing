/**
 * @param {Number} rx
 * @param {Number} ry
 * @param {Number} angle
 * @param {Boolean} largeArcFlag
 * @param {Boolean} sweepFlag
 * @param {Number} x
 * @param {Number} y
 */
export const arc = (rx, ry, angle, largeArcFlag, sweepFlag, x, y) => {
  return [
    'A',
    rx,
    ry,
    angle,
    largeArcFlag ? 1 : 0,
    sweepFlag ? 1 : 0,
    x,
    y,
  ];
}

/**
 * @param {Number} rx
 * @param {Number} ry
 * @param {Number} angle
 * @param {Boolean} largeArcFlag
 * @param {Boolean} sweepFlag
 * @param {Number} dx
 * @param {Number} dy
 */
export const darc = (rx, ry, angle, largeArcFlag, sweepFlag, dx, dy) => {
  return [
    'a',
    rx,
    ry,
    angle,
    largeArcFlag ? 1 : 0,
    sweepFlag ? 1 : 0,
    dx,
    dy,
  ];
}
