<!-- @file 移动端答题卡-答题结果。 -->

<template>
  <div class="plv-iar-answer-card-result-default">
    <!-- 评分结果、投票结果 -->
    <template v-if="question.type === 'S' || question.type === 'V'">
      <div class="plv-iar-answer-card-result-default__score-vote">
        <div class="plv-iar-answer-card-result-default__score-vote__main">
          <answer :question-result="questionResult" />
        </div>
        <div
          class="plv-iar-answer-card-result-default__btn-wrap"
          :style="{
            paddingBottom: `${isIPhoneXSeries ? 34 : 20}px`,
          }"
        >
          <iar-button
            @click="confirm"
          >
            {{ iarTrans('answerCard.know') }}
          </iar-button>
        </div>
      </div>
    </template>

    <!-- 单选、多选 -->
    <template v-else>
      <div v-if="status !== 'isShowAnswer'" class="plv-iar-answer-card-result-default__basic-info">
        <div class="plv-iar-answer-card-result-default__correction">
          <div class="plv-iar-answer-card-result-default__correction__inner">
            <correction-info :self-correction="result.selfCorrection" />
          </div>
        </div>
        <div
          class="plv-iar-answer-card-result-default__btn-wrap"
          :style="{
            paddingBottom: `${isIPhoneXSeries ? 34 : 20}px`,
          }"
        >
          <iar-button @click="onClickCheckAnswer">
            {{ iarTrans('answerCard.checkResult') }}
          </iar-button>
        </div>
      </div>
      <div v-if="status === 'isShowAnswer'" class="plv-iar-answer-card-result-default__answer">
        <answer :question-result="questionResult" />
      </div>
    </template>
  </div>
</template>

<script>
import IarButton from '../../../components/common/button/MobileButton';
import CorrectionInfo from '../correction-info/MobileCorrectionInfo';
import Answer from '../answer/MobileAnswer';
import mixin from './mixin';
import { isIPhoneXSeries } from '../../../assets/utils/browser';

export default {
  components: {
    Answer,
    IarButton,
    CorrectionInfo,
  },

  mixins: [mixin],

  props: {
    status: {
      type: String,
      default: '',
    }
  },

  data() {
    return {
      isIPhoneXSeries: isIPhoneXSeries(),
    };
  },
};
</script>

<style lang="scss">
.plv-iar-answer-card-result-default {
  height: 100%;
}

.plv-iar-answer-card-result-default__basic-info, .plv-iar-answer-card-result-default__score-vote {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.plv-iar-answer-card-result-default__correction, .plv-iar-answer-card-result-default__score-vote__main {
  flex: 1;
  position: relative;
  overflow: auto;
}
.plv-iar-answer-card-result-default__answer {
  height: 100%;
  overflow: auto;
}
.plv-iar-answer-card-result-default__correction__inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.plv-iar-answer-card-result-default__btn-wrap {
  margin-top: 20px;
  text-align: center;
  padding: 0 24px;
  box-sizing: border-box;
  width: 100%;
}
</style>
