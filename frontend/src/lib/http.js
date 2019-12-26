import axios from 'axios'
import store from '../store'

const http = axios.create({
  baseURL: 'http://139.180.145.219:54188/',
});

// https://github.com/axios/axios#interceptors
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  store.commit("SET_LOADING", true)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  store.commit("SET_LOADING", false)
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default http
