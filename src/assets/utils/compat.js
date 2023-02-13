import VueCore from 'vue';
export const Vue = VueCore || window.Vue || { version: '2.6.0' };
export function isVue3() {
  return Vue.version.startsWith('3.');
}

export const BEFORE_DESTROY = isVue3() ? 'beforeUnmount' : 'beforeDestroy';

export const DESTROYED = isVue3() ? 'unmounted' : 'destroyed';
