<!-- @file 移动端答题卡-快速问答 -->

<template>
  <div
    v-if="question"
    ref="quickAnswer"
    class="plv-iar-quick-answer-default"
    :style="{
      height: `${height}px`,
    }"
  >
    <ul class="plv-iar-quick-answer-default__options">
      <li
        v-for="(option, index) in options"
        :key="index"
        class="plv-iar-quick-answer-default__option"
      >
        <label>
          <input
            v-if="question.type === 'R'"
            type="radio"
            class="plv-iar-quick-answer-default__option__input"
            name="plvIntrSdkOption"
            :value="option"
            :disabled="optionDisabled"
            @change="handleRadioChange"
          />
          <input
            v-else
            v-model="selectedOptions"
            type="checkbox"
            class="plv-iar-quick-answer-default__option__input"
            name="plvIntrSdkOption"
            :value="option"
            :disabled="optionDisabled"
          />
          <span
            :class="{
              'pws-border-theme-color pws-font-theme-color': selectedOptions && selectedOptions.indexOf(option) !== -1
            }"
          >{{ option }}</span>
        </label>
      </li>
    </ul>
    <button
      v-if="status === 'STOP'"
      class="plv-iar-quick-answer-default__btn plv-iar-quick-answer-default__btn--stop pws-btn-bg-color"
    >
      {{ iarTrans('answerCard.qaMobCloseBtn') }}
    </button>
    <button
      v-else
      class="plv-iar-quick-answer-default__btn pws-btn-bg-color"
      :class="{
        'plv-iar-quick-answer-default__btn--disabled': btnDisabled,
      }"
      @click="toAnswerQuestion"
    >
      {{ iarTrans('answerCard.qaMobSubmitBtn') }}
    </button>
    <i class="plv-iar-quick-answer-default__close-btn" @click="close"></i>
  </div>
</template>

<script>
import commonMixin from '../common-mixin';
import mixin from './mixin';

export default {
  mixins: [commonMixin, mixin],

  props: {
    height: {
      type: Number,
      default: 50,
    },
  },

  data() {
    return {
      // 答题状态, STOP、SUBMITTED
      status: '',
      submitTxt: this.iarTrans('answerCard.qaMobSubmitSuccessBtn'),
      visible: false
    };
  },

  computed: {
    optionDisabled() {
      return this.status === 'STOP' || this.status === 'SUBMITTED';
    },
  },
  methods: {
    close() {
      this.$emit('to-hide', this.question);
    },
    bindAppEvents() {
      const answerCardSdk = this.answerCardSdk;
      if (!answerCardSdk) { return; }
      answerCardSdk.on(answerCardSdk.events.GET_TEST_QUESTION_CONTENT, this.onQuestionContent);
      answerCardSdk.on(answerCardSdk.events.STOP_TEST_QUESTION, this.onStopQuestion);
    },

    unbindAppEvents() {
      const answerCardSdk = this.answerCardSdk;
      if (!answerCardSdk) { return; }
      answerCardSdk.off(answerCardSdk.events.GET_TEST_QUESTION_CONTENT, this.onQuestionContent);
      answerCardSdk.off(answerCardSdk.events.STOP_TEST_QUESTION, this.onStopQuestion);
    },

    handleRadioChange(e) {
      const value = e.target.value;
      this.selectedOptions = [value];
    },

    // 收到答题开始消息
    async onQuestionContent(msg) {
      this.playSoundEffects();
      if (msg.itemType === this.answerCardSdk.questionItemTypes.Normal) {
        // 非快速答题，不在此处理
        return;
      }

      try {
        await this.delay();
      } catch (e) {
        return;
      }

      this.clear();
      this.status = '';
      this.question = msg;
      this.$emit('to-show', msg);
    },

    // 收到答题结束消息
    async onStopQuestion(msg) {
      if (msg.itemType === this.answerCardSdk.questionItemTypes.Normal) {
        // 非快速答题，不在此处理
        return;
      }

      this.rejectDelay();
      if (this.status === 'SUBMITTED') { return; }
      this.status = 'STOP';
      this.waitForHide(10);
    },

    // 提交答案
    async toAnswerQuestion() {
      if (this.btnDisabled || this.isSubmitting) { return; }
      this.isSubmitting = true;
      try {
        this.setRetryTimer();
        const res = this.answerCardSdk && await this.answerCardSdk.answerQuestion(this.selectedOptions);
        this.clearRetryTimer();
        this.handleSubmitRes(res);
        this.status = 'SUBMITTED';
        this.waitForHide();
      } catch (e) {
        console.warn(e);
        this.showFailSubmitTips();
        this.waitForHide();
      } finally {
        this.isSubmitting = false;
      }
    },

    waitForHide(time) {
      setTimeout(() => {
        this.clear();
        this.$emit('to-hide');
      }, time || 2000);
    },

    // 重试提交答案。5秒一次，重试达3次后显示错误提示并停止重试
    setRetryTimer() {
      this.clearRetryTimer();
      this.retryTimer = setTimeout(() => {
        if (this.retryTimes < 3) {
          this.toAnswerQuestion();
          this.retryTimes += 1;
          this.setRetryTimer();
        } else {
          this.waitForHide();
        }
      }, 5000);
    },

    // 清除重试定时器
    clearRetryTimer() {
      clearTimeout(this.retryTimer);
      this.retryTimer = null;
    },
  },
};
</script>

