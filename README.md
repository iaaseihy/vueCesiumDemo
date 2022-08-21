# vuecesiumdemo

> vue+cesium三维展示平台

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

cesium环境搭建配置：
1.在terminal窗口运行npm install cesium安装cesium;
2.把node_modules/cesium/Build目录下的Cesium文件夹拷贝到static目录下;
3.打开index.html文件，在head标签里，lin引入css样式：<link rel="stylesheet" href="./static/Cesium/Widgets/widgets.css"> ;再在body标签里，用script标签引入Cesium.js文件： <script src="./static/Cesium/Cesium.js"></script>;
4.在.eslintrc.js（教程里在package.json）里，部署globals属性，rules后面添加： globals: {
    "Cesium": true,
  },
5.在src/components目录下创建Cesium.vue文件，之后在App.vue文件里将其进行注册：(1)引入Cesium.vue文件：import Cesium from './components/Cesium.vue'；(2)components里注册：comments: {
    Cesium
  },    (3)在template里创建一个div根目录,将Cesium使用：<div id="app">
    <Cesium/>
  </div>
6.Cesium.vue里创建div： <div id="cesiumContainer"></div> ，组件命名：name: 'Cesium',methods:方法里写入初始化页面方法，给div设置样式：#cesiumContainer {
  width: 100%;
  height: 100%;
}                   mounted钩子里调用method的初始化方法