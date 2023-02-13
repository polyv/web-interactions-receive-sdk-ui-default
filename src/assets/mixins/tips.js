/**
 * @file 提示相关公共逻辑
 */

import SubmitTips from '../../components/common/submit-tips/SubmitTips.vue';
import PortraitTips from '../../components/portrait/submit-info/MobileSubmitInfo.vue';
import { isVue3, Vue } from '../utils/compat';
export default {
  methods: {
    showSubmitTips(options = {}) {
      const { tips, duration = 3000, tipsStyle, tipsClass, submitStatus, mountNode } = options;
      const propsData = {
        tips,
        duration,
        tipsStyle,
        tipsClass,
        submitStatus,
        isMobile: this.isMobile,
        locale: this.i18n?.locale,
      };
      // 挂载节点
      const wrap = mountNode ? document.querySelector(mountNode) : document.body;
      const wrapContain = document.createElement('div');
      wrap.appendChild(wrapContain);
      if (isVue3()) {
        // Vue3挂载方式
        const TipApp = Vue.createApp(SubmitTips,
          propsData
        );
        TipApp.mount(wrapContain);
        setTimeout(() => {
          TipApp.unmount();
          wrapContain.parentNode.removeChild(wrapContain);
        }, duration);
      } else {
        // Vue2处理方式
        const Component = Vue.extend(SubmitTips);
        const tipsInstance = new Component({
          propsData
        });
        tipsInstance.$mount(wrapContain);
        // 移动端webview在提示中，需要保持打开状态
        this.$emit('show-tip');
        setTimeout(() => {
          tipsInstance.$destroy();
          tipsInstance.$el.parentNode.removeChild(tipsInstance.$el);
          // 移动端webview在提示完后，需要关闭
          this.$emit('hide-tip');
        }, duration);
      }

    },
    showPortraitTips(options = {}) {
      const { imagePath } = options;
      if (isVue3(Vue.version)) {
        const wrap = document.createElement('div');
        document.body.appendChild(wrap);
        const PortraitTipsApp = Vue.createApp(PortraitTips, {
          imagePath
        });
        PortraitTipsApp.mount(wrap);
        this.$emit('show-tip');
        setTimeout(() => {
          PortraitTipsApp.unmount();
          wrap.parentNode.removeChild(wrap);
          this.$emit('hide-tip');
        }, 3000);
      } else {
        const Component = Vue.extend(PortraitTips);
        const PortraitTipsInstance = new Component({
          propsData: {
            imagePath
          }
        });
        PortraitTipsInstance.$mount();
        document.body.appendChild(PortraitTipsInstance.$el);
        this.$emit('show-tip');
        setTimeout(() => {
          PortraitTipsInstance.$destroy();
          PortraitTipsInstance.$el.parentNode.removeChild(PortraitTipsInstance.$el);
          this.$emit('hide-tip');
        }, 3000);
      }
    },

  },
};
