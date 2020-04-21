<template>
  <div class="pages">
    <Pagination :total="pages.length" :near="2" v-model="offset" />
    <div class="book" @dragover="dragover($event)" @drop="drop($event)">
      <div v-for="(page, index) in visiblePages" :key="index" class="page" :style="pageStyle">
        <div class="page-stack" :style="{left: (index % 2 === 0 ? -offset - 2 : pages.length - offset - 1) + 'px'}"></div>
        <transition-group name="image">
          <PageImage :class="{image: true, selected: selected.includes(item.image)}" v-for="item in page.items" :key="item.image.src" :item="item" :canAdd="hasSelected" :canCut="!selected.length || selected.includes(item.image)" @click="select($event, item.image)" @before="before(item.image)" @after="after(item.image)" @cut="cut(item.image)" />
        </transition-group>
        <div class="rate">Rate: {{ page.rate.toFixed(2) }}</div>
      </div>
      <div v-if="hasNewPage" class="page" :style="pageStyle">
        <div class="add" @click="add()">+</div>
      </div>
    </div>
    <div class="count">
      Per page:
      <input type="number" :min="1" :max="max" v-model="min">
      &ndash;
      <input type="number" :min="min" :max="100" v-model="max">
    </div>
    <ImagesBuffer />
  </div>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'

  import PageLayout from '../PageLayout';
  import PageImage from './PageImage';
  import Pagination from './Pagination';
  import ImagesBuffer from './ImagesBuffer';

  import { selectFile, loadImage, loadFiles } from '../functions';

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
    data() {
      return {
        min: 3,
        max: 6,
        offset: 0,
        selected: [],
      };
    },
    computed: {
      ...mapState({
        images: 'images',
      }),
      ...mapGetters({
        hasSelected: 'hasBufferSelected',
      }),
      pageStyle() {
        return {
          width: width + 'mm',
          height: height + 'mm',
        };
      },
      pages() {
        return layout.process(this.images, +this.min, +this.max);
      },
      visiblePages() {
        return this.pages.slice(this.offset, this.offset + 2);
      },
      hasNewPage() {
        return this.offset === (this.pages.length - this.pages.length % 2);
      },
    },
    methods: {
      ...mapMutations({
        append: 'append',
        insert: 'insert',
        cutIndex: 'cutIndex',
        addImages: 'addImages',
      }),
      gotoPage(page) {
        page = Math.max(0, Math.min(page, this.pages.length - 1));
        this.offset = page - page % 2;
      },
      gotoLast() {
        this.goto(this.images[this.images.length - 1]);
      },
      goto(image) {
        this.gotoPage(this.pages.findIndex((page) => page.items.some((item) => item.image === image)));
      },
      before(image) {
        const idx = this.images.indexOf(image);
        this.insert(idx);
        this.goto(this.images[idx]);
      },
      after(image) {
        const idx = this.images.indexOf(image);
        this.insert(idx + 1);
        this.goto(this.images[idx + 1]);
      },
      toggleSelect(image) {
        const selectedIdx = this.selected.indexOf(image);
        if (selectedIdx !== -1) {
          this.selected.splice(selectedIdx, 1);
        } else {
          this.selected.push(image);
        }
      },
      select(e, image) {
        const idx = this.images.indexOf(image);

        if (e.ctrlKey) {
          this._selectStart = idx;
          this.toggleSelect(image);
        } else if (e.shiftKey) {
          const [start, end] = (this._selectStart < idx ? [this._selectStart + 1, idx] : [idx, this._selectStart - 1]);
          for (let i = start; i <= end; i++) {
            this.toggleSelect(this.images[i]);
          }
        }
      },
      cut(image) {
        let idx;

        if (this.selected.length) {
          const selected = this.images.filter((im) => this.selected.includes(im));
          for (let sel of selected) {
            idx = this.images.indexOf(sel);
            this.cutIndex(idx);
          }
          this.selected = [];
        } else {
          idx = this.images.indexOf(image);
          this.cutIndex(idx);
        }
        
        this.goto(this.images[idx - 1]);
      },
      add() {
        const lastImage = this.images[this.images.length - 1];
        if (this.hasSelected) {
          this.append();
        } else {
          selectFile(true).then(this.addFiles);
        }
        this.goto(lastImage);
      },
      dragover(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
      },
      drop(e) {
        e.preventDefault();
        this.addFiles(e.dataTransfer.files);
        loadImage(e.dataTransfer.getData('text')).then((img) => this.addImages([img]));
      },
      addFiles(files) {
        loadFiles(files).then((imgs) => {
          const lastImage = this.images[this.images.length - 1];
          this.addImages(imgs);
          this.goto(lastImage);
        });
      },
    },
    components: {
      ImagesBuffer,
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
  .page:nth-of-type(2n) {
    background: linear-gradient(to right, #ddd, white 8px);
  }
  .page-stack {
    position: absolute;
    z-index: -1;
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(to right, #fff 1px, #fff 2px, #ddd 2px, #ddd 3px);
    border: 1px solid #ddd;
  }
  .image {
    transform: scale(1);
    transform-origin: center bottom;
  }
  .image.selected {
    outline: 4px solid #3584e4;
    transition: outline 0ms;
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
  .count {
    margin: 16px auto;
    text-align: center;
  }
  .count input {
    width: 32px;
  }
</style>