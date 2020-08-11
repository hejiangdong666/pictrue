// 封装异步请求

export default (params)=>{
        // 加载中
        uni.showLoading({
            title:"加载中"
        })
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            success(res){
                resolve(res.data); //重点  我忘记加data导致homepage无效
            },
            fail(err){
                reject(err);
            },
            complete(){
              uni.hideLoading();
            }
        })
    })
}