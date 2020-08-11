<template>
<view>
    <!-- 用户信息开始 -->
    <view class="user_info">
        <view class="user icon">
            <image :src="imgDetail.user.avatar" mode="widthFix"></image>
        </view>
        <view class="user_desc">
            <view class="user_name">{{imgDetail.user.name}}</view>
            <view class="user_time">{{imgDetail.cnTime}}</view>
        </view>
    </view>
    <!-- 用户信息结束 -->
    <!-- 高清大图开始 -->
    <view class="high_img">
      <swiper-action @swiperAction="handleSwiperAction">
        <image mode="widthFix" :src="imgDetail.newThumb">
        </image>
        </swiper-action>
    </view>
    <!-- 高清大图结束 -->
    <!-- 点赞开始 -->
    <view class="user_rank">
        <view class="rank">
            <text class="iconfont icondianzan">{{imgDetail.rank}}</text>
        </view>
        <view class="user_collect">
            <text class="iconfont iconshoucang">收藏</text>
        </view>
    </view>
    <!-- 点赞结束 -->
    <!-- 下载开始 -->
    <view class="download">
      <view class="download_btn" @click="handleDownload">
        下载图片
      </view>
    </view>
    <!-- 下载结束 -->
</view>
</template>

<script>

import moment from "moment";
import swiperAction from "@/components/swiper-action"
// 设置语言为中文
moment.locale("zh-cn");
	export default {
    components:{
       swiperAction
    },
        data(){
          return{
            //   图片信息对象 包含着用户头像
            imaDetail:{}
          }
        },
	  onLoad(){
          // console.log(getApp().globalData);
        const{imgList,imgIndex}=getApp().globalData;
        this.imgDetail=imgList[imgIndex];
        this.imgDetail.newThumb=this.imgDetail.Thumb+imgDetail.rule.replace('$<Height>,360')
          
        //   xxx年前的数据
        this.imgDetail.cnTime=moment(this.imgDetail.atime*1000).fromNow();
      },
      methods:{
        // 滑动事件
        handleSwiperAction(e){
          // console.log(e);
          if(e.direction==="left"&&this.imgIndex<imgList.length-1){
            // 可以进行左滑 加载下一页
            this,imgIndex++;
          }
        },
        // 点击下载图片 async await promise
        async handleDownload(){
          await uni.showLoading({
            title: "下载中"
          })
          //1 将远程文件下载到小程序的内存中
        const result1 = await uni.downloadFile({url:this.imgDetail.img});
        const {tempFilePath} = result1[1];

        // 2将小程序内存中的临时文件下载到本地上
        const result2 = await uni.saveImageToPhotosAlbum({ filePath: tempFilePath });
        uni.hideLoading();
        await uni.showToast({
          title:"下载成功"
        })
        }
      }
	}
</script>

<style lang="scss" scoped>
.user_info {
    display: flex;
    padding: 20rpx;
  .user.icon {
      padding: 0 20rpx;
    image {
    width: 88rpx;
    border-radius: 50%;
    }
  }

 .user_desc {
  .user_name {
     color: #000;
     font-weight: 600;
    }
    .user_time { 
      color: #ccc;
      font-size: 24rpx;
      padding: 10rpx 0;
    }
  }
}
.user_rank {
    display: flex;
    height: 80rpx;
    border-bottom: 5rpx solid #eee;
  .rank {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    .iconfont{

    }
  }

  .user_collect {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
   .iconfont {

    }
  }
}

// 下载图片
 .download{
   height: 120rpx;
   display: flex;
   align-items: center;
   justify-content: center;
   .download_btn{
     width: 90%;
     height: 50%;
     background-color: $color;
     color: #fff;
     font-size: 50rpx;
     font-weight: 600;
     display: flex;
     justify-content: center;
     align-items: center ;
   }
 }
</style>
