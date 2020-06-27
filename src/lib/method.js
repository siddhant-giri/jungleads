export function getBase64(e) {
  return new Promise((resolve, reject) => {
    let res = null;
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      res = reader.result;
      let idx = res.indexOf(',')
      res = res.substr(idx+1);
    };
    reader.onerror = function(error) {
      return reject();
    };
    reader.onloadend = () => {
      return resolve(res);
    };
  });
}
