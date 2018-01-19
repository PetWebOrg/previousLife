<template>
  <div class="hello container">
    <!--<h2>{{ msg }}</h2>-->
    <img src="../assets/image/home_top.png" alt="" class="top">
    <img src="../assets/image/home_center.png" alt="" class="center">
    <!--<img @click="goQus" src="../assets/image/home_bottom.png" alt="" class="bottom" >-->
    <!--<img @click="goUploadImg" src="../assets/image/home_bottom.png" alt="" class="bottom" style="display:none" onclick="goUploadImg">-->
    <router-link to="/question/testA"><img  src="../assets/image/home_bottom.png" alt="" class="bottom" ></router-link>
    <router-link to="/uploadImg/testB"><img  src="../assets/image/home_bottom.png" alt="" class="bottom" style="display: none;"></router-link>
    <img src="../assets/image/home_hand.png" alt="" class="hand">
  </div>

</template>
<script>
  import { mapState,mapActions } from 'vuex';//使用 mapState 辅助函数帮助我们生成计算属性
  import $ from 'jquery';
  import '../lib/css/cropper.css';
  import piaWx from '../lib/js/pia-wx.js'

//  piaWx.initWeixin(null,null,true);//开启调试
  piaWx.initWeixin();
  piaWx.updataShare();
export default {
  name: 'home',
  data () {
    return {
      msg: '首屏!666',
      isShow: true
    }
  },
  methods: {
    ...mapActions([
        'initQues','checkBrowser'
    ]),
    goQus: function () {
      this.$router.push({ name: 'question', params: { test: 'testA' } })
      if(typeof MtaH5 != 'undefined') MtaH5.clickStat("event1")
      if(typeof ga != 'undefined') ga('send', 'event','首屏按钮TestA','click',null);
    },
    goUploadImg: function () {
      this.$router.push({ name: 'uploadImg', params: { test: 'testB' } })
      if(typeof MtaH5 != 'undefined') MtaH5.clickStat("event2")
      if(typeof ga != 'undefined') ga('send', 'event','首屏按钮TestB','click',null);
    }
  },
  computed: {
    ...mapState([
      'userview', 'result', 'level','Question','RESULTIMG'
    ])
  },
  created() {
//      初始化数据。
    this.initQues();
    this.checkBrowser();
//    谷歌统计
    if(typeof ga != 'undefined'){
      ga('set', 'page', '/home');
      ga('send', 'pageview');
    }
//   腾讯统计
    var _mtac = {};
    (function() {
      var mta = document.createElement("script");
      mta.src = "http://pingjs.qq.com/h5/stats.js?v2.0.4";
      mta.setAttribute("name", "MTAH5");
      mta.setAttribute("sid", "500577865");
      mta.setAttribute("cid", "500577880");
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(mta, s);
    })();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
  @keyframes customRotate {
    0% { transform: rotate(0deg) }
    25% { transform: rotate(10deg) }
    75% { transform: rotate(-10deg) }
    100% { transform: rotate(0deg) }

  }
  @keyframes customScale{
    0% { transform: scale(1,1) }
    25% { transform: scale(1.1,1.1) }
    75% { transform: scale(0.9,0.9) }
    100% { transform: scale(1,1) }

  }
  .container{
    .top{
      width:90%;
      margin:0 0 13px 0;
      animation: customRotate 1s  linear infinite ;
    }
    .center{
      width:100%;
      margin:0 0 22px 0;
    }
    .bottom{
      width:57.14%;
      margin:0 auto 7px;
      display: block;
      animation: customScale 1s  linear infinite ;
    }
    .hand{
      width:8.5%;
      margin:0 auto;
    }
  }

</style>
