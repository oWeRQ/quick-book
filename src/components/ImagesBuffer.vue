<template>
  <div class="buffer" v-if="images.length">
    <div class="panel">
      <div class="actions">
        <button @click="selectAll">Select All</button>
        <button @click="add">Add Selected</button>
        <button @click="remove">Remove Selected</button>
      </div>
      <div class="list">
        <img v-for="image in images" :key="image.src" :src="image.src" @click="select(image)" :class="{image: true, selected: value.includes(image)}">
      </div>
    </div>
  </div>
</template>

<script>
  import { images } from '../demo';

  export default {
    props: {
      value: Array,
    },
    data() {
      return {
        images,
      };
    },
    watch: {
      value(newValue, oldValue) {
        const added = newValue.filter((im) => !this.images.includes(im));
        const removed = oldValue.filter((im) => !newValue.includes(im));

        this.images = this.images.filter((im) => !removed.includes(im)).concat(added);
      },
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
        this.$emit('input', []);
      },
      remove() {
        this.images = this.images.filter((im) => !this.value.includes(im));
      },
    },
  }
</script>

<style scoped>
  .buffer {
    margin-top: 220px;
  }
  .panel {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f6f6f6;
    border-top: 1px solid #ccc;
    box-shadow: 0 0 8px rgba(0, 0, 0, .2);
  }
  .actions {
    display: flex;
    margin-bottom: 4px;
    border-bottom: 1px solid #ccc;
  }
  .actions button {
    padding: 8px 16px;
    font-size: 14px;
    color: #333;
    background: linear-gradient(to bottom, #f6f6f6, #ededed);
    border: none;
    border-right: 1px solid #ccc;
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