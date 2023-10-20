import axios from "axios"
import { appConfig } from "configs/app.config"



const BaseService = axios.create({
    baseURL: appConfig.apiPrefix,
    timeout: 10000,
})


BaseService.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
)


BaseService.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
)

export default BaseService