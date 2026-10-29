import axios from "axios"
import toast from "react-hot-toast"

const api = axios.create(
    {
        baseURL : "http://localhost:3000",
        withCredentials : true
    }
)

//handle errors on api
api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        toast.error(error.response?.data?.message ||"Something went wrong")        
        return Promise.reject(error)
    }
)


export default api