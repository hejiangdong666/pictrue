<template>
    <scroll-view  @scrolltolower="handToLower" class="recommend_view" scroll-y v-if="recommends.length>0">
        <!-- 推荐开始 -->
        <view class="recommend_wrap">
            <navigator class="recommend_item"
            v-for="item in recommends"
            :key="item.id"
            :url="`/pages/album/index?id=${item.target}`" 
            >
            <image mode="widthFix" :src="item.thumb"></image> 
            </navigator>
        </view>
        <!-- 推荐结束 -->
        <!-- 月份开始 -->
        <view class="months_wrap">
            <view class="months_title">
                <view class="months_title_info">
                    <view class="months_info">
                        <text>{{monthes.DD}} / </text>
                         {{monthes.MM}}
                    </view>
                    <view class="months_text">{{monthes.title}}</view>
                </view>
                <view class="months_title_more">更多></view>
            </view>
            <view class="months_content">
                <view class="months_item" 
                v-for="(item,index) in monthes.items" 
                :key="item.id">
                   <go-detail :list="monthes.item" :index="index">
                     <image mode="aspectFill"
                      :src="item.thumb+item.rule.replace('$<Height>',360)">
                      </image>
                   </go-detail>
                </view>
            </view>
        </view>
        <!-- 月份结束 -->
        <!-- 热门开始 -->
        <view class="hots_wrap">
            <view class="hots_title">
                <text> 热门 </text>
            </view>
            <view class="hots_content">
                <view class="hots_item"
                v-for="(item,index) in hots"
                :key="item.id">
                <!-- 跳转图片详情 -->
                <go-detail :list="hots" :index="index">
                <image mode="widthFix" :src="item.thumb"></image>
                 </go-detail>
                </view>
            </view>
        </view>
        <!-- 热门结束 -->

    </scroll-view> 
</template>

<script>
import moment from "moment";
import goDetail from "@/components/go-detail"
export default {
    components:{
       goDetail
    },
    data(){
      return {
        //  推荐列表
        recommends:[],
        // 月份
        monthes:{},
        // 热门
        hots:[],
        // 请求参数
        params:{
              // 要获取几条数据
                limit:30,
              // 关键字
                order:"hot",
              // 要跳过几条
                skip:0
        },
        hasMore:true
     }
    },
    mounted(){
        this.getList();
  },
  //   滚动条触底事件
     methods:{
        // 获取接口的数据
        getList(){
            this.request({
            url:"http://service.picasso.adesk.com/v3/homepage/vertical",
            data: this.params,
         }).then(result=>{
            // console.log(result);
            // 判断还有没有下一页数据
            if(result.res.vertical.length===0){
                this.hasMore=false;
                return;
            }
            if(this.recommends.length === 0){
            // 第一次发送的请求
            // 推荐模块
            this.recommends=result.res.homepage[1].items
            // 月份模块
            this.monthes=result.res.homepage[2]
            // 将时间戳改成 18号/月 
            this.monthes.MM=moment(this.monthes.stime).format("MM");
            this.monthes.DD=moment(this.monthes.stime).format("DD");
            }  
            //获取热门数据列表
            // 数组拼接es6 
            this.hots=[...this.hots,...result.res.vertical];
        })
   },
        // 滚动条触底事件
      handToLower(){
        // 1 修改参数 skip +=limit
        // 2 重新发送请求 getList()
        // 3 请求回来成功 hots 数据的叠加
        if(this.hasMore){
            this.params.skip+=this.params.limit;
            this.getList();
        }else{
            // 弹窗提示用户
            uni.showToast({
                title:"没有数据了",
                icon:"none"
            })
        }
       
       }
  },
};

</script>

<style lang="scss" scoped>

.recommend_view{
    height: calc( 100vh - 36px );
}
.recommend_wrap{
     display: flex;
     flex-wrap: wrap;
    .recommend_item{
      width: 49%;
      border: 3rpx solid #fff;
      image{
          width: 100%;
      }
    }
}
.months_wrap {
  .months_title{
      display: flex;
      justify-content: space-between;
      padding: 20rpx;
    .months_title_info {
        color: $color;
        font-size: 30rpx;
         font-weight: 600;
         display: flex;
      .months_info {
        text {
            font-size: 36rpx;
        }
      }
      .months_text {
         font-size: 34rpx;
         color: #666;
         margin-left: 30rpx;
      }
    }
    .months_title_more {
         font-size: 24rpx;
         color: $color;
    }
  }
  .months_content {
       display:flex;
       flex-wrap: wrap;
       .months_item{
           width: 32%;
           border: 1rpx solid #fff;
           image{
               width: 100%;
           }
       }
  }
}
// 热门
.hots_wrap {
  .hots_title {
      padding: 20rpx;
    text{
      border-left: 20rpx solid $color;
      font-size: 24rpx;
      font-weight: 600;
    }
  }
  .hots_content {
      display: flex;
      flex-wrap: wrap;
    .hots_item {
        width: 32%;
        border :1rpx solid #fff;
      image {
         width: 100%;
      }
    }
  }
}

</style>