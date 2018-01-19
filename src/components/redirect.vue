<template>
  <div class="redirect container">
    <!--正在玩命加载中!!!-->
    <loading-component></loading-component>
  </div>
</template>

<script>
  import { mapState,mapActions } from 'vuex';//使用 mapState 辅助函数帮助我们生成计算属性
  import $ from 'jquery';
  import loadingComponent from './loading.vue'

export default {
  name: 'redirect',
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
  components:{
    loadingComponent
  },
  methods: {
    goHome: function () {
      this.$router.push({ name: 'home'})
    }
  },
  created() {
    var that = this;
    if(typeof ga != 'undefined'){
      ga('set', 'page', '/redirect');
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
    if(typeof MtaH5 != 'undefined') MtaH5.clickStat("event17")
    if(typeof ga != 'undefined') ga('send', 'event','识别二维码跳首页','click',null);
    setTimeout(function () {
      that.goHome();
    },500)
  },
  mounted(){
      var that = this;
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
