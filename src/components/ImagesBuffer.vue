<template>
  <div class="buffer" v-if="images.length">
    <div class="panel">
      <div class="actions">
        <button @click="selectAll"><span :class="{checkbox: true, checked: isSelectedAll}"></span> Select All</button>
        <button @click="append" :disabled="!hasSelected">Add Selected</button>
        <button @click="remove" :disabled="!hasSelected">Remove Selected</button>
      </div>
      <div class="list">
        <img v-for="image in images" :key="image.src" :src="image.src" @click="select(image)" :class="{image: true, selected: selected.includes(image)}">
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapState({
        images: 'bufferImages',
        selected: 'bufferSelected',
      }),
      ...mapGetters({
        hasSelected: 'hasBufferSelected',
        isSelectedAll: 'isBufferSelectedAll',
      }),
    },
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
  .actions button[disabled] {
    color: #999;
  }
  .list {
    overflow-x: scroll;
    display: flex;
    padding: 6px;
    background: white;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, .2);
  }
  .image {
    margin: 6px;
    height: 120px;
    opacity: .8;
    cursor: pointer;
  }
  .image:hover {
    opacity: 1;
  }
  .image.selected {
    opacity: 1;
    outline: 4px solid #3584e4;
  }
  .checkbox {
    display: inline-block;
    vertical-align: middle;
    margin-left: -4px;
    margin-right: 8px;
    width: 14px;
    height: 14px;
    background:white;
    border: 1px solid #ccc;
    border-radius: 2px;
  }
  .checkbox.checked::after {
    content: '';
    display: block;
    margin: 2px auto;
    width: 10px;
    height: 10px;
    background: #999;
    border-radius: 1px;
  }
</style>