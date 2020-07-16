/**
 * 用于表示地图中的点，一个景点的地图通过Point来进行构建
 */
class Point {
  constructor(id,  latitude, longitude, nearPoints) {
    // 每个坐标点的唯一标识id
    this.id = id

    this.longitude = longitude;

    this.latitude = latitude;

    // 与该点有连线的所有点是一个[]
    this.nearPoints = nearPoints;
  }

  /**
   * 获得该点的坐标和id
   */
  getCoordinate(){
    return {
      longitude : this.longitude,
      latitude : this.latitude
    };
  }
}

/**
 * 表示园区中的每一个景点
 */
class Sight {
  constructor(point, name, labels, open, numOfTourists){
    // 该景点所对应的Point
    this.point = point;

    // 景点名称
    this.sightName = name;

    // 景点的标签
    this.labels = labels;

    // 景点是否开放
    this.open = open;

    // 景点的游客人数
    this.numOfTourists = numOfTourists;
  }
}

/**
 * 表示园区的状态
 */
class ParkStatus {
  constructor(temperature, humidity, lightIntensity){
    // 温度
    this.temperature = temperature;

    // 湿度
    this.humidity = humidity;

    // 光强
    this.lightIntensity = lightIntensity;
  }
}

/**
 * 表示游客
 */
class Tourist {
  constructor(touristId, currentPosition){
    this.touristId = touristId;
    this.restSights = [];
    this.currentPosition = currentPosition;
  }
}
/**
 * 生成20-80之间的随机整数 
 */
function random(){
  let rand = Math.round(Math.random() * 80 + 20);
  return rand;
}

/**
 * 下一个游客Id
 */
var nextTouristId = 1;

/**
 * 记录当前的所有游客
 */
var touristMap = new Map();

/**
 * 表示天坛地图，有Point对象组成
 */
