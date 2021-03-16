# image-ipreview
一款基于vue的桌面端轻量图片预览插件。

（欢迎大家使用~，我会持续迭代）

### 特性
      1.支持缩放，旋转，下载
      2.支持鼠标滚轮缩放
### 安装
```javascript
npm install image-ipreview 
```
### 用法
```javascript
import ImageIpreview from 'image-ipreview';
import 'image-ipreview/lib/image-ipreview.css';
Vue.use(ImageIpreview);

```
### 配置

|       属性名       |  类型   |     描述      | 默认值 |
| :----------------: | :-----: | :-----------: | :----: |
|        url         | String  |   图片地址    |        |
| closeOnPressEscape | Boolean | esc键关闭预览 |  true  |
|   isShowToolBar    | Boolean |  是否展示工具栏   |  true  |
|   isDownload    | Boolean |  是否展示下载图标   |  true  |
|   downloadName    | String |  下载图片名称   |  下载图片  |
|   isMouseWheel    | Boolean |  是否开启鼠标滚轮缩放   |  false  |

### 效果

![image](https://gitee.com/weban/vue-plug-in/raw/master/examples/assets/44.jpg)
![image](https://gitee.com/weban/vue-plug-in/raw/master/examples/assets/1314.png)


