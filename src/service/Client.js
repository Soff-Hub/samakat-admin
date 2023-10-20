import BaseService from "./BaseService"


class Client {
    get(url) {
        return BaseService({
            url: url,
            method: 'get'
        })
    }

    post(url, data) {
        return BaseService({
            url: url,
            method: 'post',
            data: data
        })
    }

    patch(url, data) {
        return BaseService({
            url: url,
            method: 'patch',
            data: data
        })
    }

    delete(url) {
        return BaseService({
            url: url,
            method: 'delete'
        })
    }
}


export default new Client