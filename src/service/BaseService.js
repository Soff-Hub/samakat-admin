import axios from "axios"
import { appConfig } from "configs/app.config"
import store from "store"
import { logoutSuccess } from "store/slice"



const BaseService = axios.create({
    baseURL: appConfig.apiPrefix,
    timeout: 200000,
})
export const baseURL = appConfig.apiPrefix;

const unAuthorizeCode = [403]


BaseService.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('admin')

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config
    },
    (error) => Promise.reject(error)
)


BaseService.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const { response } = error
        if (response && unAuthorizeCode.includes(response.status)) {
            store.dispatch(logoutSuccess())
        }
        return Promise.reject(error)
    }
)

export default BaseService