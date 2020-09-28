import qs from 'qs';

export const setTransformQuery = transform => {
  const query = qs.stringify(transform);
  window.history.pushState(transform, '', '?' + query);
}
