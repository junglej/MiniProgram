/* Main page of the app */
Page({
    data: {
        allMotion: [], //所有情绪
        
        screenWidth: 1000,
        screenHeight: 1000,  

        creditA: 0,
        creditB: 0,

        userA: '',
        userB: 'Jungle小北',
 
    
        _openidA : getApp().globalData._openidA,
  
        slideButtons: [
          {extClass: 'buyBtn', text: '编辑', src: "Images/编辑.svg"},
          {extClass: 'starBtn', text: '星标', src: "Images/icon_star.svg"},
          {extClass: 'removeBtn', text: '删除', src: 'Images/icon_del.svg'}
        ],
    },

    async onShow(){
        await wx.cloud.callFunction({name: 'getList', data: {list: getApp().globalData.collectionMotionList}}).then(data => {
            this.setData({allMotion: data.result.data})
            this.getScreenSize()
          })

          this.getCreditA()
          // this.getCreditB()
          this.setData({
              userA: getApp().globalData.userA,
              // userB: getApp().globalData.userB,
          })
    },

    getCreditA(){
        wx.cloud.callFunction({name: 'getElementByOpenId', data: {list: getApp().globalData.collectionUserList, _openid: getApp().globalData._openidA}})
        .then(res => {
          console.log(res)
          this.setData({creditA: res.result.data[0].credit})
        })
    },
    
    getCreditB(){
        wx.cloud.callFunction({name: 'getElementByOpenId', data: {list: getApp().globalData.collectionUserList, _openid: getApp().globalData._openidB}})
        .then(res => {
            this.setData({creditB: res.result.data[0].credit})
        })
    },

    //获取页面大小
    async getScreenSize(){
        wx.getSystemInfo({
            success: (res) => {
            this.setData({
                screenWidth: res.windowWidth,
                screenHeight: res.windowHeight
            })
            }
        })
        },

        //转到添加心情
    async toAddPage() {
        wx.navigateTo({url: '../MotionAdd/index'})
    },
})