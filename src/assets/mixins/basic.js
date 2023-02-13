/**
 * @file 各互动功能子孙组件公共逻辑 mixin
 */

import { isMobile } from '@polyv/utils/src/browser';
import { ynToBool } from '@polyv/utils/src/boolean';
import delayMixin from './delay';
import tipsMixin from './tips';

export default {
  inject: {
    // 从入口组件接收对应模块的多语言逻辑实例。
    getI18n: {
      default() {
        return () => null;
      },
    },
    getLangName: {
      default() {
        return () => null;
      },
    },
    _useDelayTime: {
      default() {
        return '';
      }
    }
  },

  mixins: [delayMixin, tipsMixin],

  data() {
    return {
      isMobile: isMobile(),
    };
  },

  computed: {
    lang() {
      return this.i18n?.locale;
    },
    langName() {
      return this.getLangName && this.getLangName();
    },

    i18n() {
      return this.getI18n && this.getI18n();
    },
  },

  methods: {
    iarTrans(word, options) {
      return this.i18n?.trans(word, options);
    },
    // 开关变量转 boolean 值
    enabledToBool(enabled) {
      if (typeof enabled === 'boolean') {
        return enabled;
      }

      if (typeof enabled === 'string') {
        return ynToBool(enabled);
      }

      return false;
    }
  },
};
