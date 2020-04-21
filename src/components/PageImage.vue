<template>
  <div class="wrap" :style="style" @click="$emit('click', $event)">
    <img :src="item.image.src">
    <div v-if="canAdd" class="action before" @click="$emit('before')">+</div>
    <div v-if="canAdd" class="action after" @click="$emit('after')">+</div>
    <div v-if="canCut" class="action cut" @click="$emit('cut')">Cut</div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'canAdd', 'canCut'],
    computed: {
      style() {
        return {
          left: this.item.left + 'mm',
          top: this.item.top + 'mm',
          width: this.item.width + 'mm',
          height: this.item.height + 'mm',
        };
      }
    },
  }
</script>

<style scoped>
  .wrap {
    position: absolute;
    transition: all 300ms linear;
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
    left: -8px;
    top: calc(50% - 24px);
    line-height: 44px;
    font-size: 32px;
  }
  .after {
    right: -8px;
    top: calc(50% - 24px);
    line-height: 44px;
    font-size: 32px;
  }
  .cut {
    left: calc(50% - 32px);
    bottom: 0;
    width: 64px;
    height: 32px;
    line-height: 32px;
    border-radius: 2px;
  }
</style>