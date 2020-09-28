/**
 * @param {*} arg
 * @returns {Array}
 */
export const toArray = arg => {
  return Array.isArray(arg)
    ? arg
    : [arg];
}
