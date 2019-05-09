<template>
  <div>
    <div class="search">
      <input type="text" name v-model="search">
      <input type="button" @click="localsearch.search(search)" name="搜索">
      <!-- 统计面板 -->
      <div id="statisticsDiv" class="statistics"></div>
      <!-- 建议词面板 -->
      <div id="suggestsDiv" class="suggests"></div>
      <!-- 公交提示面板 -->
      <div id="lineDataDiv" class="lineData"></div>
      <!-- 搜索结果面板 -->
      <div id="resultDiv" class="result">
        <div id="searchDiv"></div>
        <div id="pageDiv">
          <input type="button" value="第一页" onClick="localsearch.firstPage()">
          <input type="button" value="上一页" onClick="localsearch.previousPage()">
          <input type="button" value="下一页" onClick="localsearch.nextPage()">
          <input type="button" value="最后一页" onClick="localsearch.lastPage()">
          <br>转到第
          <input type="text" value="1" id="pageId" size="3">页
          <input
            type="button"
            onClick="localsearch.gotoPage(parseInt(document.getElementById('pageId').value));"
            value="转到"
          >
        </div>
      </div>
    </div>
    <div id="mapDiv" class="mapDiv" ref="mapDiv"></div>
  </div>
</template>
 
<script>
import TMap from "./init";

