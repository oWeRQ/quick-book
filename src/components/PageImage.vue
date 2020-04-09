<template>
  <div class="wrap" :style="style">
    <img :src="image.src">
    <div class="action before" @click="$emit('before')">Add</div>
    <div class="action after" @click="$emit('after')">Add</div>
    <div class="action cut" @click="$emit('cut')">Cut</div>
  </div>
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

<style scoped>
  .wrap {
    position: absolute;
    transition: linear 300ms;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .action {
    z-index: 1;
    position: absolute;
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    text-transform: uppercase;
    color: white;
    background: black;
    border-radius: 100%;
    box-shadow: 0 2px 8px rgba(0,0,0,.2);
    user-select: none;
    cursor: pointer;
    opacity: 0;
    transform: scale(.1);
  }
  .wrap:hover .action {
    opacity: 0.4;
    transform: scale(1);
    transition: opacity 600ms, transform 300ms;
  } 
  .wrap .action:hover {
    opacity: 0.8;
  }

  .before {
    left: -24px;
    top: calc(50% - 24px);
  }
  .after {
    right: -24px;
    top: calc(50% - 24px);
  }
  .cut {
    left: calc(50% - 24px);
    bottom: -24px;
  }
</style>