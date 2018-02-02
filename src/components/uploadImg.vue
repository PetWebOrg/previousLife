<template>
  <div class="uploadImg">
    <div class="uploadImg1 container" v-show="!isEdit && !showLoad">
      <img src="http://img.wecarepet.com/double11/who.png"  alt="" class="who">
      <img src="http://img.wecarepet.com/double11/avatarBig.png"  alt="" class="avatarBig">
      <img src="http://img.wecarepet.com/double11/chooseImg.png"  alt="" class="chooseImg" @click="chooseImg(9)">

      <img src="http://img.wecarepet.com/double11/catLeft.png"  alt="" class="catLeft">
      <img src="http://img.wecarepet.com/double11/heart.png"    alt="" class="heart">
      <img src="http://img.wecarepet.com/double11/hand.png"     alt="" class="hand">
      <img src="http://img.wecarepet.com/double11/logo.png"     alt="" class="logo">
      <img src="http://img.wecarepet.com/double11/catRight.png" alt="" class="catRight">
    </div>
    <div class="uploadImg2" v-show="isEdit && !showLoad" >
      <div id="needCropWrap" class="top">
        <div class="content">
          <img src="" alt="" id="needCropImg">
        </div>
      </div>
      <div class="bottom">
        <img src="http://img.wecarepet.com/double11/avatarMini.png" alt="" class="avatarMini">
        <div class="preview">
          <div id="preview" class="content"></div>
        </div>
        <img src="http://img.wecarepet.com/double11/saveBtn.png" alt="" class="saveBtn" @click="cropping">
        <img src="http://img.wecarepet.com/double11/chooseAgain.png" alt="" class="chooseAgain"  @click="chooseImg(11)">

        <img src="http://img.wecarepet.com/double11/hand.png"     alt="" class="hand">
        <img src="http://img.wecarepet.com/double11/logo.png"     alt="" class="logo">
        <img src="http://img.wecarepet.com/double11/catRight.png" alt="" class="catRight">
      </div>
    </div>
    <loading-component v-show="showLoad"></loading-component>
  </div>


</template>

<script>
  import { mapState,mapActions } from 'vuex';//使用 mapState 辅助函数帮助我们生成计算属性
  import $ from 'jquery';
  import 'cropper';
  import '../lib/css/cropper.css';
  import loadingComponent from './loading.vue'

