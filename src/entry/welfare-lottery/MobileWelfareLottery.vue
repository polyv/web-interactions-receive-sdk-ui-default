<template>
  <div>
    <!-- 入口挂件 -->
    <entrance
      v-if="hasWelfareLotteryPendant"
      :copywriting="entranceWriting"
      :countdown-time="countdownTime"
      :entrance-img="entranceImg"
      :hint="hint"
      :hint-show-time="hintShowTime"
      :is-question-condition="isQuestionCondition"
      @click="clickEntrance"
    />
    <div ref="modalWrap" class="plv-iar-modal__wrap--normal" :class="{'plv-iar-modal__wrap--apple': isAppleMod, 'plv-iar-modal__wrap--fullscreen': isFullScreen, 'plv-iar-browser--safari': isSafari }">
      <template v-if="showTaskModal && (lotteryStatus !== 'end' || (isQuestionCondition && !isQuestionLotteryOver))">
        <!-- 任务：邀请 -->
        <task-invitation
          v-if="lotteryData.lotteryCondition === welfareLotterySdk.lotteryCondition.INVITE"
          :prize="lotteryData"
          :invite-count="inviteCount"
          :watch-url="watchUrl"
          :is-show-custom-lottery="isShowCustomLottery"
          :link-skip-enabled="linkSkipEnabled"
          :invite-url="inviteUrl"
          @close="closeTaskModal"
          @record="openRecordModal"
          @lottery-callback="lotteryCallback"
        />
        <!-- 任务：观看 -->
        <task-watch-time
          v-else-if="lotteryData.lotteryCondition === welfareLotterySdk.lotteryCondition.DURATION"
          :prize="lotteryData"
          :watched-time="watchedTime"
          :eligible="eligible"
          @close="closeTaskModal"
          @record="openRecordModal"
          @lottery-callback="lotteryCallback"
        />
        <!-- 任务：评论 -->
        <task-comment
          v-else-if="lotteryData.lotteryCondition === welfareLotterySdk.lotteryCondition.COMMENT"
          :welfare-lottery-sdk="welfareLotterySdk"
          :prize="lotteryData"
          :watched-time="watchedTime"
          :eligible="eligible"
          @close="closeTaskModal"
          @comment-success="commentSuccess"
          @record="openRecordModal"
        />
        <!-- 任务：答题入口 -->
        <task-question
          v-else-if="lotteryData.lotteryCondition === welfareLotterySdk.lotteryCondition.QUESTION"
          :welfare-lottery-sdk="welfareLotterySdk"
          :prize="lotteryData"
          :watched-time="watchedTime"
          :eligible="eligible"
          :is-question-condition="isQuestionCondition"
          :modal-bg-img="modalBgImg"
          :is-apple-mod="isAppleMod"
          @close="closeTaskModal"
          @comment-success="commentSuccess"
          @record="openRecordModal"
        />
      </template>
      <!-- 开奖 -->
      <lottery-result
        v-if="showResultModal"
        :sdk="welfareLotterySdk"
        :is-show-custom-lottery="isShowCustomLottery"
        :link-skip-enabled="linkSkipEnabled"
        :lottery-id="copyLotteryId || lotteryId"
        :is-question-condition="isQuestionCondition"
        @close="closeResultModal"
        @record="openRecordModal('result')"
        @winner-list="openWinnerList"
        @lottery-callback="lotteryCallback"
      />
      <!-- 中奖记录 -->
      <lottery-record
        v-if="showRecordModal"
        :prize="lotteryData"
        :sdk="welfareLotterySdk"
        :is-show-custom-lottery="isShowCustomLottery"
        :link-skip-enabled="linkSkipEnabled"
        @close="onClickRecordModalClose"
        @back="onClickRecordModalBack"
        @lottery-callback="lotteryCallback"
      />
      <!-- 中奖名单 -->
      <winner-list
        v-if="showWinnerList"
        :sdk="welfareLotterySdk"
        :lottery-id="lastLotteryId || copyLotteryId || lotteryId"
        @close="onClickWinnerListClose"
        @back="onClickWinnerListBack"
      />
      <!-- 抽奖动画-->
      <modal
        v-show="isLotteryShowing"
        :width="300"
        :height="300"
        class="plv-iar-welfare-lottery__on-lottery-modal"
      >
        <OnLottery
          ref="onLottery"
          pattern="default"
          :delay-time="0"
          :lang="_useLang"
          @lottery-status-changed="onLotteryStatusChange"
          @is-show-changed="onLotteryShowChange"
        />
      </modal>
    </div>
  </div>
