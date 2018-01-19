<template>
  <div class="loading container">
    <img src="../assets/image/loadingP0.png" alt="" class="progress">
    <img src="../assets/image/loading.png" alt="" class="loadingText">
    <img src="../assets/image/logo.png" alt="" class="logo">
  </div>

</template>

<script>
  import { mapState,mapActions } from 'vuex';//使用 mapState 辅助函数帮助我们生成计算属性
  import $ from 'jquery';


  export default {
    name: 'loading',
    data () {
      return {
        isShow: true
      }
    },
    methods: {
      ...mapActions([
        'initQues'
      ]),
      goQus: function () {
        console.log('111')
        this.$router.push({ name: 'question', params: { test: 'testA' } })
      },

      goUploadImg: function () {
        this.$router.push({ name: 'uploadImg', params: { test: 'testB' } })
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
      if(typeof ga != 'undefined'){
        ga('set', 'page', '/home');
        ga('send', 'pageview');
      }
    },
    mounted(){
      var src = './static/img/loadingP';
      var count = 0;
      setInterval(function () {
        count++;
        if(count>=3) count = 0;
        $('.progress').attr('src',src+count+'.png')
      },500)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
  .loading{
    background:url("../assets/image/loading_bg.png") no-repeat;
    background-size:100% 100%;
    background-color:#07427D;
    text-align: center;
  }
  .progress{
    width:90%;
    margin:76% auto 7%;
  }
  .loadingText{
    width:33%;
    display: block;
    margin:0% auto 71%;
  }
  .logo{
    width:25%;
  }
</style>
