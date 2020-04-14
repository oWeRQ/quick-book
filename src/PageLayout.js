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

  process(images, perPage = 6) {
    const pages = [];

    for (let i = 0; i < images.length; i += perPage) {
      const page = {
        images: images.slice(i, i + perPage),
      };
      const rows = this.pageRows(page.images);
      this.processLayout(rows);
      pages.push(page);
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

  processLayout(rows, initScale = 1) {
    let height = 0;
    for (let row of rows) {
      height += this.processRowLayout(row, this.paddings.left, this.paddings.top + height, initScale).height;
    }

    if (initScale === 1 && height > this.availHeight) {
      return this.processLayout(rows, this.availHeight / height);
    }

    if (height < this.availHeight) {
      const top = (this.availHeight - height) / 2;
      for (let row of rows) {
        row.forEach((image) => image.layout.top += top);
      }
    }
  }

  processRowLayout(images, left = 0, top = 0, initScale = 1) {
    const sumRatio = images.reduce((acc, cur) => acc + cur.ratio, 0);
    const rowWidth = this.availWidth * initScale;
    const height = (rowWidth - this.spacer * images.length) / sumRatio;
    
    left += (this.availWidth - rowWidth) / 2;
    images.forEach((image) => {
      const width = height * image.ratio;
      image.layout = {left, top, width, height};

      left += width + this.spacer;
    });

    return {
      width: rowWidth,
      height: height + this.spacer
    };
  }
}
