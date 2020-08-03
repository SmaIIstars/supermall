import axios from "axios";

export function request(config) {
  // 1.创建实例
  const instance = axios.create({
    // 注意大写
    baseURL: "http://152.136.185.210:8000/api/z8",
    timeout: 5000
  });

  // 2.axios拦截器
  // instance.interceptors.request.use(
  //   config => {
  //     return config;
  //   },
  //   err => {
  //     //
  //   }
  // );

  // // 响应拦截
  // instance.interceptors.response.use(
  //   res => {
  //     return res.data;
  //   },
  //   err => {
  //     console.log(err);
  //   }
  // );

  // 3.发送真正的网络请求
  return instance(config);
}
