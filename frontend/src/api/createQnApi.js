import http from '../lib/http'

export default function createQnApi(data) {
  return http.post('/create-qn', data)
}
