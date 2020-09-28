import qs from 'qs';

/**
 * @returns {{ x: Number, y: Number, k: Number }}
 */
export const getTransformQuery = () => {
  const queryString = window.location.search.substring(1);
  const { x: dx, y: dy, k: dk } = qs.parse(queryString);
  const x = +dx || 0;
  const y = +dy || 0;
  const k = +dk || 1;

  return { x, y, k };
}
