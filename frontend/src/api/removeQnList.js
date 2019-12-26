import http from '../lib/http'

export default function removeQnList(data) {
  return http.post('delete-qn', data)
}