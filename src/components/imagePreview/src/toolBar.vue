<template>
  <ul @click.stop>
    <li class="iconfont zoom-out" @click="$emit('zoom', -0.3)">&#xec13;</li>
    <li class="iconfont zoom-in" @click="$emit('zoom', 0.3)">&#xec14;</li>
    <li class="iconfont scale-to-original" @click="$emit('scale-to-original')">&#xe912;</li>
    <li class="iconfont rotate-left" @click="$emit('spin', -90)">&#xe69a;</li>
    <li class="iconfont rotate-right" @click="$emit('spin', 90)">&#xe69b;</li>
  </ul>
</template>

<script>
// import { strSplit } from '../../../utils/data-util.js';
export default {
  name: 'tool-bar',
  inject: ['childProp'],
  data() {
    return {};
  },
  computed: {
    getImgName() {
      if (this.childProp.downloadName) return this.childProp.downloadName;
      // const arr = strSplit(this.childProp.url, '/');
      // let imgName = strSplit(arr[arr.length - 1], '.')[0];
      // return imgName;
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
    display: flex;
    background-color: #606266;
    color: #ddd;
    padding: 10px 30px;
    border-radius: 20px;
}

li{
    font-size: 23px;
    padding:0 10px;
    cursor: pointer;
}

</style>
