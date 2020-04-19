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
    } catch (ex) {
      reject(ex);
    }
  });
}

export function loadFiles(files) {
  return Promise.all([...files].map((file) => loadImage(URL.createObjectURL(file))));
}
