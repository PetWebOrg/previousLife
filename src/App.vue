<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
//import normalize from 'normalize.css'
import 'normalize.css'
export default {
  name: 'app'
}
</script>

<style lang="scss" >
/*公共类*/
html,body{
  padding:0;
  margin:0;
  height:100%;
}
.container{
  padding:0 6%;
  background-color:#07427D;
  text-align:center;
  min-height:100%;
}

@media screen and (min-width: 320px) {
  html {font-size: 12px;}
}

@media screen and (min-width: 375px) {
  html {font-size: 14px;}
}

@media screen and (min-width: 414px) {
  html {font-size: 16px;}
}
#app{
  height:100%;
  >h1{
    border-bottom: 1px solid #000;
  }
}
</style>
