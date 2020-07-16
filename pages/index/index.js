//index.js
//获取应用实例
const app = getApp()
const server = require("./server.js")

/**
 * 用户选择的景点列表，没有选择时为0
 */
var selectSightsList = [];

/**
 * 用来存储景区所有景点的相关信息,该变量由getParkRoadmap函数进行更新，景点属性如下
 * {
 *   longitude : 经度,
 *   latitude : 纬度，
 *   sightName ： 景点名称，
 *   id : 序号,
 *   open : true | false,
 *   sightLabels : [], // 景点标签
 *   numOfTourists : 景点人数,
 * 
 * }
 */
var sightList = [];

var touristRoutePoints = [];
/** 
 * 园区路线图的经纬度坐标，该变量由getParkRoadmap函数进行更新
 * 列表中的每个值是一个包含了经纬度的对象
 * 例如：
 * {
 *   longitude: 116.412758,
 *   latitude: 39.885660
 * }
 */
var parkRoadmapPoints = [
  
];

/**
 * 由系统规划处的参观路线，该变量由getPlanRoute函数进行更新
 * 列表中的每个值是一个包含了经纬度的对象
 * 例如：
 * {
 *   longitude: 116.412758,
 *   latitude: 39.885660
 * }
 */
var  planRoutePoints= [

];

/** 用于获得园区以及各个景点的状态
 *  可以设置为每10分钟更新一次状态信息。
 */
function getSightsStatus() {
  wx.request({
    url: 'url',
    data : {}, 
    
    /**
     * 从服务器成功获得园区以及各个景点的状态信息
     * 
     * @param {*} res 服务器返回的JSON数据， 结构如下：
     * {
     *   "temperature" : 温度,
     *   "humidity" : 湿度,
     *   "lightIntensity" : 光强,
     *
     *   // 每个景点的状态
     *   "sightStatus" : 
     *     [{
     *         "longitude" : longitude,
     *         "latitude"  : latitude,
     *         "sightName" : 景点名称,
     *         "id" : 序号,
     *         "open" : true | false
     *         "numOfTourists" : 景点当前游客人数，
     *         "sightLabels" : [] // 景点标签
     *     }
     *     ...
     * ]}
     * 
     *  
     */
    success : function (res){
    }
  });
}

/** 
 * 用于获得园区构造路径的点的信息
 */
function getParkRoadmap() {
  wx.request({
    url: 'url',
    data : {}, 
    
    /**
     * 从服务器成功获得园区路线规划图
     * 
     * @param {*} res 服务器返回的JSON数据， 结构如下：
     * {
     *   // 表示构成路径图中的点（包括景点和一些用于构造路径的点）
     *   "pointList" : 
     *     [{
     *         "longitude" : longitude,
     *         "latitude"  : latitude
     *     }
     *     ...
     * ]}
     */
    success : function (res){
    }
  });
}

/**
 * 用于获得系统为用户规划的参观路线图
 */
function getPlanRoute() {
  let data = server.planRoute(selectSightsList);
  planRoutePoints = data;
  
  /* wx.request({
    url: 'url',
    data : {},

    /**
     * 服务器成功返回JSON数据
     * @param {*} res 
     * 获得的JSON数据格式可以与getParkRoadmap从服务器返回的数据类型一致，
     *
    success : function (res){
    }
  });
  */
}

var gloalThis;

function updateTouristRouteTimer(){
  console.log(';;;')
  let polyline = gloalThis.data.polyline;
  let touristRouteLength = polyline[1].points.length;
  console.log(touristRouteLength)
  polyline[1].points[touristRouteLength] = polyline[0].points[touristRouteLength]; 
  gloalThis.setData({
    polyline : polyline
  });
  if (polyline[0].points.length === polyline[1].points.length){
    clearInterval(gloalThis.updateRouteTimeoutId);
  }
}

Page({
  data : {
    polyline : [
      //  规划路线的点
    {
      points : planRoutePoints,
      color : '#FF0000',
      width : 4,
      dottedLine : false
    },
    //  游客行走记录的点
    {
      points : touristRoutePoints,
      color : '#00FF00',
      width : 4,
      dottedLine : false
    },
    {
      points : parkRoadmapPoints,
      color : '#FFFFFF',
      width : 4,
      dottedLine : false
    }],
    markers : [{
      id : 1,
      longitude : 116.398228,
      latitude : 39.915497,
    }],
    temperature : 0,
    humidity : 0,
    lightIntensity : 0,
    mapWidth : 0,
    mapHeight : 0
  },

  onLoad : function (options) {
      let that2 = this;
      if (options.label1){
        selectSightsList = options.label1.split(",")
      }
        
      console.log(selectSightsList);

      wx.getSystemInfo({
        success: function(res) {
          let data = that2.data;
          data.mapWidth  = res.windowWidth;
          data.mapHeight = res.windowHeight;
          that2.setData(data);
        }
      });
 
      wx.getLocation({
          type: 'gcj02',
          success : function (res) {
              that2.setData({
                  longitude : 116.412978,//res.longitude,
                  latitude : 39.879263, // res.latitude,
              });
          }
      });      
      // 将地图位置中心点定位到天坛，删除下面的修改则定位到本地位置
      that2.setData({
        latitude : 39.879263,
        longitude : 116.412978,
      })

      this.mapCtx = wx.createMapContext('map')
      this.mapCtx.moveToLocation({
        latitude : this.data.latitude,
        longitude : this.data.longitude,
      })
      
      // // 主页面载入的时候从服务器获得园区地图,并显示地图
      // getParkRoadmap();
      // let polyline = this.data.polyline;
      // polyline[0].points = parkRoadmapPoints;
      // this.setData(polyline);

      // 获得园区以及景点状态
      getSightsStatus()

      // 更新园区状态（温度等信息）

      // 在地图上标记各个景点（使用marker）

  },

  // 更新路线
  updateRoute : function() {
    gloalThis = this;
    getPlanRoute();
    let data = this.data;
    data.polyline[0].points = planRoutePoints;
    this.setData(data);
    this.updateRouteTimeoutId = setInterval(updateTouristRouteTimer, 2000);
    console.log("update route");
  },
  

  testMap : function() {
  //   let data = this.data;
  //   let markers = [];
  //   let lineSet = new Set();
  //   for (let i = 0; i<server.tiantanMap.length; i++){
  //     let curPoint = server.tiantanMap[i];
  //     for (let j = 0; j < curPoint.nearPoints.length; j++){
  //       let nearPid = curPoint.nearPoints[j];
  //       if (nearPid > curPoint.id){
  //         console.log('lll')
  //         lineSet.add([
  //           {
  //           longitude : curPoint.longitude,
  //           latitude : curPoint.latitude
  //           },
  //           {
  //           longitude : server.tiantanMap[nearPid-1].longitude,
  //           latitude : server.tiantanMap[nearPid-1].latitude
  //           }
  //       ]);
  //       }
  //     }
  //     markers[i] = server.tiantanMap[i].getCoordinate();
  //   }
  //   console.log(lineSet)
  //   let polyline = [];
  //   for (let points of lineSet){
  //     polyline.push({
  //       points : points,
  //       color : '#FFDDDD',
  //       width : 4,
  //       dottedLine : false
  //     })
  //   } 
  //   console.log(markers);
  //   data.markers = markers;
  //   console.log(polyline)
  //   data.polyline = polyline;
  //   // 画线
  //   this.setData(data)
  },

  selectSights : function() {
    wx.navigateTo({
      url: '/pages/select/select_point',
    })
  }

});




