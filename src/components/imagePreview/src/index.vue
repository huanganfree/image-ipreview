<template>
  <div class="ha-image-preview">
    <img :src="urlData" alt="" @click.stop="handleShowPreview" />
    <transition name="slide-fade">
      <div v-if="isShowImg" class="ha-image-preview_wrapper">
        <div class="ha-image-preview_mask"></div>
        <Preview @close="handleClosePreview" @switch-image="handleSwitch" :currentImg="this.previewSrcList[this.imgeIndex]" />
      </div>
    </transition>
  </div>
</template>

<script>
import Preview from './preview';
export default {
  name: 'image-ipreview',
  // 避免传入多个prop
  provide() {
    return {
      childProp: this
    };
  },
  props: {
    url: {
      type: String,
      default: '',
      required: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    isShowToolBar: {
      type: Boolean,
      default: true
    },
    isMouseWheel: {
      type: Boolean,
      default: false
    },
    previewSrcList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShowImg: false,
      urlData: this.url,
      imgeIndex: this.previewSrcList.findIndex(item => item === this.url)
    };
  },
  components: {
    Preview
  },
  methods: {
    handleShowPreview() {
      this.isShowImg = true;
      const bodyDOM = document.getElementsByTagName('body')[0];
      bodyDOM.style.overflow = 'hidden';
    },
    handleClosePreview() {
      this.isShowImg = false;
      const bodyDOM = document.getElementsByTagName('body')[0];
      bodyDOM.style.overflow = 'visible';
    },
    handleSwitch(data) {
      this.imgeIndex = this.imgeIndex + data;
      if (this.imgeIndex < 0) {
        this.imgeIndex = this.previewSrcList.length - 1;
      }
      if (this.imgeIndex > this.previewSrcList.length - 1) {
        this.imgeIndex = 0;
      }
    }
  }
};
</script>

<style lang='less' scoped>
@import "../../../style/icon.css";

.ha-image-preview {
  .slide-fade-enter-active {
    transition: all 0.5s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter{
    transform: translateX(-10px);
    opacity: 0;
  }
  .slide-fade-leave-to{
    transform: translateX(15px);
    opacity: 0;
  }

  img {
    width: 100%;
    height: 100%;
  }
  .ha-image-preview_wrapper {
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 2033;
    top: 0;
    left: 0;
    .ha-image-preview_mask {
      opacity: 0.5;
      background: #000;
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: 1;
    }
  }
}
</style>