</template>

<script>
import Entrance from '../../components/welfare-lottery/entrance.vue';
import TaskInvitation from '../../components/welfare-lottery/task-invitation/MobileTaskInvitation.vue';
import LotteryResult from '../../components/welfare-lottery/lottery-result/MobileLotteryResult.vue';
import LotteryRecord from '../../components/welfare-lottery/lottery-record/MobileLotteryRecord.vue';
import WinnerList from '../../components/welfare-lottery/winner-list/MobileWinnerList.vue';
import Modal from '../../components/common/modal/MobileModal.vue';
import OnLottery from '../lottery/on-lottery/MobileOnLottery.vue';
import mixin from './mixin';
import TaskWatchTime from '../../components/welfare-lottery/task-watch-time/MobileTaskWatchTime.vue';
import TaskComment from '../../components/welfare-lottery/task-comment/MobileTaskComment.vue';
import TaskQuestion from '../../components/welfare-lottery/task-question/MobileTaskQuestion.vue';

export default {
  components: {
    Entrance,
    TaskInvitation,
    LotteryResult,
    LotteryRecord,
    WinnerList,
    Modal,
    OnLottery,
    TaskWatchTime,
    TaskComment,
    TaskQuestion
  },
  mixins: [mixin],
};
</script>
<style lang="scss">
.plv-iar-modal__wrap--normal {
  .plv-iar-modal {
    z-index: 11000;
  }
}
.plv-iar-welfare-lottery__on-lottery-modal {
  .plv-iar-modal__main {
    top: 50%;
    left: 50%;
    bottom: initial;
    transform: translate(-50%, -50%);
  }
}
// 网页全屏下 safari 浏览器底部栏会遮挡部分内容
.plv-iar-modal__wrap--fullscreen.plv-iar-browser--safari {
  .plv-iar-modal__main {
    right: 30px !important;
  }
}
.plv-iar-modal__wrap--fullscreen {
  .plv-iar-modal {
    width: 100vh;
    height: 100vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
    background-color: rgba(0, 0, 0, 0);
  }
  .plv-iar-welfare-lottery__modal--result, .plv-iar-welfare-lottery__receive-modal, .plv-iar-welfare-lottery__record-modal, .plv-iar-welfare-lottery__winner-list, .plv-iar-welfare-lottery__modal--answer-question {
    .plv-iar-modal__main {
      width: 100vw !important;
      height: 100vw !important;
      top: 50%;
      right: 0;
      left: unset;
      transform: translate(0%, -50%);
      border-radius: 8px 0 0 0 !important;
    }
  }
  .plv-iar-welfare-lottery__modal--gift-box--mobile {
    .plv-iar-modal__main {
      width: 417px !important;
      height: 455px !important;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(.75);
    }
  }
  .plv-iar-welfare-lottery__on-lottery-modal .plv-iar-modal__main {
    transform: translate(-50%, -50%);
  }
  .plv-iar-welfare-lottery__modal--answer-question--submit {
    height: 36px;
    line-height: 36px;
    margin-bottom: 20px;
  }
  .plv-iar-welfare-lottery__result__content {
    padding-top: 10px;
  }
  .plv-iar-welfare-lottery__modal--result.plv-iar-welfare-lottery__modal--answer-question {
    .plv-iar-welfare-lottery__btn--lg {
      height: 36px;
      line-height: 36px;
    }
  }
}
</style>
