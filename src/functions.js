export function partition(arr, callback) {
  const result = [[], []];

  for (let i in arr) {
    result[callback(arr[i], i, arr) ? 0 : 1].push(arr[i]);
  }

  return result;
}

export function immutableToggle(arr, item) {
  return (arr.includes(item) ? arr.filter(i => i !== item) : [ ...arr, item]);
}

export function progressPromiseAll(promises, onprogress) {
  if (typeof onprogress === 'function') {
    const total = promises.length;
    let progress = 0;

    for (let promise of promises) {
      promise.then(() => onprogress(++progress, total));
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
      input.onchange = (e) => resolve(e.target.files || []);
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
  onprogress(0, files.length);
  return progressPromiseAll([...files].map((file) => loadImage(URL.createObjectURL(file))), onprogress);
}
