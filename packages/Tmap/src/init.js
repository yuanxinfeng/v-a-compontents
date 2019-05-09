export default {
  init: function() {
    return new Promise(resolve => {
      // debugger
      // 如果已加载直接返回
      // 如果已加载直接返回
      if (typeof window.T !== "undefined") {
        // console.log("地图脚本初始化成功......");
        resolve(window.T);
        return true;
      }
      window.onload = function() {
        // console.log("地图脚本初始化成功...");
        // eslint-disable-next-line
        resolve(window.T);
      };
      //   const TMapURL =
      //     'http://api.tianditu.gov.cn/api?v=4.0&tk=4de7eb6556c712c45d27ecc4e0ddaf95'
      //   // 插入script脚本
      //   const scriptNode = document.createElement('script')
      //   scriptNode.setAttribute('type', 'text/javascript')
      //   scriptNode.setAttribute('src', TMapURL)
      //   document.body.appendChild(scriptNode)
    });
  }
};
