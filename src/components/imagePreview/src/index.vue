<template>
    <div>
      <img :src="url" @click="handleShowPreview" />
      <Preview
        v-if="isShowImg"
        @close="isShowImg = false"
      />
    </div>
</template>

<script>
import Preview from './preview';
export default {
  name: 'image-ipreview',
  // 避免传入多个prop
  provide() {
    return {
      'childProp': this
    };
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
    },
    isMouseWheel: {
      type: Boolean,
      default: false
    },
    downloadName: {
      type: String,
      default: '下载图片'
    },
    isDownload: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isShowImg: false
    };
  },
  components: {
    Preview
  },
  methods: {
    handleShowPreview() {
      this.isShowImg = true;
    }
  }
};
</script>

