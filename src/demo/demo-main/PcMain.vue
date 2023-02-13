<!-- pc 端 demo -->

<template>
  <div class="plv-demo-main-default">
    <div v-if="!isLogin" class="plv-demo-main-default__login">
      <demo-login @login-info="onLoginInfo" />
    </div>

    <div v-else class="plv-demo-main-default__container">
      <button @click="changLang">gloab lang change</button>
      <div class="plv-demo-main-default__panel">
        <demo-panel
          @lang-change="lang = $event"
          @update-setting="onClickUpdate"
        />
        <!-- 反馈 -->
        <demo-feed-back :lang="lang" />
      </div>
      <!-- 确保聊天室 SDK 初始化完毕，互动接收端配置更新完毕后，再去初始化互动功能各模块实例 -->
      <div v-if="chatSDK" class="plv-demo-mupdateConfigain-default__apps">
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
              'plv-demo-bar-list-item--active': demoBar.qaBar
            }"
            @click="changeDemoBar('qaBar')"
          >
            问答
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
              'plv-demo-bar-list-item--active': demoBar.seatTableBar
            }"
            @click="changeDemoBar('questionnaire')"
          >
            问卷
          </div>
          <div
            class="plv-demo-bar-list-item"
            :class="{
              'plv-demo-bar-list-item--active': demoBar.seatTableBar
            }"
            @click="changeDemoBar('evaluationQuestionnaire')"
          >
            风险测评问卷
          </div>
        </div>
        <!-- 签到 -->
        <demo-check-in :lang="lang" />

        <!-- 答题卡 -->
        <demo-answer-card :lang="lang" />
        <!-- 商品库 -->
        <div v-show="demoBar.productBar" class="plv-demo-main-default__container__product">
          <demo-product />
        </div>
        <!-- <DemoSeatTable v-show="demoBar.seatTableBar" /> -->
        <!--        抽奖-->
        <div v-show="demoBar.lotteryBar">
          <button @click="isSF = !isSF">切换顺丰抽奖</button>
          <button v-if="isShowLotteryNotice" @click="setLotteryRecordVisible">中奖记录</button>
          <div class="plv-demo-main-default__panel__lottery">
          </div>
        </div>
        <demo-enroll-lottery v-show="demoBar.enrollLotteryBar" />
        <!-- 抽奖 -->
        <demo-lottery
          v-if="!isSF"
          ref="lottery"
          :lang="lang"
          @lottery-list="onLotteryRecord"
        />
        <SF-demo-lottery
          v-else
          ref="lottery"
          :lang="lang"
          @lottery-list="onLotteryRecord"
        />
        <!-- 图文直播 -->
        <demo-tuwen v-show="demoBar.tuwenBar" :lang="lang" />

        <!-- 卡片推送 -->
        <demo-push-card :lang="lang" />

        <!-- 问卷 -->
        <demo-questionnaire :visible="demoBar.questionnaire" :lang="lang" />
        <demo-evaluation-questionnaire :visible="demoBar.evaluationQuestionnaire" :lang="lang" @hideEvaluation="hideEvaluation" />

        <!-- 公告 -->
        <!-- <demo-announcement ref="announcement" v-show="demoBar.announcementBar" :lang="lang" /> -->
        <demo-bulletin v-show="demoBar.announcementBar" ref="bulletin" :lang="lang" />

        <!-- 普通/口令红包 -->
        <demo-red-envelope v-show="demoBar.redpackBar" ref="redenvelope" :lang="lang" />

        <!-- 红包雨 -->
        <demo-redpack-rain v-show="demoBar.redpackBar" :lang="lang" />

        <!-- 投票 -->
        <demo-vote v-show="demoBar.voteBar" :voted-list="votedList" :lang="lang"/>
        <!-- 问答 -->
        <demo-question-answer v-show="demoBar.qaBar" :lang="lang" />

        <!-- 条件抽奖 -->
        <demo-welfare-lottery :lang="lang" />
        <demo-evaluation-pendant :lang="lang" />
      </div>
      <!-- 挂件 -->
      <demo-pendant />
    </div>
    <demo-bulletin-top @show-detail="showTopBulletinDetail" />
  </div>
</template>

