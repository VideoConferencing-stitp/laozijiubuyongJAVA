import http from '../lib/http'

export default function loginApi(data) {
  return http.post('/login', data)
}
