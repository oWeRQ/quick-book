export default class PageLayout {
  constructor(width, height, spacer, paddings) {
    this.width = width;
    this.height = height;
    this.spacer = spacer;

    this.paddings = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...paddings,
    };

    this.availWidth = this.width - this.paddings.left - this.paddings.right + this.spacer;
    this.availHeight = this.height - this.paddings.top - this.paddings.bottom + this.spacer;
    this.availRatio = this.availWidth / this.availHeight;
  }

  process(images, min = 3, max = 6) {
    const pages = [];
    let pageCount;

    for (let i = 0; i < images.length; i += pageCount) {
      const variations = [];

      for (let count = min; count <= max; count++) {
        const rate = this.rateLayout(images.slice(i, i + count));

        for (let next = min; next <= max; next++) {
          const nextImages = images.slice(i + count, i + count + next);
          const nextRate = (nextImages.length === 0 ? 1 : this.rateLayout(nextImages) + (nextImages.length < min ? -1 : 0));

          variations.push({
            count,
            next,
            rate: rate + nextRate,
          });

          if (nextImages.length === 0)
            break;
        }
      }

      variations.sort((a, b) => b.rate - a.rate);

      pageCount = variations[0].count;
      pages.push({
        items: this.createLayout(this.pageRows(images.slice(i, i + pageCount))),
        rate: variations[0].rate,
      });
    }

    return pages;
  }

  pageRows(images) {
    const rows = [];

    const sumRatio = images.reduce((acc, cur) => acc + cur.ratio, 0);
    const rowsCount = Math.round(sumRatio / Math.sqrt(sumRatio * this.availRatio));
    const rowRatioAvg = sumRatio / rowsCount;
    let rowRatio = 0;
    let row = [];

    for (let image of images) {
      const availRatio = rowRatioAvg - rowRatio;

      if (availRatio - image.ratio < -0.2 && row.length) {
        rowRatio = -availRatio;
        rows.push(row);
        row = [];
      }

      rowRatio += image.ratio;
      row.push(image);
    }

    if (row.length > 0) {
      rows.push(row);
    }

    return rows;
  }

  createLayout(rows, initScale = 1) {
    let layout = [];
    let height = 0;
    for (let row of rows) {
      let rowLayout = this.createRowLayout(row, this.paddings.left, this.paddings.top + height, initScale);
      layout = layout.concat(...rowLayout.items);
      height += rowLayout.height;
    }

    if (initScale === 1 && height > this.availHeight) {
      return this.createLayout(rows, this.availHeight / height);
    }

    if (height < this.availHeight) {
      const top = (this.availHeight - height) / 2;
      layout.forEach((item) => item.top += top);
    }

    return layout;
  }

  createRowLayout(images, left = 0, top = 0, initScale = 1) {
    const items = [];
    const sumRatio = images.reduce((acc, cur) => acc + cur.ratio, 0);
    const rowWidth = this.availWidth * initScale;
    const height = (rowWidth - this.spacer * images.length) / sumRatio;
    
    left += (this.availWidth - rowWidth) / 2;
    images.forEach((image) => {
      const width = height * image.ratio;
      items.push({image, left, top, width, height});

      left += width + this.spacer;
    });

    return {
      items,
      width: rowWidth,
      height: height + this.spacer
    };
  }

  rateLayout(images) {
    const layout = this.createLayout(this.pageRows(images));

    const sizes = layout.map((item) => Math.min(item.width, item.height));
    const minSize = Math.min(...sizes);
    const maxSize = Math.max(...sizes);

    return minSize / maxSize;
  }
}
