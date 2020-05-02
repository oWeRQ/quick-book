import Vue from 'vue'
import Vuex from 'vuex'

import { partition, immutableToggle } from '../functions';
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
        state.bufferSelected = immutableToggle(state.bufferSelected, state.bufferImages[i]);
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
    appendBuffer(state) {
      let selected;
      [state.bufferImages, selected] = partition(state.bufferImages, (im) => !state.bufferSelected.includes(im));
      state.bufferSelected = [];
      state.images = [...state.images, ...selected];
    },
    insertBufferAt(state, idx) {
      let selected;
      [state.bufferImages, selected] = partition(state.bufferImages, (im) => !state.bufferSelected.includes(im));
      state.bufferSelected = [];
      state.images = [...state.images.slice(0, idx), ...selected, ...state.images.slice(idx)];
    },
    beforeImage(state, image) {
      const idx = state.images.indexOf(image);
      this.commit('insertBufferAt', idx);
    },
    afterImage(state, image) {
      const idx = state.images.indexOf(image);
      this.commit('insertBufferAt', idx + 1);
    },
    cutImages(state, images) {
      [state.images, images] = partition(state.images, (im) => !images.includes(im));
      state.bufferImages = [...state.bufferImages, ...images];
      state.bufferSelected = [...state.bufferSelected, ...images];
    },
    addImages(state, imgs) {
      const images = imgs.filter(Boolean).map((img) => ({
        src: img.src,
        width: img.width,
        height: img.height,
        ratio: img.width / img.height,
      }));

      state.images = [...state.images, ...images];
    },
  },
  actions: {
  },
})
