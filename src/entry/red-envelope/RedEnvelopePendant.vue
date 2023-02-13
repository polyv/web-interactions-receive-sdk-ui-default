<!-- 聊天列表红包挂件组件 -->
<template>
  <red-envelope-pendant
    v-if="autoToggle ? show : true"
    :type="autoToggle ? redpackType : type"
    :time="autoToggle ? rpDelayTime : time"
    :custom-img-config="customImgConfig"
    @end="handleEnd"
  />
</template>

<script>
import { isMobile } from '@polyv/utils/src/browser';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
import RedEnvelopePendant from '../../components/red-envelope/RedEnvelopePendant';
import langMixin from './langMixin';

export default {
  components: {
    RedEnvelopePendant,
  },
  mixins: [langMixin],
  props: {
    // 红包类型
    type: {
      type: String,
      default: 'normal'
    },
    // 红包倒计时
    time: {
      type: Number,
      default: 0
    },
    // 自定义图片
    customImgConfig: {
      type: [Object, null],
      default: null
    },
    /** 是否由内部去控制挂件显示、隐藏状态 */
    autoToggle: {
      type: Boolean,
      default: false,
    },
    /** 红包SDK，当autoToggle为true时必传 */
    redEnvelopeSdk: {
      type: Object,
      default: null,
    },
    autoFetchDetail: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false,
      rpDelayTime: 0,
      redpackType: '',
      getNewestRequestEnd: true,
    };
  },
  watch: {
    redEnvelopeSdk: {
      immediate: true,
      handler() {
        if (this.redEnvelopeSdk && this.autoToggle) {
          if (this.autoFetchDetail) {
            this.getNewest();
          }
          this.handleRedPaperDelay = this.handleRedPaperDelayEvent.bind(this);
          this.handleRedPaper = this.handleRedPaperEvent.bind(this);
          this.bindAppEvents();
          if (isMobile()) {
            this.handleVisibilitychange();
          }
        }
      },
    },
    show(nv) {
      this.$emit('visible-changed', nv);
    },
  },
  [BEFORE_DESTROY]() {
    this.unbindAppEvents();
  },
  methods: {
    async getNewest() {
      this.getNewestRequestEnd = false;
      try {
        const result = await this.redEnvelopeSdk.getNewest();
        const { code, data } = result;
        this.rpDelayTime = data ? Math.round((data.sendTime - data.serverTime) / 1000) : 0;
        this.redpackType = data.redpackType;
        this.show = code === 200 && data && data.timeEnabled === 'Y' && this.rpDelayTime > 0;
      } catch (error) {
        console.error('[互动接收端SDK][查询最新红包信息]', error);
      } finally {
        this.getNewestRequestEnd = true;
      }
    },
    handleEnd() {
      if (this.autoToggle) {
        this.show = false;
      } else {
        this.$emit('end');
      }
    },
    // 监听红包相关事件
    bindAppEvents() {
      const redEnvelopeSdk = this.redEnvelopeSdk;
      redEnvelopeSdk
        .on(redEnvelopeSdk.events.REDPAPER_FOR_DELAY, this.handleRedPaperDelay)
        .on(redEnvelopeSdk.events.REDPAPER, this.handleRedPaper);
    },
    // 取消监听红包相关事件
    unbindAppEvents() {
      const redEnvelopeSdk = this.redEnvelopeSdk;
      if (!redEnvelopeSdk) { return; }
      redEnvelopeSdk
        .off(redEnvelopeSdk.events.REDPAPER_FOR_DELAY, this.handleRedPaperDelay)
        .off(redEnvelopeSdk.events.REDPAPER, this.handleRedPaper);
    },
    handleRedPaperDelayEvent(data) {
      this.rpDelayTime = data.delayTime;
      this.redpackType = data.type;
      this.show = true;
    },
    handleRedPaperEvent() {
      this.show = false;
      this.getNewest();
    },
    handleVisibilitychange() {
      // 页面最近一次隐藏的时间
      let latestTime;
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && this.getNewestRequestEnd && latestTime && (Date.now() - latestTime) > 1000) {
          this.getNewest();
        }
        if (document.visibilityState === 'hidden') {
          latestTime = Date.now();
        }
      });
    },
  }
};
</script>
