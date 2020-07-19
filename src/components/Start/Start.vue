<template>
  <div class="star star-24">
    <span class="star-item on" v-for="(on,index) in ons" :key="index+5"></span>
    <span class="star-item half" v-for="(half,index) in halfs" :key="index+11"></span>
    <span class="star-item off" v-for="(off,index) in offs" :key="index+22"></span>
  </div>
</template>

<script>
  /*
  rating     5颗心
  on：取整
  off: 剩余的星数
  half:  取余，大于0.5取一个半星，小于则不取
  */
  export default {
  props:{
    rating:Number
  },
    computed:{
    ons(){
      return Math.floor(this.rating)
    },
    halfs(){
      return (this.rating - this.ons)*10>5?1:{}
    },
    offs(){
      return (5-this.rating)*10>5?1:{}
    }
    }

  }
</script>

<style lang="stylus" rel="stylesheet" scoped>
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
</style>
