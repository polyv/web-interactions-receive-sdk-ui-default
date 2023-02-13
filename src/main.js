import Vue from 'vue';
import Main from './Main.vue';
import { isVue3 } from './assets/utils/compat';

console.log('isVue3', isVue3());
// 判断是否vue3环境

if (isVue3()) {
  const MainComp = Vue.createApp(Main);
  MainComp.mount('#app');
} else {
  const MainComp = Vue.extend(Main);
  new MainComp({
    el: '#app',
  });
}
