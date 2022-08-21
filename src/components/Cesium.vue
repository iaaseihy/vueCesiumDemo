<template>
    <div id="cesiumContainer"></div>
</template>

<script>
import positiveX from '../assets/img/SkyBox/00h+00.jpg'
import negativeX from '../assets/img/SkyBox/12h+00.jpg'
import positiveY from '../assets/img/SkyBox/06h+00.jpg'
import negativeY from '../assets/img/SkyBox/18h+00.jpg'
import positiveZ from '../assets/img/SkyBox/06h+90.jpg'
import negativeZ from '../assets/img/SkyBox/06h-90.jpg'
export default {
  name: 'Cesium',
  data () {
    return {
      viewer: null
    }
  },
  mounted () {
    this.initViewer()
  },
  methods: {
    initViewer () {
      var imageryProvider = new Cesium.UrlTemplateImageryProvider({
        //   url: LOCAL_IMG_URL,
        url: 'http://localhost:9090/Data/BASE_DATA/IMAGE/{z}/{x}/{y}.png',
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
        fileExtension: 'png',
        minimumLevel: 0,
        maximumLevel: 19
      })
      // eslint-disable-next-line no-unused-vars
      var terrainProvider = new Cesium.CesiumTerrainProvider({
        // url: LOCAL_TERRAIN_URL,
        url: 'http://localhost:9090/Data/BASE_DATA/TERRIAN', // 本地全球dem
        requestWaterMask: true // 请求水波纹效果
      })
      this.viewer = new Cesium.Viewer('cesiumContainer', {
      // terrainExaggeration:0.95,
        imageryProvider: imageryProvider,
        // terrainProvider: terrainProvider,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        navigationHelpButton: false,
        sceneModePicker: false,
        timeline: false,
        animation: false,
        selectionIndicator: false,
        infoBox: false
      })
      // 用于渲染星空的SkyBox对象
      this.viewer.scene.skyBox = new Cesium.SkyBox({
        sources: {
          positiveX: positiveX,
          negativeX: negativeX,
          positiveY: positiveY,
          negativeY: negativeY,
          positiveZ: positiveZ,
          negativeZ: negativeZ
        }
      })
      this.viewer._cesiumWidget._creditContainer.style.display = 'none'
      this.viewer.scene.globe.showGroundAtmosphere = false
      // this.viewer.scene.globe.baseColor = Color.BLACK
      this.viewer.scene.globe.baseColor = new Cesium.Color(1, 1, 1, 0) // 修改地球颜色
      // this.viewer.scene.primitives.add(createOsmBuildings())
      // this.viewer.scene.camera.flyTo({
      //   destination: Cartesian3.fromDegrees(-74.019, 40.6912, 750)
      // })

      this.viewer.camera.setView({
        // Cesium的坐标是以地心为原点，一向指向南美洲，一向指向亚洲，一向指向北极州
        // fromDegrees()方法，将经纬度和高程转换为世界坐标
        destination: Cesium.Cartesian3.fromDegrees(99, 36.4, 18000008),
        orientation: {
          // 指向
          // heading:Cesium.Math.toRadians(90,0),
          // 视角
          // pitch:Cesium.Math.toRadians(-90),
          // roll:0.0
        }
      })
      this.viewer.scene.globe.depthTestAgainstTerrain = true
      const handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas)
      this.$store.state.cesiumDrawHandler = handler
      window.cesiumViewer = this.viewer
    }
  }
}
</script>

<style>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>
