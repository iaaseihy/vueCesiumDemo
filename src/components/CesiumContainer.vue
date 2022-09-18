<!-- eslint-disable camelcase -->
<!-- eslint-disable no-unused-vars -->
<template>
  <div id="cesiumContainer" ref="cesiumContainer"></div>
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
import { BaiduImageryProvider, AmapImageryProvider } from '../../static/commonJS/BaiduImageryProvider.js'
// import sss from '../../static/model/scene(2).gltf'
let viewer = null
export default {
  name: 'cesiumContainer',
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
      // 通过imageryLayers获取图层列表集合
      var layers = viewer.scene.imageryLayers
      console.log('图层信息：', layers)
      // 图层列表集合的addImageryProvider方法:
      // 两个参数，第一参数是一个ImageryProvider函数，这个函数的作用是新建一个图层;第二个参数是index，Number类型，作用是指定新插入图层在图层列表集合中的索引(位置)，若不指定，默认新图层添加在最上层
      // 返回值是新添加到图层列表集合中的图层
      var baiduImageryLayer = layers.addImageryProvider(
        new BaiduImageryProvider({
          url: 'http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1',
          layer: 'tdtAnnoLayer',
          style: 'dark',
          format: 'image/jpeg',
          maximumLevel: 18,
          subdomains: this.subdomains,
          tileMatrixSetID: 'GoogleMapsCompatible',
          crs: 'WGS84', // 坐标系: WGS84 、BD09 、GCJ02，仅百度、高德有效
          tilingScheme: null
        })
      )
      // get或set图层透明度，范围是0-1
      baiduImageryLayer.alpha = 0.6

      // get或set图层亮度，小于1图层更暗，大于1更亮
      baiduImageryLayer.brightness = 1.0
      // 添加高德地图并使用插件纠偏
      var gaodeImageryLayer = layers.addImageryProvider(
        new AmapImageryProvider({
          url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
          layer: 'tdtAnnoLayer',
          style: 'default',
          format: 'image/jpeg',
          maximumLevel: 18,
          subdomains: this.subdomains,
          tileMatrixSetID: 'GoogleMapsCompatible',
          crs: 'WGS84', // 坐标系: WGS84 、BD09 、GCJ02，仅百度、高德有效
          tilingScheme: null
        })
      )
      // get或set图层透明度，范围是0-1
      gaodeImageryLayer.alpha = 0.6

      // get或set图层亮度，小于1图层更暗，大于1更亮
      gaodeImageryLayer.brightness = 1.0

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

      // // 加载100000个模型
      // this.addGlbCollection()
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
          heading: Cesium.Math.toRadians(0, 0),
          // 视角
          pitch: Cesium.Math.toRadians(-90),
          roll: 0.0
        }
      })
      viewer.scene.globe.depthTestAgainstTerrain = true
      // const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)
      // this.$store.state.cesiumDrawHandler = handler
      window.cesiumViewer = viewer
      viewer.camera.moveEnd.addEventListener(this.getCurrentExtent)
    },
    // 获取当前相机视角内的图幅范围
    getCurrentExtent () {
      // 范围对象
      var extent = {}

      // 得到当前三维场景
      var scene = viewer.scene

      // 得到当前三维场景的椭球体
      var ellipsoid = scene.globe.ellipsoid
      var canvas = scene.canvas

      // canvas左上角
      var car3Lt = viewer.camera.pickEllipsoid(
        new Cesium.Cartesian2(0, 0),
        ellipsoid
      )

      // canvas右下角
      var car3Rb = viewer.camera.pickEllipsoid(
        new Cesium.Cartesian2(canvas.width, canvas.height),
        ellipsoid
      )

      // 当canvas左上角和右下角全部在椭球体上
      if (car3Lt && car3Rb) {
        var cartoLt = ellipsoid.cartesianToCartographic(car3Lt)
        var cartoRb = ellipsoid.cartesianToCartographic(car3Rb)
        extent.xmin = Cesium.Math.toDegrees(cartoLt.longitude)
        extent.ymax = Cesium.Math.toDegrees(cartoLt.latitude)
        extent.xmax = Cesium.Math.toDegrees(cartoRb.longitude)
        extent.ymin = Cesium.Math.toDegrees(cartoRb.latitude)
      }

      // 当canvas左上角不在但右下角在椭球体上
      else if (!car3Lt && car3Rb) {
        var car3Lt2 = null
        var yIndex = 0
        do {
          // 这里每次10像素递加，一是10像素相差不大，二是为了提高程序运行效率
          // eslint-disable-next-line no-unused-expressions
          (yIndex <= canvas.height) ? (yIndex += 10) : canvas.height
          car3Lt2 = viewer.camera.pickEllipsoid(
            new Cesium.Cartesian2(0, yIndex),
            ellipsoid
          )
        } while (!car3Lt2)
        var cartoLt2 = ellipsoid.cartesianToCartographic(car3Lt2)
        var cartoRb2 = ellipsoid.cartesianToCartographic(car3Rb)
        extent.xmin = Cesium.Math.toDegrees(cartoLt2.longitude)
        extent.ymax = Cesium.Math.toDegrees(cartoLt2.latitude)
        extent.xmax = Cesium.Math.toDegrees(cartoRb2.longitude)
        extent.ymin = Cesium.Math.toDegrees(cartoRb2.latitude)
      }

      // 获取高度
      extent.height = Math.ceil(viewer.camera.positionCartographic.height)
      // 获取当前缩放的地图层级
      let level = 0
      if (viewer.scene.globe._surface._tilesToRender.length) {
        level = viewer.scene.globe._surface._tilesToRender[0].level
        console.log('当前地图层级=======', level)
      }
      console.log(
        '地图变化监听事件',
        extent,
        (extent.xmin + extent.xmax) / 2,
        (extent.ymax + extent.ymin) / 2
      )
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
/* #cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
} */
/* * {
  margin: 0;
  padding: 0;
} */
</style>
