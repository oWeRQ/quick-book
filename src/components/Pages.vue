<template>
  <div class="pageList">
    <div v-for="(page, index) in pages" :key="index" class="page">
      <PageImage v-for="image in page.images" :key="image.src" :image="image" />
    </div>
  </div>
</template>

<script>
  import PageLayout from '../PageLayout';
  import PageImage from './PageImage';

  var layout = new PageLayout(210, 297, 4, {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  });

  export default {
    props: ['images'],
    computed: {
      pages() {
        return layout.process(this.images, 6);
      }
    },
    components: {
      PageImage,
    }
  }
</script>

<style>
  .page {
    position: relative;
    float: left;
    margin: 5mm;
    width: 210mm;
    height: 297mm;
    box-shadow: 0 0 2mm rgba(0,0,0,.2);
  }
</style>