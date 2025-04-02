import axios from "axios";


const axiosInstance = axios.create({
    baseURL:'http://skunkworks.ignitesol.com:8000/'
})

export default axiosInstance
