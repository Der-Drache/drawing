import qs from 'qs';

/**
 * @param {{ x: Number, y: Number, k: Number }} transform
 */
export const setTransformQuery = transform => {
  const query = qs.stringify(transform);
  window.history.pushState(transform, '', '?' + query);
}
