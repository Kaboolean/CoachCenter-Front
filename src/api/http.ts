import axios from 'axios';
import qs from 'qs';

const http = axios.create({
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  baseURL: process.env.API_URL,
});

export default http;
