import axios from 'axios'

const http = axios.create({
  baseURL: 'http://dummy.restapiexample.com/api/v1/',
  /**
   * 'application/json' Content-Type headers is blocked by CORS by default:
   * https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_request_header#Additional_restrictions
   * Since dummy.restapiexample.com does not allow it explicitly as it should, we use 'text/plain'
   */
  headers: { 'Content-Type': 'text/plain' }
})

export { http }