<script>
import DemoLogin from '../demo-login/PcDemoLogin';
import DemoPanel from '../demo-panel/PcDemoPanel';
import DemoCheckIn from '../demo-check-in/PcDemoCheckIn';
import DemoFeedBack from '../demo-feed-back/PcDemoFeedBack';
import DemoAnswerCard from '../demo-answer-card/PcDemoAnswerCard';
import DemoPushCard from '../demo-push-card/DemoPushCard';
import DemoLottery from '../demo-lottery/PcDemoLottery';
/** 顺丰抽奖 */
import SFDemoLottery from '../SF-demo-lottery/PcDemoLottery';
import DemoQuestionnaire from '../demo-questionnaire/PcDemoQuestionnaire';
import DemoEvaluationQuestionnaire from '../demo-evaluation-questionnaire/PcDemoQuestionnaire';
// import DemoAnnouncement from '../demo-announcement/PcDemoAnnouncement';
import DemoRedEnvelope from '../demo-red-envelope/PcDemoRedEnvelope';
import DemoRedpackRain from '../demo-redpack-rain/PcDemoRedpackRain';
import DemoVote from '../demo-vote/PcDemoVote';
import DemoWelfareLottery from '../demo-welfare-lottery/PcDemoWelfareLottery.vue';
import DemoTuwen from '../demo-tuwen/PcTuwen';
import DemoPendant from '../demo-pendant/DemoPendant.vue';
// import DemoSeatTable from '../demo-seat-table/PcDemoSeatTable.vue';
import DemoProduct from '../demo-product/PcDemoProduct.vue';
import DemoEnrollLottery from '../demo-enroll-lottery/PcDemoEnrollLottery.vue';
import DemoEvaluationPendant from '../demo-evaluation-pendant/DemoEvaluationPendant';
import DemoBulletin from '../demo-bulletin/PcDemoBulletin';
import DemoBulletinTop from '../demo-bulletin/PcDemoBulletinTop.vue';
import DemoQuestionAnswer from '../demo-question-answer/PcDemoQuestionAnswer';

import Vue from 'vue';

import mixin from './mixin';
// TEST
// setInterval(() => {
//   // if (interactGlobalConfig.globalLang === 'en') {
//   //   interactGlobalConfig.globalLang = 'zh_cn';
//   // } else {
//   //   interactGlobalConfig.globalLang = 'en';
//   // }
//   console.log('globConfig', interactGlobalConfig);
// }, 5000);
export default {
  components: {
    DemoQuestionAnswer,
    DemoLogin,
    DemoPanel,
    DemoCheckIn,
    DemoLottery,
    SFDemoLottery,
    DemoAnswerCard,
    DemoPushCard,
    DemoQuestionnaire,
    // DemoAnnouncement,
    DemoRedEnvelope,
    DemoRedpackRain,
    DemoVote,
    DemoWelfareLottery,
    DemoTuwen,
    DemoPendant,
    // DemoSeatTable,
    DemoProduct,
    DemoFeedBack,
    DemoEnrollLottery,
    DemoEvaluationPendant,
    DemoEvaluationQuestionnaire,
    DemoBulletin,
    DemoBulletinTop,
  },

  mixins: [mixin],
};
</script>

<style lang="scss">
// 研讨会问卷/签到样式
//$bgColor: #366BEE; // PC端
//@import '../../assets/styles/vclass/questionnaire.scss';
//@import '../../assets/styles/vclass/check-in.scss';

// 苹果答题抽奖-蓝色皮肤
//@import '../../assets/styles/apple/welfareLottery.scss';
.plv-demo-main-default, .plv-demo-main-default__container {
  position: relative;
  height: 100%;
  width: 100%;
}

.plv-demo-main-default__login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.plv-demo-main-default__panel {
  width: 300px;
  height: 600px;
  padding: 20px;
  box-shadow: 0 0 8px #ccc;
  box-sizing: border-box;
  border-radius: 5px;
}

.plv-demo-main-default__apps {
  flex: 1;
}

.plv-demo-main-default__panel__lottery {
  position: relative;
}
.plv-demo-bar-list {
  position: relative;
  margin-top: 12px;
  display: flex;
  align-items: center;
  min-width: 100vw;
  flex-wrap: wrap;
  padding-bottom: 8px;
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
