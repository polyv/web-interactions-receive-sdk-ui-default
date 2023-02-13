let getTranslateX;
const DOMMatrix = global.WebKitCSSMatrix || global.DOMMatrix || global.MSCSSMatrix;
if (global.getComputedStyle && DOMMatrix) {
  getTranslateX = (node) => {
    const transform = global.getComputedStyle(node, null).getPropertyValue('transform');
    return Number(new DOMMatrix(transform).m41);
  };
} else {
  getTranslateX = (node) => {
    // matrix(1, 0, 0, 1, -100, 0)
    const transform = global.getComputedStyle(node, null).getPropertyValue('transform');
    return Number(transform.match(/[+-]?\d+/g)[4]);
  };
}

export { getTranslateX };

let hiddenProp, visibilityChangeEvent;
if (typeof document.hidden !== 'undefined') {
  hiddenProp = 'hidden';
  visibilityChangeEvent = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hiddenProp = 'msHidden';
  visibilityChangeEvent = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hiddenProp = 'webkitHidden';
  visibilityChangeEvent = 'webkitvisibilitychange';
}

let passiveSupported = false;
try {
  const options = Object.defineProperty({}, 'passive', {
    get: () => {
      passiveSupported = true;
      return passiveSupported;
    }
  });
  window && window.addEventListener('test', null, options);
} catch (err) {}

// 模拟 tap 事件，解决移动端点击延时
export function tap(ele, callback) {
  const delayTime = 200;
  let startTime = 0;
  let isNotTap = false;

  ele.addEventListener('touchstart', function() {
    startTime = Date.now();
  }, passiveSupported ? { passive: true } : false);

  // 触摸中断(电话、任务切换等)
  ele.addEventListener('touchcancel', function() {
    isNotTap = true;
  });

  // 滑动
  ele.addEventListener('touchmove', function() {
    isNotTap = true;
  }, passiveSupported ? { passive: true } : false);

  ele.addEventListener('touchend', function(e) {
    // 触摸中断、滑动，延时过大都认为是非tap
    if (!(isNotTap || (Date.now() - startTime > delayTime))) {
      callback(e);
    }
  }, true);
}

export function touchend(ele, callback) {
  ele.addEventListener('touchend', callback);
}

export { hiddenProp, visibilityChangeEvent };
