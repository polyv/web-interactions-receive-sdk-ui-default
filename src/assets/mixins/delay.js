/**
 * @file 主动延迟相关公共逻辑
 */

import { isMobile } from '@polyv/utils/src/browser';

export default {
  data() {
    return {
      _delayPromise: null,
      _delayReject: null
    };
  },

  props: {
    // 配合视频主动延时(单位毫秒)
    delayTime: {
      type: Number,
    },
  },
  computed: {
    useDelayTime() {
      let useDelayTime;
      if (typeof this._useDelayTime === 'function') {
        useDelayTime = this._useDelayTime();
      } else {
        useDelayTime = this._useDelayTime;
      }
      if (this.checkTime(this.delayTime)) {
        return this.delayTime;
      } else if (this.checkTime(useDelayTime)) {
        return useDelayTime;
      } else {
        return '';
      }
    }
  },

  methods: {
    checkTime(time) {
      return typeof time === 'number' && time >= 0;
    },
    async delay(time) {
      await this.rejectDelay();
      const defaultDelayTime = isMobile() ? 8000 : 2000;
      // const propsDelayTime = this.delayTime;
      // 判断是否为数字，可以为0。若不为数字则使用默认值。
      // const originDelayTime = typeof propsDelayTime === 'number' ? propsDelayTime : defaultDelayTime;
      const delayTime = this.checkTime(time) ? time : (this.checkTime(this.useDelayTime) ? this.useDelayTime : defaultDelayTime);
      this._delayPromise = new Promise((resolve, reject) => {
        this._delayReject = reject;
        setTimeout(() => {
          resolve();
        }, delayTime);
      });
      return this._delayPromise;
    },

    rejectDelay() {
      this._delayPromise && this._delayReject();
      this._delayPromise = null;
    }
  },
};
