<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:isShow}" @click="smsLogin">短信登录</a>
          <a href="javascript:;" :class="{on:!isShow}" @click="pwdLogin">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="loginHandle">
          <div :class="{on:isShow}" v-if="isShow" >
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="ifEnable" class="get_verification" @click.prevent="getCode"
                      :class="{switchColor:!ifEnable}" ref="bypassed">
                {{time===null?'获取验证码':`已发送(${count})s`}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!isShow}" v-else>
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-if="showPwd">
                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                <div class="switch_button" @click="displayPassword" :class="colorOfCircle">
                  <div class="switch_circle" :class="{switchTransmit:!showPwd}"></div>
                  <span class="switch_text">love</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
    <AlertTip :alertText="alertText" v-if="alertText" @solve="alertText=''"/>
  </div>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip'
import {reqLoginPwd, reqLoginSms, reqSendCode} from '../../api'
import {SETUSERINFO} from '../../store/mutations-type'

  export default {
    data(){
      return {
        isShow:true,
        phone:'',
        code:'',
        name:'',
        pwd:'',
        captcha:'',
        alertText:'',
        count:30,
        time:null,
        showPwd:true,
      }
    },
    methods:{
      smsLogin(){
        this.isShow = true
      },
      pwdLogin(){
        this.isShow = false
      },
      async getCode(){
        //计时开始就不能再点击获取验证码，防止创造新的实例,只能有一个单例对象
        if(this.time!==null){
          return
        }
        //获取验证码
        const {phone} = this
        const result =  await reqSendCode(phone)
        //开始计时30秒，若到三十秒则停止计时
        this.time = setInterval(()=>{
          if(this.count <= 0){
            clearInterval(this.time)
            this.time = null
          }else {
                this.count--
            console.log('-------',this.count)
          }
        },1000)
        //如果发送失败则停止计时，需要重新获取验证码
        if(result.data.code === 1){
          clearInterval(this.time)
          this.time = null
        }

      },
      async loginHandle () {
        let {phone,code,name,pwd,captcha,isShow} = this
        if(isShow){
          if (phone === '') {
            this.alertText = '手机号不能为空'
          } else if (phone.length < 11) {
            phone = ''
            this.alertText = '手机号有误'
          } else if (code === '') {
            this.alertText = '验证码不能为空'
          }else {
            const result = await reqLoginSms({phone,code})
            if(result.data.code === 0){
              //保存到vuex中
              const user = result.data.data
              this.$store.dispatch(SETUSERINFO,{user})
              //跳转到个人中心
              this.$router.replace('/profile')
            }
          }
        }else{
          if (name === '') {
            this.alertText = '用户名不能为空'
          }else if (pwd === '') {
            this.alertText = '密码不能为空'
          }else if (captcha === '') {
            this.alertText = '验证码不能为空'
          }else{
           const result =  await reqLoginPwd({name,pwd,captcha})
            console.log(result)
            if(result.data.code === 0){
              //保存到vuex中
              const user = result.data.data
              this.$store.dispatch(SETUSERINFO,{user})
              //跳转到个人中心
              this.$router.replace('/profile')
            }else {
              const captcha = this.$refs.captcha
              captcha.src = 'http://localhost:4000/captcha?'
            }
          }
        }

      },
      getCaptcha(){
        const captcha = this.$refs.captcha
        captcha.src = 'http://localhost:4000/captcha?'
      },
      displayPassword(){
          this.showPwd = !this.showPwd
      }
    },
    computed:{
      ifEnable(){
        const exg = /^1\d{10}$/
        if(exg.test(this.phone)){
          return false
        }else {
          return true
        }
      },
      colorOfCircle(){
       return this.showPwd?'off':'on'


      }
      }
    ,
    components:{
      AlertTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            display inline-block
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.switchColor
                  color rgba(0,0,0,.7)
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background lightgray
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background orangered
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .7s
                  &.switchTransmit
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999

</style>
