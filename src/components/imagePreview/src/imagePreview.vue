<template>
  <div v-if="url">
    <img :src="url" @click="isShowImg = true" />
    <div class="preview-modal-wrapper" v-show="isShowImg">
      <div class="preview-modal">
        <div class="preview-header"><span @click="isShowImg = false">x</span></div>
        <div class="preview-modal-body" :style="{background: `url(${url}) no-repeat center/${bgSize}%`, transform: `rotate(${degree}deg)`}" />
        <div class="preview-toolbar" v-if="isShowToolBar">
          <tool-bar @zoom="handleZoom" @spin="handleSpin" :imgUrl="url"/>
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
  },
  beforeDestroy() {
    removeEvent(window, 'keyup', this.handleEscape);
  },
  methods: {
    handleEscape(e) {
      if (!this.closeOnPressEscape) return;
      const key = e.which || e.keyCode;
      if (key === 27) {
        this.isShowImg = false;
      }
    },
    handleZoom(num) {
      this.bgSize += num;
    },
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
      right: -20px;
    }
  }
}
</style>
