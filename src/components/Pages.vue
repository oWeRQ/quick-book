<template>
  <div class="pages">
    <Pagination :total="pages.length" v-model="offset" />
    <div class="book" @dragover="dragover($event)" @drop="drop($event)">
      <div v-for="(page, index) in visiblePages" :key="index" class="page" :style="pageStyle">
        <transition-group name="image">
          <PageImage class="image" v-for="item in page.items" :key="item.image.src" :item="item" :canAdd="!!buffer.length" @before="before(item.image)" @after="after(item.image)" @cut="cut(item.image)" />
        </transition-group>
        <div class="rate">Rate: {{ page.rate.toFixed(2) }}</div>
      </div>
      <div v-if="isNewPage" class="page" :style="pageStyle">
        <div class="add" @click="add()">+</div>
      </div>
    </div>
    <div class="buffer">
      <img v-for="image in buffer" :key="image.src" :src="image.src" @click="add(image)">
    </div>
  </div>
</template>

<script>
  import PageLayout from '../PageLayout';
  import PageImage from './PageImage';
  import Pagination from './Pagination';

  function selectFile(multiple) {
    return new Promise(function(resolve, reject) {
      try {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = multiple || false;
        input.onchange = (e)  => resolve(e.target.files || []);
        input.click();
      } catch (ex) {
        reject(ex);
      }
    });
  }

  function loadImage(url) {
    return new Promise(function(resolve, reject) {
      try {
        const img = document.createElement('img')
        img.src = url;
        img.onload = () => resolve(img);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  function loadFiles(files) {
    return Promise.all([...files].map((file) => loadImage(URL.createObjectURL(file))));
  }

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
    props: ['buffer'],
    data() {
      return {
        offset: 0,
        images: [],
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
        return layout.process(this.images);
      },
      visiblePages() {
        return this.pages.slice(this.offset * 2, this.offset * 2 + 2);
      },
      isNewPage() {
        return this.offset === (this.pages.length - this.pages.length % 2) / 2;
      },
    },
    methods: {
      gotoPage(page) {
        page = Math.max(0, Math.min(page, this.pages.length - 1));
        this.offset = Math.floor(page / 2);
      },
      goto(image) {
        this.gotoPage(this.pages.findIndex((page) => page.images.includes(image)));
      },
      before(image) {
        const idx = this.images.indexOf(image);
        this.images.splice(idx, 0, ...this.buffer);
        this.buffer = [];
        this.goto(this.images[idx]);
      },
      after(image) {
        const idx = this.images.indexOf(image);
        this.images.splice(idx + 1, 0, ...this.buffer);
        this.buffer = [];
        this.goto(this.images[idx + 1]);
      },
      cut(image) {
        const idx = this.images.indexOf(image);
        this.buffer = this.buffer.concat(this.images.splice(idx, 1));
        this.goto(this.images[idx - 1]);
      },
      add(image) {
        if (image) {
          const idx = this.buffer.indexOf(image);
          this.buffer.splice(idx, 1);
          this.images.push(image);
          this.goto(image);
        } else if (this.buffer.length) {
          this.after(this.images[this.images.length - 1]);
        } else {
          selectFile(true).then(this.addFiles);
        }
      },
      dragover(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
      },
      drop(e) {
        e.preventDefault();
        loadImage(e.dataTransfer.getData('text')).then((img) => this.addImages([img]));
        this.addFiles(e.dataTransfer.files);
      },
      addFiles(files) {
        loadFiles(files).then((imgs) => {
          const lastImage = this.images[this.images.length - 1];
          this.addImages(imgs);
          this.goto(lastImage);
        });
      },
      addImages(imgs) {
        imgs.forEach((img) => {
          this.images.push({
            src: img.src,
            width: img.width,
            height: img.height,
            ratio: img.width / img.height,
            layout: {},
          });
        });
      },
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
    flex-wrap: wrap;
  }
  @media (max-width: 480px) {
    .book {
      margin-bottom: -400px;
      transform: scale(.7);
      transform-origin: center top;
    }
  }
  .page {
    flex-shrink: 0;
    position: relative;
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,.2);
  }
  .buffer {
    overflow-x: scroll;
    display: flex;
    justify-content: center;
    margin: 32px auto;
  }
  .buffer > * {
    margin: 4px;
    height: 120px;
    opacity: .8;
    cursor: pointer;
  }
  .buffer > :hover {
    opacity: 1;
  }
  .image {
    transform: scale(1);
    transform-origin: center bottom;
  }
  .image-enter,
  .image-leave-to {
    transform: scale(0);
  }
  .add {
    position: absolute;
    left: calc(50% - 36px);
    top: calc(50% - 36px);
    width: 72px;
    height: 72px;
    line-height: 68px;
    font-size: 48px;
    text-align: center;
    text-transform: uppercase;
    color: white;
    background: black;
    border-radius: 100%;
    box-shadow: 0 2px 8px rgba(0,0,0,.2);
    user-select: none;
    cursor: pointer;
    opacity: 0.4;
  }
  .add:hover {
    opacity: 0.8;
  }
  .rate {
    position: absolute;
    left: 0;
    top: 2px;
    right: 0;
    font-size: 13px;
    text-align: center;
    color: gray;
  }
</style>