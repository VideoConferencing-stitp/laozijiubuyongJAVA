import http from '../lib/http'

export default function getQnApi(params) {
  return http.get('/get-qn', { params })
}