import VCountUp from "./src/main";

// 为组件添加 install 方法，用于按需引入
VCountUp.install = function(Vue) {
  Vue.component(VCountUp.name, VCountUp);
};

export default VCountUp;
