import request from "@/utils/request";

// 登录接口
export function login(data) {
  // 返回一个promise对象
  return request({
    url: "/sys/login",
    method: "post",
    data
  });
}

// 获取用户基本信息
export function getUserInfo() {
  return request({
    url: "/sys/profile",
    method: "post"
  });
}

// 获取用户的头像接口
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`,
    method: "get"
  });
}
export function getInfo(token) {
  // return request({
  //   url: '/vue-admin-template/user/info',
  //   method: 'get',
  //   params: { token }
  // })
}

// 登出请求
export function logout() {}
