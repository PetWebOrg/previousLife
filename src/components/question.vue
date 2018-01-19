<template>
  <div class="question container">
    <img :src="QN" alt="" class="quesNum">
    <img :src="Qtitle" alt="" class="title">
    <div class="option" v-for="(option,index) in Question[userview.currentQusNum].options" @click="chooseOption($event,option.score)">
      <img :src=" './static/img/icon'+index+'.png'" alt="" class="iconNum">
      <div class="optionWrap">
        <div class="content"><div class="text">{{option.text}}</div></div>
      </div>
    </div>
    <img src="../assets/image/catLeft.png"  alt="" class="catLeft">
    <img src="../assets/image/heart.png"    alt="" class="heart">
    <img src="../assets/image/hand.png"     alt="" class="hand">
    <img src="../assets/image/logo.png"     alt="" class="logo">
    <img src="../assets/image/catRight.png" alt="" class="catRight">
  </div>


</template>

<script>
  import { mapState,mapActions } from 'vuex';//使用 mapState 辅助函数帮助我们生成计算属性
  import $ from 'jquery';

export default {
  name: 'question',
  data () {
    return {
      msg: '问题页',
      abtest: ''
    }
  },
  methods: {
    ...mapActions([
        'addNum','remeberAns','randomAnswer'
    ]),
    goNext: function () {
      if (this.abtest === 'testA') {
        this.goUploadImg()
      } else if (this.abtest === 'testB') {
        this.goResult()
      }
    },
    goResult: function () {
      this.$router.push({ name: 'result', params: 'A' })
    },
    goUploadImg: function () {
      this.$router.push({ name: 'uploadImg', params: 'B' })
    },
    chooseOption: function (e,score) {
      var that = this;
      if(typeof MtaH5 != 'undefined') MtaH5.clickStat("event"+(3+that.userview.currentQusNum));
      if(typeof ga != 'undefined') ga('send', 'event','问题'+that.userview.currentQusNum,'click',null);

      var $option = $(e.currentTarget);
      $option.addClass('hoverStyle');
      that.remeberAns(score);//计算累计分数

      setTimeout(function () {
        $option.removeClass('hoverStyle');
        if(that.userview.currentQusNum >= 5){
          that.goNext()//跳转下一页
          that.randomAnswer();//根据分数随机答案
        }else{
          that.addNum()//题号加1
        }
      },300)
    }
  },
  computed: {
    ...mapState([
      'userview', 'result', 'level','Question','RESULTIMG'
    ]),
    QN:function () {
      return './static/img/QN'+(this.userview.currentQusNum+1)+'.png';
    },
    Qtitle:function () {
      return './static/img/Q'+(this.userview.currentQusNum+1)+'.png';
    }
  },
  created() {
    //ga
    if (location.href.indexOf('testA') > -1) {
      this.abtest = 'testA';
    } else if (location.href.indexOf('testB' > -1)) {
      this.abtest = 'testB';
    }
    if(typeof ga != 'undefined'){
      ga('set', 'page', '/question/'+this.abtest);
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
<style lang="scss" scoped>
  $width:364px;
  @mixin aspect-ratio($width, $height) {
    position: relative;
    &:before {
       display: block;
       content: "";
       width: 100%;
       padding-top: ($height / $width) * 100%;
     }
    > .content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
  }
  @keyframes customScale_translate{
    0% { transform: scale(1,1) }
    50% { transform: scale(1.1,1.1) translateY(5px) }
    75% { transform: scale(1,1)  translateY(5px) }
    100% { transform: scale(1,1)  translateY(0px) }
  }
  @keyframes customScale_translate1{
    0% { transform: translateY(0px) }
    50% { transform:translateY(5px) }
    100% { transform:translateY(5px) }
  }
  .hoverStyle{
    animation: customScale_translate1 300ms;
  }
  .question{
    text-align:center;
    .quesNum{
      width:57.14%;
      margin:13.73% auto 12.08% 0;
    }
    .title{
      width:98.35%;
      margin:0 auto 11%;

    }
    .option{
      display: flex;
      justify-content:space-between;
      align-items:center;
      margin-bottom:8.24%;
      width:100%;
      height:12.36%;
      .iconNum{
        width:11.26%;
      }
      .optionMini{
        width:86%;
      }
      .optionWrap{
        width:86%;
        @include aspect-ratio(313,45);
        text-align:center;
        background:url('../assets/image/optionMini.png') no-repeat;
        background-size:100% 100%;
        color: #FFF4E1;
        font-size:1rem;

        .content{
          display:flex;
          align-items:center;
          justify-content: center;
        }

      }
    }
    .catLeft{
      position: absolute;
      z-index: 0;
      left:10px;
      top:10px;
      width:85px;
    }
    .heart{
      position: absolute;
      z-index: 0;
      right:27px;
      top:83px;
      width:58px;
    }
    .hand{
      position: absolute;
      z-index: 0;
      left:10%;
      bottom:6.7%;
      width:23.18%;
    }
    .logo{
      position: absolute;
      z-index: 0;
      left:50%;
      margin-left:-41.5px;
      bottom:15px;
      width:83px;
    }
    .catRight{
      position: absolute;
      z-index: 0;
      bottom:5.05%;
      right:7.5%;
      width:27%;
    }
  }
</style>
