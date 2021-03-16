<template>
  <div v-if="url">
    <img :src="url" @click="isShowImg = true" />
    <div class="preview-modal-wrapper" v-show="isShowImg">
      <div class="preview-modal">
        <div class="preview-header"><span @click="isShowImg = false">x</span></div>
        <div class="preview-modal-body" ref="image" :style="{background: `url(${url}) no-repeat center/${bgSize}%`, transform: `rotate(${degree}deg)`}" />
        <div class="preview-toolbar" v-if="isShowToolBar">
          <tool-bar @zoom="handleZoom" @spin="handleSpin" :imgUrl="url" :isDownload="true"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addEvent, removeEvent } from '../../../utils/domEvent.js';
import ToolBar from './toolBar';
export default {
  name: 'image-preview',
  components: {
    ToolBar
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    isShowToolBar: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isShowImg: false,
      bgSize: 50, // 背景图片默认大小
      degree: 0
    };
  },
  mounted() {
    // 挂载后，绑定
    addEvent(window, 'keyup', this.handleEscape);
    // 鼠标滚动：120向前滚动，-120向后滚动
    addEvent(this.$refs.image, 'mousewheel', this.handleMousewheel);
  },
  beforeDestroy() {
    removeEvent(window, 'keyup', this.handleEscape);
  },
  methods: {
    handleMousewheel(e) {
      const delta = e.wheelDelta;
      const data = {
        '120': 15,
        '-120': -15
      };
      this.handleZoom(data[delta]);
    },
    handleEscape(e) {
      if (!this.closeOnPressEscape) return;
      const key = e.which || e.keyCode;
      if (key === 27) {
        this.isShowImg = false;
      }
    },
    // 图片缩放
    handleZoom(num) {
      num = window.parseFloat(num);
      if ((this.bgSize <= 15 && num < 0) || (this.bgSize >= 230 && num > 0)) return;
      this.bgSize += num;
    },
    // 图片旋转
    handleSpin(num) {
      this.degree += num;
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