const tiantanMap = [
  new Point(1, 39.875031,116.413268, [2, 60, 61]),
  new Point(2, 39.875007,116.411970, [1, 3, 5]),
  new Point(3, 39.874924,116.409384, [21, 2]),
  new Point(4, 39.876155,116.413246, [61, 6, 62, 9]), 
  new Point(5, 39.876126,116.411927, [2, 6]),
  new Point(6, 39.876135,116.412195, [4, 5, 10]), 
  new Point(7, 39.876979,116.412764, [63, 8]),
  new Point(8, 39.877349,116.413155, [7, 13, 64]),
  new Point(9, 39.876172,116.414276, [4, 12]),
  new Point(10, 39.876983,116.412136, [6, 11]),
  new Point(11, 39.877720,116.412104, [10, 13, 69]),
  new Point(12, 39.877761,116.414223, [9, 13, 19]),
  new Point(13, 39.877744,116.413150, [8, 11, 12, 14]),
  new Point(14, 39.877963,116.413144, [13, 15, 69]), 
  new Point(15, 39.878045,116.413139, [14, 16, 17, 65]),
  new Point(16, 39.878321,116.412753, [15, 18]), 
  new Point(17, 39.878403,116.413547, [15, 18, 19]), 
  new Point(18, 39.878695,116.413102, [16, 17, 20]),
  new Point(19, 39.878259,116.414266, [12, 17, 20, 27]),
  new Point(20, 39.879082,116.413080, [18, 19, 70]), 
  new Point(21, 39.877921,116.409212, [3, 69, 71]),
  new Point(22, 39.878852,116.409159, [23, 29, 71]), 
  new Point(23, 39.878819,116.408129, [22, 73, 74]), 
  new Point(24, 39.880680,116.408043, [26, 34, 74]),
  new Point(25, 39.878736,116.405725, [26, 73]), 
  new Point(26, 39.880647,116.405640, [24, 25, 75]), 
  new Point(27, 39.878391,116.417742, [19, 28, 60]),
  new Point(28, 39.878753,116.417742, [27, 30, 40]), 
  new Point(29, 39.879807,116.409116, [22, 32, 35, 74]), 
  new Point(30, 39.878687,116.416444, [28, 77]),
  new Point(31, 39.879115,116.412694, [32, 70, 72]), 
  new Point(32, 39.879955,116.412699, [31, 29, 37]), 
  new Point(33, 39.881206,116.407013, [75, 34, 89]),
  new Point(34, 39.881223,116.407979, [33, 24, 35]), 
  new Point(35, 39.881272,116.408987, [29, 34, 36, 88]), 
  new Point(36, 39.881338,116.411476, [35, 37, 87]),
  new Point(37, 39.881388,116.412570, [36, 76, 32]), 
  new Point(38, 39.881420,116.414287, [51, 76, 39]), 
  new Point(39, 39.881470,116.415253, [38, 77, 48]),
  new Point(40, 39.881536,116.417634, [28, 42]), 
  new Point(41, 39.883841,116.419823, [42, 78]), 
  new Point(42, 39.883824,116.417055, [41, 43, 46, 40]),
  new Point(43, 39.884323,116.416889, [42, 44, 80]), 
  new Point(44, 39.884668,116.416605, [43, 45]), 
  new Point(45,  39.884582,116.415306, [44, 79, 53]),
  new Point(46, 39.883779,116.416395, [42, 81, 47]), 
  new Point(47, 39.883742,116.415398, [46, 48]), 
  new Point(48, 39.883306,116.415440, [47, 81, 49, 39]), 
  new Point(49, 39.883709,116.414604, [48, 50]), 
  new Point(50, 39.883392,116.414598, [49, 51]), 
  new Point(51, 39.883322,116.414207, [50, 58, 38]),
  new Point(52, 39.883787,116.414089, [51, 82, 83]), 
  new Point(53, 39.884467,116.413590, [83, 45, 57]), 
  new Point(54, 39.883232,116.408880, [85, 86, 90]),
  new Point(55, 39.885487,116.408772, [90, 91]), 
  new Point(56, 39.884878,116.412764, [91, 57, 90]), 
  new Point(57, 39.884664,116.412764, [56, 86, 53]),
  new Point(58, 39.883174,116.412903, [93, 94, 51]), 
  new Point(59, 39.874562,116.413300, [1]), 
  new Point(60, 39.875221,116.417940, [1, 27]), 
  new Point(61, 39.875245,116.413257, [1, 4]), 
  new Point(62, 39.876509,116.413220, [4, 63]), 
  new Point(63, 39.876637,116.413220, [62, 7, 64]),
  new Point(64, 39.876917,116.413584, [63, 8]),
  new Point(65, 39.878288,116.413139, [15, 66, 67, 68]), 
  new Point(66, 39.878465,116.413134, [65]), 
  new Point(67, 39.878308,116.413354, [65]), 
  new Point(68, 39.878292,116.412892, [65]), 
  new Point(69, 39.877987,116.412093, [11, 14, 21]),
  new Point(70, 39.879189,116.413080, [20, 31, 76]), 
  new Point(71, 39.878300,116.409202, [22, 72, 21]), 
  new Point(72, 39.878341,116.411889, [31, 71]), 
  new Point(73, 39.878753,116.407077, [25, 23]), 
  new Point(74, 39.879790,116.408107, [23, 24, 29]), 
  new Point(75, 39.881174,116.405790, [26, 73]),
  new Point(76, 39.881388,116.412989, [37, 38, 70, 93]), 
  new Point(77, 39.881486,116.416261, [30, 39, 40, 81]), 
  new Point(78, 39.884368,116.419802, [41]),
  new Point(79, 39.884306,116.415349, [45]), 
  new Point(80, 39.884294,116.416905, [43]), 
  new Point(81, 39.883281,116.416326, [46, 48, 77]),
  new Point(82, 39.883796,116.414244, [52, 84]), 
  new Point(83, 39.884084,116.413971, [52, 53]), 
  new Point(84, 39.883824,116.414502, [82]),
  new Point(85, 39.883149,116.406884, [54, 89]), 
  new Point(86, 39.883281,116.411412, [54, 87, 57]), 
  new Point(87, 39.882326,116.411519, [86, 88, 93, 36]), 
  new Point(88, 39.882260,116.408944, [87, 89, 35]), 
  new Point(89, 39.882211,116.406970, [85, 88, 33]), 
  new Point(90, 39.884796,116.408794, [56, 54, 55]),
  new Point(91, 39.885702,116.412721, [55, 56]), 
  new Point(92, 39.884318,116.412828, [94]), 
  new Point(93, 39.882343,116.412957, [27, 58, 76]),
  new Point(94, 39.883561,116.412892, [58, 92]) 
]

/**
 * 表示天坛的所有景点信息，因为景点信息可以随时更新，所以不是const
 */
