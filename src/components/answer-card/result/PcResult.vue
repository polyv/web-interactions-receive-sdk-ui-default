<!-- @file PC端答题卡-答题结果。 -->

<template>
  <div v-if="question" class="plv-iar-answer-card-result-default">
    <!-- 评分结果 -->
    <template v-if="question.type === 'S'">
      <answer :question-result="questionResult" />
      <div class="plv-iar-answer-card-result-default__btn__wrap--score">
        <iar-button @click="confirm">{{ iarTrans('answerCard.know') }}</iar-button>
      </div>
    </template>

    <!-- 投票，单选/多选 结果-->
    <module-container v-else>
      <div class="plv-iar-answer-card-result-default__other__result">
        <!-- 答对/答错 -->
        <div v-if="question.type !== 'V'" class="plv-iar-answer-card-result-default__correction">
          <correction-info :self-correction="result.selfCorrection" />
        </div>
        <div>
          <answer :question-result="questionResult" />
        </div>
      </div>
      <template #footer>
        <div class="plv-iar-answer-card-result-default__footer">
          <iar-button
            @click="confirm"
          >
            {{ iarTrans('answerCard.know') }}
          </iar-button>
        </div>
      </template>
    </module-container>
  </div>
</template>

<script>
import ModuleContainer from '../../common/module-container/PcModuleContainer';
import IarButton from '../../../components/common/button/PcButton';
import CorrectionInfo from '../correction-info/PcCorrectionInfo';
import Answer from '../answer/PcAnswer';
import mixin from './mixin';

export default {
  components: {
    ModuleContainer,
    CorrectionInfo,
    IarButton,
    Answer,
  },

  mixins: [mixin],
};
</script>

<style lang="scss">
.plv-iar-answer-card-result-default__btn__wrap--score {
  text-align: center;
}

.plv-iar-answer-card-result-default__footer {
  padding: 17px 0 24px;
  text-align: center;
}

.plv-iar-answer-card-result-default__other__result {
  padding: 20px 25px 25px;
  box-sizing: border-box;
}
.plv-iar-answer-card-result-default__correction {
  border-bottom: 1px solid #eceff1;
  margin-bottom: 20px;
}
</style>
