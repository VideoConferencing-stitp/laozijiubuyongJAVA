import http from '../lib/http'

export default function getQnDataApi(params) {
  return http.get('/get-qn-data', { params })
}