<template>
  <div class="buffer" v-if="images.length">
    <div class="panel">
      <div class="actions">
        <button @click="selectAll">Select All</button>
        <button @click="append">Add Selected</button>
        <button @click="remove">Remove Selected</button>
      </div>
      <div class="list">
        <img v-for="image in images" :key="image.src" :src="image.src" @click="select(image)" :class="{image: true, selected: selected.includes(image)}">
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    computed: mapState({
      images: 'bufferImages',
      selected: 'bufferSelected',
    }),
    methods: {
      ...mapMutations({
        select: 'bufferSelect',
        selectAll: 'bufferSelectAll',
        remove: 'bufferRemove',
        append: 'append',
      }),
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