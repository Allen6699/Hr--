// 自定义指令文件
// bind：只调用一次，指令第一次绑定到元素时调用
// inserted：被绑定元素插入父节点时调用
// update：所在组件的 VNode 更新时调用

export const imageerror = {
  inserted(el, binding) {
    // 地址没有加载成功的时候 会报错 会触发图片的一个事件 => onerror
    el.onerror = function() {
      el.src = binding.value; // 指令的绑定值
    };
  }
};
