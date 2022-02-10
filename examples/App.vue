<template>
  <div id="app">
    <image-ipreview
     :url="require('./assets/demo.jpeg')"
     :isMouseWheel="true"
     :isShowToolBar="true"
     :closeOnPressEscape="true"
     style="width: 300px;"
    />
  </div>
</template>

<script>

export default {
  name: 'App'
};
</script>

<style>
</style>
