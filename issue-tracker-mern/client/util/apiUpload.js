import fetch from 'isomorphic-fetch';
import Config from '../../server/config';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

export default function callApiUpload(endpoint, method = 'get', file) {
  const data = new FormData();
  data.append('file',file);
  console.log('FORM DATA');
  console.log(data);
  return fetch(`${API_URL}/${endpoint}`, {
    method,
    body: data
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}