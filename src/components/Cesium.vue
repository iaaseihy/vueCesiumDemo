<!-- eslint-disable no-unused-vars -->
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
// eslint-disable-next-line no-unused-vars
import {
  LOCAL_IMG_URL,
  LOCAL_TERRAIN_URL,
  // eslint-disable-next-line no-unused-vars
  TDT_VEC_IMG_URL,
  urlModel
} from '../../static/commonJS/config.js'
// import sss from '../../static/model/scene(2).gltf'
let viewer = null
export default {
  name: 'Cesium',
  data () {
    return {
      // viewer: null
      coordiatesArr: []
    }
  },
  mounted () {
    this.initViewer()
    // this.addModel()
  },
  methods: {
    initViewer () {
      var imageryProvider = new Cesium.UrlTemplateImageryProvider({
        url: LOCAL_IMG_URL,
        // url: TDT_VEC_IMG_URL,
        // url: 'http://localhost:9090/Data/BASE_DATA/IMAGE/{z}/{x}/{y}.png',
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
        fileExtension: 'png',
        minimumLevel: 0,
        maximumLevel: 19
      })
      // eslint-disable-next-line no-unused-vars
      var terrainProvider = new Cesium.CesiumTerrainProvider({
        url: LOCAL_TERRAIN_URL,
        // url: 'http://localhost:9090/Data/BASE_DATA/TERRIAN', // 本地全球dem
        requestWaterMask: true // 请求水波纹效果
      })
      viewer = new Cesium.Viewer('cesiumContainer', {
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
      viewer.scene.skyBox = new Cesium.SkyBox({
        sources: {
          positiveX: positiveX,
          negativeX: negativeX,
          positiveY: positiveY,
          negativeY: negativeY,
          positiveZ: positiveZ,
          negativeZ: negativeZ
        }
      })
      viewer._cesiumWidget._creditContainer.style.display = 'none'
      viewer.scene.globe.showGroundAtmosphere = false
      viewer.scene.globe.depthTestAgainstTerrain = true
      viewer.scene.debugShowFramesPerSecond = true // 显示帧率
      // viewer.scene.globe.baseColor = Color.BLACK
      viewer.scene.globe.baseColor = new Cesium.Color(1, 1, 1, 0) // 修改地球颜色
      // viewer.scene.primitives.add(createOsmBuildings())
      // viewer.scene.camera.flyTo({
      //   destination: Cartesian3.fromDegrees(-74.019, 40.6912, 750)
      // })

      // 加载100000个模型
      this.addGlbCollection()
      viewer.camera.setView({
        // Cesium的坐标是以地心为原点，一向指向南美洲，一向指向亚洲，一向指向北极州
        // fromDegrees()方法，将经纬度和高程转换为世界坐标
        destination: Cesium.Cartesian3.fromDegrees(
          114.307031,
          30.555222,
          1000000
        ),
        orientation: {
          // 指向
          heading: Cesium.Math.toRadians(90, 0),
          // 视角
          pitch: Cesium.Math.toRadians(-90),
          roll: 0.0
        }
      })
      viewer.scene.globe.depthTestAgainstTerrain = true
      // const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)
      // this.$store.state.cesiumDrawHandler = handler
      window.cesiumViewer = viewer
    },
    /* 加载gltf或glb格式模型 */
    addGlbCollection () {
      for (let i = 0; i < 10000; i++) {
        var longitude = 108.841552734374 + Math.random() * (150 - 124.25) // [124.25,150)
        var latitude = 27.8779283336792 + Math.random() * (60 - 28)
        var height = 100 + Math.random() * (5000 - 100)
        var ccord = { longitude, latitude, height }
        this.coordiatesArr.push(ccord)
      }
      console.log(this.coordiatesArr)
      var modelInstances = this.getModelPostInstances(this.coordiatesArr)
      console.log(modelInstances)
      // eslint-disable-next-line no-unused-vars
      var instanceCollection = viewer.scene.primitives.add(
        new Cesium.ModelInstanceCollection({
          url: '/static/model/gltf/Cesium_Man.glb',

          instances: modelInstances
        })
      )
    },
    /* 批量处理gltf或glb格式模型 */
    getModelPostInstances (data) {
      var modelPosts = []

      for (var y = 0; y < data.length; ++y) {
        var longitude = data[y].longitude
        var latitude = data[y].latitude
        var height = data[y].height

        var position = Cesium.Cartesian3.fromDegrees(
          longitude,
          latitude,
          height
        )

        var heading = Math.random()
        var pitch = Math.random()
        var roll = Math.random()
        // var scale = ((Math.random() + 1.0) / 4.0) * 100
        var scale = 10000
        var modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
          position,
          new Cesium.HeadingPitchRoll(heading, pitch, roll)
        )

        Cesium.Matrix4.multiplyByUniformScale(modelMatrix, scale, modelMatrix)

        modelPosts.push({
          modelMatrix: modelMatrix
        })
      }

      return modelPosts
    },
    addModel () {
      // instances是数组，循环创建instance并放到数组里
      var position = Cesium.Cartesian3.fromDegrees(
        114.307031 + Math.random(),
        30.555222 + Math.random(),
        0
      )
      // 弧度的航向分量。
      var heading = Cesium.Math.toRadians(135)
      // 弧度的螺距分量。
      var pitch = 0
      // 滚动分量（以弧度为单位）
      var roll = 0
      var modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
        position,
        new Cesium.HeadingPitchRoll(heading, pitch, roll)
      )
      var scale = 100000
      Cesium.Matrix4.multiplyByUniformScale(modelMatrix, scale, modelMatrix)

      var instances = []
      for (let i = 0; i < 10000; i++) {
        instances.push({
          modelMatrix: modelMatrix
        })
      }

      // collection

      // eslint-disable-next-line no-unused-vars
      viewer.scene.primitives.add(
        new Cesium.ModelInstanceCollection({
          url: urlModel,
          instances: instances
        })
      )
      console.log(viewer.scene)
    }
  }
}
</script>

<style>
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
* {
  margin: 0;
  padding: 0;
}
</style>
