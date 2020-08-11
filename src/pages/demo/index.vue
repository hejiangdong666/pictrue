<template>
  <view @touchstart="handleTouchstart"
   @touchend="handleTouchend">触屏</view>
</template>

<script>
export default {
  data() {
    return {
      // 按下的时间
      startTime: 0,
    //   离开的时间
      //   按下的坐标
      startX: 0,
      startY: 0
    };
  },
  methods: {
    handleTouchstart(event) {
      //    console.log("手指按下屏幕")
      //   console.log("按下：" + event.changedTouches[0].clientX);
      //   console.log("按下：" + event.changedTouches[0].clientY);
      this.startTime = Date.now();
      this.startX = event.changedTouches[0].clientX;
      this.startY = event.changedTouches[0].clientY;
    },
    handleTouchend(event) {
      //    console.log("手指离开屏幕")
      //   console.log("松开：" + event.changedTouches[0].clientX);
      //   console.log("松开：" + event.changedTouches[0].clientY);
      const endTime = Date.now();
      const endX = event.changedTouches[0].clientX;
      const  endY = event.changedTouches[0].clientY;
    //   判断按下的时长
    if(endTime-this.startTime>2000){
        return;
    }
    // 滑动的方向
    let direction="";
    // 先判断用户滑动的距离是否合法 合法：判断滑动的方向 注意，距离要加上绝对值
    if(Math.abs(endX-this.startX)>10){
        // 滑动方向
        direction=endX-this.startX>0?"right":"left";
    }else{
        return;
    }
    // 用户做了合法的操作
    console.log(direction)
    }
  }
};
</script>

<style>
view {
  width: 100%;
  height: 500rpx;
  background-color: aqua;
}
</style>
