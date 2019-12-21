import axios from 'axios'

export default axios.create({
  baseURL: 'https://some-domain.com/api/',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
});



