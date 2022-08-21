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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
