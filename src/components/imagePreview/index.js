import ImagePrview from './src/index.vue';

// eslint-disable-next-line func-names
ImagePrview.install = function(Vue) {
  // 全局注册组件
  Vue.component(ImagePrview.name, ImagePrview);
};

export default ImagePrview;
