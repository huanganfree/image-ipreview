<template>
  <div v-if="url">
    <img :src="url" @click="isShowImg = true" />
    <div class="preview-modal-wrapper" v-show="isShowImg">
      <div class="preview-modal">
        <div class="preview-header" @click="isShowImg = false">x</div>
        <div class="preview-modal-body">
          <img ref="imgDom" :src="url" @mousedown="handleMouseDown" @mouseup="handleMouseUp" :style="mouseMoveStyle"/>
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
      isShowImg: false,
      imageX: 0,
      imageY: 0,
      isPress: false
    };
  },
  watch: {
    closeOnPressEscape: {
      handler(newVal) {
        if (newVal) {
          addEvent(window, 'keyup', this.handleEscape);
        } else {
          removeEvent(window, 'keyup');
        }
      },
      immediate: true
    }
  },
  beforeDestroy() {
    removeEvent(window, 'keyup');
  },
  computed: {
    mouseMoveStyle() {
      return { position: 'absolute', top: -this.imageY + 'px', left: -this.imageX + 'px' };
    }
  },
  methods: {
    handleEscape(e) {
      const key = e.which || e.keyCode;
      if (key === 27) {
        this.isShowImg = false;
      }
    },
    handleMouseDown() {
      this.isPress = true;
      this.$refs.imgDom.onmousemove = e => {
        const imgDomLeft = this.$refs.imgDom.getBoundingClientRect().left;
        const imgDomTop = this.$refs.imgDom.getBoundingClientRect().top;
        const x = e.pageX;
        const y = e.pageY;
        console.log(x, imgDomLeft);
        this.handleMouseMove({imgDomLeft, imgDomTop, x, y});
      };
    },
    handleMouseMove({ imgDomLeft, imgDomTop, x, y }) {
      console.log(x - imgDomLeft);
      this.imageX = x - imgDomLeft ;
      this.imageY = y - imgDomTop;
    },
    handleMouseUp() {
      this.isPress = false;
      this.$refs.imgDom.onmousemove = null;
      this.imageX = this.imageY = 0;
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
    position: relative;
    margin: 0 auto 50px;
    margin-top: 20vh;
    width: 50vw;
    background: #fff;
    border-radius: 2px;
    padding: 20px;
    .preview-header {
      position: absolute;
      top: 1px;
      right: 7px;
      font-size: 24px;
      cursor: pointer;
    }
    .preview-modal-body {
      position: relative;
      height: 50vh;
      img {
        width: 100%;
      }
    }
  }
}
</style>
