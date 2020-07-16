Page({
  data: {
  checkboxArr1: [{
   name: "昭亨门",
   checked: false
  }, {
   name: "泰元门",
   checked: false
  }, {
   name: "内坛",
   checked: false
  }, {
   name: "棂星门",
   checked: false
  }, {
   name: "圜丘",
   checked: false
  }, {
   name: "燎炉",
   checked: false
  }, {
    name: "回音壁",
    checked: false
  }, {
    name: "皇穹宇",
    checked: false
  }, {
    name: "西配殿",
    checked: false
   }, {
    name: "东配殿",
    checked: false
   }, {
    name: "问天柏",
    checked: false
   }, {
    name: "成贞门",
    checked: false
   }, {
    name: "三座门",
    checked: false
   }, {
    name: "御辇",
    checked: false
   }, {
    name: "斋宫",
    checked: false
   }, {
    name: "乾隆铜钟",
    checked: false
   }, {
    name: "西天门",
    checked: false
   }, {
    name: "具服台",
    checked: false
   }, {
    name: "导游图",
    checked: false
   }, {
    name: "外坛",
    checked: false
   }, {
   name: "宰牲亭",
   checked: false
  }, {
    name: "古柏林",
    checked: false
   }, {
   name: "七星石",
   checked: false
  }, {
    name : "百花亭",
    checked : false
  }, {
    name: "西南门店",
    checked: false
   }, {
   name: "神厨",
   checked: false
  }, {
   name: "花甲门",
   checked: false
  }, {
   name: "月季园",
   checked: false
  }, {
    name: "膳饮斋",
    checked: false
   }, {
   name: "祈年殿售票处",
   checked: false
  }, {
   name: "双环万寿亭",
   checked: false
  }, {
    name: "杏花林",
    checked: false
   }, {
    name: "北天门",
    checked: false
   }, {
    name: "祈年殿",
    checked: false
   }, {
    name: "皇乾殿",
    checked: false
   }, {
    name: "祈年门",
    checked: false
   }],
  checkboxArr2: [{
    name: 'W',
    checked: false
   }, {
    name: 'E',
    checked: false
   }, {
    name: 'Q',
    checked: false
   }, {
    name: 'R',
    checked: false
   }, {
    name: 'F',
    checked: false
   }, {
    name: 'D',
    checked: false
   }],
   },
  checkbox: function (e) {
  var index = e.currentTarget.dataset.index;//获取当前点击的下标
  var checkboxArr1 = this.data.checkboxArr1;//选项集合
  checkboxArr1[index].checked = !checkboxArr1[index].checked;//改变当前选中的checked值
  this.setData({
   checkboxArr1: checkboxArr1
  });
  },
  checkbox1: function (e) {
    var index = e.currentTarget.dataset.index;//获取当前点击的下标
    var checkboxArr2 = this.data.checkboxArr2;//选项集合
    checkboxArr2[index].checked = !checkboxArr2[index].checked;//改变当前选中的checked值
    this.setData({
     checkboxArr2: checkboxArr2
    });
    },
  checkboxChange1: function (e) {
  var checkValue1 = e.detail.value;
  this.setData({
   checkValue1: checkValue1
  });
  },
  checkboxChange2: function (e) {
    var checkValue2 = e.detail.value;
    this.setData({
     checkValue2: checkValue2
    });
    },
  confirm: function() {// 提交
    let that = this;
    wx.navigateTo({
      url: '/pages/index/index?label1=' + String(that.data.checkValue1)
    })
  console.log(this.data.checkValue1)//所有选中的项的value
  console.log(this.data.checkValue2)//所有选中的项的value
  
  },
 })