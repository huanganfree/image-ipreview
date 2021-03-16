<template>
  <ul>
    <li class="iconfont narrow" @click="$emit('zoom', -15)">&#xe683;</li>
    <li class="iconfont magnify" @click="$emit('zoom', 15)">&#xe684;</li>
    <li class="iconfont spin" @click="$emit('spin', 90)">&#xe741;</li>
    <a class="iconfont download" :href="imgUrl" :download="getImgName">&#xe66c;</a>
  </ul>
</template>

<script>
import { strSplit } from '../../../utils/data-util.js';
export default {
  name: 'tool-bar',
  props: {
    imgUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  computed: {
    getImgName() {
      let imgName = strSplit(strSplit(this.imgUrl, '/')[2], '.')[0];
      return imgName;
    }
  },
  components: {},
  methods: {}
};
</script>
<style lang='less' scoped>
ul,li{
    list-style: none;
    margin: 0;
}

ul{
    padding-left: 12px;
}
a{
    text-decoration: none;
}
li, a{
    color: #ddd;
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0;
    cursor: pointer;
}

</style>
