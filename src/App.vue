<template>
  <div id="app">
    <Cesium/>
  </div>
</template>

<script>
import Cesium from './components/Cesium.vue'
export default {
  name: 'App',
  comments: {
    Cesium
  },
  components: { Cesium }
}
</script>

<style>
  /* 保证浏览器全屏幕显示，没有多余的白边 */
html, body, #cesiumContainer {
 width: 100%;
 height: 100%;
 margin: 0;
 padding: 0;
 overflow: hidden;
}
#app {
  font-family: 'Avenir'， Helvetica， Arial， sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
