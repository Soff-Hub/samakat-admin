import BaseService from "./BaseService";

class Client {
  get(url) {
    return BaseService({
      url: url,
      method: "get",
    });
  }

  post(url, data) {
    return BaseService({
      url: url,
      method: "post",
      // headers: {
      //     "Content-Type":'multipart/form-data'
      // } ,
      data: data,
    });
  }

  put(url, data) {
    return BaseService({
      url: url,
      method: "put",
      data: data,
    });
  }

  patch(url, data) {
    return BaseService({
      url: url,
      method: "patch",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    });
  }

  delete(url) {
    return BaseService({
      url: url,
      method: "delete",
    });
  }
}

// eslint-disable-next-line
export default new Client();