export default {
  props: {
    super_this: {
      type: Object,
      required: true
    },
    level: {
      //用户行政区划等级（用于缩放级别）
      type: String / Number,
      required: false
    },
    dwwd: {
      //登录用户纬度
      type: String / Number,
      required: false
    },
    dwjd: {
      //登录用户经度
      type: String / Number,
      required: false
    },
    weid: {
      //回显纬度
      type: String / Number,
      required: false
    },
    jingd: {
      //回显经度
      type: String / Number,
      required: false
    }
  },
  name: "VTMap",
  data() {
    return {
      dialog: false,
      zoom: "12",
      T: "",
      map: "",
      search: "山东",
      localsearch: null
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      setTimeout(this.getPosition(), 1000);
    });
  },
  watch: {
    $route: "getPosition"
  },
  methods: {
    getPosition() {
      TMap.init()
        .then(T => {
          this.T = window.T;
          this.zoom = 12;
          let url =
            "http://www.sdmap.gov.cn/tileservice/SDRasterPubMapDJ?" +
            "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=sdcia&STYLE=default&TILEMATRIXSET=sdcia" +
            "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fpng&tk=fd6f828f8dd89245d136cfeb9e4e8501";
          let imageURL =
            "http://www.sdmap.gov.cn/tileservice/SdRasterPubMap?" +
            "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=sdimg&STYLE=default&TILEMATRIXSET=img2014" +
            "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%2Fpng&tk=fd6f828f8dd89245d136cfeb9e4e8501";
          //创建自定义图层对象
          let lay = new T.TileLayer(imageURL, { minZoom: 1, maxZoom: 18 });
          let lay2 = new T.TileLayer(url, { minZoom: 2, maxZoom: 18 });
          let config = { layers: [lay, lay2], projection: "EPSG:4326" };
          this.map = new T.Map(this.super_this.$refs.map.$refs.mapDiv, config); // 初始化地图对象
          // 设置显示地图的中心点和级别
          if (this.jingd != "" && this.jingd !== undefined) {
            this.map.centerAndZoom(
              new T.LngLat(this.jingd, this.weid),
              this.zoom
            );
            let marker = new T.Marker(new T.LngLat(this.jingd, this.weid)); //创建标注对象
            this.map.addOverLay(marker); //向地图上添加标注
          } else {
            if (this.dwjd != "" && this.dwjd !== undefined) {
              console.log(3);
              this.map.centerAndZoom(
                new T.LngLat(this.dwjd, this.dwwd),
                this.zoom
              );
            } else {
              console.log(4);
              this.map.centerAndZoom(new T.LngLat(117.02, 36.66), this.zoom);
            }
          }
          //允许鼠标滚轮缩放地图
          this.map.enableScrollWheelZoom();
          //创建比例尺控件对象
          let scale = new T.Control.Scale();
          //添加比例尺控件
          this.map.addControl(scale);
          this.map.addEventListener("click", this.MapClick);
          let SearchConfig = {
            pageCapacity: 10, //每页显示的数量
            onSearchComplete: this.localSearchResult //接收数据的回调函数
          };
          //创建搜索对象
          this.localsearch = new T.LocalSearch(this.map, SearchConfig);
        })
        .catch(error => {
          console.log(error);
        });
    },
    initLonlat() {
      let marker = new T.Marker(new T.LngLat(this.jingd, this.weid)); //创建标注对象
      this.map.addOverLay(marker); //向地图上添加标注
    },
    localSearchResult(result) {
      //清空地图及搜索列表
      this.clearAll();
      //根据返回类型解析搜索结果
      console.log(parseInt(result.getResultType()));
      switch (parseInt(result.getResultType())) {
        // case 1:
        //   //解析点数据结果
        //   this.pois(result.getPois());
        //   break;
        // case 2:
        //   //解析推荐城市
        //   this.statistics(result.getStatistics());
        //   break;
        case 3:
          //解析行政区划边界
          this.area(result.getArea());
          break;
        // case 4:
        //   //解析建议词信息
        //   this.suggests(result.getSuggests());
        //   break;
        // case 5:
        //   //解析公交信息
        //   this.lineData(result.getLineData());
        //   break;
      }
    },
    //解析点数据结果
    pois(obj) {
      if (obj) {
        //显示搜索列表
        let divMarker = document.createElement("div");
        //坐标数组，设置最佳比例尺时会用到
        let zoomArr = [];
        for (let i = 0; i < obj.length; i++) {
          //闭包
          (function(i) {
            //名称
            let name = obj[i].name;
            //地址
            let address = obj[i].address;
            //坐标
            let lnglatArr = obj[i].lonlat.split(" ");
            let lnglat = new T.LngLat(lnglatArr[0], lnglatArr[1]);

            let winHtml =
              "名称:" +
              name +
              "<br/>地址:" +
              address +
              '<br/><br/><button style="display:block;margin:0 auto" class="btn btn-primary" onclick="locationXY(' +
              lnglatArr[0] +
              "," +
              lnglatArr[1] +
              ')">定位</button></div>';

            //创建标注对象
            let marker = new T.Marker(lnglat);
            //地图上添加标注点
            this.map.addOverLay(marker);
            //注册标注点的点击事件
            let markerInfoWin = new T.InfoWindow(winHtml, { autoPan: true });
            marker.addEventListener("click", function() {
              marker.openInfoWindow(markerInfoWin);
            });

            zoomArr.push(lnglat);

            //在页面上显示搜索的列表
            let a = document.createElement("a");
            a.href = "javascript://";
            a.innerHTML = name;
            a.onclick = function() {
              showPosition(marker, winHtml);
            };
            divMarker.appendChild(document.createTextNode(i + 1 + "."));
            divMarker.appendChild(a);
            divMarker.appendChild(document.createElement("br"));
          })(i);
        }
        //显示地图的最佳级别
        this.map.setViewport(zoomArr);
        //显示搜索结果
        divMarker.appendChild(
          document.createTextNode(
            "共" +
              localsearch.getCountNumber() +
              "条记录，分" +
              localsearch.getCountPage() +
              "页,当前第" +
              localsearch.getPageIndex() +
              "页"
          )
        );
        document.getElementById("searchDiv").appendChild(divMarker);
        document.getElementById("resultDiv").style.display = "block";
      }
    },

    //显示信息框
    showPosition(marker, winHtml) {
      let markerInfoWin = new T.InfoWindow(winHtml, { autoPan: true });
      marker.openInfoWindow(markerInfoWin);
    },

    //解析推荐城市
    statistics(obj) {
      if (obj) {
        //坐标数组，设置最佳比例尺时会用到
        let pointsArr = [];
        let priorityCitysHtml = "";
        let allAdminsHtml = "";
        let priorityCitys = obj.priorityCitys;
        if (priorityCitys) {
          //推荐城市显示
          priorityCitysHtml += "在中国以下城市有结果<ul>";
          for (let i = 0; i < priorityCitys.length; i++) {
            priorityCitysHtml +=
              "<li>" +
              priorityCitys[i].name +
              "(" +
              priorityCitys[i].count +
              ")</li>";
          }
          priorityCitysHtml += "</ul>";
        }

        let allAdmins = obj.allAdmins;
        if (allAdmins) {
          allAdminsHtml += "更多城市<ul>";
          for (let i = 0; i < allAdmins.length; i++) {
            allAdminsHtml +=
              "<li>" + allAdmins[i].name + "(" + allAdmins[i].count + ")";
            let childAdmins = allAdmins[i].childAdmins;
            if (childAdmins) {
              for (let m = 0; m < childAdmins.length; m++) {
                allAdminsHtml +=
                  "<li>" +
                  childAdmins[m].name +
                  "(" +
                  childAdmins[m].count +
                  ")</li>";
              }
            }
            allAdminsHtml += "</li>";
          }
          allAdminsHtml += "</ul>";
        }
        document.getElementById("statisticsDiv").style.display = "block";
        document.getElementById("statisticsDiv").innerHTML =
          priorityCitysHtml + allAdminsHtml;
      }
    },

    //解析行政区划边界
    area(obj) {
      if (obj) {
        if (obj.points) {
          //坐标数组，设置最佳比例尺时会用到
          let pointsArr = [];
          let points = obj.points;
          for (let i = 0; i < points.length; i++) {
            let regionLngLats = [];
            let regionArr = points[i].region.split(",");
            for (let m = 0; m < regionArr.length; m++) {
              let lnglatArr = regionArr[m].split(" ");
              let lnglat = new T.LngLat(lnglatArr[0], lnglatArr[1]);
              regionLngLats.push(lnglat);
              pointsArr.push(lnglat);
            }
            //创建线对象
            let line = new T.Polyline(regionLngLats, {
              color: "blue",
              weight: 3,
              opacity: 1,
              lineStyle: "dashed"
            });
            //向地图上添加线
            this.map.addOverLay(line);
          }
          //显示最佳比例尺
          this.map.setViewport(pointsArr);
        }
        if (obj.lonlat) {
          let regionArr = obj.lonlat.split(",");
          this.map.panTo(new T.LngLat(regionArr[0], regionArr[1]));
        }
      }
    },

    //解析建议词信息
    suggests(obj) {
      if (obj) {
        //建议词提示，如果搜索类型为公交规划建议词或公交站搜索时，返回结果为公交信息的建议词。
        let suggestsHtml = "建议词提示<ul>";
        for (let i = 0; i < obj.length; i++) {
          suggestsHtml +=
            "<li>" +
            obj[i].name +
            "&nbsp;&nbsp;<font style='color:#666666'>" +
            obj[i].address +
            "</font></li>";
        }
        suggestsHtml += "</ul>";
        document.getElementById("suggestsDiv").style.display = "block";
        document.getElementById("suggestsDiv").innerHTML = suggestsHtml;
      }
    },

    //解析公交信息
    lineData(obj) {
      if (obj) {
        //公交提示
        let lineDataHtml = "公交提示<ul>";
        for (let i = 0; i < obj.length; i++) {
          lineDataHtml +=
            "<li>" +
            obj[i].name +
            "&nbsp;&nbsp;<font style='color:#666666'>共" +
            obj[i].stationNum +
            "站</font></li>";
        }
        lineDataHtml += "</ul>";
        document.getElementById("lineDataDiv").style.display = "block";
        document.getElementById("lineDataDiv").innerHTML = lineDataHtml;
      }
    },
    //清空地图及搜索列表
    clearAll() {
      this.map.clearOverLays();
    },
    MapClick(e) {
      let marker = new T.Marker(
        new T.LngLat(e.lnglat.getLng(), e.lnglat.getLat())
      ); //创建标注对象
      this.map.addOverLay(marker); //向地图上添加标注
      let location = { lng: e.lnglat.getLng(), lat: e.lnglat.getLat() };
      this.$emit("getlocation", location);
      /* parent.setLonlat(e.lnglat.getLng(),e.lnglat.getLat()); */
      /*  选中点的经纬度传入session中 */
    },
    locationXY(x, y) {
      let location = { lng: x, lat: y };
      this.$emit("getlocation", location);
    }
  }
};
</script>
 
<style lang="scss" scoped>
.search {
  position: absolute;
  z-index: 999;
  margin-top: 15px;
  margin-left: 30px;
}
.tdt-control-copyright {
  opacity: 0 !important;
}

.search {
  font-size: 13px;
  border: 1px solid #999999;
}
.ls {
  line-height: 27px;
  padding-left: 7px;
}

.prompt {
  display: none;
  font-size: 13px;
  border: 1px solid #999999;
  background: white;
  margin-top: 11px;
}

.statistics {
  display: none;
  font-size: 5px;
  border: 1px solid #999999;
  overflow-y: scroll;
  height: 150px;
  background: white;
  margin-top: 12px;
}

.suggests {
  display: none;
  font-size: 13px;
  border: 1px solid #999999;
}

.lineData {
  display: none;
  font-size: 13px;
  border: 1px solid #999999;
}

.result {
  display: none;
  font-size: 12px;
  border: 1px solid #999999;
  line-height: 27px;
  padding-left: 7px;
  background: white;
  margin-top: 12px;
}
.mapDiv {
  width: 100%;
  height: 85vh;
}
</style>
