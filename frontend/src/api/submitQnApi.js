import http from '../lib/http'

export default function checkAPApi(data) {
  return http.post('/submit-qn', data)
}
