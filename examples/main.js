import Vue from 'vue';
import App from './App.vue';
import ImagePreview from '../src/index.js';

Vue.config.productionTip = false;

Vue.use(ImagePreview);

new Vue({
  render: h => h(App)
}).$mount('#app');
