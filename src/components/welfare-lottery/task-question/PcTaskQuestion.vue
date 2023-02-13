<template>
  <div>
    <modal-gift-box
      v-if="currentStep === STEPS.READY"
      class="plv-iar-welfare-lottery__task__wrap plv-iar-welfare-lottery__task__wrap--pc plv-iar-welfare-lottery__task__question"
      :modal-bg-img="modalBgImg"
      :is-apple-mod="isAppleMod"
      @close="handleClose"
    >
      <template #header>
        <span class="plv-iar-welfare-lottery__task__record-btn" @click="handleRecord">{{ iarTrans('welfareLottery.record') }}</span>
      </template>
      <template #body>
        <task-detail
          class="plv-iar-welfare-lottery__task-detail"
          :prize="lotteryPrize"
        >
          <template #header>
            <div ref="prizeTab" class="plv-iar-welfare-lottery__task__prize-tabs">
              <div
                v-for="(item, index) in prize.lotterys"
                :key="index"
                class="plv-iar-welfare-lottery__task__prize-tabs-item"
                :class="{'plv-iar-welfare-lottery__task__prize-tabs-item--active': tabIndex === index}"
                @click="tabIndex = index"
              >
                {{ item.prizeItem }}
              </div>
            </div>
          </template>

          <div class="plv-iar-welfare-lottery__question__task">
            {{ iarTrans('welfareLottery.total') }} <span> {{ prize.questionCount }} </span> {{ iarTrans('welfareLottery.questionConditionLabel1') }}
            {{ iarTrans('welfareLottery.answerRight') }} <span> {{ prize.lotterys[tabIndex].lotteryLimit }} </span> {{ iarTrans('welfareLottery.questionConditionLabel2') }}
          </div>
        </task-detail>
        <div class="plv-iar-welfare-lottery__task__btn-group">
          <welfare-lottery-btn
            @click="startQuestion"
          >
            {{ iarTrans(btnText) }}
          </welfare-lottery-btn>
        </div>
      </template>
    </modal-gift-box>

    <template v-if="lotteryQuestionStatus.answeringQuestionId">
      <modal-answer-question
        v-show="currentStep === STEPS.ANSWER"
        ref="answerQuestion"
        :key="lotteryQuestionStatus.answeringQuestionId"
        :welfare-lottery-sdk="welfareLotterySdk"
        :lottery-question-status="lotteryQuestionStatus"
        :remaining-time="remainingTime"
        :prize="prize"
        @read-prize="readPrize"
        @finish-all-question="finishAllQuestion"
        @close="handleClose"
        @next-question="nextQuestion"
        @send-answer="sendAnswerOver"
      />
    </template>
  </div>
</template>

<script>
import ModalGiftBox from '../modal-gift-box/PcModalGiftBox.vue';
import TaskDetail from '../task-detail';
import WelfareLotteryBtn from '../btn.vue';
import ModalAnswerQuestion from '../modal-answer-question/PcModalAnswerQuestion';
import mixin from './mixin';

export default {
  components: {
    ModalGiftBox,
    TaskDetail,
    WelfareLotteryBtn,
    ModalAnswerQuestion,
  },
  mixins: [mixin],
};
</script>
<style lang="scss">
@import '../task-public/base.scss';
@import '../../../assets/styles/basic.scss';

.plv-iar-modal__main {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.plv-iar-welfare-lottery__task__question {
  .plv-iar-modal__main {
    background-image: url(../imgs/modal-lottery-question-bg.png) !important;
  }
}
.plv-iar-welfare-lottery__task__prize-tabs {
  overflow-x: scroll;
  margin-bottom: 11px;
  white-space: nowrap;
  @include scrollbar();
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .plv-iar-welfare-lottery__task__prize-tabs-item:first-child {
    margin-left: 0;
  }
  .plv-iar-welfare-lottery__task__prize-tabs-item {
    padding-top: 2px;
    display: inline-block;
    height: 30px;
    margin: 0 12px;
    color: #FFFFFF;
    // 最多显示8个字
    max-width: 143px;
    user-select: none;
    cursor: pointer;
    @include text-singleline;
  }
  .plv-iar-welfare-lottery__task__prize-tabs-item--active {
    color: #FFEA71;
    position: relative;
  }
  .plv-iar-welfare-lottery__task__prize-tabs-item--active::after {
    content: ' ';
    position: absolute;
    bottom: 0;
    left: 12px;
    right: 12px;
    height: 2px;
    background-color: #FFEA71;
  }
}
.plv-iar-welfare-lottery__question__task {
  color: #666;
  font-size: 12px;
  span {
    color: #FE3F52;
  }
}
</style>
