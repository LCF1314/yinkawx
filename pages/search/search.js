const app = getApp()

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    color: '#000',
    background: '#f8f8f8',
    show: true,
    animated: false,
    hotList: [],
    searchDataList: [],
    isStartSearch: false,
    searchWord: '',
    songCount: 0,
    index: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: `${app.globalData.url.searchHot}`,
      success: (data) => {
        this.setData({
          hotList: data.data.data
        });
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
  onShareAppMessage: function () {

  },
  onSearchTap(e) {
    console.log(e);
    let {id} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../play/play?id=${id}&color=${"#518ED2" || this.data.background}`,
    })
  },
  onTap(e) {
    this.setData({
      searchWord: e.currentTarget.dataset.name,
      isStartSearch: true
    });
    this.requestSearchData();
  },
  searchFn(val) {
    console.log(val);
    console.log(111);
    this.requestSearchData();
  },
  inputChange(e) {
    if(!e.detail.value) {
      this.clearFn();
      return false;
    }
    this.setData({
      searchWord: e.detail.value,
      isStartSearch: true
    });
    this.requestSearchData();
    // wx.request({
    //   url: `${app.globalData.host}/search/suggest?keywords=${this.data.searchWord}&type="mobile"`,
    //   success: (data) => {
    //     console.log(data.data);
    //   }
    // })
  },
  clearFn(e) {
    this.setData({
      searchWord: '',
      searchDataList: [],
      songCount: 0,
      isStartSearch: false
    });
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  requestSearchData(offset) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${app.globalData.url.search}?keywords=${this.data.searchWord}&offset=${offset || this.data.index}`,
      success: (data) => {
        wx.hideLoading()
        let  searchDataList = this.data.searchDataList;
        this.setData({
          searchDataList: searchDataList.concat(data.data.result.songs),
          songCount:  data.data.result.songCount
        });
        console.log(this.data.searchDataList);
      }
    })
  },
  onReachBottom() {
    console.log(1);
    if(!this.data.isStartSearch) return;
    this.setData({
      index: ++this.data.index
    });
    console.log(this.data.index)
    this.requestSearchData(this.data.index)
  }
})