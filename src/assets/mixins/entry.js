/**
 * @file 各互动功能调用入口组件公共 mixin
 */

import { I18n } from '@/assets/locale/locale';
import { isMobile } from '@polyv/utils/src/browser';
import delayMixin from './delay';
import tipsMixin from './tips';
import soundEffectsMixin from '../../assets/mixins/sound-effects/sound-effects';

if (!window.__isloggerVer2IRSUIDef) {
  window.__isloggerVer2IRSUIDef = true;
  console.info(`[interactions-receive-sdk-ui-default][version] ${APP_VERSION} / ${APP_BUILD_TIME}`);
}
const DEFAULT_DELAY_TIME = isMobile() ? 8000 : 2000;
const DEFAULT_LANG = 'zh_CN';
export default {
  inject: {
    // 全局注入配置 【使用优先级】 props > provide > default
    interactGlobalConfig: {
      default() {
        return {
          // 语言配置
          globalLang: DEFAULT_LANG,
          // 延迟时间
          globalDelayTime: null
        };
      }
    },
  },
  provide() {
    // 初始化多语言实例
    return {
      getI18n: () => this._i18nIa,
      getLangName: () => this.$options.langName,
      _useDelayTime: () => this._useDelayTime,
    };
  },
  beforeMount() {
    this._i18nIa = new I18n(Object.assign(this.$options.langs, this.customLangConfig));
    this._i18nIa.updateLocale(() => this._useLang);
  },
  computed: {
    _useLang() {
      const { globalLang } = this._globalConfig;
      return this.lang || globalLang || DEFAULT_LANG;
    },
    _useDelayTime() {
      const { globalDelayTime } = this._globalConfig;
      const { delayTime } = this;
      if (typeof delayTime === 'number' && delayTime >= 0) {
        return delayTime;
      } else if (typeof globalDelayTime === 'number' && globalDelayTime >= 0) {
        return globalDelayTime;
      } else {
        return DEFAULT_DELAY_TIME;
      }
    },
    _globalConfig() {
      if (typeof this.interactGlobalConfig === 'function') {
        return this.interactGlobalConfig();
      } else {
        return this.interactGlobalConfig;
      }
    }
  },

  mixins: [delayMixin, tipsMixin, soundEffectsMixin],

  props: {
    lang: {
      type: String,
      default: null,
    },
    customLangConfig: {
      type: [Object, null],
      default: null
    },
    delayTime: {
      type: Number,
    },
  },

  data() {
    return {
      _i18nIa: null,
      isMobile: isMobile(),
    };
  },

  methods: {
    iarTrans(word, options) {
      return this._i18nIa?.trans(word, options);
    },
  },
};
