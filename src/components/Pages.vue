<template>
  <div class="pages">
    <Pagination :total="pages.length" v-model="offset" />
    <div class="book">
      <div v-for="(page, index) in visiblePages" :key="index" class="page" :style="pageStyle">
        <PageImage v-for="image in page.images" :key="image.src" :image="image" @before="before(image)" @after="after(image)" @cut="cut(image)" />
      </div>
    </div>
    <div class="buffer">
      <img v-for="image in buffer" :key="image.src" :src="image.src">
    </div>
  </div>
</template>

<script>
  import PageLayout from '../PageLayout';
  import PageImage from './PageImage';
  import Pagination from './Pagination';

  const scale = 0.6;
  const width = 210 * scale;
  const height = 297 * scale;

  const layout = new PageLayout(width, height, 4 * scale, {
    top: 10 * scale,
    right: 10 * scale,
    bottom: 10 * scale,
    left: 10 * scale,
  });

  export default {
    props: ['images'],
    data() {
      return {
        offset: 0,
        buffer: [],
      };
    },
    computed: {
      pageStyle() {
        return {
          width: width + 'mm',
          height: height + 'mm',
        };
      },
      pages() {
        return layout.process(this.images, 6);
      },
      visiblePages() {
        return this.pages.slice(this.offset * 2, this.offset * 2 + 2);
      },
    },
    methods: {
      before(image) {
        const idx = this.images.indexOf(image);
        this.images.splice(idx, 0, ...this.buffer);
        this.buffer = [];
      },
      after(image) {
        const idx = this.images.indexOf(image);
        this.images.splice(idx + 1, 0, ...this.buffer);
        this.buffer = [];
      },
      cut(image) {
        const idx = this.images.indexOf(image);
        this.buffer = this.buffer.concat(this.images.splice(idx, 1));
      }
    },
    components: {
      PageImage,
      Pagination,
    }
  }
</script>

<style scoped>
  .book {
    display: flex;
    justify-content: center;
  }
  .page {
    position: relative;
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,.2);
  }
  .buffer {
    display: flex;
    justify-content: center;
    margin: 16px auto;
  }
  .buffer > * {
    margin: 0 4px;
    height: 120px;
  }
</style>