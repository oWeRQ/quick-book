export function progressPromiseAll(promises, onprogress) {
  if (typeof onprogress === 'function') {
    const total = promises.length;
    let progress = 0;

    for (let promise of promises) {
      promise.then((result) => onprogress(++progress, total, result));
    }
  }

  return Promise.all(promises);
}

export function selectFile(multiple) {
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

export function loadImage(url) {
  return new Promise(function(resolve, reject) {
    try {
      const img = document.createElement('img')
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
    } catch (ex) {
      reject(ex);
    }
  });
}

export function loadFiles(files, onprogress) {
  return progressPromiseAll([...files].map((file) => loadImage(URL.createObjectURL(file))), onprogress);
}
