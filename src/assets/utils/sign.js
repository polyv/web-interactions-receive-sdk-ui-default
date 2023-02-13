import md5 from 'md5';

export function genSign(obj, appSecret) {
  const arr = Object.keys(obj)
    .filter((item) => item !== 'sign')
    .sort(); // 拿到除sign外字母顺序排列的key
  let query = '';
  arr.forEach((key) => {
    let value = obj[key];
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    query += key + value;
  });
  return md5(appSecret + query + appSecret)
    .toString()
    .toUpperCase();
}
