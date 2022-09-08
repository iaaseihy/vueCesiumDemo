
// 本地全球影像
// export const LOCAL_IMG_URL = 'http://127.0.0.1:6060/Data/ZRZY/TaiCang/IMAGE/{z}/{x}/{y}.png'
export const LOCAL_IMG_URL = 'http://localhost:9090/Data/BASE_DATA/IMAGE/{z}/{x}/{y}.png'
// 在线谷歌影像
export const GOOGLE_IMG_URL = 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali'
// 在线天地图矢量影像
export const TDT_VEC_IMG_URL = 'http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=f5bb12c6cae196cd462140e3a1bccddd'
// 在线天地图标注
export const TDT_CVA_IMG_URL = 'http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=f5bb12c6cae196cd462140e3a1bccddd'
// 在线高德影像
export const GAODE_IMG_URL = 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
// 在线ARCGIS影像
export const ARCGIS_IMG_URL = 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
// 在线必应影像
export const BING_IMG_URL = 'https://dev.virtualearth.net'
/**
 * 地形配置路径
 */
// export const LOCAL_TERRAIN_URL ='http://127.0.0.1:6060/Data/BASE_DATA/basicWorldDEM'// 本地全球dem
export const LOCAL_TERRAIN_URL = 'http://localhost:9090/Data/ZRZY/TaiCang/TERRAIN'// 本地全球dem

// export const urlModel = './model/dwendwen.gltf'
export const urlModel = 'http://localhost:9090/Data/scene(2).gltf'

