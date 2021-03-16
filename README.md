# image-ipreview
一款基于vue2.x的轻量图片预览插件。

目前支持**缩放，旋转，下载**等功能
（欢迎大家使用~，我会持续迭代）

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

### 效果

![44](src/image/44.jpg)


