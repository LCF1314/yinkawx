// pages/play/play.js
const app = getApp()
let _animationIntervalId = 0;
let backgroundAudioManager = null;
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
    song: null,
    isPlaying: true,
    musicUrl: '',
    lyric: {
      "0": "正在获取歌词"
    },
    currentLrc: '',
    currentTime: '',
    rotateNum: 0,
    animation: null,
    animation2: null,
    animationData: {},
    animationData2: {},
    startHeight: 0,
    endHeight: 0,
    moveHeight: 0,
    isPlayVoice: false,
    activeName: '1',
    smallClass: false,
    isAnimationDown: null,
    isAnimationDowns: null,
    jHeight: '',
    isShowshare: false,
    painting: {},
    cardImg: '',
    isShowFeed: false,
    feedVal:'',
    isInformationPage: false,
    active: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!backgroundAudioManager) {
      backgroundAudioManager = wx.getBackgroundAudioManager();
    }
    let { id , color} = options;
    this.setData({
      background: color
    })
    wx.request({
      url: `${app.globalData.url.songs}?ids=${id} `, //${options.id}
      success: (data) => {
        this.setData({
          song: data.data.songs[0]
        })
        console.log(this.data.song);
        backgroundAudioManager.title =  this.data.song.name
        backgroundAudioManager.epname = this.data.song.name
        backgroundAudioManager.singer = this.data.song.ar[0].name
        backgroundAudioManager.coverImgUrl = this.data.song.al.picUrl
      }
    });
    wx.request({
      url: `${app.globalData.url.songUrl}?id=${id} `, //${options.id}
      success: (data) => {
        console.log(data.data.data);
        this.setData({
          musicUrl: data.data.data[0].url
        })
        backgroundAudioManager.src = this.data.musicUrl;
      }
    });
    wx.request({
      url: `${app.globalData.url.lyric}?id=${id} `, //${options.id}
      success: (data) => {
        let { lyric } = data.data.lrc;
        let obj = {}
        let lrc = /\[(.*?)](.*)/g;
        lyric.replace(lrc, ($0, $1, $2) => {
          obj[$1.substring(0,5)]= $2;
        })
        this.setData({
          lyric: obj
        })
        this.onPlaying();
        this.onPlaying();
        backgroundAudioManager.onPlay(res => {
          console.log('开始播放')
        })
        wx.onBackgroundAudioPlay((res) => {
          console.log('开始播放')
          
        })
        backgroundAudioManager.onTimeUpdate(res => {
          let {currentTime:c} = backgroundAudioManager;
          this.setData({
            currentTime: c
          })
          let min = Math.floor(c/60);
          let sec = Math.floor(c%60);
          var attr = (min < 10 ? "0"+ min : "" + min) + ":" + (sec < 10 ? "0"+ sec : "" + sec);
          if(attr in this.data.lyric && attr !== this.data.currentLrc) {
            this.setData({
              currentLrc: "el-" + attr
            })
          }
        });
        backgroundAudioManager.onStop(res => {
          console.log('结束播放')
          this.setData({
            isPlaying: false
          })
        })
      }
    });
    this.startAnimationInterval();
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
  onPlaying(e) {
    // const query = wx.createSelectorQuery();
    // query.select('#disc').boundingClientRect();
    // query.exec((res) => {
    //   console.log(res);
    // })

    let isPlay = this.data.isPlaying;
    this.setData({
      isPlaying: isPlay ? false : true
    })
    if(!this.data.isPlaying) {
      backgroundAudioManager.pause()
      this.stopAnimationInterval();
    }else{
      backgroundAudioManager.play();
      this.startAnimationInterval();
    }
  },
  starAnimation() {
    this.setData({
      animation: wx.createAnimation({
        duration: 1000,
        timingFunction: "linear",
        delay: 0,
        transformOrigin: '50% 50% 0',
        success: function(res) {
          console.log(res)
        }
      }),
      rotateNum: this.data.rotateNum + 180 / 18
    })
    this.data.animation.rotate(this.data.rotateNum).step()
    this.setData({
      animationData: this.data.animation.export()
    });
  },
  startAnimationInterval: function () {
    this.starAnimation()
    _animationIntervalId = setInterval(() => {
      this.starAnimation()
    }, 1000)
  },
  stopAnimationInterval: function () {
    // this.data.animation.success(e) {
    //   console.log(e); 
    // }
    console.log(_animationIntervalId);
    if (_animationIntervalId> 0) {
      clearInterval(_animationIntervalId);
      _animationIntervalId = 0;
    }
  },
})