import { login, getUserInfo, getUserDetailById } from "@/api/user";
import { getToken, setToken, removeToken, setTimeStamp } from "@/utils/auth";
export default {
  namespaced: true,
  state: {
    token: getToken(), // 设置token初始状态   token持久化
    userInfo: {} // 用户基本信息, 为什么定义空对象
  },
  mutations: {
    // 设置token状态
    setToken(state, token) {
      state.token = token;
      // vuex变化 => 缓存数据
      setToken(token);
    },
    // 删除缓存token
    removeToken(state) {
      state.token = null; // 删除vuex中的token
      removeToken(); // 清掉本地缓存
    },

    // 设置用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = { ...userInfo }; // 用 浅拷贝的方式去赋值对象 数据更新
    },

    // 删除用户信息
    removeUserInfo(state) {
      state.userInfo = {};
    }
  },
  actions: {
    // 定义请求login
    async login(context, data) {
      const res = await login(data);
      console.log(res, '11111');
      if (res) {
        // 修改state中的token数据
        context.commit("setToken", res);

        setTimeStamp(); // 将当前的最新时间写入缓存
      }
    },

    // 获取用户的基本信息
    async getUserInfo(context) {
      const res = await getUserInfo();
      // 获取用户头像
      const baseInfo = await getUserDetailById(res.userId);
      const baseResult = { ...res, ...baseInfo }; // 将获取的数据合并
      context.commit("setUserInfo", baseResult);
      return baseResult; // 返回出来 给添加权限使用
    },

    // 登出操作
    logout(context) {
      // 删除token
      context.commit("removeToken");
      // 删除用户资料
      context.commit("removeUserInfo");
    }
  }
};
