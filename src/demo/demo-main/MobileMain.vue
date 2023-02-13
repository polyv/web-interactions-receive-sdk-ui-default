<!-- 移动端 demo -->

<template>
  <div class="plv-demo-main-default">
    <div v-if="!isLogin" class="plv-demo-main-default__login">
      <demo-login @login-info="onLoginInfo" />
    </div>

    <div v-else class="plv-demo-main-default__container">
      <div class="plv-demo-main-default__panel">
        <demo-panel
          @lang-change="lang = $event"
          @update-setting="onClickUpdate"
        />
        <button @click="isSF = !isSF">切换顺丰抽奖</button>
        <button v-if="isShowLotteryNotice" @click="setLotteryRecordVisible">中奖记录</button>
      </div>
      <!-- 确保聊天室 SDK 初始化完毕，互动接收端配置更新完毕后，再去初始化互动功能各模块实例 -->
      <div v-if="chatSDK" class="plv-demo-main-default__apps">
        <div class="plv-demo-bar-list">
          <div
            class="plv-demo-bar-list-item"
            :class="{
              'plv-demo-bar-list-item--active': demoBar.announcementBar
            }"
            @click="changeDemoBar('announcementBar')"
          >
            公告
          </div>
          <div
            class="plv-demo-bar-list-item"
            :class="{
              'plv-demo-bar-list-item--active': demoBar.voteBar
            }"
            @click="changeDemoBar('voteBar')"
          >
            投票
          </div>
          <div
            class="plv-demo-bar-list-item"
            :class="{
              'plv-demo-bar-list-item--active': demoBar.lotteryBar
            }"
            @click="changeDemoBar('lotteryBar')"
          >
            抽奖
          </div>
          <div
            class="plv-demo-bar-list-item"
            :class="{
              'plv-demo-bar-list-item--active': demoBar.tuwenBar
            }"
            @click="changeDemoBar('tuwenBar')"
          >
            图文
          </div>
          <div
            class="plv-demo-bar-list-item"
            :class="{
              'plv-demo-bar-list-item--active': demoBar.redpackBar
            }"
            @click="changeDemoBar('redpackBar')"
          >
            红包
          </div>
          <div
            class="plv-demo-bar-list-item"
            :class="{
              'plv-demo-bar-list-item--active': demoBar.productBar
            }"
            @click="changeDemoBar('productBar')"
          >
            商品库
          </div>
          <div
            class="plv-demo-bar-list-item"
            :class="{
              'plv-demo-bar-list-item--active': demoBar.seatTableBar
            }"
            @click="changeDemoBar('seatTableBar')"
          >
            坐席表
          </div>
          <div
            class="plv-demo-bar-list-item"
            :class="{
              'plv-demo-bar-list-item--active': demoBar.enrollLotteryBar
            }"
            @click="changeDemoBar('enrollLotteryBar')"
          >
            报名抽奖
          </div>
          <div
            class="plv-demo-bar-list-item"
            :class="{
              'plv-demo-bar-list-item--active': demoBar.qaBar
            }"
            @click="changeDemoBar('qaBar')"
          >
            问答
          </div>
        </div>

        <demo-enroll-lottery v-show="demoBar.enrollLotteryBar" :lang="lang" />
        <!-- 积分红包-->
        <demo-point-r-e-record />
        <demo-check-in :lang="lang" />
        <demo-answer-card :lang="lang" />
        <demo-quick-answer-card :lang="lang" />
        <demo-push-card :lang="lang" />
        <demo-questionnaire :lang="lang" />
        <!-- 反馈举报 -->
        <demo-feed-back :lang="lang" />
        <!-- 公告 -->
        <!-- <demo-announcement :lang="lang" /> -->
        <demo-bulletin ref="bulletin" :lang="lang" />
        <!-- 侧边公告 -->
        <!-- <demo-announcement-bar v-show="demoBar.announcementBar" /> -->
        <!-- 普通/口令红包/红包雨 -->
        <demo-red-envelope
          v-show="demoBar.redpackBar"
          ref="redenvelope"
          :redpack-bar="demoBar.redpackBar"
          :lang="lang"
        />
        <!-- 商品库 -->
        <demo-product v-if="demoBar.productBar" />

        <!-- 嘉宾座位表 -->
        <demo-seat-table v-show="demoBar.seatTableBar" />

        <!-- 抽奖bar -->
        <div v-show="demoBar.lotteryBar">
          <button @click="isSF = !isSF">切换顺丰抽奖</button>
          <button v-if="isShowLotteryNotice" @click="setLotteryRecordVisible">中奖记录</button>
          <div class="plv-demo-main-default__panel__lottery">
          </div>
        </div>
        <template v-if="!isSF">
          <demo-lottery
            ref="lottery"
            :lang="lang"
            @lottery-list="onLotteryRecord"
          />
        </template>
        <template v-else>
          <SF-demo-lottery
            ref="lottery"
            :lang="lang"
            @lottery-list="onLotteryRecord"
          />
        </template>
        <!-- 投票 -->
        <demo-vote v-show="demoBar.voteBar" :voted-list="votedList" />

        <!-- 条件抽奖 -->
        <demo-welfare-lottery :lang="lang" />

        <!-- 图文直播 -->
        <demo-tuwen v-show="demoBar.tuwenBar" :lang="lang" />
        <!-- 问答 -->
        <demo-question-answer v-show="demoBar.qaBar" :lang="lang" />

        <demo-evaluation-questionnaire :visible="false" :lang="lang" />
      </div>
      <demo-bulletin-top @show-detail="showTopBulletinDetail" />
      <demo-bulletin-bubble @show-detail="showTopBulletinDetail" />
    </div>
  </div>
