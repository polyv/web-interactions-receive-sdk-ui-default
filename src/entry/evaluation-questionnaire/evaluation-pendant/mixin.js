// 风险测评挂件
import entryMixin from '../../../assets/mixins/entry';
import langs from '../../../assets/locale/lang/push-card';
import { local } from '@polyv/utils/src/storage';
import { BEFORE_DESTROY } from '@/assets/utils/compat';

export default {
  langs,

  mixins: [entryMixin],

  props: {
    iconUrl: String,
    // 倒计时时间，单位：秒
    countDownTime: {
      type: Number,
      default: 0
    },
    // 问卷SDK 实例
    questionnaireSdk: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      leftTime: 0,
      currentLeftTime: 0,
      storageKey: '',
      isCountDownType: false
    };
  },

  created() {
    this.bindEvent();
    this.getLeftTime();
  },

  [BEFORE_DESTROY]() {
    this.unbindEvent();
  },

  watch: {
    countDownTime(nv) {
      if (nv === 0) {
        this.isCountDownType = false;
        this.removeLeftTime();
        this.resetTime();
      } else {
        this.isCountDownType = true;
        this.leftTime = nv;
      }
    },
    questionnaireSdk: {
      immediate: true,
      handler(nv) {
        this.storageKey = `count_down_time_${nv.channelInfo.channelId}_${nv.userInfo.userId}`;
      },
    },
  },

  methods: {
    bindEvent() {
      window.addEventListener('beforeunload', this.setLeftTime);
    },
    unbindEvent() {
      window.removeEventListener('beforeunload', this.setLeftTime);
    },
    resetTime() {
      this.leftTime = 0;
      this.currentLeftTime = 0;
    },
    getLeftTime() {
      const leftTime = local.get(this.storageKey);

      if (!leftTime) {
        this.leftTime = this.countDownTime;
        this.isCountDownType = this.countDownTime > 0;
        if (this.countDownTime === 0) this.removeLeftTime();
        return;
      }

      if (parseInt(leftTime) !== 0) {
        this.leftTime = parseInt(leftTime);
        this.isCountDownType = true;
      } else {
        this.resetTime();
        // eslint-disable-next-line vue/custom-event-name-casing
        this.$emit('openEvaluationForce');
      }
    },
    setLeftTime(e, time) {
      if (!this.isCountDownType) return;
      const curSetTime = time || this.currentLeftTime;
      local.set(this.storageKey, curSetTime);
    },
    removeLeftTime() {
      const leftTime = local.get(this.storageKey);
      if (leftTime) local.remove(this.storageKey);
    },
    handleCountdown(time) {
      this.currentLeftTime = time;
    },
    handleCountdownEnd() {
      this.setLeftTime(null, 0);
      this.isCountDownType = false;
      // eslint-disable-next-line vue/custom-event-name-casing
      this.$emit('openEvaluationForce');
    },

    handleEntrance() {
      // eslint-disable-next-line vue/custom-event-name-casing
      this.$emit('openEvaluation');
    },
  }
};