var tiantanSights = {
  "昭亨门" : new Sight(59, "昭亨门", [], true, random()),
  "泰元门" : new Sight(60, "泰元门", [], true, random()),
  "内坛" : new Sight(61, "内坛", [], true, random()),
  "棂星门" : new Sight(62, "棂星门", [], true, random()),
  "圜丘" : new Sight(63, "圜丘", [], true, random()),
  "燎炉" : new Sight(64, "燎炉", [], true, random()),
  "回音壁" : new Sight(65, "回音壁", [], true, random()),
  "皇穹宇" : new Sight(66, "皇穹宇", [], true, random()),
  "东配殿" : new Sight(67, "东配殿", [], true, random()),
  "西配殿" : new Sight(68, "西配殿", [], true, random()),
  "问天柏" : new Sight(69, "问天柏", [], true, random()),
  "成贞门" : new Sight(70, "成贞门", [], true, random()),
  "三座门" : new Sight(71, "三座门", [], true, random()),
  "御辇" : new Sight(72, "御辇", [], true, random()),
  "斋宫" : new Sight(73, "斋宫", [], true, random()),
  "乾隆铜钟" : new Sight(74, "乾隆铜钟", [], true, random()),
  "西天门" : new Sight(75, "西天门", [], true, random()),
  "具服台" : new Sight(76, "具服台", [], true, random()),
  "导游图" : new Sight(77, "导游图", [], true, random()),
  "外坛" : new Sight(78, "外坛", [], true, random()),
  "古柏林" : new Sight(79, "古柏林", [], true, random()),
  "宰牲亭" : new Sight(80, "宰牲亭", [], true, random()),
  "七星石" : new Sight(81, "七星石", [], true, random()),
  "西南门店" : new Sight(82, "西南门店", [], true, random()),
  "膳饮斋" : new Sight(83, "膳饮斋", [], true, random()),
  "神厨" : new Sight(84, "神厨", [], true, random()),
  "双环万寿亭" : new Sight(85, "双环万寿亭", [], true, random()),
  "祈年殿售票处" : new Sight(86, "祈年殿售票处", [], true, random()),
  "花甲门" : new Sight(87, "花甲门", [], true, random()),
  "月季园" : new Sight(88, "月季园", [], true, random()),
  "百花亭" : new Sight(89, "百花亭", [], true, random()),
  "杏花林" : new Sight(90, "杏花林", [], true, random()),
  "北天门" : new Sight(91, "北天门", [], true, random()),
  "皇乾殿" : new Sight(92, "皇乾殿", [], true, random()),
  "祈年门" : new Sight(93, "祈年门", [], true, random()),
  "祈年殿" : new Sight(94, "祈年殿", [], true, random()),
}

// 默认推荐景点
const recommendSights = ["内坛", "圜丘", "回音壁", "祈年门", "祈年殿", "七星石", "百花亭"];

/**
 * 游客进入小程序时首先连接服务器，进行游客身份注册
 */
function touristRegister(curentPosition) {
  let touristId = nextTouristId;
  let tourist = new Tourist(touristId, currentPosition);
  touristMap.set(touristId, tourist);
  return touristId;
}

/**
 * 用户向服务器请求最新的景点状态信息
 * 服务器更新当前所有景点的状态信息并返回
 */
function curentSightsStatus(){

}

/**
 * 用户向服务器提供喜欢的景点
 * @param {*} touristId 
 * @param {*} FavorSights 字符串列表
 */
function commitFavorSights(touristId, FavorSights){
  if (touristId in touristMap.keys()) {
    touristMap[touristId].restSights = FavorSights;
    return true;
  }
  return false;
}

/**
 * 用户每个n秒更新自身位置信息
 * @param {} touristId 
 * @param {longitude : 1, latitute : 2} curentPosition 
 */
function updatePosition(touristId, curentPosition){
  if (touristId in touristMap.keys()){
    touristMap[touristId].curentPosition = curentPosition;
    return true;
  }
  return false;

  
}

/**
 * 服务器为用户计算最新的规划路径
 * @param touristId 游客Id 
 */
function planRoute(selectSightList){
  let selectIds = [59, 1, 61, 4, 62, 63, 64, 8, 13, 14, 15, 65, 15, 16, 18, 20, 70, 76, 38, 39, 77,
            81, 46, 42, 41, 78];
  let defaultIds = [59, 1, 61, 4, 62, 63, 64, 8, 13, 14, 15, 65, 15, 14, 69, 21, 
            71, 22, 29, 74, 24, 34, 35, 36, 37, 76, 93, 94];
  let route = [];

  let ids = selectSightList.length === 0 ? defaultIds : selectIds;
  for (let id of ids){
    route.push(tiantanMap[id-1].getCoordinate());
  }
  return route;


}

module.exports = {
  tiantanMap : tiantanMap,
  Point : Point,
  planRoute : planRoute
}