</template>

<script>
import mixin from './mixin';
import DemoLogin from '../demo-login/MobileDemoLogin';
import DemoPanel from '../demo-panel/MobileDemoPanel';
import DemoCheckIn from '../demo-check-in/MobileDemoCheckIn';
// import DemoCheckIn from '../demo-check-in/PortraitDemoCheckIn'; // 竖屏签到组件
import DemoAnswerCard from '../demo-answer-card/MobileDemoAnswerCard';
import DemoQuickAnswerCard from '../demo-answer-card/MobileDemoQuickAnswerCard';
import DemoPushCard from '../demo-push-card/DemoPushCard';
import DemoLottery from '../demo-lottery/MobileDemoLottery';
/** 顺丰抽奖 */
import SFDemoLottery from '../SF-demo-lottery/MobileDemoLottery';
import DemoQuestionnaire from '../demo-questionnaire/MobileDemoQuestionnaire';
import DemoEvaluationQuestionnaire from '../demo-evaluation-questionnaire/MobileDemoQuestionnaire';
import DemoAnnouncement from '../demo-announcement/MobileDemoAnnouncement';
import DemoAnnouncementBar from '../demo-announcement/MobileDemoAnnouncementBar';
import DemoRedEnvelope from '../demo-red-envelope/MobileDemoRedEnvelope';
import DemoVote from '../demo-vote/MobileDemoVote.vue';
import DemoWelfareLottery from '../demo-welfare-lottery/MobileDemoWelfareLottery.vue';
import DemoTuwen from '../demo-tuwen/MobileTuwen';
import DemoPointRERecord from '../demo-red-envelope/MobileDemoPointRERecord';
import DemoSeatTable from '../demo-seat-table/MobileDemoSeatTable.vue';
import DemoProduct from '../demo-product/MobileDemoProduct.vue';
import DemoFeedBack from '../demo-feed-back/MobileDemoFeedBack';
import DemoEnrollLottery from '../demo-enroll-lottery/MobileDemoEnrollLottery.vue';
import DemoBulletin from '../demo-bulletin/MobileDemoBulletin';
import DemoBulletinTop from '../demo-bulletin/MobileDemoBulletinTop.vue';
import DemoBulletinBubble from '../demo-bulletin/MobileDemoBulletinBubble.vue';
import DemoQuestionAnswer from '../demo-question-answer/MobileDemoQuestionAnswer';

export default {
  components: {
    DemoQuestionAnswer,
    DemoLogin,
    DemoPanel,
    DemoCheckIn,
    DemoAnswerCard,
    DemoQuickAnswerCard,
    DemoPushCard,
    DemoLottery,
    SFDemoLottery,
    DemoQuestionnaire,
    DemoAnnouncement,
    DemoAnnouncementBar,
    DemoRedEnvelope,
    DemoVote,
    DemoWelfareLottery,
    DemoPointRERecord,
    DemoSeatTable,
    DemoProduct,
    DemoFeedBack,
    DemoEvaluationQuestionnaire,
    DemoEnrollLottery,
    DemoBulletin,
    DemoBulletinTop,
    DemoBulletinBubble,
    DemoTuwen
  },

  mixins: [mixin],
};
</script>

<style lang="scss">
// 研讨会问卷/签到样式
$bgColor: #4399FF; // 移动端
@import '../../assets/styles/vclass/questionnaire.scss';
@import '../../assets/styles/vclass/check-in.scss';
.c-main {
  position: relative;
}
.plv-demo-bar-list:after {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: #e4e7ed;
  flex-wrap: wrap;
}
.plv-demo-bar-list {
  position: relative;
  margin-top: 12px;
  display: flex;
  align-items: center;
  min-width: 100vw;
  overflow-x: scroll;
  flex-wrap: wrap;
  .plv-demo-bar-list-item {
    min-width: 72px;
    text-align: center;
    height: 32px;
    line-height: 32px;
  }
  .plv-demo-bar-list-item--active {
    border-bottom: 1px solid #2196f3;
  }
}
</style>
