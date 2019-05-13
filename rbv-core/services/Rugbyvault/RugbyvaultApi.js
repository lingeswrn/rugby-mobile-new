import axios from 'axios';
import qs from 'qs';
import { API_HOST, API_PORT, API_PROTOCOL } from 'react-native-dotenv';
import { AuthService } from 'src/lib/services/firebase/AuthService';

export class _RugbyvaultApi {
  constructor() {
    let port = API_PORT;
    if (port === 'false' || port === '"false"') port = false;
    this.hostname = `${API_PROTOCOL}://${API_HOST}${port
      ? ':' + port
      : ''
    }`;
    this.apiConfig = {
      baseURL: `${this.hostname}/api/v2/`,
      timeout: 30000,
      paramsSerializer: function serialize(params) {
        return qs.stringify(params, { encode: false });
      },
    };
  }

  getNoAuthRequest() {
    return Promise.resolve(axios.create({
      ...this.apiConfig
    }));
  }

  getRequest() {
    return AuthService.getToken()
    .then((token) => {
      if (!token) {
        console.log('No token found; user data has been reset');
        return Promise.reject({
          code: 'no_auth_token',
          message: 'Your session has expired; please log in again'
        });
      }
      return axios.create({
        ...this.apiConfig,
        headers: {
          Authorization: token
        }
      });
    })
    .catch((err) => console.warn(`request error: ${err}`));
  }

  getStripeRequest() {
    return AuthService.getToken()
    .then((token) => {
      if (!token) return Promise.reject();
      return axios.create({
        ...this.apiConfig,
        baseURL: `${this.hostname}/stripe`,
        headers: {
          Authorization: token
        }
      });
    })
    .catch((err) => console.warn(`stripe request error: ${err}`));
  }

  getItem(list, item = '', params = {}) {
    return this.getV1Request()
    .then((v1Request) => v1Request.get(`/${list}/${item}`, params))
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
  }

  search(list, params) {
    return this.getRequest()
    .then((request) => request.get(`/${list}/search`, { params }))
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
  }

  create(list, data, params = {}) {
    return this.getRequest()
    .then((request) => request.post(`/${list}/create`, data, params))
    .then((resp) => {
      return Promise.resolve(resp);
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
  }

  update(list, id, data, params = {}) {
    return this.getRequest()
    .then((request) => request.put(`/${list}/${id}`, data, params))
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
  }

  getStaticData() {
    return this.getRequest()
    .then((request) => request.get('/static'))
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
  }
}

export const RugbyvaultApi = new _RugbyvaultApi();
