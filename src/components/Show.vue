<template>
  <div class="hello">
    <v-a-count-up :startVal="0" :endVal="10000"></v-a-count-up>
    <input type="text" v-model="currentCode">
    <v-a-verify-code :currentCode="currentCode"></v-a-verify-code>
    <v-a-charts :setOption="option1"></v-a-charts>
    <v-a-charts :setOption="option2"></v-a-charts>
    <v-a-charts :setOption="option3"></v-a-charts>
    <button @click="dialog = true">clickMap</button>
    <div v-if="dialog">
      <v-t-map :super_this="super_this" ref="map" :jingd="location.lng" :weid="location.lat" v-on:getlocation="getlocation"></v-t-map>
    </div>
  </div>
</template>

<script>
export default {
  name: "Show",
  props: {
    msg: String
  },
  data() {
    return {
      dialog: false,
      super_this: this,
      option1: option1,
      option2: option2,
      option3: option3,
      currentCode: "",
      location:{
        lat:"",
        lng:""
      }
    };
  },
  methods: {
    getlocation(location) {
      console.log(location);
      this.location = location;
      this.dialog = false;
    }
  }
};
const option1 = {
  title: {
    text: "折线图堆叠"
  },
  tooltip: {
    trigger: "axis"
  },
  legend: {
    data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      name: "邮件营销",
      type: "line",
      stack: "总量",
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: "联盟广告",
      type: "line",
      stack: "总量",
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: "视频广告",
      type: "line",
      stack: "总量",
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: "直接访问",
      type: "line",
      stack: "总量",
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: "搜索引擎",
      type: "line",
      stack: "总量",
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};

var data = [];

for (var i = 0; i <= 360; i++) {
  var t = (i / 180) * Math.PI;
  var r = Math.sin(2 * t) * Math.cos(2 * t);
  data.push([r, i]);
}

const option2 = {
  title: {
    text: "极坐标双数值轴"
  },
  legend: {
    data: ["line"]
  },
  polar: {
    center: ["50%", "54%"]
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross"
    }
  },
  angleAxis: {
    type: "value",
    startAngle: 0
  },
  radiusAxis: {
    min: 0
  },
  series: [
    {
      coordinateSystem: "polar",
      name: "line",
      type: "line",
      showSymbol: false,
      data: data
    }
  ],
  animationDuration: 2000
};

var builderJson = {
  all: 10887,
  charts: {
    map: 3237,
    lines: 2164,
    bar: 7561,
    line: 7778,
    pie: 7355,
    scatter: 2405,
    candlestick: 1842,
    radar: 2090,
    heatmap: 1762,
    treemap: 1593,
    graph: 2060,
    boxplot: 1537,
    parallel: 1908,
    gauge: 2107,
    funnel: 1692,
    sankey: 1568
  },
  components: {
    geo: 2788,
    title: 9575,
    legend: 9400,
    tooltip: 9466,
    grid: 9266,
    markPoint: 3419,
    markLine: 2984,
    timeline: 2739,
    dataZoom: 2744,
    visualMap: 2466,
    toolbox: 3034,
    polar: 1945
  },
  ie: 9743
};

var downloadJson = {
  "echarts.min.js": 17365,
  "echarts.simple.min.js": 4079,
  "echarts.common.min.js": 6929,
  "echarts.js": 14890
};

var themeJson = {
  "dark.js": 1594,
  "infographic.js": 925,
  "shine.js": 1608,
  "roma.js": 721,
  "macarons.js": 2179,
  "vintage.js": 1982
};

var waterMarkText = "ECHARTS";

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = canvas.height = 100;
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.globalAlpha = 0.08;
ctx.font = "20px Microsoft Yahei";
ctx.translate(50, 50);
ctx.rotate(-Math.PI / 4);
ctx.fillText(waterMarkText, 0, 0);

const option3 = {
  backgroundColor: {
    type: "pattern",
    image: canvas,
    repeat: "repeat"
  },
  tooltip: {},
  title: [
    {
      text: "在线构建",
      subtext: "总计 " + builderJson.all,
      x: "25%",
      textAlign: "center"
    },
    {
      text: "各版本下载",
      subtext:
        "总计 " +
        Object.keys(downloadJson).reduce(function(all, key) {
          return all + downloadJson[key];
        }, 0),
      x: "75%",
      textAlign: "center"
    },
    {
      text: "主题下载",
      subtext:
        "总计 " +
        Object.keys(themeJson).reduce(function(all, key) {
          return all + themeJson[key];
        }, 0),
      x: "75%",
      y: "50%",
      textAlign: "center"
    }
  ],
  grid: [
    {
      top: 50,
      width: "50%",
      bottom: "45%",
      left: 10,
      containLabel: true
    },
    {
      top: "55%",
      width: "50%",
      bottom: 0,
      left: 10,
      containLabel: true
    }
  ],
  xAxis: [
    {
      type: "value",
      max: builderJson.all,
      splitLine: {
        show: false
      }
    },
    {
      type: "value",
      max: builderJson.all,
      gridIndex: 1,
      splitLine: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      type: "category",
      data: Object.keys(builderJson.charts),
      axisLabel: {
        interval: 0,
        rotate: 30
      },
      splitLine: {
        show: false
      }
    },
    {
      gridIndex: 1,
      type: "category",
      data: Object.keys(builderJson.components),
      axisLabel: {
        interval: 0,
        rotate: 30
      },
      splitLine: {
        show: false
      }
    }
  ],
  series: [
    {
      type: "bar",
      stack: "chart",
      z: 3,
      label: {
        normal: {
          position: "right",
          show: true
        }
      },
      data: Object.keys(builderJson.charts).map(function(key) {
        return builderJson.charts[key];
      })
    },
    {
      type: "bar",
      stack: "chart",
      silent: true,
      itemStyle: {
        normal: {
          color: "#eee"
        }
      },
      data: Object.keys(builderJson.charts).map(function(key) {
        return builderJson.all - builderJson.charts[key];
      })
    },
    {
      type: "bar",
      stack: "component",
      xAxisIndex: 1,
      yAxisIndex: 1,
      z: 3,
      label: {
        normal: {
          position: "right",
          show: true
        }
      },
      data: Object.keys(builderJson.components).map(function(key) {
        return builderJson.components[key];
      })
    },
    {
      type: "bar",
      stack: "component",
      silent: true,
      xAxisIndex: 1,
      yAxisIndex: 1,
      itemStyle: {
        normal: {
          color: "#eee"
        }
      },
      data: Object.keys(builderJson.components).map(function(key) {
        return builderJson.all - builderJson.components[key];
      })
    },
    {
      type: "pie",
      radius: [0, "30%"],
      center: ["75%", "25%"],
      data: Object.keys(downloadJson).map(function(key) {
        return {
          name: key.replace(".js", ""),
          value: downloadJson[key]
        };
      })
    },
    {
      type: "pie",
      radius: [0, "30%"],
      center: ["75%", "75%"],
      data: Object.keys(themeJson).map(function(key) {
        return {
          name: key.replace(".js", ""),
          value: themeJson[key]
        };
      })
    }
  ]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  font-size: 20px;
  color: aquamarine;
}
</style>
