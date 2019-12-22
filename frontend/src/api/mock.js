import http from '../lib/http'

export default function () {
  return http.get('/login')
}

