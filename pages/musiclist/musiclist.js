// pages/musiclist/musiclist.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    color: '#fff',
    background: '#518ED2',
    show: true,
    animated: false,
    detailData: null,
    toFix: app.toFix
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      background: options.color
    })
    wx.request({
      url: `${app.globalData.host}/playlist/detail?id=${options.id || 19723756} `, //${options.id}
      success: (data) => {
        console.log(data);
        this.setData({
          detailData: data.data.playlist
        })
        console.log(this.data.detailData)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return {
      title: this.data.detailData.name,
      path: "/pages/musiclist/musiclist",
      imageUrl: this.data.detailData.coverImgUrl
    }
  },
  onTap(e) {
    console.log(e);
    wx.request({
      url: `${app.globalData.host}/song/url?id=${e.currentTarget.dataset.id} `, //${options.id}
      success: (data) => {
        console.log(data);
      }
    })
    wx.request({
      url: `${app.globalData.host}/lyric?id=${e.currentTarget.dataset.id} `, //${options.id}
      success: (data) => {
        console.log(data.data.lrc.lyric);
      }
    })
  },
  onShare() {
    console.log(1)
    wx.updateShareMenu({
      withShareTicket: true,
      success () { }
    })
  }
})