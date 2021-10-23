import Cookies from "js-cookie";

const TokenKey = "hrsaas-ihrm-token"; // 设置独一的token

const timeKey = "hrsaas-timestamp-key"; // 设置一个token注入的时间挫key

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timeKey);
}

// 设置时间戳
export function setTimeStamp() {
  Cookies.set(timeKey, Date.now());
}
