/**
 * 图片预加载
 * @param {Array} images 图片列表
 * @returns
 */
export const preloadImages = async (images) => {
  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });
  };
  return Promise.all(images.map(imageItem => {
    return loadImage(imageItem);
  }));
};
// 兼容 webview IOS 12的情况下，输入框失焦后 实际视图被软盘往上顶
export const keyboardFix = function() {
  if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    if (this.keyboardTimer) clearTimeout(this.keyboardTimer);
    this.keyboardTimer = setTimeout(() => {
      console.info('keyboardFix scrollTo');
      window.scrollTo(0, window.pageYOffset);
      clearTimeout(this.keyboardTimer);
    }, 200);
  }
};

export function optionChar(index) {
  const startCode = 65; // A
  return String.fromCharCode(startCode + index); // 选项值
}

// 判断是否是webview环境，如果是拦截a标签点击事件，防止跳转。
export function interceptLink(el, isWebView, cb) {
  if (!isWebView) {
    return;
  }
  const aTags = el.querySelectorAll('a');
  aTags.forEach((aTag) => {
    aTag.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const href = aTag.getAttribute('href');
      const target = aTag.getAttribute('target');
      cb(href, target);
    });
  });
  // TODO 该方式在safari有问题，待排查
  // el.addEventListener('click', (e) => {
  //   // 获取事件源
  //   const targetItem = e.path[0];
  //   console.log(e, targetItem, targetItem.tagName);
  //   alert(targetItem.tagName);
  //   // 判断target是否为a标签
  //   if (targetItem.tagName === 'A') {
  //     const href = targetItem.getAttribute('href');
  //     const target = targetItem.getAttribute('target');
  //     cb(href, target);
  //     e.preventDefault();
  //     e.stopPropagation();
  //   }
  // });
}
/**
 * 随机产生m - n 数
 * @param m 最大值
 * @param n 最小值
 * @returns number
 */
export function randomSecond(n, m) {
  return Math.random() * (m - n) + n;
}

// 是否为iPhone X以上的型号（iPhone X / Xs / XR）
export function isMoreThanIPhoneX() {
  // iPhone X、iPhone XS
  const isIphone = navigator.userAgent.toLowerCase().match(/iphone/);
  const isIPhoneX = isIphone && window.screen.width === 375 && window.screen.height === 812;
  // iPhone XS Max
  const isIPhoneXSMax = isIphone && window.screen.width === 414 && window.screen.height === 896;
  // iPhone XR
  const isIPhoneXR = isIphone && window.screen.width === 414 && window.screen.height === 896;

  return isIPhoneX || isIPhoneXSMax || isIPhoneXR;
}
