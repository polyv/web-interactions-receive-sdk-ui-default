<template>
  <div>
    <!-- 入口挂件 -->
    <entrance
      v-if="hasWelfareLotteryPendant"
      :entrance-img="entranceImg"
      :copywriting="entranceWriting"
      :countdown-time="countdownTime"
      :hint="hint"
      :hint-show-time="hintShowTime"
      :is-question-condition="isQuestionCondition"
      @click="clickEntrance"
    />
    <div ref="modalWrap" :class="{'plv-iar-modal__wrap--apple': isAppleMod, 'plv-iar-modal__wrap--fullscreen': isFullScreen}">
      <template v-if="showTaskModal && (lotteryStatus !== 'end' || (isQuestionCondition && !isQuestionLotteryOver))">
        <!-- 任务：邀请 -->
        <task-invitation
          v-if="lotteryData.lotteryCondition === welfareLotterySdk.lotteryCondition.INVITE"
          :prize="lotteryData"
          :invite-count="inviteCount"
          :watch-url="watchUrl"
          @close="closeTaskModal"
          @record="openRecordModal"
        />
        <!-- 任务：观看 -->
        <task-watch-time
          v-else-if="lotteryData.lotteryCondition === welfareLotterySdk.lotteryCondition.DURATION"
          :prize="lotteryData"
          :watched-time="watchedTime"
          :eligible="eligible"
          @close="closeTaskModal"
          @record="openRecordModal"
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
        :lottery-id="copyLotteryId || lotteryId"
        :is-show-custom-lottery="isShowCustomLottery"
        :link-skip-enabled="linkSkipEnabled"
        :is-apple-mod="isAppleMod"
        :is-question-condition="isQuestionCondition"
        @close="closeResultModal"
        @record="openRecordModal('result')"
        @winner-list="openWinnerList"
      />
      <!-- 中奖记录 -->
      <lottery-record
        v-if="showRecordModal"
        :sdk="welfareLotterySdk"
        :is-show-custom-lottery="isShowCustomLottery"
        :link-skip-enabled="linkSkipEnabled"
        @close="onClickRecordModalClose"
        @back="onClickRecordModalBack"
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
        :height="300"
        class="plv-iar-welfare-lottery__on-lottery-modal"
      >
        <PcOnLottery
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
import TaskInvitation from '../../components/welfare-lottery/task-invitation/PcTaskInvitation.vue';
import LotteryResult from '../../components/welfare-lottery/lottery-result/PcLotteryResult.vue';
import LotteryRecord from '../../components/welfare-lottery/lottery-record/PcLotteryRecord.vue';
import WinnerList from '../../components/welfare-lottery/winner-list/PcWinnerList.vue';
import Modal from '../../components/common/modal/PcModal.vue';
import PcOnLottery from '../lottery/on-lottery/PcOnLottery';
import mixin from './mixin';
import TaskWatchTime from '../../components/welfare-lottery/task-watch-time/PcTaskWatchTime.vue';
import TaskComment from '../../components/welfare-lottery/task-comment/PcTaskComment.vue';
import TaskQuestion from '../../components/welfare-lottery/task-question/PcTaskQuestion.vue';

export default {
  components: {
    Modal,
    Entrance,
    TaskInvitation,
    LotteryResult,
    LotteryRecord,
    WinnerList,
    PcOnLottery,
    TaskWatchTime,
    TaskComment,
    TaskQuestion
  },
  mixins: [mixin],
};
</script>
