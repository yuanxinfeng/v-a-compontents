import Tmap from "./src/main";

// 为组件添加 install 方法，用于按需引入
Tmap.install = function(Vue) {
  Vue.component(Tmap.name, Tmap);
};

export default Tmap;
