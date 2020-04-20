import Vue from 'vue'
import Vuex from 'vuex'

import { images } from '../demo';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    images: [],
    bufferImages: images,
    bufferSelected: images,
  },
  getters: {
    hasBufferSelected(state) {
      return !!state.bufferSelected.length;
    },
    isBufferSelectedAll(state) {
      return (state.bufferImages.length === state.bufferSelected.length);
    },
  },
  mutations: {
    bufferSelect(state, image) {
      if (state.bufferSelected.includes(image)) {
        state.bufferSelected = state.bufferSelected.filter((im) => im !== image);
      } else {
        state.bufferSelected = state.bufferSelected.concat([image]);
      }
    },
    bufferSelectAll(state) {
      if (state.bufferImages.length === state.bufferSelected.length) {
        state.bufferSelected = [];
      } else {
        state.bufferSelected = [...state.bufferImages];
      }
    },
    bufferRemove(state) {
      state.bufferImages = state.bufferImages.filter((im) => !state.bufferSelected.includes(im));
      state.bufferSelected = [];
    },
    append(state) {
      const selected = state.bufferImages.filter((im) => state.bufferSelected.includes(im));
      state.images = state.images.concat(selected);
      this.commit('bufferRemove');
    },
    insert(state, idx) {
      const selected = state.bufferImages.filter((im) => state.bufferSelected.includes(im));
      state.images.splice(idx, 0, ...selected);
      this.commit('bufferRemove');
    },
    cutIndex(state, idx) {
      const cutted = state.images.splice(idx, 1);
      state.bufferImages = state.bufferImages.concat(cutted);
      state.bufferSelected = state.bufferSelected.concat(cutted);
    },
    addImages(state, imgs) {
      imgs.filter(Boolean).forEach((img) => {
        state.images.push({
          src: img.src,
          width: img.width,
          height: img.height,
          ratio: img.width / img.height,
          layout: {},
        });
      });
    },
  },
  actions: {
  },
})
