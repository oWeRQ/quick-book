<template>
  <div class="buffer" v-if="images.length">
    <div class="actions">
      <button @click="selectAll">Select All</button>
      <button @click="add">Add Selected</button>
    </div>
    <div class="list">
      <img v-for="image in images" :key="image.src" :src="image.src" @click="select(image)" :class="{image: true, selected: value.includes(image)}">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: Array,
    },
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
        ].map((image) => Object.freeze({
          ...image,
          ratio: image.width / image.height,
        })).sort(() => Math.random() - 0.5),
      };
    },
    methods: {
      selectAll() {
        if (this.images.length === this.value.length) {
          this.$emit('input', []);
        } else {
          this.$emit('input', [...this.images]);
        }
      },
      select(image) {
        if (this.value.includes(image)) {
          this.$emit('input', this.value.filter((im) => im !== image));
        } else {
          this.$emit('input', this.value.concat([image]));
        }
      },
      add() {
        this.images = this.images.filter((im) => !this.value.includes(im));
        this.$emit('add', this.value);
      },
    },
  }
</script>

<style>
  .buffer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f6f6f6;
    border-top: 1px solid #ccc;
    box-shadow: 0 0 8px rgba(0, 0, 0, .2);
  }
  .actions {
    padding: 8px;
    border-bottom: 1px solid #ccc;
  }
  .actions button {
    margin-right: 8px;
    padding: 8px 16px;
    font-size: 14px;
    color: #333;
    background: linear-gradient(to bottom, #f6f6f6, #ededed);
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 0 white;
  }
  .list {
    overflow-x: scroll;
    display: flex;
    background: white;
  }
  .image {
    margin: 4px;
    height: 120px;
    opacity: .8;
    cursor: pointer;
  }
  .image:hover {
    opacity: 1;
  }
  .image.selected {
    opacity: 1;
    outline: 3px solid #00f;
  }
</style>