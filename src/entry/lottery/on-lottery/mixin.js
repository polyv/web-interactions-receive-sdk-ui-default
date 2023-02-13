import lotteryMixin from '../lottery-mixin';
import lotteryBoxSvga from './imgs/lotterying-box.svga';
import lotteryBtnSvga from './imgs/lotterying-btn.svga';
import lotteryBtnSvgaEN from './imgs/lotterying-btn-en.svga';
import { isMobile } from '@polyv/utils/src/browser';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
const ALL_LOTTERY_PATTERNS = {
  // 默认
  default: 'default',
  // 礼盒
  box: 'box',
};

// 抽奖进行状态
const ALL_LOTTERY_STATUS = {
  // 计时中
  timing: 'timing',
  // 抽奖中
  running: 'running',
  // 开奖中
  over: 'over',
  // 已结束
  end: 'end',
};

export default {
  mixins: [lotteryMixin],

  props: {
    // 抽奖SDK
    lotterySdk: {
      type: Object,
      default: null,
    },
    // 抽奖图案类型
    pattern: {
      type: String,
      default: ALL_LOTTERY_PATTERNS.default,
    },
  },

  data() {
    return {
      // 修正webpack导入svga作为base64后，丢失文件类型的问题(实际上svga没有专门的mimeType，但项目源码有相关判断, 不加的话IE中会无法播放)
      // 礼盒 svga 资源
      lotteryBoxSvgaUrl: lotteryBoxSvga.replace(/^(data:;base64)/, 'data:svga/2.0;base64'),
      allLotteryPatterns: ALL_LOTTERY_PATTERNS,
      lotteryStatus: '',
      // 动画数率1x, 2x
      animationSpeed: 1,
      lastClickTime: new Date().getTime(),
      animationZoom: 0,
      timer: null,
      btnDom: null,
      boxDom: null
    };
  },

  computed: {
    lotteryBtnSvgaUrl() {
      return this._useLang === 'zh_CN' ? lotteryBtnSvga.replace(/^(data:;base64)/, 'data:svga/2.0;base64') : lotteryBtnSvgaEN.replace(/^(data:;base64)/, 'data:svga/2.0;base64');
    }
  },

  watch: {
    lotterySdk: {
      immediate: true,
      handler() {
        this.bindAppEvents();
      },
    },
  },

  [BEFORE_DESTROY]() {
    this.unbindAppEvents();
  },

  methods: {
    // 监听抽奖相关事件
    bindAppEvents() {
      const lotterySdk = this.lotterySdk;
      if (!lotterySdk) { return; }
      lotterySdk
        .on(lotterySdk.events.LotteryStart, this.toggleStatus(ALL_LOTTERY_STATUS.running)) // 立即开启抽奖(旧版)
        .on(lotterySdk.events.LotteryEnd, this.toggleStatus(ALL_LOTTERY_STATUS.over)) // 抽奖结束(旧版)
        .on(lotterySdk.events.OnLottery, this.toggleStatus(ALL_LOTTERY_STATUS.running)); // 处于抽奖中(新旧版)
    },

    // 取消监听抽奖相关事件
    unbindAppEvents() {
      const lotterySdk = this.lotterySdk;
      if (!lotterySdk) { return; }
      lotterySdk
        .off(lotterySdk.events.LotteryStart, this.toggleStatus(ALL_LOTTERY_STATUS.running)) // 立即开启抽奖(旧版)
        .off(lotterySdk.events.LotteryEnd, this.toggleStatus(ALL_LOTTERY_STATUS.over)) // 抽奖结束(旧版)
        .off(lotterySdk.events.OnLottery, this.toggleStatus(ALL_LOTTERY_STATUS.running)); // 处于抽奖中(新旧版)
    },
    // 函数覆盖 rejectDelay方法， 等待上一个延时完成，再执行下一个延时。
    async rejectDelay() {
      if (this._delayPromise) {
        await this._delayPromise;
      } else {
        return Promise.resolve();
      }
    },

    // 切换抽奖状态
    toggleStatus(status) {
      return async () => {
        try {
          if (status === ALL_LOTTERY_STATUS.over && this.$refs.defaultSvga) {
            // 礼盒开奖动画: 计算延迟事件时间，预留最后2s给礼盒开奖
            const delayTime = this.checkTime(this._useDelayTime) ? (this._useDelayTime > 2000 ? (this._useDelayTime - 2000) : 10) : (isMobile() ? 6000 : 10);
            await this.delay(delayTime);
            // 礼盒开奖动画持续2S
            this.$refs.defaultSvga.startAnimation();
            this.animationSpeed = 0;
            await this.delay(2000);
          } else {
            await this.delay();
          }
        } catch (e) {
        }
        this.lotteryStatus = status;
        if (this.lotteryStatus === ALL_LOTTERY_STATUS.running) {
          this.animationSpeed = 1;
          this.handlePatternSvga(true);
        }
        if (status === ALL_LOTTERY_STATUS.over) {
          this.handlePatternSvga(false);
        }
        this.emitStatus(status);
        // 开始抽奖动画
        // 抽奖结束后，清理动画
      };
    },

    emitStatus(status) {
      return this.$emit('lottery-status-changed', status);
    },

    onClickClose() {
      this.$emit('is-show-changed', false);
    },
    // 点击摇晃开奖
    fastClickOpen() {
      this.clickBtnAnimationZoom();
      const { lastClickTime } = this;
      const nowClickTime = new Date().getTime();
      const diffTime = nowClickTime - lastClickTime;
      this.lastClickTime = nowClickTime;
      if (this.animationSpeed === 3) return;
      // 点击频率越快，逐级加速
      if (diffTime > 150 && diffTime < 300 && this.animationSpeed === 1) {
        // 动画2倍速度
        this.animationSpeed = 2;
      } else if (diffTime < 150 && this.animationSpeed === 2) {
        // 动画3倍速度
        this.animationSpeed = 3;
      }
    },
    // 点击按钮动画
    clickBtnAnimationZoom() {
      if (this.animationZoom === 0 || this.animationZoom === 2) {
        this.animationZoom = 1;
      } else {
        this.animationZoom = 2;
      }
      if (!this.btnDom) {
        this.btnDom = this.$refs.btnSvga.$el;
        this.btnDom.addEventListener('webkitAnimationEnd', () => {
          this.animationZoom = 0;
        });
      }
      if (!this.boxDom) {
        this.boxDom = this.$refs.defaultSvga.$el;
        const func = () => {
          if (this.animationSpeed === 3) {
            this.animationSpeed = 2;
            return;
          }
          if (this.animationSpeed === 2) {
            this.animationSpeed = 1;
            this.boxDom.removeEventListener('webkitAnimationEnd', func);
            this.boxDom = null;
          }
        };
        this.boxDom.addEventListener('webkitAnimationEnd', func);
      }
    },
    // 手动控制svga 播放
    handlePatternSvga(status = true) {
      this.$nextTick(async () => {
        const patternSvga = this.$refs.defaultSvga || this.$refs.boxSvga;
        if (status) {
          patternSvga && await patternSvga.init();
          if (this.pattern === this.allLotteryPatterns.box) {
            patternSvga.startAnimation();
          }
          this.$refs.btnSvga && this.$refs.btnSvga.init();
        } else {
          patternSvga && patternSvga.stopAnimation();
          this.$refs.btnSvga && this.$refs.btnSvga.stopAnimation();
        }
      });
    }
  }
};
