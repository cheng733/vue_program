<template>
  <div class="on">
    <section class="msite">
      <!--首页头部-->
      <header class="header">
        <slot name="left"></slot>
      <Header title="昌平区北七家宏福科技园(337省道北)"/>
        <slot name="right"></slot>
      </header>
      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(foods,index) in filterData " :key="index">
              <a href="javascript:" class="link_to_food" v-for="(food,index) in foods" :key="index">
                <div class="food_container">
                  <img :src="'https://fuss10.elemecdn.com/'+food.image_url">
                </div>
                <span>{{food.title}}</span>
              </a>
            </div>

          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </nav>
      <!--首页附近商家-->
      <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-xuanxiang"></i>
          <span class="shop_header_title">附近商家</span>
        </div>
        <shopsCategory/>
      </div>
    </section>
  </div>
</template>

<script>
  import Header from '../../components/Header/Header'
  import 'swiper/css/swiper.min.css'
  import Swiper from 'swiper'
  import shopsCategory from '../../components/shopsCategory/shopsCategory'
  import {reqFoodsCategory} from '../../api'
  import Vue from 'vue'
  export default {
    data(){
      return {
        foods:[]
      }
    },
    components:{
      Header,
      shopsCategory
    },
     async mounted () {
       const response = await reqFoodsCategory()
       const result = response.data
       if(result.code === 0){
         this.foods = result.data
       }
     },
    computed:{
      //每一个页面只能有8个食品，依次来计算需要多少页面
      filterData(){
        //取出食品列表的数据
        const foods = this.foods
        //总数组内包含8个元素的小数组
        const foodArr = []
        //子数组
        let foodArrChildren = []
        let target = 0
        foods.reduce((previousValue, currentValue) => {
         foodArrChildren[target++] = currentValue
       if(foodArrChildren.length === 8){
         foodArr.push(foodArrChildren)
         foodArrChildren = []
         target = 0
          }

        },[])
        //返回过滤好的总数组
        return foodArr
      }
    },
    watch:{
      foods(){
        Vue.nextTick(function () {
          new Swiper('.swiper-container', {
              direction: 'horizontal', // 垂直切换选项
              effect:'cube',
            cubeEffect: {
              slideShadows: false,
              shadow: false,
            },
              loop: true, // 循环模式选项
              pagination: {  // 如果需要分页器
                el: '.swiper-pagination',
              },
              autoplay: true,
            }
          )
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-sousuo
          font-size 25px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          font-size 20px
          color #fff
          display block
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
