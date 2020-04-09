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
    var pages = [];

    for (var i = 0; i < images.length; i += perPage) {
      var page = {
        images: images.slice(i, i + perPage),
      };
      this.processPage(page);
      pages.push(page);
    }

    return pages;
  }

  processPage(page) {
    page.sumRatio = page.images.reduce((acc, cur) => acc + cur.ratio, 0);
    page.rowsCount = Math.round(page.sumRatio / Math.sqrt(page.sumRatio * this.availRatio));

    this.processLayout(page);
  }

  processLayout(page, initScale = 1) {
    var perRow = Math.ceil(page.images.length / page.rowsCount);
    var height = 0;
    for (var i = 0; i < page.images.length; i += perRow) {
      height += this.processRow(page.images.slice(i, i + perRow), this.paddings.left, this.paddings.top + height, initScale).height;
    }

    if (initScale === 1 && height > this.availHeight) {
      this.processLayout(page, this.availHeight / height);
    }
  }

  processRow(images, left = 0, top = 0, initScale = 1) {
    var sumRatio = images.reduce((acc, cur) => acc + cur.ratio, 0);
    var rowWidth = this.availWidth * initScale;
    var height = (rowWidth - this.spacer * images.length) / sumRatio;
    
    left += (this.availWidth - rowWidth) / 2;
    images.forEach((image) => {
      var width = height * image.ratio;
      image.layout = {left, top, width, height};

      left += width + this.spacer;
    });

    return {
      width: rowWidth,
      height: height + this.spacer
    };
  }
}
