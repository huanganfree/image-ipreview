import ImagePrview from './components/imagePreview/index.js';

const components = [
  ImagePrview
];

// 目的就是注册为全局组件
const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) { // 原生script tag引入方式
  install(window.Vue);
}

export default {
  install,
  ImagePrview
};
