/** @file 浏览器及机型判断 */
const ua = navigator.userAgent.toLowerCase();
// 是否为 iPhone X 系列机型（iPhone X / Xs / XR）
export function isIPhoneXSeries() {
  // iPhone X、iPhone XS
  const isIphone = navigator.userAgent.toLowerCase().match(/iphone/);
  const isIPhoneX = isIphone && window.screen.width === 375 && window.screen.height === 812;
  // iPhone XS Max
  const isIPhoneXSMax = isIphone && window.screen.width === 414 && window.screen.height === 896;
  // iPhone XR
  const isIPhoneXR = isIphone && window.screen.width === 414 && window.screen.height === 896;

  return isIPhoneX || isIPhoneXSMax || isIPhoneXR;
}

export const isSafari = /safari/i.test(ua) && ua.indexOf('chrome') === -1;
