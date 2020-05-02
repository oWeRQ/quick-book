import Vue from 'vue'
import Vuex from 'vuex'

import { immutableToggle } from '../functions';
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
      state.bufferSelected = immutableToggle(state.bufferSelected, image);
    },
    bufferSelectRange(state, [start, end]) {
      for (let i = start; i <= end; i++) {
        this.commit('bufferSelect', state.bufferImages[i]);
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
      state.images = [...state.images, ...selected];
      this.commit('bufferRemove');
    },
    insert(state, idx) {
      const selected = state.bufferImages.filter((im) => state.bufferSelected.includes(im));
      state.images = [...state.images.slice(0, idx), ...selected, ...state.images.slice(idx)];
      this.commit('bufferRemove');
    },
    cutImage(state, image) {
      state.images = state.images.filter((im) => im !== image);
      state.bufferImages = [...state.bufferImages, image];
      state.bufferSelected = [...state.bufferSelected, image];
    },
    addImages(state, imgs) {
      const images = imgs.filter(Boolean).map((img) => ({
        src: img.src,
        width: img.width,
        height: img.height,
        ratio: img.width / img.height,
        layout: {},
      }));

      state.images = [...state.images, ...images];
    },
  },
  actions: {
  },
})
