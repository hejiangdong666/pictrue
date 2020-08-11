<template>
    <scroll-view class="album_scroll_view" scroll-y @scrolltolower="handleToLower">
        <!-- 轮播图开始 -->
        <view class="album_swiper">
            <swiper autoplay indicator-dots circular>
               <swiper-item
               v-for="item in banner" 
               :key="item.id">
                 <image :src="item.thumb"></image>
               </swiper-item>
            </swiper>
        </view>
        <!-- 轮播图结束 -->
        <!-- 列表开始 -->
        <view class="album_list">
            <navigator class="album_item"
            v-for="item in album" :key="item.id"
            url="/pages/album/index?id=123">
               <view class="album_img">
                   <image mode="aspectFill" :src="item.cover"></image>
               </view>
               <view class="album_info">
                   <view class="album_name">{{item.name}}</view>
                   <view class="album_desc">{{item.desc}}</view>
                   <view class="album_btn">
                       <view class="album_attention">关注</view>
                   </view>
               </view>
            </navigator>
        </view>
        <!-- 列表结束 -->
    </scroll-view>
</template>

<script>
export default {
    data(){
        return{
            params:{
                limit:30,
                order:"new",
                skip:0
            },
            // 轮播图数组
            banner:[],
            // 列表数组
            album:[],
            // 是否还有分页数据
            hasMore:true
        }
    },
    mounted(){
        uni.setNavigationBarTitle({title:"专辑"})
        this.getList();
    },
    methods :{
        // 获取接口数据
        getList(){
            this.request({
                url:"https://service.picasso.adesk.com/v1/wallpaper/album",
                data:this.params
            }).then(result=>{
                console.log(result);   
                if(this.banner.length===0){
                  this.banner=result.res.banner;
                }
                if(result.res.album.length===0){
                    this.hasMore=false;
                    return;
                }
                this.album=[...this.album,...result.res.album] 
            })
        },
        // 上啦加载-执行分页
        handleToLower(){
            // console.log("武汉加油")
            if(this.hasMore){
                this.params.skip+=this.params.limit;
                this.getList();
            }else{
                uni.showToast({
                    title:"没有数据了",
                    icon:"none"
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.album_scroll_view{
    height: calc(100vh - 36px);
}
.album_swiper{
    height:  calc( 750rpx / 2.3);
    image{ 
        height: 100%;    
    }
}
.album_list {
    padding: 10rpx; 
  .album_item {
      padding: 10rpx 0;
      display: flex;
      border-bottom: 1rpx solid #ccc;
    .album_img {
        flex: 1;
        padding: 10rpx;
      image {
         width: 200rpx;
         height: 200rpx;
      }
    }
    .album_info {
        overflow: hidden;
        flex: 2;
        padding: 15rpx 10rpx;
      .album_name {
        font-size: 30rpx;
        color: #000;
        padding: 10rpx 0;
      }

      .album_desc {
        padding: 10rpx 0;
        font-size: 24rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .album_btn {
          padding: 10rpx;
          display: flex;
          justify-content: flex-end;
        .album_attention {
          color: $color;
          border:1rpx solid $color;
          padding: 10rpx;
        }
      }
    }
  }
}
</style>