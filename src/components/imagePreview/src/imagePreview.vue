<template>
  <div v-if="url">
    <img :src="url" @click="isShowImg = true" />
    <div class="preview-modal-wrapper" v-show="isShowImg">
      <div  class="preview-modal">
        <div class="preview-header" @click="isShowImg = false">x</div>
        <div class="preview-modal-body">
          <img :src="url" @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp" ref="image"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addEvent, removeEvent } from '../../../utils/domEvent.js';
export default {
  name: 'image-preview',
  props: {
    url: {
      type: String,
      default: ''
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShowImg: false
    };
  },
  mounted() {
    // 挂载后，绑定
    addEvent(window, 'keyup', this.handleEscape);
  },
  beforeDestroy() {
    removeEvent(window, 'keyup');
  },
  methods: {
    handleEscape(e) {
      if (!this.closeOnPressEscape) return;
      const key = e.which || e.keyCode;
      if (key === 27) {
        this.isShowImg = false;
      }
    }
  }
};
</script>

<style scoped lang="less">
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
      cursor: pointer;
      text-align: right;
    }
    .preview-modal-body {
      img {
        width: 100%;
      }
    }
  }
}
</style>
