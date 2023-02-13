/**
 * 给元素设置样式属性
 * @param {Element} element 元素
 * @param {String|Object} styleName 样式名
 * @param {String} value 属性
 */
export const setStyle = (element, styleName, value) => {
  if (!element || !styleName) return;

  if (typeof styleName === 'object') {
    for (const prop in styleName) {
      setStyle(element, prop, styleName[prop]);
    }
  } else {
    element.style[styleName] = value;
  }
};

/**
 * html字符串提取纯文本
 */
export const htmlStr2Text = (html) => {
  if (!html) return '';
  const dom = document.createElement('div');
  dom.innerHTML = html;
  return dom.textContent;
};

/**
 * 判断元素A是否为元素B的子元素
 * @param {Object} obj 元素A
 * @param {Object} parentObj 元素B
 * @param isLog
 */
export function isParent(obj, parentObj, isLog = false) {
  if (isLog) {
    console.info(obj, parentObj);
  }
  while (obj !== undefined && obj != null && obj.tagName && obj.tagName.toUpperCase() !== 'BODY') {
    if (obj === parentObj) {
      return true;
    }
    obj = obj.parentNode;
  }
  return false;
}
