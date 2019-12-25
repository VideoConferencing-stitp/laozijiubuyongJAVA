import http from '../lib/http'

export default function getQnListApi(params) {
  return http.get('/get-qn-list', { params })
}