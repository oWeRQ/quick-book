<template>
  <div id="app">
    <Pages :images="images" />
  </div>
</template>

<script>
  import Pages from './components/Pages.vue'

  export default {
    name: 'App',
    data() {
      return {
        images: [
          {src: 'demo/abstract-activity-art-background-640x640.jpg', width: 640, height: 640},
          {src: 'demo/aerial-shot-of-a-building-640x800.jpg', width: 640, height: 800},
          {src: 'demo/bird-s-eye-view-of-desert-640x426.jpg', width: 640, height: 426},
          {src: 'demo/brown-sand-640x959.jpg', width: 640, height: 959},
          {src: 'demo/brown-tabby-cat-sitting-on-brown-wooden-stool-640x799.jpg', width: 640, height: 799},
          {src: 'demo/cars-on-road-640x960.jpg', width: 640, height: 960 },
          {src: 'demo/delicate-arch-2-640x480.jpg', width: 640, height: 480},
          {src: 'demo/delicate-arch-639x852.jpg', width: 639, height: 852},
          {src: 'demo/droplets-639x426.jpg', width: 639, height: 426},
          {src: 'demo/empty-asphalt-road-between-trees-640x853.jpg', width: 640, height: 853},
          {src: 'demo/falling-gras-638x438.jpg', width: 638, height: 438},
          {src: 'demo/gray-high-rise-building-640x799.jpg', width: 640, height: 799},
          {src: 'demo/hand-touching-glass-640x946.jpg', width: 640, height: 946 },
          {src: 'demo/high-rise-building-640x959.jpg', width: 640, height: 959},
          {src: 'demo/nature-photography-of-waterfall-640x958.jpg', width: 640, height: 958},
          {src: 'demo/person-touching-cup-of-coffee-and-plate-with-food-640x960.jpg', width: 640, height: 960},
          {src: 'demo/photo-of-trees-during-night-640x425.jpg', width: 640, height: 425},
          {src: 'demo/red-neon-hand-sign-640x671.jpg', width: 640, height: 671 },
          {src: 'demo/tokyo05-2-639x852.jpg', width: 639, height: 852},
          {src: 'demo/trees-on-mountain-640x852.jpg', width: 640, height: 852},
          {src: 'demo/wanna-beer-640x480.jpg', width: 640, height: 480},
          {src: 'demo/wood-relaxation-summer-bed-640x960.jpg', width: 640, height: 960},
        ],
      };
    },
    components: {
      Pages
    }
  }
</script>

<style>
  body {
    margin: 16px;
    font: 14px Roboto, sans-serif;
    background: #eee;
  }
</style>
