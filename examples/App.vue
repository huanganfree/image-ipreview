<template>
  <div id="app">
    <image-ipreview
     :url="require('./assets/logo.png')"
     :isMouseWheel="true"
     :isShowToolBar="true"
     :closeOnPressEscape="true"
     :isDownload="true"
    />
  </div>
</template>

<script>

export default {
  name: 'App'
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
