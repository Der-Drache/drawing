import { PathUtils } from '.';

/*
 * computes cubic bezier coefficients to generate a smooth
 * line through specified points. couples with SVG graphics
 * for interactive processing.
 *
 * For more info see:
 * http://www.particleincell.com/2012/bezier-splines/
 *
 * Lubos Brieda, Particle In Cell Consulting LLC, 2012
 * you may freely use this algorithm in your codes however where feasible
 * please include a link/reference to the source article
 */

/**
 * @typedef {import('.').PathCreator} PathCreator
 */

/**
 * @param {{ x: Number, y: Number }[]} points
 * @param {() => PathCreator} pathCreator
 * @returns {(String | Number)[][]}
 */
export const splineThroughPath = (points, pathCreator) => {
  // grab (x, y) coordinates of the control points
  const x = points.map(p => p.x);
  const y = points.map(p => p.y);

  // computes control points p1 and p2 for x and y direction
  const px = computeControlPoints(x);
  const py = computeControlPoints(y);
  px.p1 = px.p1.map(n => +n.toFixed(2))
  px.p2 = px.p2.map(n => +n.toFixed(2))
  py.p1 = py.p1.map(n => +n.toFixed(2))
  py.p2 = py.p2.map(n => +n.toFixed(2))

  // array containing all the paths
  const paths = [];

  // create the paths
  for (let i = 0; i < py.p1.length; i++) {
    const path = pathCreator()
      .cubicBezier(px.p1[i], py.p1[i], px.p2[i], py.p2[i], x[i + 1], y[i + 1])
      .path;

    paths.push(path)
  }

  // merge all the paths together into a single path
  const mergedPaths = paths.reduce((acc, current) => [...acc, ...current]);

  return mergedPaths;
}

/**
 * @param {Number[]} K
 * @returns {{ p1: Number[], p2: Number[] }}
 */
function computeControlPoints(K) {
  const p1 = [];
  const p2 = [];
  const n = K.length - 1;

  // rhs vector
  const a = [];
  const b = [];
  const c = [];
  const r = [];

  // left most segment
  a[0] = 0;
  b[0] = 2;
  c[0] = 1;
  r[0] = K[0] + 2 * K[1];

  // internal segments
  for (let i = 1; i < n - 1; i++) {
    a[i] = 1;
    b[i] = 4;
    c[i] = 1;
    r[i] = 4 * K[i] + 2 * K[i + 1];
  }

  // right segment
  a[n - 1] = 2;
  b[n - 1] = 7;
  c[n - 1] = 0;
  r[n - 1] = 8 * K[n - 1] + K[n];

  // solves Ax=b with the Thomas algorithm (from Wikipedia
  for (let i = 1; i < n; i++) {
    let m = a[i] / b[i - 1];
    b[i] = b[i] - m * c[i - 1];
    r[i] = r[i] - m * r[i - 1];
  }

  p1[n - 1] = r[n - 1] / b[n - 1];
  for (let i = n - 2; i >= 0; --i) {
    p1[i] = (r[i] - c[i] * p1[i + 1]) / b[i];
  }

  // we have p1, now compute p2
  for (let i = 0; i < n - 1; i++) {
    p2[i] = 2 * K[i + 1] - p1[i + 1];
  }

  p2[n - 1] = 0.5 * (K[n] + p1[n - 1]);

  return { p1, p2 };
}
