<template>
    <div>
        <img :src="url" @click="handleShowPreview" />
        <Preview
            :url="url"
            :closeOnPressEscape="closeOnPressEscape"
            :isShowToolBar="isShowToolBar"
            :isMouseWheel="isMouseWheel"
            v-if="isShowImg"
            @close="isShowImg = false"
        />
    </div>
</template>

<script>
import Preview from './preview';
export default {
  name: 'image-preview',
  provide: {
    childProp: this
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
  created() {

  },
  mounted() {

  },
  methods: {
    handleShowPreview() {
      this.isShowImg = true;
      this.$nextTick(() => {
        this.provide = {
          childProp: this
        };
      });
    }
  }
};
</script>

