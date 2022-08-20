import axios from 'axios'

export const instanceAxios = axios.create()

instanceAxios.defaults.baseURL = 'http://localhost:5010'

export default instanceAxios
