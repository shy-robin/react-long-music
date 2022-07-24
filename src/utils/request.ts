import axios from "axios";

const baseUrl = 'https://netease-cloud-music-api-pi-nine.vercel.app/'

const ajax = axios.create({
  baseURL: baseUrl,
  timeout: 10000
})

export default ajax
