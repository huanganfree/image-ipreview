<template>
  <div class="preview-modal-wrapper">
    <div class="preview-modal">
      <div class="preview-header"><span @click="$emit('close')">x</span></div>
      <div class="preview-modal-body" ref="image" :style="bgStyle" />
      <div class="preview-toolbar" v-if="childProp.isShowToolBar">
        <tool-bar @zoom="handleZoom" @spin="handleSpin" />
      </div>
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
      bgSize: 50, // 背景图片默认大小
      degree: 0 // 图片初始角度
    };
  },
  computed: {
    bgStyle() {
      return {background: `url(${this.childProp.url}) no-repeat center/${this.bgSize}%`, transform: `rotate(${this.degree}deg)`};
    }
  },
  mounted() {
    // 挂载后，绑定
    addEvent(window, 'keyup', this.handleEscape);
    // 鼠标滚动：+向前滚动，-向后滚动
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
      const degree = delta < 0 ? 15 : -15;
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
      if ((this.bgSize <= 15 && num < 0) || (this.bgSize >= 230 && num > 0)) return;
      this.bgSize += num;
    },
    // 图片旋转
    handleSpin(num) {
      this.degree += num;
      debugger;
      if (this.degree >= 360) this.degree = 0;
    }
  }
};
</script>

<style scoped lang="less">
@import '../../../style/icon.css';
.preview-modal-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  overflow: auto;
  background: rgba(16, 15, 15, 0.4);
  z-index: 1000;
  .preview-modal {
    margin: 0 auto 50px;
    margin-top: 20vh;
    width: 50vw;
    background: #fff;
    border-radius: 2px;
    padding: 20px;
    position: relative;
    .preview-header {
      font-size: 24px;
      text-align: right;
      color: #4c4c4c;
      font-weight: 500;
      span{
        cursor: pointer;
      }
    }
    .preview-modal-body {
      height: 60vh;
    }
    .preview-toolbar{
      position: absolute;
      top: 0;
      right: -23px;
    }
  }
}
</style>
