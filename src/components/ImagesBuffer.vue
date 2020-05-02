<template>
  <div class="buffer" v-if="images.length">
    <div class="panel">
      <div class="actions">
        <button @click="bufferSelectAll"><span :class="{checkbox: true, checked: isSelectedAll}"></span> {{ isSelectedAll ? 'Reset Selection' : `Select All (${images.length})` }}</button>
        <button @click="appendBuffer" :disabled="!hasSelected">Add Selected ({{ selected.length }})</button>
        <button @click="bufferRemove" :disabled="!hasSelected">Remove Selected ({{ selected.length }})</button>
        <div class="status">
          Selected {{ selected.length }} of {{ images.length }}
        </div>
      </div>
      <div class="list">
        <img v-for="image in images" :key="image.src" :src="image.src" @click="select($event, image)" :class="{image: true, selected: selected.includes(image)}">
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
        bufferSelectAll: 'bufferSelectAll',
        bufferRemove: 'bufferRemove',
        appendBuffer: 'appendBuffer',
      }),
      select(e, image) {
        const idx = this.images.indexOf(image);
        if (e.shiftKey) {
          const range = (this._selectStart < idx ? [this._selectStart + 1, idx] : [idx, this._selectStart - 1]);
          this.$store.commit('bufferSelectRange', range);
        } else {
          this._selectStart = idx;
          this.$store.commit('bufferSelect', image);
        }
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
  .actions .status {
    align-self: center;
    margin-left: auto;
    margin-right: 8px;
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