# image-ipreview
一款基于vue2.x的轻量图片预览插件。

（欢迎大家使用~，我会持续迭代）

### 特性
      1.支持缩放，旋转，下载等
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
### 选项

|       属性名       |  类型   |     描述      | 默认值 |
| :----------------: | :-----: | :-----------: | :----: |
|        url         | String  |   图片地址    |        |
| closeOnPressEscape | Boolean | esc键关闭预览 |  true  |
|   isShowToolBar    | Boolean |  是否展示工具栏   |  true  |
|   isDownload    | Boolean |  是否展示下载图标   |  true  |

### 效果

![44](./examples/assets/44.jpg)


