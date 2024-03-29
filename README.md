# image-ipreview
一款基于vue的桌面端轻量图片预览插件。
1.欢迎大家使用~，觉得还行的，恳请给个star，谢谢！
2.如有问题，请提issue，我会持续迭代。

### 特性
      1.支持缩放，旋转，原图查看等
      2.支持鼠标滚轮缩放
      3.自带节流机制，兼顾性能
      4.支持鼠标拖动预览图查看
### 安装
```javascript
npm install image-ipreview 
```
### 用法
```javascript
import ImageIpreview from 'image-ipreview';
import 'image-ipreview/lib/image-ipreview.css';
Vue.use(ImageIpreview);

// 组件中使用实例
...
<template>
  <div id="app">
    <image-ipreview
     :url="url"
     :isMouseWheel="true"
     :isShowToolBar="true"
     :closeOnPressEscape="true"
     style="width: 300px;"
     :previewSrcList="srcList"
    />
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      ]
    };
  }
};
</script>
...
```
### 配置

|       属性名       |  类型   |     描述      | 是否必填 | 默认值 |
| :----------------: | :-----: | :-----------: | :----: | ------ |
|        url         | string  |   图片地址    | 是 |        |
| closeOnPressEscape | boolean | esc键关闭预览 |  -  |  true  |
|   isShowToolBar    | boolean |  是否展示工具栏   |  -  |  true  |
|   isMouseWheel    | boolean |  是否开启鼠标滚轮缩放   |  -  |  false  |
| previewSrcList | Array | 开启图片预览功能 | - |  |

### 效果

![image](https://github.com/huanganfree/image-ipreview/blob/master/examples/assets/image.gif)
![image](https://github.com/huanganfree/image-ipreview/blob/master/examples/assets/ex1.png)
![image](https://github.com/huanganfree/image-ipreview/blob/master/examples/assets/ex2.png)



