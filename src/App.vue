<template>
  <head>
    <title>H2D</title>
  </head>
  <H2DView></H2DView>
</template>

<script>
  import H2DView from './views/H2DView.vue'

  export default {
    components: {
      H2DView
    }
  }
</script>

<style>
  body {
    min-width: 800px;
    width: auto !important;
    width:800px;
    background-color: black;
  }
</style>