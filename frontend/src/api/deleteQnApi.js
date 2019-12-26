import http from '../lib/http'

export default function deleteQnApi(data) {
  return http.post('/delete-qn', data)
}
