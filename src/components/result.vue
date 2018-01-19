<template>
  <div class="result container">

    <img :src="userview.avatar" alt="" class="avatar" id="avatar">
    <img :src="result.beforeDrawAvatar.imgSrc" alt="" class="beforeDrawAvatar" id="beforeDrawAvatar">
    <img v-if="showAfterDraw" :src="result.afterDrawAvatar" alt="" class="afterDrawAvatar" id="afterDrawAvatar">
    <canvas id="canvas"></canvas>


    <img src="../assets/image/saveText.png" alt="" class="saveText">
    <div class="btnWrap">
      <img src="../assets/image/againBtn.png" alt="" class="againBtn" @click="goHome">
      <img src="../assets/image/shareBtn.png" alt="" class="shareBtn" @click="showShareHandle">
    </div>
    <img src="../assets/image/slogan.png" alt="" class="logo" @click="goMZYS">
    <div v-if="showShare" class="showShare" @click="closeShare">
      <img src="http://img.wecarepet.com/double11/shareTopnew.png" alt="" class="shareTop">
      <img v-if="browser == 'android'" src="http://img.wecarepet.com/double11/shareAndroidnew.png" alt="" class="shareBottom">
      <img v-if="browser == 'ios'" src="http://img.wecarepet.com/double11/shareIosnew.png" alt="" class="shareBottom">
    </div>
  </div>
</template>

<script>
  import { mapState,mapActions } from 'vuex';//使用 mapState 辅助函数帮助我们生成计算属性
  import $ from 'jquery';
  import piaWx from '../lib/js/pia-wx.js'

export default {
  name: 'result',
  data () {
    return {
      msg: '结果页',
      showShare: false,
      abtest: '',
      showAfterDraw:false
    }
  },
  computed: {
    ...mapState([
      'userview', 'result', 'level','Question','RESULTIMG','browser'
    ])
  },
  methods: {
    goHome: function () {
      this.$router.replace({ name: 'home'},function () {
        location.reload();
      })
      if(typeof MtaH5 != 'undefined') MtaH5.clickStat("event12")
      if(typeof ga != 'undefined') ga('send', 'event','再测一次','click',null);
    },
    showShareHandle:function () {
      if(typeof MtaH5 != 'undefined') MtaH5.clickStat("event13")
      if(typeof ga != 'undefined') ga('send', 'event','分享给朋友按钮','click',null);
      this.showShare = true;
    },
    closeShare:function () {
      this.showShare = false;
    },
    goMZYS: function () {
      location.href = 'http://wecarepet.com/doctor.html?from=previousLife';
      if(typeof MtaH5 != 'undefined') MtaH5.clickStat("event16")
      if(typeof ga != 'undefined') ga('send', 'event','跳转订阅号按按钮','click',null);
    }
  },
  created() {
    var that = this;
//ga
    if (location.href.indexOf('testA') > -1) {
      this.abtest = 'testA';
    } else if (location.href.indexOf('testB' > -1)) {
      this.abtest = 'testB';
    }
    piaWx.updataShare(that.result.beforeDrawAvatar);

    if(typeof ga != 'undefined'){
      ga('set', 'page', '/result/'+this.abtest);
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


  },
  mounted(){
      var that = this;
//    1.根据屏幕宽创建 canvas画布
//    2。绘制头像
//    3.绘制结果原图
//    4、导出结果合成图
//    5、合成图赋值给afterAvatar
//    1、
    var $beforeDrawAvatar = $('#beforeDrawAvatar');
    $beforeDrawAvatar[0].onload = function () {

      var canvasWidth = $beforeDrawAvatar.width()
      var canvasHeight = $beforeDrawAvatar.height();

      $("#afterDrawAvatar").attr("src", null );
      var canvas = document.getElementById("canvas");
      $('#canvas').show();

      canvas.width = canvasWidth*2;
      canvas.height = canvasHeight*2;
      var content = canvas.getContext("2d");
//    2
//      content.fillStyle = "#07427D",
//      content.fillRect(0, 0, canvasWidth, canvasHeight);
      var avatar = document.getElementById("avatar");

      var psdWidth = 374,
        psdHeight = 500;
      var ratioWidth = canvasWidth/psdWidth;
      var ratioHeight = canvasHeight/psdHeight;
      var  avatarWidth = that.result.beforeDrawAvatar.width*ratioWidth;
      var avatarLeft = that.result.beforeDrawAvatar.x*ratioWidth;
      var  avatarTop = that.result.beforeDrawAvatar.y*ratioHeight;

//    3
      var image = new Image();
//      image.setAttribute('crossOrigin', 'anonymous');
      image.onload = function() {
        content.drawImage(image, parseFloat(avatarLeft)*2, parseFloat(avatarTop)*2, parseFloat(avatarWidth)*2, parseFloat(avatarWidth)*2);
        content.drawImage($beforeDrawAvatar[0], 0, 0, canvasWidth*2, canvasHeight*2);
//    4、5
        that.result.afterDrawAvatar = canvas.toDataURL("");
        that.showAfterDraw = true;
        $('#canvas').hide();

      };
      image.src = that.userview.avatar;

    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .result{
    text-align:center;
    padding:0;
    .beforeDrawAvatar{
      width:90.33%;
      margin-top:4.8%;
    }
    .afterDrawAvatar,
    #canvas{
      width:90.33%;
      position: absolute;
      left:4%;
      top:2.8%;
    }
    .avatar{
      position: absolute;
      z-index:0;
      width:100px;
      display: none;
    }
    .saveText{
      width:35.74%;
      margin:0% auto 2%;
    }
    .btnWrap{
      /*width:87.92%;*/
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin:0 auto 3.62%;
      .againBtn,
      .shareBtn {
        width:41.54%;
      }
    }
    .logo{
      width:83%;
      margin:0 auto 3.38%;
    }
    .showShare{
      width:100%;
      height:100%;
      position:fixed;
      left:0;
      top:0;
      background:rgba(0,0,0,0.5);
      .shareTop{
        width:39%;
        position: absolute;
        top:2%;
        right:5%;
      }
      .shareBottom{
        width:92%;
        position: absolute;
        bottom:2%;
        left:4%;
      }
    }
  }
</style>
