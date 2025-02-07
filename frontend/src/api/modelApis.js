import axios from 'axios'

let imageModelApi = axios.create({
    baseURL: "http://localhost:7865",
    headers: { Accept: 'application/json' }
})

let llmModelApi = axios.create({
  baseURL: "http://localhost:1234",
  headers: { Accept: 'application/json' }
})

export {imageModelApi, llmModelApi}