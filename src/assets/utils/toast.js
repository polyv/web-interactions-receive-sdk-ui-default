
import { isVue3, Vue } from '../utils/compat';
import ToastComponent from '../../components/common/toast/Toast';

const context = {
  visible: false
};
export function showToast({ text = '', duration = 3000, mountNode }) {

  // 防止重复提示
  if (context.visible) return;
  const propsData = {
    text,
    duration,
    visible: true
  };
  const wrap = mountNode ? document.querySelector(mountNode) : document.body;
  const wrapContain = document.createElement('div');
  wrapContain.setAttribute('class', 'plv-iar-tip');
  wrap.appendChild(wrapContain);
  context.visible = true;
  if (isVue3()) {
    const TipApp = Vue.createApp(ToastComponent,
      propsData
    );
    TipApp.mount(wrapContain);
    setTimeout(() => {
      TipApp.unmount();
      wrapContain.parentNode.removeChild(wrapContain);
      context.visible = false;
    }, duration);
  } else {
    const Toast = Vue.extend(ToastComponent);
    const toastInstance = new Toast({
      propsData,
    });
    toastInstance.$mount(wrapContain);
    setTimeout(() => {
      toastInstance.$destroy();
      toastInstance.$el.parentNode.removeChild(toastInstance.$el);
      context.visible = false;
    }, duration);
    return context;
  }
}
