/**
 * @param {Number[]} path
 * @returns {{ x: Number, y: Number }[]}
 */
export const unflattenPath = path => {
  const newPath = [];

  for (let i = 0; i < path.length - 1; i += 2) {
    newPath.push({
      x: path[i],
      y: path[i + 1],
    });
  }

  return newPath;
}
