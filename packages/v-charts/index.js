import VCharts from "./src/main";

// 为组件添加 install 方法，用于按需引入
VCharts.install = function(Vue) {
  Vue.component(VCharts.name, VCharts);
};

export default VCharts;
