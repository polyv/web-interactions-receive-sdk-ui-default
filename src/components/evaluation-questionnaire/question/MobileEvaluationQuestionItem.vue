<template>
  <div v-if="question" class="plv-iar-questionnaire-evaluation-question-mobile">
    <div>
      <div
        class="plv-iar-questionnaire-evaluation-question-mobile__title"
        :class="{'plv-iar-questionnaire-evaluation-question-mobile__title--contract': titleStatus === 'contract'}"
        @click="changeTitleStatus"
      >
        <div ref="questionTitle">
          {{ question.name }}
          <span v-if="isTitleOverflow && titleStatus === 'expand'" class="plv-iar-questionnaire-evaluation-question-mobile__title-contract-text">收起</span>
        </div>
        <div v-if="isTitleOverflow && titleStatus === 'contract'" class="plv-iar-questionnaire-evaluation-question-mobile__title-expand-text">展开</div>
      </div>
      <div class="plv-iar-questionnaire-evaluation-question-mobile__options">
        <div
          v-for="(optionItem, optionIndex) in question.options"
          :key="'option'+optionIndex"
          class="plv-iar-questionnaire-evaluation-question-mobile__option"
          :class="{'plv-iar-questionnaire-evaluation-question-mobile__option--selected': optionChar(optionIndex) === answer}"
          @click="slectOption(optionIndex)"
        >
          <span>{{ optionChar(optionIndex) }} . {{ optionItem }}</span>
        </div>
      </div>
      <div class="plv-iar-questionnaire-evaluation-question-mobile__transform"></div>
    </div>
  </div>
</template>

<script>
import mixin from '../../questionnaire/question/mixin/question-item';

export default {
  name: 'MobileQuestionItem',
  components: {
  },
  mixins: [mixin],
};
</script>

<style lang="scss" >
.plv-iar-questionnaire-evaluation-question-mobile__title {
  position: relative;
  font-size: 16px;
  line-height: 24px;
  margin-top: 8px;
  margin-bottom: 24px;
  font-weight: 400;
  font-family: PingFangSC-Medium;

  &--contract {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    // text-overflow: ellipsis;
  }

  &--contract::after {
    content: '';
    width: 55px;
    height: 24px;
    padding-left: 10px;
    box-sizing: border-box;
    position: absolute;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #fff 30%, #fff 100%);
    right: 0;
    bottom: 0;
    z-index: 1;
  }
}

.plv-iar-questionnaire-evaluation-question-mobile__title-expand-text {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
  color: #E0C787;
}

.plv-iar-questionnaire-evaluation-question-mobile__title-contract-text {
  margin-left: 8px;
  color: #E0C787;
}

.plv-iar-questionnaire-question-mobile {
  color: #333;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.plv-iar-questionnaire-evaluation-question-mobile__option {
  padding: 10px 16px;
  margin-top: 16px;
  border-radius: 16px;
  box-sizing: border-box;
  border: 0.5px solid #CFD8DC;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
  color: #757575;

  &--selected {
    background: rgba(224, 199, 135, 0.2);
    box-sizing: border-box;
    border: 0.5px solid #D9BA6C;
    color: #D9BA6C;
  }
}
</style>
