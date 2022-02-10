<template>
  <div class="ha-image-preview_content" @mousewheel="handleMousewheel">
    <div class="iconfont ha-image-preview_close" @click.stop="$emit('close')">&#xe724;</div>
    <img :src="childProp.url" alt="" :style="bgStyle"/>
    <div class="ha-image-preview_toolbar" v-if="childProp.isShowToolBar">
      <tool-bar @zoom="handleZoom" @spin="handleSpin" @scale-to-original="handleRecoverScale" />
    </div>
  </div>
</template>

<script>
import { addEvent, removeEvent } from '@utils/dom-event.js';
import { throttle } from '@utils/debounce-throttle.js';
import ToolBar from './toolBar';
export default {
  name: 'preview',
  components: {
    ToolBar
  },
  inject: ['childProp'],
  data() {
    return {
      imgSize: 1, // 图片默认大小
      degree: 0 // 图片初始角度
    };
  },
  computed: {
    bgStyle() {
      return {
        transform: `scale(${this.imgSize}) rotate(${this.degree}deg)`
      };
    }
  },
  mounted() {
    // 挂载后，绑定
    addEvent(window, 'keyup', this.handleEscape);
    // 鼠标滚动：+ 向前滚动，- 向后滚动
    this.throttleMousewheel = throttle(this.handleMousewheel, 60);
    addEvent(this.$refs.image, 'mousewheel', this.throttleMousewheel);
  },
  beforeDestroy() {
    removeEvent(window, 'keyup', this.handleEscape);
    removeEvent(this.$refs.image, 'mousewheel', this.throttleMousewheel);
  },
  methods: {
    // 鼠标滚轮缩放
    handleMousewheel(e) {
      if (!this.childProp.isMouseWheel) return;
      const delta = e.wheelDelta;
      const degree = delta < 0 ? 0.21 : -0.21;
      this.handleZoom(degree);
    },
    // esc键退出图片预览
    handleEscape(e) {
      if (!this.childProp.closeOnPressEscape) return;
      const key = e.which || e.keyCode;
      if (key === 27) {
        this.$emit('close');
      }
    },
    // 点击缩放
    handleZoom(num) {
      num = window.parseFloat(num);
      if (((this.imgSize + num) < 0 && num < 0)) {
        return;
      }
      this.imgSize += num;
    },
    // 图片旋转
    handleSpin(num) {
      this.degree += num;
    },
    // 恢复原有尺寸
    handleRecoverScale() {
      this.imgSize = 1; // 图片默认大小
      this.degree = 0; // 图片初始角度
    }
  }
};
</script>

<style scoped lang="less">
.ha-image-preview_content {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  text-align: center;
  .ha-image-preview_close{
    top: 1.0417vw;
    right: 1.0417vw;
    font-size: 35px;
    color: #fff;
    position: absolute;
    z-index: 5;
    cursor: pointer;
  }
  .ha-image-preview_toolbar{
    position: absolute;
    bottom: 2.6042vw;
    left: 50%;
    transform: translateX(-50%);
  }
  img {
    height: 100%;
    transition: transform 0.3s ease 0s;
  }
}
</style>
