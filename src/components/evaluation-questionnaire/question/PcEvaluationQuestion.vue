<template>
  <div>
    <module-container :max-body-height="405">
      <div>
        <div class="plv-iar-questionnaire-question-evaluation__title-count">
          <span>题目</span>
          <span class="plv-iar-questionnaire-question-evaluation__title-cur-count">{{ curQuestionIndex +1 }}</span>
          <span>/</span>
          <span>{{ questions.length }}题</span>
        </div>
        <question-item
          :question="questions[curQuestionIndex]"
          :answer="answers[curQuestionIndex]"
          @select="onEvaluationSelectOption"
        />
      </div>
      <div class="plv-iar-questionnaire-question-evaluation__wrap-transition"></div>

      <template #footer>
        <div v-if="questionnaire.type === QuestionnaireType.EVALUATION" class="plv-iar-questionnaire-question-evaluation__footer">
          <div v-if="curQuestionIndex > 0" class="plv-iar-questionnaire-question-evaluation__footer-btn" @click="changeTitleIndex(-1)">上一题</div>
          <div v-if="curQuestionIndex < questions.length - 1" class="plv-iar-questionnaire-question-evaluation__footer-btn" @click="changeTitleIndex(1)">下一题</div>
          <div v-if="curQuestionIndex === questions.length - 1" class="plv-iar-questionnaire-question-evaluation__footer-commit-btn" @click="onSubmitAnswer">提交</div>
        </div>
      </template>
    </module-container>
  </div>
</template>

<script>
import mixin from '../../questionnaire/question/mixin/question';

import ModuleContainer from '../../common/module-container/PcModuleContainer';
import QuestionItem from '../../questionnaire/question/PcQuestionItem';

export default {
  components: {
    ModuleContainer,
    QuestionItem,
  },
  mixins: [mixin],
};
</script>

<style lang="scss" >
.plv-iar-questionnaire-question-evaluation {
  position: relative;
  height: 405px;
}
.plv-iar-questionnaire-question-evaluation__title-count {
  margin-top: 24px;
  padding-left: 24px;
  font-size: 12px;
  color: #9e9e9e;
}

.plv-iar-questionnaire-question-evaluation__title-cur-count {
  color: #E0C787;
}

.plv-iar-questionnaire-question-evaluation__footer {
  padding: 17px 0 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  .plv-iar-questionnaire-question-evaluation__footer-btn {
    width: 88px;
    height: 32px;
    margin-right: 16px;
    border-radius: 20px;
    background: #fff;
    box-sizing: border-box;
    border: 1px solid #E8E8E8;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:last-child {
      margin: 0;
    }
  }

  .plv-iar-questionnaire-question-evaluation__footer-commit-btn {
    width: 88px;
    height: 32px;
    border-radius: 20px;
    background: #D9BA6C;
    color: #fff;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      border-color: #e1c785;
    }
  }
}

.plv-iar-questionnaire-question-evaluation__wrap-transition {
  width: 100%;
  height: 20px;
  position: absolute;
  left: 0;
  bottom: 72px;
  background: linear-gradient(to top, #fff 0%, rgba(255, 255, 255, 0) 100%),;
}
</style>