export default {
  name: 'uploadImg',
  data () {
    return {
      msg: '上传图片页',
      abtest: '',
      isEdit: false,
      showLoad: false
    }
  },
  computed: {
    ...mapState([
      'userview', 'result', 'level','Question','RESULTIMG','browser'
    ])
  },
  components:{
    loadingComponent
  },
  methods: {
    showEditPage: function () {
      this.isEdit = true;
    },
    goNext: function () {
      if (location.href.indexOf('testA') > -1) {
        this.goResult()
      } else if (location.href.indexOf('testB' > -1)) {
        this.goQus()
      }
    },
    goResult: function () {
      this.$router.push({ name: 'result', params: 'A' })
    },
    goQus: function () {
      this.$router.push({ name: 'question', params: { test: 'testB' } })
    },
    chooseImg: function(mtaNum) {
        var that = this;
//      在微信浏览器内
        console.log('点击上传');
        if(navigator.userAgent.toLowerCase().indexOf("micromessenger" ) > -1){
          wx.ready(function () {
            console.log('wx ready');
            wx.chooseImage({
              count: 1, // 默认9
              sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
              success: function (res) {
                that.wxUploadImage(res.localIds.length, res.localIds);
                console.log('选择图片成功')
                console.log(res.localIds.length);
                console.log(res.localIds[0]);
                that.showLoad = true;
              },
              fail:function (err) {
                console.log(err);
              }
            })
          })
        }else{
            alert('请在微信浏览器内打开哟~');
            this.goResult();
        }
      if(typeof MtaH5 != 'undefined') MtaH5.clickStat("event"+mtaNum)
      var gaText = mtaNum == 9?'上传头像':'重选图片';
      if(typeof ga != 'undefined') ga('send', 'event',gaText,'click',null);
    },
    wxUploadImage: function (imageCount, imgs) {
      var that = this;
      if (imageCount > 0) {
        setTimeout(function(){
          wx.uploadImage({
            localId: imgs[imgs.length - imageCount],
            isShowProgressTips: 1,
            success: function (res) {
              var serverId = res.serverId;
              console.log('serverId=');
              console.log(serverId);
              $.ajax({
                url:"/data/downloadWxImage?serverId=" + serverId,
                context:null,
                success:function(res){
                  that.onAddPhoto(res.result);
                  that.wxUploadImage(--imageCount, imgs);
                },
                fail:function(){
                  alert("上传失败");
                }
              })
            },
            fail: function (err) {
              console.log(err);
            }
          })
        },300);
      }
    },
    onAddPhoto : function(img){
      var that = this;
      $('#needCropImg').cropper("destroy");
      $('#needCropImg').attr('src','');
      $('#needCropImg')[0].onload = function () {
          console.log('needCropImg onload');
        that.croppedInit();
      }
//      img = {imgUrl : 'http://cdn.wecarepet.net/upload/image_136996_1506392242841.jpg'}
      $('#needCropImg').attr('src',''+ img.imgUrl);
      console.log('img.imgUrl=');
      console.log(img.imgUrl);
    },
    croppedInit : function () {
      var that = this;
      $('#needCropImg').cropper({
        aspectRatio: 1 / 1,
        preview:'#preview',
        crop: function(e) {
          // Output the result data for cropping image.
        }
      });
      that.showLoad = false;
      that.isEdit = true;
//      that.croppedListen();
    },
    cropping: function () {
      var that = this;
      that.userview.avatar = $('#needCropImg').cropper('getCroppedCanvas').toDataURL('image/jpeg');
      $('#needCropImg').cropper("destroy");
      that.goNext();
      if(typeof MtaH5 != 'undefined') MtaH5.clickStat("event10")
      if(typeof ga != 'undefined') ga('send', 'event','保存头像','click',null);
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
      ga('set', 'page', '/uploadImg/' + this.abtest);
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
  .uploadImg{
    height:100%;
    .uploadImg1{
      .who{
        width:72.46%;
        margin:12% auto 9%;
      }
      .avatarBig{
        width:55.8%;
        margin-bottom:8.2%;

      }
      .chooseImg{
        width:60.38%;
      }
      .catLeft{
        position: absolute;
        z-index: 0;
        left:2.4%;
        top:2.4%;
        width:20.53%;
      }
      .heart{
        position: absolute;
        z-index: 0;
        right:6.52%;
        top:5.15%;
        width:14%;
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
        left:40%;
        bottom:3.62%;
        width:20%;
      }
      .catRight{
        position: absolute;
        z-index: 0;
        bottom:5.05%;
        right:7.5%;
        width:27%;
      }
    }
    .uploadImg2{
      background-color:#07427D;
      min-height:100%;
      .top{
        width:100%;
        @include aspect-ratio(1,1);
        background-color:#fff;
        .content{
          display: flex;
          justify-content: center;
          overflow: hidden;
          #needCropImg{
            height:100%;
          }
        }
      }
      .bottom{
        .avatarMini{
          width:32.35%;
          position: absolute;
          bottom: 6.64%;
          left:7.72%;
          z-index:100;
        }
        .preview{
          @include aspect-ratio(1,1);
          width: 29%;
          position: absolute;
          bottom: 14.5%;
          left: 9.5%;
          z-index: 50;
          .content{
            border-radius: 50%;
            /*background: red;*/
            overflow: hidden;
          }
        }
        .saveBtn{
          width:43.47%;
          position: absolute;
          bottom:22.32%;
          right:13.76%;
        }
        .chooseAgain{
          width:43.47%;
          position: absolute;
          bottom:13.4%;
          right:13.76%;
        }
        .hand{
          position: absolute;
          z-index: 0;
          left:7%;
          bottom:3.7%;
          width:23.18%;
        }
        .logo{
          position: absolute;
          z-index: 0;
          left:40%;
          bottom:3.62%;
          width:20%;
        }
        .catRight{
          position: absolute;
          z-index: 0;
          bottom:2.05%;
          right:7.5%;
          width:21.73%;
        }
      }
    }

  }

</style>
