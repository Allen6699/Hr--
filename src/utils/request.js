import axios from "axios";
import store from "@/store";
import router from "@/router";
import { MessageBox, Message } from "element-ui";
import { getToken, getTimeStamp } from "@/utils/auth";

const TimeOut = 3600; // 定义token超时时间 一小时

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 发送请求的环境变量 开发环境 development  生产环境 production
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      // 只有在有token的情况下 才有必要去检查时间戳是否超时
      if (IsCheckTimeOut()) {
        // 如果它为true表示 过期了   token没用了 因为超时了  登出操作
        store.dispatch("user/logout"); // 登出操作
        // 跳转到登录页
        router.push("/login");
        return Promise.reject(new Error("Token信息超时了！请重新登录~"));
      }
      // 如果token存在 注入token
      config.headers["Authorization"] = "Bearer " + store.getters.token;
    }
    return config; // 必须返回配置
  },
  error => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  // 响应成功的提示
  respones => {
    const { success, message, data } = respones.data;
    // 根据success的成功与否 决定提示操作
    if (!success) {
      Message({
        message: message || "Error",
        type: "error",
        duration: 2 * 1000
      });
    } else {
      return data;
    }
  },
  // 响应错误的提示
  error => {
    Message({
      message: error.message,
      type: "error",
      duration: 2 * 1000
    });
    return Promise.reject(error); // 返回执行错误，让执行链跳出成功，进入catch
  }
);

// 判断token 是否超时
function IsCheckTimeOut() {
  var currentTime = Date.now(); // 当前时间戳
  var timeStamp = getTimeStamp(); // 缓存时间戳
  console.log((currentTime - timeStamp) / 1000 > TimeOut);
  return (currentTime - timeStamp) / 1000 > TimeOut;
}

export default service;
