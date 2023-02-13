/**
 * 页面是否可见判断
 */
let hidden, visibilityChange;

if (typeof document.hidden !== 'undefined') {
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

const handlers = [];

if (typeof document.addEventListener !== 'undefined' && typeof document[hidden] !== 'undefined') {
  document.addEventListener(visibilityChange, () => {
    handlers.forEach(handler => {
      handler(document[hidden]);
    });
  }, false);
}

export function onVisibilityChange(handler) {
  if (handlers.indexOf(handler) === -1) {
    handlers.push(handler);
  }
}

export function offVisibilityChange(handler) {
  const index = handlers.indexOf(handler);
  if (index !== -1) {
    handlers.splice(index, 1);
  }
}
