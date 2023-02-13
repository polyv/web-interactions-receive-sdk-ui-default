<!-- @file PC端答题卡-快速问答 -->

<template>
  <div v-if="question" class="plv-iar-quick-answer-default">
    <ul
      class="plv-iar-quick-answer-default__options-wrap"
      :class="{
        'plv-iar-quick-answer-default__options-wrap--even': isEvenLen
      }"
    >
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
            name="plvIntrSdkQaOption"
            :value="option"
            :checked="selectedOptions && option === selectedOptions[0]"
            @change="handleRadioChange"
          />
          <input
            v-else
            v-model="selectedOptions"
            type="checkbox"
            class="plv-iar-quick-answer-default__option__input"
            name="plvIntrSdkQaOption"
            :value="option"
          />
          <span
            :class="{
              'pws-border-theme-color pws-font-theme-color': selectedOptions && selectedOptions.indexOf(option) !== -1
            }"
          >{{ option }}</span>
        </label>
      </li>
    </ul>

    <div class="plv-iar-quick-answer-default__btn-wrap">
      <iar-button
        :disabled="btnDisabled"
        :btn-style="{
          width: '96px',
          lineHeight: '40px',
          padding: '0',
          borderRadius: '20px',
        }"
        @click="toAnswerQuestion"
      >
        {{ iarTrans('answerCard.submit') }}
      </iar-button>
    </div>
  </div>
</template>

<script>
import IarButton from '../../../components/common/button/PcButton';
import mixin from './mixin';
import commonMixin from '../common-mixin';

export default {
  components: {
    IarButton,
  },

  mixins: [mixin, commonMixin],

  methods: {
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

      this.$emit('to-hide', msg);
    },

    handleRadioChange(e) {
      this.selectedOptions = [e.target.value];
    },
  },
};
</script>

<style lang="scss">
.plv-iar-quick-answer-default__btn-wrap {
  padding-bottom: 20px;
  text-align: center;
}

.plv-iar-quick-answer-default__options-wrap {
  text-align: center;
  padding: 10px;
  margin: 0;
}
// 偶数个选项时
.plv-iar-quick-answer-default__options-wrap--even {
  padding: 10px 30px;
}
.plv-iar-quick-answer-default__option {
  display: inline-block;
  margin: 10px;

  label {
    user-select: none;
    input {
      display: none;
    }
    span {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 40px;
      color: #333;
      border: 1px solid #CFD8DC;
      border-radius: 50%;
      box-sizing: border-box;
      text-align: center;
      line-height: 38px; // 总高度32，边框4
      background-color: #fff;
      font-size: 20px;
      transition: all .15s ease;
      cursor: pointer;
    }
    input:checked {
      &+span {
        border: 1px solid #3596F3;
        color: #3596F3;
      }
    }
  }
}
</style>
