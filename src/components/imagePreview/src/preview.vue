<template>
  <div
    class="ha-image-preview_content"
    @mousewheel.stop="handleMousewheel"
  >
    <div class="iconfont ha-image-preview_close" @click.stop="$emit('close')">
      &#xe724;
    </div>
    <div
      class="ha-image-preview_viewer"
      @mouseup.stop="handlePreviewViewerMouseUp"
      @mousedown.stop="handlePreviewViewerMouseDown"
      ref="preview_viewer"
      draggable="false"
    >
      <img
        :src="childProp.url"
        alt=""
        :style="previewImageStyle"
        ref="previewImage"
        draggable="false"
        @mousedown="handlePreviewImageMouseDown"
      />
    </div>
    <div class="ha-image-preview_toolbar" v-if="childProp.isShowToolBar">
      <tool-bar
        @zoom="handleZoom"
        @spin="handleSpin"
        @scale-to-onePercent="handleRecoverScale"
        @original-size="handleOriginalSize"
      />
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
      degree: 0, // 图片初始角度
      heightValue: '100%',
      marginLeft: 0,
      marginTop: 0
    };
  },
  computed: {
    previewImageStyle() {
      // 计算属性：一般用于style，class的绑定
      return {
        transform: `scale(${this.imgSize}) rotate(${this.degree}deg)`,
        height: this.heightValue,
        marginLeft: this.marginLeft + 'px',
        marginTop: this.marginTop + 'px'
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
      if (this.imgSize + num < 0 && num < 0) {
        return;
      }
      this.imgSize += num;
    },
    // 图片旋转
    handleSpin(num) {
      this.degree += num;
    },
    // 恢复1:1尺寸
    handleRecoverScale() {
      this.imgSize = 1; // 图片默认大小
      this.degree = 0; // 图片初始角度
      this.heightValue = '100%';
      this.marginTop = this.marginLeft = 0;
    },
    // 鼠标按下蒙层
    handlePreviewViewerMouseDown(e) {
      this.PreviewViewerMouseDown = e;
    },
    // 鼠标弹起于蒙层
    handlePreviewViewerMouseUp(e) {
      const flag1 = this.PreviewViewerMouseDown.target.classList.contains('ha-image-preview_viewer');
      const flag2 = e.target.classList.contains('ha-image-preview_viewer');
      if (flag1 && flag2) { // 判断鼠标按下，和弹起两个时刻是否作用在同一个目标元素上
        this.$emit('close');
      }
      this.$refs.preview_viewer.onmousemove = null;
    },
    // 恢复图片原有尺寸
    handleOriginalSize() {
      this.heightValue = '';
      this.imgSize = 1; // 图片默认大小
      this.degree = 0; // 图片初始角度
      this.marginTop = this.marginLeft = 0;
    },
    // 预览图鼠标按下
    handlePreviewImageMouseDown(e) {
      this.clientX = e.clientX;
      this.clientY = e.clientY;
      const marginTop = this.marginTop; // 鼠标按下之时，记录当前图片的位置信息。
      const marginLeft = this.marginLeft;
      this.$refs.preview_viewer.onmousemove = (ev) => {
        ev.stopPropagation();
        this.marginTop = ev.clientY - this.clientY + marginTop;
        this.marginLeft = ev.clientX - this.clientX + marginLeft;
      };
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
  .ha-image-preview_viewer {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .ha-image-preview_close {
    top: 1.0417vw;
    right: 1.0417vw;
    font-size: 35px;
    color: #fff;
    position: absolute;
    z-index: 5;
    cursor: pointer;
  }
  .ha-image-preview_toolbar {
    position: absolute;
    bottom: 2.6042vw;
    left: 50%;
    transform: translateX(-50%);
  }
  img {
    transition: transform 0.3s ease 0s;
    cursor: move;
  }
}
</style>
