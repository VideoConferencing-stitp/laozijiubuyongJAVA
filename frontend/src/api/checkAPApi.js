import http from '../lib/http'

export default function checkAPApi(data) {
  return http.post('/login', data)
}
