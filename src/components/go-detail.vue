<template>
<view @click="handleClick">
    <slot></slot>
</view>
   
</template>

<script>
	export default {
	  props: {
          list: Array,
          index:Number
      },
      mounted(){
        //  console.log(this.list)
        //  console.log(this.index)
      },
      methods:{
          handleClick(){
            // 1数据缓存下拉
            getApp().globalData.imgList=this.list;
            getApp().globalData.imgIndex=this.Index;
            // 2 再实现点击跳转页面
            uni.navigateTo({
                url:"/pages/imgDetail/index"
            })
          }
      }
	};
</script>

<style>
</style>