<style lang="scss">
.plv-iar-quick-answer-default {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  font-family: 'PingFang SC';
}
.plv-iar-quick-answer-default__options {
  position: absolute;
  top: 50%;
  left: 16px;
  margin: 0;
  padding: 0;
  transform: translate(0, -50%);
  list-style: none;
  display: inline-block;
}
.plv-iar-quick-answer-default__option {
  display: inline-block;
  margin-right: 16px;

  label {
    input {
      display: none;
    }
    span {
      display: inline-block;
      width: 32px;
      height: 32px;
      color: #333;
      border: 1px solid #CFD8DC;
      border-radius: 50%;
      box-sizing: border-box;
      text-align: center;
      line-height: 30px; // 总高度32，边框4
      background-color: #fff;
      font-size: 16px;
      transition: all .15s ease;
    }
    input:disabled {
      &+span {
        color: #EAEAEA;
        border: 1px solid #EAEAEA;
      }
    }
    input:checked {
      &+span {
        border: 1px solid #2196F3;
        color: #3082FE;
      }
    }
  }
}
.plv-iar-quick-answer-default__btn {
  position: absolute;
  top: 50%;
  margin-top: -16px;
  right: 48px;
  min-width: 72px;
  height: 32px;
  color: #fff;
  background: #3082FE;
  border: none;
  outline: none;
  font-size: 14px;
  border-radius: 25px;
  line-height: 1;
  box-sizing: border-box;
  transition: all .15s ease-in;
  white-space: nowrap;

  &--disabled, &--stop {
    opacity: 0.6;
  }

  &--submitted {
    border: 1px solid #3082FE;
    color: #3082FE;
    background: #fff;
  }
}
.plv-iar-quick-answer-default__btn__ico {
  display: inline-block;
  width: 13px;
  height: 10px;
  background-size: cover;
  background-position: center;
  margin-right: 4px;
  background-image: url(./imgs/btn-submitted.png);
}
.plv-iar-quick-answer-default__close-btn {
  position: absolute;
  top: 50%;
  margin-top: -16px;
  right: 8px;
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-left: 8px;
  background-position: center;
  background-size: cover;
  background-image: url(./imgs/icon-quick-answer-close.png);
}

@media only screen and (max-width: 360px) {
  .plv-iar-quick-answer-default__btn {
    right: 40px;
  }
  .plv-iar-quick-answer-default__options {
    left: 10px;
  }
  .plv-iar-quick-answer-default__option {
    margin-right: 8px;
    .plv-iar-quick-answer-default__btn__ico {
      margin-right: 2px;
    }
  }
  .plv-iar-quick-answer-default__close-btn {
    right: 4px;
  }
}
</style>
