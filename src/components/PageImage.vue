<template>
  <img :src="image.src" :style="style">
</template>

<script>
  export default {
    props: ['image'],
    computed: {
      style() {
        return {
          left: this.image.layout.left + 'mm',
          top: this.image.layout.top + 'mm',
          width: this.image.layout.width + 'mm',
          height: this.image.layout.height + 'mm',
        };
      }
    },
  }
</script>

<style>
  img {
    position: absolute;
  }
</style>