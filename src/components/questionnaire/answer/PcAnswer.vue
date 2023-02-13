<template>
  <div>
    <module-container>
      <div v-for="(answerItem, answerIndex) of questions" :key="answerItem.questionId">
        <answer-item :answer="answerItem" :index="answerIndex" />
      </div>

      <!--      <template #footer>-->
      <!--        <div class="plv-iar-questionnaire-answer__footer">-->
      <!--          <iar-button @click="$emit('close')">-->
      <!--            {{ iarTrans('questionnaire.know') }}-->
      <!--          </iar-button>-->
      <!--        </div>-->
      <!--      </template>-->
    </module-container>
  </div>
</template>

<script>
import basicMixin from '../../../assets/mixins/basic';
import answerMixin from './mixin/answer-mixin';

import ModuleContainer from '../../common/module-container/PcModuleContainer';
import AnswerItem from './PcAnswerItem.vue';

export default {
  components: {
    ModuleContainer,
    AnswerItem
  },
  mixins: [basicMixin, answerMixin],
  props: {
    questionResult: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" >
.plv-iar-questionnaire-answer__footer {
  padding: 17px 0 24px;
  text-align: center;
}
</style>
