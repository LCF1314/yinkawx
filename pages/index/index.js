//index.js
//获取应用实例
const app = getApp()

const colors = [
  "#518ED2", "#4EB9BE", "#C94B6E", "#B3584A"
]
Page({
  data: {
    topList: [],
    loading: false,
    color: '#000',
    background: '#f8f8f8',
    show: true,
    animated: false
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    // wx.request({
    //   url: `${app.globalData.host}/toplist`,
    //   success: (data) => {
    //     this.setData({
    //       topList: data.data.list
    //     });
    //     console.log(this.data.topList)
    //   }
    // })
    wx.request({
      url: `${app.globalData.host}/toplist/detail`,
      success: (data) => {
        console.log(data);
        this.setData({
          topList: data.data.list.filter((item, index) => {
            item.color = colors[index];
            return index <= 3;
          })
        });
        console.log(this.data.topList)
      }
    })



    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
  onTap(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: `../musiclist/musiclist?id=${e.currentTarget.dataset.id}&color=${e.currentTarget.dataset.color}`,
    })
  }
})
