<template>
  <div id="app">
    <Pages />
  </div>
</template>

<script>
  import Pages from './components/Pages.vue'

  export default {
    name: 'App',
    components: {
      Pages,
    },
  }
</script>

<style>
  body {
    margin: 16px;
    font: 14px Roboto, sans-serif;
    background: #eee;
  }
</style>
