import axios from 'axios'
const baseURL = 'http://localhost:8001/api'
const axiosInstance = axios.create({
    baseURL: baseURL,

})
export default axiosInstance